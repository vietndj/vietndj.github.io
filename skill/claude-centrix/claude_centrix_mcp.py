import json, os, re, signal, subprocess, uuid, time, asyncio, threading, shutil, urllib.request, urllib.error
from pathlib import Path
from fastmcp import FastMCP, Context

mcp = FastMCP("claude-centrix")
CFG_DIR = Path.home() / ".claude_centrix"
JOBS_DIR = CFG_DIR / "jobs"
JOBS_DIR.mkdir(parents=True, exist_ok=True)
try:
    os.chmod(JOBS_DIR, 0o700)
except Exception:
    pass
CONV_SESSIONS_FILE = JOBS_DIR / "conversation_sessions.json"
PROCS: dict[str, any] = {}
_SESS_LOCK = threading.Lock()

ALLOWED_TOOLS = "Read,Edit,Write,Grep,Glob,Bash"
BRAIN_DIR = Path.home() / ".gemini" / "antigravity" / "brain"
DEFAULT_ENDPOINT = "https://agent.cetrix.app"
KEY_RE = re.compile(r"^sk-[A-Za-z0-9_\-]{20,}$")
CONV_ID_RE = re.compile(r"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}")
SECRET_RE = re.compile(r"sk-[A-Za-z0-9_\-]{16,}")
ARTIFACT_MAX_CHARS = 200_000

MODEL_DEFAULTS = {
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-5-5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-5-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-5-5"
}

FAST_ENV = {
    "DISABLE_UPDATE_CHECK": "1",
    "DISABLE_AUTOUPDATER": "1",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
}
POPEN_KW = {"start_new_session": True} if os.name == "posix" else {}

class NoApiKey(RuntimeError): pass
class NoClaudeCli(RuntimeError): pass

def auto_purge_old_jobs(max_age_days: int = 7, max_files: int = 40):
    """Tự động dọn dẹp các file log jobs cũ để bảo toàn dung lượng ổ cứng."""
    try:
        now = time.time()
        cutoff = now - (max_age_days * 86400)
        job_files = []
        for p in JOBS_DIR.iterdir():
            if p.name == "conversation_sessions.json":
                continue
            if p.is_file() and (p.suffix in [".jsonl", ".meta"]):
                mtime = p.stat().st_mtime
                if mtime < cutoff:
                    try: p.unlink()
                    except Exception: pass
                else:
                    job_files.append((p, mtime))
        if len(job_files) > max_files:
            job_files.sort(key=lambda x: x[1])
            for p, _ in job_files[: len(job_files) - max_files]:
                try: p.unlink()
                except Exception: pass
    except Exception:
        pass

def resolve_claude_bin() -> str:
    cands = [
        os.environ.get("CLAUDE_CENTRIX_BIN"),
        shutil.which("claude"),
        str(Path.home() / ".local/bin/claude"),
        str(Path.home() / ".claude/local/claude"),
        "/opt/homebrew/bin/claude",
        "/usr/local/bin/claude"
    ]
    for c in cands:
        if c and os.access(c, os.X_OK):
            return c
    raise NoClaudeCli("Chưa tìm thấy Claude Code CLI. Vui lòng chạy lại lệnh cài đặt (install-claude.sh).")

def get_claude_env() -> dict:
    env = {k: v for k, v in os.environ.items()
           if not k.startswith("ANTHROPIC_") and k not in ("CLAUDE_CODE_USE_BEDROCK", "CLAUDE_CODE_USE_VERTEX")}
    env["CLAUDE_CONFIG_DIR"] = str(CFG_DIR)
    settings_path = CFG_DIR / "settings.json"
    if settings_path.exists():
        try:
            settings = json.loads(settings_path.read_text("utf-8"))
            env.update({k: str(v) for k, v in settings.get("env", {}).items()})
        except Exception:
            pass
    base = (env.get("ANTHROPIC_BASE_URL") or DEFAULT_ENDPOINT).rstrip("/")
    env["ANTHROPIC_BASE_URL"] = base[:-3] if base.endswith("/v1") else base
    key = env.get("ANTHROPIC_API_KEY") or env.get("ANTHROPIC_AUTH_TOKEN") or ""
    if not KEY_RE.match(key):
        raise NoApiKey("Chưa có API Key CetriX. Lấy key tại https://cetrix.app/chat/hub/keys rồi mở Terminal chạy: "
                       "bash ~/.gemini/config/plugins/claude-centrix/set-key.sh")
    env["ANTHROPIC_API_KEY"] = env["ANTHROPIC_AUTH_TOKEN"] = key
    for k, v in {**MODEL_DEFAULTS, **FAST_ENV}.items():
        env.setdefault(k, v)
    return env

