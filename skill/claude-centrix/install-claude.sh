#!/usr/bin/env bash
# Script cài đặt Plugin CLAUDE × CetriX (claude-centrix) cho Antigravity
# Sử dụng:  curl -sSL https://fedu.vn/skill/install-claude.sh | bash
# Cờ hỗ trợ: --yes (chạy tự động) | --key-only (chỉ nhập key) | --reset-key | --no-smoke | --uninstall [--purge]
# Biến môi trường: CETRIX_API_KEY, CETRIX_BASE_URL, CLAUDE_CENTRIX_BASE

set -u

G="\033[1;32m"; C="\033[0;36m"; Y="\033[1;33m"; R="\033[1;31m"; N="\033[0m"
ok(){ echo -e "${G}✅ $*${N}"; }
info(){ echo -e "${C}$*${N}"; }
warn(){ echo -e "${Y}⚠ $*${N}"; }
die(){ echo -e "${R}❌ $*${N}"; exit 1; }

PLUGIN="claude-centrix"
GEM="$HOME/.gemini/config"
PLUGIN_DIR="$GEM/plugins/$PLUGIN"
SKILL_DIR="$GEM/skills/$PLUGIN"
CFG_DIR="$HOME/.claude_centrix"
MCP_JSON="$GEM/mcp_config.json"
FASTMCP_SPEC="fastmcp>=4.1,<5"
BASE_URL="${CETRIX_BASE_URL:-https://agent.cetrix.app}"
BASES=(
  "${CLAUDE_CENTRIX_BASE:-https://fedu.vn/skill}"
  "https://raw.githubusercontent.com/vietndj/vietndj.github.io/master/skill"
)

MODE=install; RESET_KEY=0; SMOKE=1; YES=0; PURGE=0
for a in "$@"; do
  case "$a" in
    --yes) YES=1;;
    --key-only) MODE=key;;
    --reset-key) RESET_KEY=1;;
    --no-smoke) SMOKE=0;;
    --uninstall) MODE=uninstall;;
    --purge) PURGE=1;;
  esac
done

HAVE_TTY=0
( : </dev/tty ) 2>/dev/null && HAVE_TTY=1
[ "$HAVE_TTY" = 0 ] && YES=1

normalize_base(){
  local b="${1%/}"
  b="${b%/v1}"
  echo "${b%/}"
}
BASE_URL="$(normalize_base "$BASE_URL")"

valid_key(){
  printf '%s' "$1" | grep -Eq '^sk-[A-Za-z0-9_-]{20,}$'
}

probe_key(){
  [ "${CLAUDE_CENTRIX_SKIP_PROBE:-0}" = 1 ] && { echo 200; return; }
  local c
  c="$(printf 'header = "Authorization: Bearer %s"\n' "$1" | curl -s -o /dev/null -m 15 -w '%{http_code}' -K - "$BASE_URL/v1/models" 2>/dev/null)"
  echo "${c:-000}"
}

sha256_of(){
  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$1" | cut -d' ' -f1
  else
    sha256sum "$1" | cut -d' ' -f1
  fi
}

fetch(){
  local name="$1" dest="$2" tmp base
  tmp="$(mktemp)"
  for base in "${BASES[@]}"; do
    if curl -fsSL --retry 2 --max-time 40 "$base/$name" -o "$tmp" && [ -s "$tmp" ]; then
      mv "$tmp" "$dest"
      return 0
    fi
  done
  rm -f "$tmp"
  return 1
}

find_py310(){
  local c
  for c in python3.13 python3.12 python3.11 python3.10 python3 /opt/homebrew/bin/python3 /usr/local/bin/python3; do
    command -v "$c" >/dev/null 2>&1 || continue
    "$c" -c 'import sys; sys.exit(0 if sys.version_info >= (3,10) else 1)' 2>/dev/null && { command -v "$c"; return 0; }
  done
  return 1
}

find_claude(){
  local p
  p="$(command -v claude 2>/dev/null)" && { echo "$p"; return 0; }
  for p in "$HOME/.local/bin/claude" "$HOME/.claude/local/claude" /opt/homebrew/bin/claude /usr/local/bin/claude; do
    [ -x "$p" ] && { echo "$p"; return 0; }
  done
  return 1
}

