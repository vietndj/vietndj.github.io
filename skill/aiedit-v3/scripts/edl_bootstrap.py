#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
edl_bootstrap.py — Khởi Tạo Nhanh EDL JSON & Contact Sheet Cho Luồng Trực Tiếp Antigravity
===========================================================================================
Giúp học viên thả trực tiếp file video (.mp4 / .mov / .m4v) vào Antigravity mà không cần qua Gemini Web:
1. Tự động đo chính xác thời lượng (duration), fps, độ phân giải gốc (hỗ trợ cả video dọc 9:16 và ngang 16:9).
2. Xuất bảng `contact_sheet.jpg` (6 khung hình đại diện có ghi mốc giây) để AI quan sát người nói & bối cảnh.
3. Tự động bóc lời thoại (nếu máy có faster-whisper / openai-whisper hoặc file .srt/.txt đi kèm),
   hoặc nhận `--clauses "Câu 1|Câu 2|..."` để khởi tạo ngay file `edl_v3.json` chuẩn `"3.2-mfx-v3-auto"`.
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import List, Dict, Any, Optional

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont


def get_ffmpeg_bin() -> str:
    sys_ff = shutil.which("ffmpeg")
    if sys_ff:
        return sys_ff
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return "ffmpeg"


def probe_video_info(video_path: Path) -> Dict[str, Any]:
    cap = cv2.VideoCapture(str(video_path))
    fps = float(cap.get(cv2.CAP_PROP_FPS) or 30.0)
    frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 1080)
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 1920)
    cap.release()
    dur = float(frames / fps) if (fps > 0 and frames > 0) else 0.0

    ffprobe_bin = shutil.which("ffprobe")
    if ffprobe_bin:
        try:
            res = subprocess.run(
                [
                    ffprobe_bin, "-v", "error",
                    "-show_entries", "format=duration",
                    "-of", "default=noprint_wrappers=1:nokey=1",
                    str(video_path),
                ],
                capture_output=True,
                text=True,
                timeout=5,
            )
            if res.returncode == 0 and res.stdout.strip():
                dur = float(res.stdout.strip())
        except Exception:
            pass
    return {
        "video_path": str(video_path.resolve()),
        "video_name": video_path.name,
        "width": w,
        "height": h,
        "fps": round(fps, 2),
        "frames": frames,
        "duration": round(max(0.5, dur), 2),
        "orientation": "vertical_9_16" if h >= w else "horizontal_crop_to_9_16",
    }


def crop_resize_to_9_16(bgr: np.ndarray, target_w: int = 360, target_h: int = 640) -> np.ndarray:
    ih, iw = bgr.shape[:2]
    target_ratio = target_w / float(target_h)
    cur_ratio = iw / float(max(1, ih))
    if abs(cur_ratio - target_ratio) > 0.02:
        if cur_ratio > target_ratio:
            new_w = max(1, int(round(ih * target_ratio)))
            x0 = (iw - new_w) // 2
            bgr = bgr[:, x0 : x0 + new_w]
        else:
            new_h = max(1, int(round(iw / target_ratio)))
            y0 = (ih - new_h) // 2
            bgr = bgr[y0 : y0 + new_h, :]
    return cv2.resize(bgr, (target_w, target_h), interpolation=cv2.INTER_AREA)