def session_key(ident: str) -> str:
    return f"centrix:{ident}"

def load_conversation_sessions() -> dict[str, str]:
    if CONV_SESSIONS_FILE.exists():
        try:
            return json.loads(CONV_SESSIONS_FILE.read_text(encoding="utf-8"))
        except Exception:
            return {}
    return {}

def _save_sessions(sessions: dict) -> None:
    tmp = CONV_SESSIONS_FILE.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(sessions, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(tmp, CONV_SESSIONS_FILE)

def get_effective_session(conversation_id: str | None, workdir: str,
                          resume_session: str | None = None) -> str | None:
    if resume_session:
        return resume_session
    with _SESS_LOCK:
        sessions = load_conversation_sessions()
    for ident in (conversation_id, workdir):
        if ident and session_key(ident) in sessions:
            return sessions[session_key(ident)]
    return None

def store_session(session_id: str, conversation_id: str | None, workdir: str):
    if not session_id:
        return
    with _SESS_LOCK:
        sessions = load_conversation_sessions()
        for ident in (conversation_id, workdir):
            if ident:
                sessions[session_key(ident)] = session_id
        _save_sessions(sessions)

def clear_session_for(conversation_id: str | None, workdir: str):
    with _SESS_LOCK:
        sessions = load_conversation_sessions()
        changed = False
        for ident in (conversation_id, workdir):
            k = session_key(ident) if ident else None
            if k and k in sessions:
                del sessions[k]
                changed = True
        if changed:
            _save_sessions(sessions)

def format_task_prompt(task: str, context: str | None = None) -> str:
    if not context or not context.strip():
        return task
    return f"""[BỐI CẢNH THẢO LUẬN TỪ ANTIGRAVITY]:
{context.strip()}

[NHIỆM VỤ YÊU CẦU]:
{task.strip()}"""

def map_model(model: str | None) -> str:
    m = (model or "").strip()
    low = m.lower()
    for alias in ("opus", "sonnet", "haiku"):
        if alias in low:
            return alias
    return m or "opus"

def build_cmd(claude_bin: str, prompt: str, model: str | None, max_turns: int,
              resume: str | None = None) -> list[str]:
    cmd = [claude_bin, "-p", prompt, "--model", map_model(model)]
    cmd += ["--output-format", "stream-json", "--verbose", "--include-partial-messages",
            "--max-turns", str(max_turns),
            "--allowedTools", ALLOWED_TOOLS,
            "--permission-mode", "acceptEdits"]
    if resume:
        cmd += ["--resume", resume]
    return cmd

def _alive(p) -> bool:
    return (p.poll() is None) if hasattr(p, "poll") else (p.returncode is None)

def _send(p, force: bool) -> None:
    try:
        if os.name == "posix":
            os.killpg(os.getpgid(p.pid), signal.SIGKILL if force else signal.SIGTERM)
        else:
            p.kill() if force else p.terminate()
    except (ProcessLookupError, PermissionError):
        pass

async def _wait(p, timeout: float) -> bool:
    try:
        if hasattr(p, "poll"):
            await asyncio.to_thread(p.wait, timeout)
        else:
            await asyncio.wait_for(p.wait(), timeout)
        return True
    except (subprocess.TimeoutExpired, asyncio.TimeoutError):
        return False

async def graceful_stop(p, grace: float = 0.5) -> str:
    if not _alive(p):
        return "already-exited"
    _send(p, force=False)
    if await _wait(p, grace):
        return "terminated"
    _send(p, force=True)
    await _wait(p, 2)
    return "killed"

def export_artifact(job_id: str, *, model: str | None, task: str, status: str,
                    result_text: str | None, session_id: str | None, cost, steps: list,
                    conversation_id: str | None) -> str | None:
    try:
        if not conversation_id or not CONV_ID_RE.fullmatch(conversation_id):
            return None
        d = BRAIN_DIR / conversation_id
        if not d.is_dir():
            return None
        path = d / f"claude_centrix_{job_id}.md"
        if path.exists():
            return str(path)
        body = SECRET_RE.sub("sk-***", result_text or "(không có kết quả)")[:ARTIFACT_MAX_CHARS]
        task_s = SECRET_RE.sub("sk-***", task or "")[:2000]
        steps_md = "\n".join(f"- {SECRET_RE.sub('sk-***', s)}" for s in (steps or [])[-10:]) or "- (không có)"
        md = (
            f"# Claude Preview · CetriX API · job {job_id}\n"
            f"| Trường | Giá trị |\n|---|---|\n"
            f"| Trạng thái | {status} |\n| Model | {model or ''} |\n"
            f"| Session | {session_id or ''} |\n| Chi phí USD | {cost if cost is not None else ''} |\n"
            f"| Thời điểm | {time.strftime('%Y-%m-%d %H:%M:%S')} |\n"
            f"## Nhiệm vụ\n{task_s}\n"
            f"## Kết quả\n{body}\n"
            f"## Các bước gần nhất\n{steps_md}\n"
        )
        tmp = path.with_suffix(".md.tmp")
        tmp.write_text(md, encoding="utf-8")
        os.replace(tmp, path)
        return str(path)
    except Exception:
        return None

def fail(code: str, msg: str) -> dict:
    return {"status": "failed", "error_code": code, "result": msg, "session_id": None}

def doctor_check(live: bool = False) -> dict:
    r = {"ok": False, "claude_bin": None, "has_key": False, "endpoint_http": None, "live": None}
    try:
        r["claude_bin"] = resolve_claude_bin()
    except NoClaudeCli:
        return r
    try:
        env = get_claude_env()
        r["has_key"] = True
    except NoApiKey:
        return r
    try:
        req = urllib.request.Request(
            env["ANTHROPIC_BASE_URL"] + "/v1/models",
            headers={
                "Authorization": f"Bearer {env['ANTHROPIC_API_KEY']}",
                "User-Agent": "ClaudeCentrix/1.0 (Antigravity; macOS/Linux)",
                "Accept": "application/json"
            }
        )
        r["endpoint_http"] = urllib.request.urlopen(req, timeout=15).status
    except urllib.error.HTTPError as e:
        r["endpoint_http"] = e.code
    except Exception:
        r["endpoint_http"] = 0
    if r["endpoint_http"] in (401, 403):
        return r
    if live:
        p = subprocess.run([r["claude_bin"], "-p", "Trả lời đúng 1 từ: OK", "--model", "haiku", "--max-turns", "1"],
                           env=env, capture_output=True, text=True, timeout=60)
        r["live"] = (p.returncode == 0 and bool(p.stdout.strip()))
        r["ok"] = r["live"]
    else:
        r["ok"] = (r["endpoint_http"] == 200)
    return r

@mcp.tool()
def doctor(live: bool = False) -> dict:
    """Kiểm tra cài đặt: có Claude Code CLI, có API Key CetriX, kiểm tra kết nối CetriX API.
    live=True sẽ chạy thử 1 câu lệnh mẫu để kiểm chứng toàn diện."""
    return doctor_check(live)

@mcp.tool()
async def run_task(task: str, workdir: str, model: str = "opus",
                   max_turns: int = 60, resume_session: str | None = None,
                   context: str | None = None, conversation_id: str | None = None,
                   ctx: Context = None) -> dict:
    """Chạy đồng bộ một nhiệm vụ với Claude qua CetriX API, stream tiến độ qua MCP Context.
    Mặc định model là opus (claude-opus-5-5). Hỗ trợ Sticky Session theo conversation_id và xuất Artifact."""
    auto_purge_old_jobs()
    clean_task = task.strip()

    if clean_task.lower() in ["/reset", "reset", "phiên mới", "xóa nhớ"]:
        clear_session_for(conversation_id, workdir)
        return {
            "status": "done",
            "result": "🧹 Đã xóa trí nhớ phiên trước. Claude đã sẵn sàng cho nhiệm vụ mới!",
            "session_id": None
        }

    is_forced_reset = False
    if clean_task.startswith("/reset "):
        is_forced_reset = True
        clean_task = clean_task[7:].strip()
        clear_session_for(conversation_id, workdir)

    job_id = uuid.uuid4().hex[:8]
    out = JOBS_DIR / f"{job_id}.jsonl"
    effective_resume = None if is_forced_reset else get_effective_session(conversation_id, workdir, resume_session)
    full_prompt = format_task_prompt(clean_task, context)

    try:
        current_env = get_claude_env()
        claude_bin = resolve_claude_bin()
    except NoApiKey as e:
        return fail("NO_API_KEY", str(e))
    except NoClaudeCli as e:
        return fail("NO_CLAUDE_CLI", str(e))

    cmd = build_cmd(claude_bin, full_prompt, model, max_turns, effective_resume)

    (JOBS_DIR / f"{job_id}.meta").write_text(json.dumps(
        {"task": clean_task, "workdir": workdir, "conversation_id": conversation_id,
         "resume_session": effective_resume, "started": time.time(),
         "engine": "centrix", "model": model}))

    f = open(out, "w", encoding="utf-8")
    proc = await asyncio.create_subprocess_exec(
        *cmd,
        cwd=workdir,
        env=current_env,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.STDOUT,
        limit=32 * 1024 * 1024,
        **POPEN_KW,
    )
    PROCS[job_id] = proc

    events = []
    result = None
    streamed_text = []
    delta_buffer = []
    last_flush_time = time.time()

    async def flush_deltas():
        nonlocal delta_buffer, last_flush_time
        if delta_buffer and ctx:
            chunk = "".join(delta_buffer)
            delta_buffer = []
            try:
                await ctx.info(chunk)
            except Exception:
                pass
            last_flush_time = time.time()

    try:
        while True:
            line_bytes = await proc.stdout.readline()
            if not line_bytes:
                break
            ln = line_bytes.decode("utf-8", errors="ignore")
            f.write(ln)
            f.flush()
            
            line_str = ln.strip()
            if not line_str:
                continue

            try:
                ev = json.loads(line_str)
            except json.JSONDecodeError:
                continue

            ev_type = ev.get("type")
            if ev_type == "result":
                result = ev
            elif ev_type == "stream_event":
                event_data = ev.get("event", {})
                if event_data.get("type") == "content_block_delta":
                    delta = event_data.get("delta", {})
                    if delta.get("type") == "text_delta":
                        t = delta.get("text", "")
                        streamed_text.append(t)
                        delta_buffer.append(t)
                        if "\n" in t or "." in t or len(delta_buffer) >= 5 or (time.time() - last_flush_time > 0.1):
                            await flush_deltas()
            elif ev_type == "assistant":
                for c in ev.get("message", {}).get("content", []):
                    if c.get("type") == "tool_use":
                        tool_desc = f"🔧 {c.get('name')}: {json.dumps(c.get('input', {}))[:120]}"
                        events.append(tool_desc)
                        await flush_deltas()
                        if ctx:
                            try:
                                await ctx.report_progress(message=tool_desc)
                            except Exception:
                                pass
                    elif c.get("type") == "text":
                        text_val = c.get("text", "")
                        if text_val and not streamed_text:
                            streamed_text.append(text_val)

        await flush_deltas()
        await proc.wait()
    except (asyncio.CancelledError, GeneratorExit):
        await graceful_stop(proc)
        raise
    finally:
        f.close()
        if job_id in PROCS:
            del PROCS[job_id]

    session_id_res = result.get("session_id") if result else None
    if session_id_res:
        store_session(session_id_res, conversation_id, workdir)

    final_content = result.get("result") if result and result.get("result") else "".join(streamed_text)
    is_error = bool(result and result.get("is_error"))
    error_code = None
    if is_error:
        api_status = result.get("api_error_status") if result else None
        low_res = final_content.lower()
        if api_status in (401, 403) or "invalid token" in low_res or "invalid api key" in low_res or "unauthorized" in low_res:
            error_code = "AUTH_FAILED"
        else:
            error_code = "TASK_FAILED"

    status = "done" if not is_error and not error_code else "failed"
    cost = result.get("total_cost_usd") if result else None
    artifact_path = export_artifact(job_id, model=model, task=clean_task, status=status,
                                    result_text=final_content, session_id=session_id_res, cost=cost,
                                    steps=events, conversation_id=conversation_id)
    ret = {
        "job_id": job_id,
        "status": status,
        "result": final_content,
        "session_id": session_id_res,
        "resumed_from": effective_resume,
        "cost_usd": cost,
        "recent_steps": events[-10:],
        "artifact_path": artifact_path,
    }
    if error_code:
        ret["error_code"] = error_code
    return ret

@mcp.tool()
def start_task(task: str, workdir: str, model: str = "opus",
               max_turns: int = 60, resume_session: str | None = None,
               context: str | None = None, conversation_id: str | None = None) -> dict:
    """Chạy nền một nhiệm vụ với Claude CetriX (dành cho bài toán dài hoặc qua đêm). Trả job_id; dùng get_status để theo dõi."""
    auto_purge_old_jobs()
    clean_task = task.strip()
    is_forced_reset = False
    if clean_task.startswith("/reset "):
        is_forced_reset = True
        clean_task = clean_task[7:].strip()
        clear_session_for(conversation_id, workdir)

    job_id = uuid.uuid4().hex[:8]
    out = JOBS_DIR / f"{job_id}.jsonl"
    effective_resume = None if is_forced_reset else get_effective_session(conversation_id, workdir, resume_session)
    full_prompt = format_task_prompt(clean_task, context)

    try:
        current_env = get_claude_env()
        claude_bin = resolve_claude_bin()
    except NoApiKey as e:
        return fail("NO_API_KEY", str(e))
    except NoClaudeCli as e:
        return fail("NO_CLAUDE_CLI", str(e))

    cmd = build_cmd(claude_bin, full_prompt, model, max_turns, effective_resume)

    with open(out, "w", encoding="utf-8") as f:
        PROCS[job_id] = subprocess.Popen(cmd, cwd=workdir, env=current_env,
                                         stdout=f, stderr=subprocess.STDOUT,
                                         shell=(os.name == "nt"), **POPEN_KW)
    (JOBS_DIR / f"{job_id}.meta").write_text(json.dumps(
        {"task": clean_task, "workdir": workdir, "conversation_id": conversation_id,
         "resume_session": effective_resume, "started": time.time(),
         "engine": "centrix", "model": model}))
    return {"job_id": job_id, "status": "running", "resumed_from": effective_resume}

@mcp.tool()
def get_status(job_id: str, tail: int = 15) -> dict:
    """Xem tiến độ job chạy nền: status running/done/failed, các bước gần nhất, kết quả cuối và artifact."""
    out = JOBS_DIR / f"{job_id}.jsonl"
    meta_file = JOBS_DIR / f"{job_id}.meta"
    if not out.exists():
        return {"error": "job not found"}
    lines = out.read_text(encoding="utf-8", errors="ignore").splitlines()
    events, result = [], None
    text_deltas = []
    for ln in lines:
        try:
            ev = json.loads(ln)
        except json.JSONDecodeError:
            continue
        ev_type = ev.get("type")
        if ev_type == "result":
            result = ev
        elif ev_type == "stream_event":
            event_data = ev.get("event", {})
            if event_data.get("type") == "content_block_delta":
                delta = event_data.get("delta", {})
                if delta.get("type") == "text_delta":
                    text_deltas.append(delta.get("text", ""))
        elif ev_type == "assistant":
            for c in ev.get("message", {}).get("content", []):
                if c.get("type") == "tool_use":
                    events.append(f"🔧 {c['name']}: {json.dumps(c['input'])[:150]}")
                elif c.get("type") == "text":
                    events.append(f"💬 {c['text'][:200]}")
    proc = PROCS.get(job_id)
    running = False
    if proc is not None:
        running = _alive(proc)

    meta = {}
    if meta_file.exists():
        try:
            meta = json.loads(meta_file.read_text(encoding="utf-8"))
        except Exception:
            meta = {}

    session_id_res = result.get("session_id") if result else None
    if session_id_res and meta:
        store_session(session_id_res, meta.get("conversation_id"), meta.get("workdir"))

    final_res = result.get("result") if result else ("".join(text_deltas) if not running and text_deltas else None)
    status = "running" if running else ("done" if result and not result.get("is_error") else "failed")
    cost = result.get("total_cost_usd") if result else None
    artifact_path = None
    if result:
        artifact_path = export_artifact(job_id, model=meta.get("model"),
                                        task=meta.get("task", ""), status=status, result_text=final_res,
                                        session_id=session_id_res, cost=cost, steps=events,
                                        conversation_id=meta.get("conversation_id"))
    return {
        "status": status,
        "recent_steps": events[-tail:],
        "final_summary": final_res,
        "session_id": session_id_res,
        "cost_usd": cost,
        "artifact_path": artifact_path,
    }

@mcp.tool()
async def cancel_task(job_id: str) -> str:
    """Dừng một job đang chạy: gửi SIGTERM, chờ 0.5s rồi mới hạ gục nếu còn sống."""
    p = PROCS.get(job_id)
    if not p:
        return "not running"
    try:
        outcome = await graceful_stop(p, grace=0.5)
        PROCS.pop(job_id, None)
        return "already-exited" if outcome == "already-exited" else "cancelled"
    except Exception as e:
        return f"error cancelling: {e}"

if __name__ == "__main__":
    mcp.run()