read_existing_key(){
  [ -f "$CFG_DIR/settings.json" ] && python3 -c 'import json,sys; print(json.load(open(sys.argv[1])).get("env",{}).get("ANTHROPIC_API_KEY",""),end="")' "$CFG_DIR/settings.json" 2>/dev/null
}

ask_key(){
  local k i code
  for i in 1 2 3; do
    read -r -s -p "Dán API Key CetriX (bắt đầu bằng sk-..., gõ ẩn) rồi Enter: " k </dev/tty
    echo
    k="$(printf '%s' "$k" | tr -d '[:space:]')"
    valid_key "$k" || { warn "Key sai định dạng (phải bắt đầu bằng sk-)."; continue; }
    code="$(probe_key "$k")"
    case "$code" in
      200) KEY="$k"; return 0;;
      401|403) warn "CetriX từ chối key này (HTTP $code). Kiểm tra lại tại https://cetrix.app/chat/hub/keys";;
      *) warn "Chưa xác minh được key (HTTP $code). Vẫn lưu, sẽ kiểm tra lại sau."; KEY="$k"; return 0;;
    esac
  done
  return 1
}

write_settings(){
  mkdir -p "$CFG_DIR" && chmod 700 "$CFG_DIR"
  CX_KEY="${KEY:-}" CX_BASE="$BASE_URL" python3 - "$CFG_DIR/settings.json" <<'PY'
import json, os, sys
p = sys.argv[1]
try:
    d = json.load(open(p))
except Exception:
    d = {}
env = d.setdefault("env", {})
env.update({
    "ANTHROPIC_BASE_URL": os.environ["CX_BASE"],
    "API_TIMEOUT_MS": env.get("API_TIMEOUT_MS", "600000"),
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-5-5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-5-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-5-5",
    "ANTHROPIC_MODEL": env.get("ANTHROPIC_MODEL", "claude-opus-5-5")
})
if os.environ.get("CX_KEY"):
    env["ANTHROPIC_API_KEY"] = env["ANTHROPIC_AUTH_TOKEN"] = os.environ["CX_KEY"]

fd = os.open(p + ".tmp", os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
with os.fdopen(fd, "w", encoding="utf-8") as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
os.replace(p + ".tmp", p)
os.chmod(p, 0o600)
PY
}

merge_mcp(){
  local py_bin="$1" srv_py="$2" cl_bin="$3" ext_path="$4"
  CX_PY="$py_bin" CX_SRV="$srv_py" CX_CLAUDE="$cl_bin" CX_PATH="$ext_path" python3 - "$MCP_JSON" <<'PY'
import json, os, sys, shutil, time
p = sys.argv[1]
d = {}
if os.path.exists(p):
    try:
        d = json.load(open(p))
    except Exception:
        sys.exit(3)
    shutil.copy2(p, f"{p}.bak-claude-centrix-{int(time.time())}")
d.setdefault("mcpServers", {})["claude-centrix"] = {
    "command": os.environ["CX_PY"],
    "args": [os.environ["CX_SRV"]],
    "env": {
        "CLAUDE_CENTRIX_BIN": os.environ["CX_CLAUDE"],
        "PATH": os.environ["CX_PATH"] + ":/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
    }
}
tmp = p + ".tmp"
json.dump(d, open(tmp, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
os.replace(tmp, p)
PY
}

remove_mcp(){
  [ -f "$MCP_JSON" ] && python3 - "$MCP_JSON" <<'PY'
import json, os, sys
p = sys.argv[1]
try:
    d = json.load(open(p))
except Exception:
    sys.exit(0)
if d.get("mcpServers", {}).pop("claude-centrix", None) is not None:
    tmp = p + ".tmp"
    json.dump(d, open(tmp, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    os.replace(tmp, p)
PY
}

command -v python3 >/dev/null 2>&1 || die "Máy chưa có python3. Cài Python 3.10+ rồi chạy lại."

# ── Chế độ gỡ cài đặt ──
if [ "$MODE" = "uninstall" ]; then
  remove_mcp
  rm -rf "$PLUGIN_DIR" "$SKILL_DIR"
  [ "$PURGE" = 1 ] && rm -f "$CFG_DIR/settings.json"
  ok "Đã gỡ bỏ claude-centrix. $( [ "$PURGE" = 1 ] && echo 'Đã xóa key.' || echo 'Key vẫn còn trong ~/.claude_centrix (dùng --purge để xóa sạch).')"
  exit 0
fi

# ── Chế độ đặt lại key ──
if [ "$MODE" = "key" ]; then
  [ "$HAVE_TTY" = 1 ] || die "Hãy chạy lệnh này trực tiếp trong Terminal (cần ô nhập ẩn)."
  ask_key || die "Không nhập được key hợp lệ."
  write_settings
  ok "Đã lưu key thành công (quyền 600). Hãy quay lại Antigravity và gõ: CLAUDE: xin chào"
  exit 0
fi

echo -e "${G}BẮT ĐẦU CÀI ĐẶT: CLAUDE × CetriX (claude-centrix)${N}"

# 1. Kiểm tra hệ điều hành & môi trường
case "$(uname -s)" in
  Darwin|Linux) ;;
  *) die "Hiện chỉ hỗ trợ macOS và Linux.";;
esac

command -v curl >/dev/null 2>&1 || die "Máy chưa có curl. Cài curl rồi chạy lại."
[ -d "$HOME/.gemini" ] || die "Chưa thấy thư mục Antigravity (~/.gemini). Vui lòng mở Antigravity một lần rồi chạy lại."

PY_BIN="$(find_py310)" || die "Cần Python 3.10 trở lên (macOS: brew install python@3.12; Ubuntu: sudo apt install python3 python3-venv)."
info "[1/6] Môi trường Python OK: $PY_BIN"

# 2. Kiểm tra Claude Code CLI
if ! CLAUDE_BIN="$(find_claude)"; then
  warn "Chưa tìm thấy Claude Code CLI trên máy."
  DO=1
  [ "$YES" = 0 ] && {
    read -r -p "Bạn có muốn tự động cài Claude Code CLI ngay không? [Y/n] " a </dev/tty
    case "${a:-Y}" in n|N) DO=0;; esac
  }
  if [ "$DO" = 1 ]; then
    info "Đang cài đặt Claude Code CLI..."
    curl -fsSL https://claude.ai/install.sh | bash || {
      command -v npm >/dev/null 2>&1 && npm install -g @anthropic-ai/claude-code
    }
  fi
  CLAUDE_BIN="$(find_claude)" || die "Chưa cài được Claude Code CLI. Vui lòng xem hướng dẫn tại trang tài liệu rồi chạy lại."
fi
info "[2/6] Claude Code CLI: $CLAUDE_BIN"

# 3. Tải và xác minh plugin
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

info "[3/6] Đang tải các tệp thành phần plugin..."
fetch "claude-centrix/MANIFEST.sha256" "$STAGE/MANIFEST" || die "Không tải được danh sách tệp MANIFEST (kiểm tra kết nối mạng)."

while read -r hash name; do
  [ -n "$name" ] || continue
  fetch "claude-centrix/$name" "$STAGE/$name" || die "Không tải được tệp $name."
  if [ -n "$hash" ] && [ "$hash" != "SKIP" ]; then
    [ "$(sha256_of "$STAGE/$name")" = "$hash" ] || die "Tệp $name sai checksum (tải lỗi hoặc mirror không khớp)."
  fi
done < "$STAGE/MANIFEST"

head -1 "$STAGE/SKILL.md" | grep -q '^---' || die "SKILL.md tải về không hợp lệ."

mkdir -p "$PLUGIN_DIR" "$SKILL_DIR" || die "Không tạo được thư mục plugin."
for f in claude_centrix_mcp.py plugin.json install-claude.sh set-key.sh; do
  [ -f "$STAGE/$f" ] && cp "$STAGE/$f" "$PLUGIN_DIR/$f"
done
chmod +x "$PLUGIN_DIR/set-key.sh" "$PLUGIN_DIR/install-claude.sh" 2>/dev/null || true
cp "$STAGE/SKILL.md" "$SKILL_DIR/SKILL.md"
echo "1.0.0" > "$PLUGIN_DIR/VERSION"
info "[3/6] Tải và giải nén plugin thành công"

# 4. Tạo Virtual Environment và cài đặt FastMCP
VENV="$PLUGIN_DIR/.venv"
if ! "$VENV/bin/python" -c 'import fastmcp' 2>/dev/null; then
  info "[4/6] Khởi tạo môi trường ảo Python và cài đặt FastMCP..."
  "$PY_BIN" -m venv "$VENV" || die "Không tạo được venv (Linux: sudo apt install python3-venv)."
  "$VENV/bin/python" -m pip install -q --upgrade pip >/dev/null 2>&1
  "$VENV/bin/python" -m pip install -q "$FASTMCP_SPEC" || die "Không cài được fastmcp. Kiểm tra mạng rồi chạy lại."
else
  info "[4/6] Môi trường fastmcp đã sẵn sàng"
fi

# 5. Thiết lập API Key CetriX
KEY="${CETRIX_API_KEY:-}"
EXISTING="$(read_existing_key)"
if [ "$RESET_KEY" = 0 ] && [ -z "$KEY" ] && valid_key "$EXISTING"; then
  KEY="$EXISTING"
  info "Phát hiện key đã lưu trước đó, tiếp tục sử dụng."
fi

if [ -n "$KEY" ] && ! valid_key "$KEY"; then
  die "CETRIX_API_KEY sai định dạng (phải bắt đầu bằng sk-)."
fi

if [ -z "$KEY" ] && [ "$HAVE_TTY" = 1 ]; then
  info "👉 Hướng dẫn lấy key:"
  info "   1. Mở trình duyệt đăng nhập vào: https://cetrix.app"
  info "   2. Vào Settings (Cài đặt) -> API Keys (hoặc link https://cetrix.app/chat/hub/keys)"
  info "   3. Bấm nút Reveal cạnh 'cetrix-agent-default' để copy key (bắt đầu bằng sk-...)"
  echo
  ask_key || warn "Bỏ qua nhập key; bạn có thể chạy sau bằng lệnh: bash $PLUGIN_DIR/set-key.sh"
fi

write_settings
HAS_KEY=0
[ -n "$KEY" ] && HAS_KEY=1
info "[5/6] Đã cấu hình ~/.claude_centrix/settings.json"

# 6. Đăng ký MCP Server vào Antigravity
EXTRA_PATH="$(dirname "$CLAUDE_BIN")"
command -v node >/dev/null 2>&1 && EXTRA_PATH="$EXTRA_PATH:$(dirname "$(command -v node)")"
merge_mcp "$VENV/bin/python" "$PLUGIN_DIR/claude_centrix_mcp.py" "$CLAUDE_BIN" "$EXTRA_PATH"
[ $? -eq 3 ] && die "$MCP_JSON không phải JSON hợp lệ. Vui lòng kiểm tra lại file đó."
info "[6/6] Đã đăng ký MCP server claude-centrix vào Antigravity"

# Kiểm tra thử (Smoke test)
if [ "$SMOKE" = 1 ] && [ "$HAS_KEY" = 1 ]; then
  "$VENV/bin/python" -c 'import sys, json; sys.path.insert(0, sys.argv[1]); import claude_centrix_mcp as m; r=m.doctor_check(False); print("Doctor check:", json.dumps(r)); sys.exit(0 if r["ok"] else 1)' "$PLUGIN_DIR" \
    && ok "Kiểm tra kết nối CetriX: HOÀN HẢO" || warn "Chưa xác minh được endpoint CetriX (có thể do mạng hoặc key)."
fi

echo
if [ "$HAS_KEY" = 1 ]; then
  ok "CÀI ĐẶT THÀNH CÔNG! ($PLUGIN_DIR)"
  echo -e "${C}Hãy khởi động lại Antigravity, sau đó mở khung chat và gõ:${N}"
  echo -e "   ${G}CLAUDE: xin chào, hãy giới thiệu ngắn về bạn${N}"
else
  warn "CÀI ĐẶT XONG NHƯNG CHƯA CÓ API KEY!"
  echo -e "${C}1. Đăng nhập https://cetrix.app/chat/hub/keys để sao chép API Key.${N}"
  echo -e "${C}2. Mở Terminal và dán lệnh sau để nhập key:${N}"
  echo -e "   ${G}bash $PLUGIN_DIR/set-key.sh${N}"
fi