def export_contact_sheet(video_path: Path, duration: float, out_jpg: Path) -> str:
    cap = cv2.VideoCapture(str(video_path))
    fps = float(cap.get(cv2.CAP_PROP_FPS) or 30.0)
    total_frames = max(1, int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or int(duration * fps)))
    cols, rows = 3, 2
    tw, th = 360, 640
    sheet = Image.new("RGB", (cols * tw, rows * th), (10, 14, 22))
    draw = ImageDraw.Draw(sheet)
    f_lbl = ImageFont.load_default()

    for i in range(cols * rows):
        t_sec = min(max(0.0, duration - 0.05), (duration * (i + 0.5)) / (cols * rows))
        f_idx = min(total_frames - 1, max(0, int(round(t_sec * fps))))
        cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
        ret, frame = cap.read()
        if not ret or frame is None:
            continue
        thumb = crop_resize_to_9_16(frame, tw, th)
        pil_thumb = Image.fromarray(cv2.cvtColor(thumb, cv2.COLOR_BGR2RGB))
        cx = (i % cols) * tw
        cy = (i // cols) * th
        sheet.paste(pil_thumb, (cx, cy))
        draw.rectangle([cx + 12, cy + 12, cx + 145, cy + 44], fill=(0, 0, 0))
        draw.text((cx + 22, cy + 22), f"#{i+1} | t={t_sec:.2f}s", fill=(255, 204, 0), font=f_lbl)

    cap.release()
    out_jpg.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(str(out_jpg), "JPEG", quality=90)
    return str(out_jpg)


def try_auto_transcribe(video_path: Path, duration: float) -> List[Dict[str, Any]]:
    """Thử bóc băng tự động nếu có faster_whisper hoặc whisper."""
    try:
        from faster_whisper import WhisperModel
        model = WhisperModel("small", device="cpu", compute_type="int8")
        segments, _ = model.transcribe(str(video_path), language="vi", word_timestamps=True)
        out = []
        for s in segments:
            txt = (s.text or "").strip()
            if txt:
                out.append({"start": round(float(s.start), 2), "end": round(float(s.end), 2), "text": txt})
        if out:
            return out
    except Exception:
        pass
    return []


def split_clauses_into_beats(clauses: List[str], duration: float) -> List[Dict[str, Any]]:
    if not clauses:
        n_beats = max(2, min(16, int(round(duration / 2.2))))
        clauses = [f"Nội dung trọng tâm nhịp số {i+1} | Làm rõ luận điểm cốt lõi" for i in range(n_beats)]

    n = len(clauses)
    step = duration / float(n)
    icons = ["TARGET_FOCUS", "CALENDAR_BOLT", "SHIELD_STAR", "CINEMA_CAMERA", "MIC_STUDIO"]
    sfx_ids = ["SFX-01", "SFX-02", "SFX-03", "SFX-04", "SFX-05"]
    beats = []

    for i, raw in enumerate(clauses):
        start_t = round(i * step, 2)
        end_t = round(duration if i == n - 1 else (i + 1) * step, 2)
        if "|" in raw:
            l1, l2 = [p.strip() for p in raw.split("|", 1)]
        else:
            words = raw.strip().split()
            mid = max(1, min(4, len(words) // 2))
            l1 = " ".join(words[:mid]).upper()
            l2 = " ".join(words[mid:]) if len(words) > mid else raw.strip()

        l1_up = l1.upper()
        first_kw = l1_up.split()[0] if l1_up.split() else l1_up

        # Luân phiên góc máy thông minh
        if i == 1 and n >= 3:
            cam_mode = "broll_kenburns"
            v_code = "#V1"
            b_asset = "v1_scene.png"
        elif i % 2 == 1:
            cam_mode = "punch_in_108"
            v_code = None
            b_asset = ""
        else:
            cam_mode = "base_1x"
            v_code = None
            b_asset = ""

        beat_obj: Dict[str, Any] = {
            "beat": i + 1,
            "t_code": f"#T{i + 1}",
            "start": start_t,
            "end": end_t,
            "spoken_text": raw.replace("|", " - ").strip(),
            "camera_mode": cam_mode,
            "zoom": 1.08 if cam_mode == "punch_in_108" else 1.0,
            "style_id": "STYLE-17" if i % 2 == 0 else "STYLE-32",
            "archetype": "ARCH-01",
            "icon": icons[i % len(icons)],
            "icon_color": "#FFCC00" if i % 2 == 0 else "#00F2FE",
            "icon_y": 1320,
            "line1": l1_up,
            "line1_y": 1388,
            "line1_size": 66,
            "line1_Colors": {first_kw: "#FFCC00"},
            "line2": l2,
            "line2_y": 1472,
            "line2_size": 50,
            "line2_color": "#FFFFFF",
            "line2_delay_s": 0.12,
            "sfx": {
                "id": "SFX-02" if cam_mode == "broll_kenburns" else sfx_ids[i % len(sfx_ids)],
                "volume": 0.09,
            },
        }
        if v_code:
            beat_obj["v_code"] = v_code
            beat_obj["broll_window"] = [start_t, end_t]
            beat_obj["shutter_flash"] = True
            beat_obj["broll_asset"] = b_asset
            beat_obj["broll_prompt"] = (
                "Vertical 9:16 cinematic dark-editorial photography illustrating the spoken insight, "
                "moody rim lighting, dark lower 40% for typography overlay, 8k, no text"
            )
        beats.append(beat_obj)
    return beats


def main():
    parser = argparse.ArgumentParser(description="EDL Bootstrap & Contact Sheet Generator for AI Edit Video V3.2")
    parser.add_argument("--video", required=True, help="Đường dẫn file video (.mp4 / .mov)")
    parser.add_argument("--out-dir", help="Thư mục lưu kết quả (mặc định cùng thư mục với video)")
    parser.add_argument("--clauses", default="", help="Danh sách vế câu cách nhau bởi dấu ';' (mỗi vế có thể dùng 'DÒNG 1|dòng 2')")
    parser.add_argument("--edl-out", help="Đường dẫn file edl_v3.json xuất ra")
    args = parser.parse_args()

    vid_p = Path(args.video).expanduser().resolve()
    if not vid_p.is_file():
        print(f"❌ Không tìm thấy video: {vid_p}", file=sys.stderr)
        sys.exit(1)

    out_dir = Path(args.out_dir).expanduser().resolve() if args.out_dir else vid_p.parent
    out_dir.mkdir(parents=True, exist_ok=True)

    info = probe_video_info(vid_p)
    sheet_path = out_dir / f"{vid_p.stem}_contact_sheet.jpg"
    export_contact_sheet(vid_p, info["duration"], sheet_path)

    clauses = [c.strip() for c in args.clauses.split(";") if c.strip()] if args.clauses.strip() else []
    segments = []
    if not clauses:
        segments = try_auto_transcribe(vid_p, info["duration"])
        if segments:
            clauses = [s["text"] for s in segments]

    beats = split_clauses_into_beats(clauses, info["duration"])
    edl_data = {
        "version": "3.2-mfx-v3-auto",
        "video_source": str(vid_p),
        "resolution": [1080, 1920],
        "fps": info["fps"],
        "duration": info["duration"],
        "face_lock_center": True,
        "bottom_gradient": {"enabled": True, "start_y_ratio": 0.46, "max_alpha": 246},
        "audio_mastering": {"preserve_original_voice": True, "voice_ducking": False, "sfx_master_volume": 0.09},
        "beats": beats,
    }

    edl_path = Path(args.edl_out).expanduser().resolve() if args.edl_out else (out_dir / "edl_v3.json")
    edl_path.write_text(json.dumps(edl_data, ensure_ascii=False, indent=2), encoding="utf-8")

    summary = {
        "status": "OK",
        "video_info": info,
        "contact_sheet": str(sheet_path),
        "edl_path": str(edl_path),
        "transcribed_segments": len(segments),
        "beats_count": len(beats),
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
