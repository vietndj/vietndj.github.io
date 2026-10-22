#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
so_do_motion_cli.py — CLI ĐIỀU PHỐI KỸ NĂNG SƠ ĐỒ MOTION 60FPS (SO-DO-MOTION)
=============================================================================
Hỗ trợ 3 lệnh con chính:
1. doctor       : Kiểm tra môi trường (Python, FFmpeg, Rubberband, Font, API Key, Hồ sơ giọng).
2. enroll-voice : Trích mẫu giọng sạch 14s từ video/audio của người dùng, đo tần số cơ bản F0
                  và lưu vào ~/.so-do-motion/voice_profile.json để dùng cho chế độ "giọng của tôi".
3. render       : Kết xuất Video Sơ Đồ Motion 60fps + Phụ đề 5B + 4 lớp SFX + Lồng tiếng Khóa Vi Nhịp:
                  - --voice gemini (mặc định khi gọi bình thường): Giọng tạo từ Gemini TTS Studio.
                  - --voice mine   (khi thêm cụm "giọng của tôi"): Lấy giọng qua AI Studio + Real-Voice F0 Transfer.
                  - --voice none   : Chỉ xuất đồ họa 60fps + Phụ đề 5B + 4 lớp SFX (không lời).
"""

import os
import sys
import json
import shutil
import argparse
import subprocess
from pathlib import Path

SKILL_DIR = Path(os.path.expanduser("~/.gemini/config/skills/so-do-motion"))
USER_DATA_DIR = Path(os.path.expanduser("~/.so-do-motion"))
CONFIG_ENV_PATH = USER_DATA_DIR / "config.env"
VOICE_PROFILE_PATH = USER_DATA_DIR / "voice_profile.json"
DEFAULT_SPEC_PATH = SKILL_DIR / "templates" / "spec.example.json"


def load_env_config() -> dict:
    cfg = {}
    if CONFIG_ENV_PATH.exists():
        for line in CONFIG_ENV_PATH.read_text(encoding="utf-8", errors="ignore").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            cfg[k.strip()] = v.strip().strip('"').strip("'")
    return cfg


def resolve_gemini_api_key() -> str:
    if os.environ.get("GEMINI_API_KEY"):
        return os.environ["GEMINI_API_KEY"].strip()
    cfg = load_env_config()
    if cfg.get("GEMINI_API_KEY"):
        return cfg["GEMINI_API_KEY"]
    row0 = Path("/tmp/.gemini_key_row0")
    if row0.exists():
        return row0.read_text(encoding="utf-8").strip()
    return ""


def cmd_doctor(_args):
    USER_DATA_DIR.mkdir(parents=True, exist_ok=True)
    checks = []

    ffmpeg_path = shutil.which("ffmpeg")
    checks.append(("FFmpeg (Render Video & Mastering EQ)", bool(ffmpeg_path), ffmpeg_path or "Chưa cài (brew install ffmpeg)"))

    rb_path = shutil.which("rubberband")
    if not rb_path and ffmpeg_path:
        res_rb = subprocess.run([ffmpeg_path, "-hide_banner", "-filters"], capture_output=True, text=True)
        if "rubberband" in (res_rb.stdout or ""):
            rb_path = "Tích hợp sẵn trong FFmpeg (librubberband filter)"
    checks.append(("Rubberband (Formant-Preserving Voice Transfer)", bool(rb_path), rb_path or "Tùy chọn (brew install rubberband)"))

    api_key = resolve_gemini_api_key()
    masked_key = (api_key[:8] + "..." + api_key[-4:]) if len(api_key) > 12 else ("Đã cấu hình" if api_key else "Chưa cấu hình (sẽ dùng Studio Warm Fallback)")
    checks.append(("Google AI Studio / Gemini API Key", bool(api_key), masked_key))

    has_profile = VOICE_PROFILE_PATH.exists()
    profile_info = "Chưa đăng ký (chạy lệnh enroll-voice khi dùng 'giọng của tôi')"
    if has_profile:
        try:
            pdata = json.loads(VOICE_PROFILE_PATH.read_text(encoding="utf-8"))
            profile_info = f"F0={pdata.get('median_f0_hz', 165.5)}Hz | VoiceID={pdata.get('designed_voice_id', 'auto')} | Mẫu: {pdata.get('ref_wav', '')}"
        except Exception:
            profile_info = str(VOICE_PROFILE_PATH)
    checks.append(("Hồ sơ 'Giọng của tôi' (voice_profile.json)", has_profile, profile_info))

    print("╔════════════════════════════════════════════════════════════════════════╗")
    print("║        CHẨN ĐOÁN MÔI TRƯỜNG KỸ NĂNG SƠ ĐỒ MOTION 60FPS (DOCTOR)        ║")
    print("╚════════════════════════════════════════════════════════════════════════╝")
    for name, ok, detail in checks:
        icon = "✅" if ok else "⚠️"
        print(f"  {icon} {name:<46}: {detail}")
    print("──────────────────────────────────────────────────────────────────────────")
    print("💡 Cách gọi nhanh trong Antigravity:")
    print("   • Mặc định (Giọng Gemini TTS): 'Tạo sơ đồ motion 60fps về [chủ đề]'")
    print("   • Giọng cá nhân (AI Studio)  : 'Tạo sơ đồ motion 60fps về [chủ đề] bằng giọng của tôi'")


def measure_pitch_f0(wav_path: str) -> float:
    try:
        import numpy as np
        import wave
        with wave.open(wav_path, "rb") as wf:
            sr = wf.getframerate()
            raw = wf.readframes(wf.getnframes())
            y = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
        frame_len = int(sr * 0.04)
        hop = int(sr * 0.01)
        f0s = []
        min_lag = int(sr / 260.0)
        max_lag = int(sr / 75.0)
        for i in range(0, len(y) - frame_len, hop):
            seg = y[i:i + frame_len]
            if np.sqrt(np.mean(seg ** 2)) < 0.025:
                continue
            seg = seg - np.mean(seg)
            corr = np.correlate(seg, seg, mode="full")[frame_len - 1:]
            if max_lag < len(corr):
                sub = corr[min_lag:max_lag]
                if len(sub) > 0:
                    lag = min_lag + int(np.argmax(sub))
                    if corr[lag] > 0.35 * corr[0]:
                        f0s.append(sr / float(lag))
        if f0s:
            return round(float(np.median(f0s)), 1)
    except Exception:
        pass
    return 165.5


def cmd_enroll_voice(args):
    USER_DATA_DIR.mkdir(parents=True, exist_ok=True)
    src = Path(args.input).expanduser().resolve()
    if not src.exists():
        print(f"❌ Không tìm thấy file video/audio mẫu: {src}")
        sys.exit(1)

    ref_wav = USER_DATA_DIR / "my_voice_ref_14s.wav"
    cmd = [
        "ffmpeg", "-y",
        "-ss", str(args.start),
        "-t", str(args.duration),
        "-i", str(src),
        "-vn", "-ac", "1", "-ar", "24000", "-c:a", "pcm_s16le",
        str(ref_wav)
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    f0_hz = measure_pitch_f0(str(ref_wav))

    designed_voice_id = ""
    vid_file = Path("/tmp/leo03_designed_voice_id.txt")
    if vid_file.exists():
        designed_voice_id = vid_file.read_text(encoding="utf-8").strip()

    profile = {
        "source_file": str(src),
        "ref_wav": str(ref_wav),
        "median_f0_hz": f0_hz,
        "designed_voice_id": designed_voice_id or "auto_ai_studio_clone",
        "tts_model": "gemini-3.8-flash-tts",
    }
    VOICE_PROFILE_PATH.write_text(json.dumps(profile, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✅ Đã đăng ký Hồ sơ 'Giọng của tôi' thành công tại: {VOICE_PROFILE_PATH}")
    print(f"   • Mẫu âm thanh chuẩn (14s): {ref_wav}")
    print(f"   • Tần số cơ bản trung vị (Median F0): {f0_hz} Hz")
    if designed_voice_id:
        print(f"   • Mã giọng Google AI Studio (gemini-3.8-flash-tts): {designed_voice_id}")


def cmd_render(args):
    USER_DATA_DIR.mkdir(parents=True, exist_ok=True)
    if args.voice == "mine":
        if args.ref_video:
            enroll_ns = argparse.Namespace(input=args.ref_video, start=2.0, duration=14.0)
            cmd_enroll_voice(enroll_ns)
        elif not VOICE_PROFILE_PATH.exists():
            default_viet_video = Path("/Users/vietmac/Documents/CODE/AI VIDEO EDIT/viet_8h_sang_130_clean50s.mp4")
            if default_viet_video.exists():
                enroll_ns = argparse.Namespace(input=str(default_viet_video), start=2.0, duration=14.0)
                cmd_enroll_voice(enroll_ns)
            else:
                print("⚠️ Chưa có hồ sơ giọng cá nhân (~/.so-do-motion/voice_profile.json).")
                print("   Hãy truyền thêm --ref-video /đường/dẫn/video_của_bạn.mp4 hoặc chạy lệnh enroll-voice trước.")
                sys.exit(1)

    build_script = SKILL_DIR / "scripts" / "build_diagram_motion_60fps.py"
    voice_script = SKILL_DIR / "scripts" / "self_learning_voice_loop.py"
    verify_script = SKILL_DIR / "scripts" / "verifier_4gates.py"

    print("==========================================================================")
    print(f"🎬 BẮT ĐẦU RENDER SƠ ĐỒ MOTION 60FPS | CHẾ ĐỘ GIỌNG: {args.voice.upper()}")
    print("==========================================================================")

    # Bước 1: Render Video Đồ Họa 60fps + Phụ đề 5B + 4 lớp SFX
    subprocess.run([sys.executable, str(build_script)], check=True)

    if args.voice == "none":
        nospeech = Path("/Users/vietmac/Documents/CODE/AI VIDEO EDIT/ai_edit_diagram_motion_60fps_nospeech.mp4")
        if args.output and nospeech.exists():
            shutil.copy2(nospeech, args.output)
        print(f"✅ Hoàn tất xuất Video Sơ Đồ Motion 60fps (Không lời): {args.output or nospeech}")
        return

    # Bước 2: Chạy Vòng Lặp Tự Học Lồng Tiếng Khóa 10 Vi Nhịp (4 Cổng Verifier)
    env = os.environ.copy()
    api_key = resolve_gemini_api_key()
    if api_key:
        env["GEMINI_API_KEY"] = api_key
    env["SO_DO_MOTION_VOICE_MODE"] = args.voice
    if VOICE_PROFILE_PATH.exists():
        env["SO_DO_MOTION_VOICE_PROFILE"] = str(VOICE_PROFILE_PATH)

    subprocess.run([sys.executable, str(voice_script)], env=env, check=True)
    subprocess.run([sys.executable, str(verify_script)], check=True)

    final_mp4 = Path("/Users/vietmac/Documents/CODE/AI VIDEO EDIT/ai_edit_diagram_motion_60fps_with_voice.mp4")
    if args.output and final_mp4.exists() and Path(args.output).resolve() != final_mp4.resolve():
        shutil.copy2(final_mp4, args.output)
        print(f"✅ Đã xuất thành phẩm tới: {args.output}")


def main():
    parser = argparse.ArgumentParser(description="CLI Kỹ năng Sơ Đồ Motion 60fps (so-do-motion)")
    sub = parser.add_subparsers(dest="subcmd")

    p_doc = sub.add_parser("doctor", help="Kiểm tra môi trường & cấu hình skill")
    p_doc.set_defaults(func=cmd_doctor)

    p_enr = sub.add_parser("enroll-voice", help="Đăng ký mẫu giọng cá nhân từ video/audio")
    p_enr.add_argument("--input", "-i", required=True, help="Đường dẫn file video (.mp4/.mov) hoặc audio (.wav/.mp3)")
    p_enr.add_argument("--start", type=float, default=2.0, help="Mốc bắt đầu trích mẫu (giây)")
    p_enr.add_argument("--duration", type=float, default=14.0, help="Thời lượng mẫu giọng (giây)")
    p_enr.set_defaults(func=cmd_enroll_voice)

    p_ren = sub.add_parser("render", help="Kết xuất Video Sơ Đồ Motion 60fps + Lồng tiếng Khóa Vi Nhịp")
    p_ren.add_argument("--spec", default=str(DEFAULT_SPEC_PATH), help="Đường dẫn file JSON kịch bản 10 vi nhịp")
    p_ren.add_argument("--voice", choices=["gemini", "mine", "none"], default="gemini",
                       help="gemini = Giọng Gemini TTS (mặc định); mine = Giọng của tôi qua AI Studio; none = Không lời")
    p_ren.add_argument("--ref-video", default=None, help="Đường dẫn video mẫu nếu dùng --voice mine lần đầu")
    p_ren.add_argument("--output", "-o", default=None, help="Đường dẫn file .mp4 xuất ra")
    p_ren.set_defaults(func=cmd_render)

    args = parser.parse_args()
    if not getattr(args, "subcmd", None):
        cmd_doctor(args)
    else:
        args.func(args)


if __name__ == "__main__":
    main()
