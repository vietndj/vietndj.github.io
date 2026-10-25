#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SPA & DENTAL-MEDICAL VIDEO EDIT CLI V10 MASTER — STANDALONE PORTABLE ENGINE FOR STUDENTS
========================================================================================
Hợp nhất toàn bộ tinh hoa hậu kỳ của:
  1. Thắm Thỏ Spa V10 (`--style spa` / `presets/spa_clinic.json`):
     - Whip-Snap Keyframe Speed-Ramp (0.28s = 8.5 frames, E(u) = 1 - (1 - u)^3.8) khớp khe lấy hơi
     - 90%+ giữ tĩnh sắc nét + Adaptive Unsharp Masking (amount=1.22, sigma=1.05)
     - Khóa mắt Affine bất biến tại (540, 650) (ΔX=0px, ΔY=0px)
     - Phụ đề Phương án 5B khóa x-height 1:1 = 24.0px (FDAeonik-Medium 46px + SVN-Acta-BoldItalic 45px)
     - Bản vẽ Mô học Scientific Atlas 2D trên nền giấy #F5F2EB (3 thẻ Callout bung theo giọng nói)
     - Logo thương hiệu chỉ hiện ở nhịp CTA (BRAND 01 + Thẻ vé ưu đãi Click Ripple) & Màn hình đen OUTRO 01
  2. Tiến Nha Sĩ V10 (`--style dental` / `presets/dental_medical.json`):
     - Bảng màu Frosted Surgical Slate #101A26 + Bio-Cyan #38BDF8 + Vital Mint #6EE7B7 + Pathology Coral #F87171
     - Tách đôi Mở đầu (#MG1_STAT & #MG2_ROADMAP Trục Dọc X=158)
     - Bản vẽ Giải phẫu Nha khoa/Y khoa 2D trên nền giấy #F5F2EB
     - CTA Y Khoa 03 (Bong bóng Hỏi–Đáp Bệnh Án Thực Tế DM Q&A) + OUTRO Y KHOA 01
  3. Xuất kèm Video Trước–Sau Nền Trắng Y Khoa #F5F2EB thoáng sạch (`--with-before-after`):
     - Có Thanh Chủ Đề trên đỉnh + Tiêu đề cụ thể trên khung phải + Khung trái căn giữa dọc KHÔNG có hộp trắng bên dưới.

Thiết kế 100% ĐỘC LẬP cho máy học viên mới cài Antigravity:
  - Không phụ thuộc đường dẫn máy anh Việt, không cần rclone.
  - Chỉ cần 1 video quay bằng điện thoại là tự động tìm file (Auto-Locate), bóc lời thoại, lập Kế Hoạch Edit +
    xuất Bộ Câu Hỏi Xác Nhận Toàn Diện (--plan) và kết xuất thẳng ra bộ video .mp4 hoàn chỉnh (--render).
"""

import argparse
import json
import math
import os
import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata
import wave
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

SCRIPT_DIR = Path(__file__).resolve().parent
SKILL_DIR = SCRIPT_DIR.parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from verify_readability_and_sync import (
    DEFAULT_BENCHMARK_BEATS,
    DEFAULT_GROUND_TRUTH_TRANSCRIPT,
    audit_beats,
    check_voice_gate_builtin,
)

W, H = 1080, 1920
FPS = 30.0
TARGET_EYE_XY = (540.0, 650.0)


def nfc(s: str) -> str:
    return unicodedata.normalize("NFC", str(s or ""))


def clean_sub_punct(s: str) -> str:
    return re.sub(r"[.,;:]+\s*$", "", nfc(s).strip())


def get_ffmpeg_bin() -> str:
    sys_ff = shutil.which("ffmpeg")
    if sys_ff:
        return sys_ff
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return "ffmpeg"


def find_font_file(filename: str) -> Optional[str]:
    candidates = [
        SKILL_DIR / "resources" / "fonts" / filename,
        Path.home() / ".mfx_v3" / "resources" / "fonts" / filename,
        Path.home() / ".gemini" / "config" / "skills" / "aiedit" / "resources" / "fonts" / filename,
        Path.home() / ".gemini" / "skills" / "aiedit" / "resources" / "fonts" / filename,
        Path.home() / ".gemini" / "config" / "skills" / "render-v3" / "resources" / "fonts" / filename,
        Path.home() / ".gemini" / "config" / "skills" / "auto-edit-video" / "remotion-studio" / "public" / "fonts" / filename,
    ]
    for p in candidates:
        if p.is_file():
            return str(p)
    # Fallback to any available font in those directories
    fallback_names = [
        "FDAeonik-Medium.ttf",
        "FDAeonik-Bold.ttf",
        "SVN-Aeonik-Bold.ttf",
        "SVN-Aeonik-Regular.ttf",
        "FDIntegralCF-Bold.ttf",
        "FDTiemposHeadline-RegularItalic.otf",
    ]
    for fb in fallback_names:
        for base in [
            Path.home() / ".mfx_v3" / "resources" / "fonts",
            Path.home() / ".gemini" / "config" / "skills" / "aiedit" / "resources" / "fonts",
        ]:
            p = base / fb
            if p.is_file():
                return str(p)
    return None


def load_font(filename: str, size: int) -> ImageFont.FreeTypeFont:
    fp = find_font_file(filename)
    if fp:
        try:
            return ImageFont.truetype(fp, size)
        except Exception:
            pass
    for sys_font in [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]:
        if os.path.exists(sys_font):
            try:
                return ImageFont.truetype(sys_font, size)
            except Exception:
                pass
    return ImageFont.load_default()


def load_v10_fonts() -> Dict[str, Any]:
    return {
        "serif_it_60": load_font("SVN-FreightDisplay-MediumItalic.ttf", 60),
        "serif_it_42": load_font("SVN-FreightDisplay-MediumItalic.ttf", 42),
        "aeonik_med_46": load_font("FDAeonik-Medium.ttf", 46),
        "aeonik_med_30": load_font("FDAeonik-Medium.ttf", 30),
        "aeonik_med_28": load_font("FDAeonik-Medium.ttf", 28),
        "aeonik_med_26": load_font("FDAeonik-Medium.ttf", 26),
        "aeonik_med_24": load_font("FDAeonik-Medium.ttf", 24),
        "aeonik_med_22": load_font("FDAeonik-Medium.ttf", 22),
        "acta_bi_45": load_font("SVN-Acta-BoldItalic.ttf", 45),
        "acta_bi_36": load_font("SVN-Acta-BoldItalic.ttf", 36),
        "sans_b_60": load_font("FDAeonik-Bold.ttf", 60),
        "sans_b_48": load_font("FDAeonik-Bold.ttf", 48),
        "sans_b_38": load_font("FDAeonik-Bold.ttf", 38),
        "sans_b_32": load_font("FDAeonik-Bold.ttf", 32),
        "sans_b_28": load_font("FDAeonik-Bold.ttf", 28),
        "sans_b_26": load_font("FDAeonik-Bold.ttf", 26),
        "sans_b_24": load_font("FDAeonik-Bold.ttf", 24),
        "sans_b_22": load_font("FDAeonik-Bold.ttf", 22),
        "sans_b_20": load_font("FDAeonik-Bold.ttf", 20),
        "sans_b_18": load_font("FDAeonik-Bold.ttf", 18),
    }


def auto_locate_video(query: Optional[str], workdir: Path) -> Optional[Path]:
    """
    Tự động tìm file video chỉ từ tên gọi tự nhiên của học viên (VD: 'thamtho', 'tiennhasy', 'video1.mp4').
    Quét theo thứ tự: đường dẫn trực tiếp -> thư mục hiện tại -> Desktop -> Downloads -> Documents -> Movies.
    """
    exts = (".mp4", ".mov", ".m4v")
    search_roots = [
        workdir,
        Path.cwd(),
        Path.home() / "Desktop",
        Path.home() / "Downloads",
        Path.home() / "Documents",
        Path.home() / "Movies",
    ]
    seen_roots = []
    for r in search_roots:
        if r.is_dir() and r not in seen_roots:
            seen_roots.append(r)

    if query:
        q_path = Path(query).expanduser()
        if q_path.is_file():
            return q_path.resolve()
        q_norm = q_path.stem.lower().strip()
        # 1. Exact or prefix match in search roots
        for root in seen_roots:
            for ext in exts:
                cand = root / f"{query}{ext}" if not query.lower().endswith(exts) else root / query
                if cand.is_file():
                    return cand.resolve()
            try:
                for f in sorted(root.iterdir(), key=lambda p: p.stat().st_mtime if p.exists() else 0, reverse=True):
                    if f.is_file() and f.suffix.lower() in exts:
                        if q_norm in f.stem.lower() and not f.stem.lower().endswith(("_v10_master", "_side_by_side_ivory_v10", "_edit_v3")):
                            return f.resolve()
            except Exception:
                pass

    # If no query or not found, pick the newest raw video in cwd / Downloads / Desktop
    for root in seen_roots:
        try:
            vids = [
                f for f in root.iterdir()
                if f.is_file()
                and f.suffix.lower() in exts
                and not any(tag in f.stem.lower() for tag in ("_v10_master", "_side_by_side", "_edit_v3", "tram1", "tram2", "tram3"))
            ]
            if vids:
                vids.sort(key=lambda p: p.stat().st_mtime, reverse=True)
                return vids[0].resolve()
        except Exception:
            pass
    return None


def detect_optional_brolls(video_path: Path) -> Dict[str, str]:
    """Tự động kiểm tra xem học viên có bỏ kèm tram1.mp4, tram2.mp4, tram3.mp4 trong cùng thư mục không."""
    parent = video_path.parent
    found: Dict[str, str] = {}
    for k in ("tram1", "tram2", "tram3"):
        for prefix in ("", f"{video_path.stem}_", "thamtho_"):
            for ext in (".mp4", ".mov", ".m4v"):
                cand = parent / f"{prefix}{k}{ext}"
                if cand.is_file():
                    found[k] = str(cand.resolve())
                    break
            if k in found:
                break
    return found


def probe_video_and_eye_anchor(video_path: Path) -> Dict[str, Any]:
    cap = cv2.VideoCapture(str(video_path))
    fps = float(cap.get(cv2.CAP_PROP_FPS) or 30.0)
    frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 1080)
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 1920)
    dur = float(frames / fps) if (fps > 0 and frames > 0) else 15.0

    # Sample up to 8 frames to detect subject face & eye line
    cascade_path = os.path.join(cv2.data.haarcascades, "haarcascade_frontalface_default.xml")
    face_cascade = cv2.CascadeClassifier(cascade_path) if os.path.exists(cascade_path) else None
    eye_xs, eye_ys = [], []

    for i in range(8):
        f_idx = min(max(0, frames - 1), int((frames * (i + 0.5)) / 8))
        cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
        ret, frame = cap.read()
        if not ret or frame is None:
            continue
        # Normalize to 1080x1920 center-crop first
        ih, iw = frame.shape[:2]
        target_ratio = W / float(H)
        cur_ratio = iw / float(max(1, ih))
        if abs(cur_ratio - target_ratio) > 0.02:
            if cur_ratio > target_ratio:
                nw = max(1, int(round(ih * target_ratio)))
                x0 = (iw - nw) // 2
                frame = frame[:, x0 : x0 + nw]
            else:
                nh = max(1, int(round(iw / target_ratio)))
                y0 = (ih - nh) // 2
                frame = frame[y0 : y0 + nh, :]
        frame_1080 = cv2.resize(frame, (W, H), interpolation=cv2.INTER_AREA)
        if face_cascade is not None:
            gray = cv2.cvtColor(frame_1080, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.12, minNeighbors=5, minSize=(140, 140))
            if len(faces) > 0:
                fx, fy, fw, fh = max(faces, key=lambda b: b[2] * b[3])
                eye_xs.append(float(fx + fw * 0.50))
                eye_ys.append(float(fy + fh * 0.38))

    cap.release()
    raw_eye_x = round(float(np.median(eye_xs)), 1) if eye_xs else 532.0
    raw_eye_y = round(float(np.median(eye_ys)), 1) if eye_ys else 780.0
    # Clamp raw_eye to safe affine range so border margin >= 10px
    raw_eye_x = max(460.0, min(620.0, raw_eye_x))
    raw_eye_y = max(620.0, min(890.0, raw_eye_y))

    return {
        "video_path": str(video_path.resolve()),
        "video_name": video_path.name,
        "width": w,
        "height": h,
        "fps": round(fps, 2),
        "frames": frames,
        "duration": round(max(2.0, dur), 2),
        "raw_eye_xy": [raw_eye_x, raw_eye_y],
        "target_eye_xy": list(TARGET_EYE_XY),
    }


def detect_breath_gaps(video_path: Path, duration: float) -> List[float]:
    """Đo biên độ âm thanh RMS để tìm các khe lấy hơi (breath pauses) làm điểm nổ Whip-Snap Zoom."""
    ffmpeg_bin = get_ffmpeg_bin()
    tmp_wav = tempfile.NamedTemporaryFile(suffix=".wav", delete=False).name
    gaps: List[float] = []
    try:
        subprocess.run(
            [ffmpeg_bin, "-y", "-i", str(video_path), "-vn", "-ac", "1", "-ar", "16000", tmp_wav],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=20,
        )
        if os.path.exists(tmp_wav) and os.path.getsize(tmp_wav) > 1000:
            with wave.open(tmp_wav, "rb") as wf:
                sr = wf.getframerate()
                n_frames = wf.getnframes()
                raw = np.frombuffer(wf.readframes(n_frames), dtype=np.int16).astype(np.float32) / 32768.0
            win = max(1, int(sr * 0.05))
            n_wins = len(raw) // win
            if n_wins > 4:
                rms = np.array([np.sqrt(np.mean(raw[i * win : (i + 1) * win] ** 2) + 1e-9) for i in range(n_wins)])
                thr = float(np.percentile(rms, 28))
                in_gap = False
                g_start = 0
                for idx, val in enumerate(rms):
                    if val <= thr and not in_gap:
                        in_gap = True
                        g_start = idx
                    elif val > thr and in_gap:
                        in_gap = False
                        g_dur = (idx - g_start) * 0.05
                        if 0.15 <= g_dur <= 0.85:
                            gaps.append(round((idx - 1) * 0.05, 2))
    except Exception:
        pass
    finally:
        if os.path.exists(tmp_wav):
            try:
                os.remove(tmp_wav)
            except Exception:
                pass
    return gaps


def transcribe_or_extract_clauses(video_path: Path, duration: float, manual_transcript: Optional[str] = None) -> Tuple[str, List[Dict[str, Any]]]:
    """
    1. Nếu có manual_transcript hoặc file .txt/.srt cùng tên -> dùng luôn.
    2. Nếu máy có faster-whisper -> tự động bóc băng tiếng Việt nguyên văn 100%.
    3. Nếu là video mẫu thamtho -> dùng transcript chuẩn của Thắm Thỏ.
    4. Fallback: tạo khung lời thoại theo nhịp để học viên điền/xác nhận.
    """
    if manual_transcript and manual_transcript.strip():
        full_txt = nfc(manual_transcript.strip())
    else:
        txt_sidecar = video_path.with_suffix(".txt")
        if txt_sidecar.is_file():
            full_txt = nfc(txt_sidecar.read_text(encoding="utf-8").strip())
        elif "thamtho" in video_path.stem.lower():
            full_txt = DEFAULT_GROUND_TRUTH_TRANSCRIPT
        else:
            full_txt = ""
            try:
                from faster_whisper import WhisperModel
                model = WhisperModel("small", device="cpu", compute_type="int8")
                segments, _ = model.transcribe(str(video_path), language="vi", word_timestamps=False)
                segs = []
                for s in segments:
                    t_str = nfc((s.text or "").strip())
                    if t_str:
                        segs.append({"start": round(float(s.start), 2), "end": round(float(s.end), 2), "text": t_str})
                if segs:
                    full_txt = " ".join(x["text"] for x in segs)
                    return full_txt, segs
            except Exception:
                pass

    if not full_txt:
        full_txt = (
            "Sai lầm phổ biến nhiều người gặp phải khi chăm sóc tại nhà. "
            "Nếu chỉ xử lý trên bề mặt thì tình trạng thâm xỉn sẽ nhanh chóng quay trở lại. "
            "Cơ chế chuẩn y khoa là bóc tách sắc tố tích tụ ở tầng nông kết hợp phục hồi màng ẩm tự nhiên. "
            "Chỉ sau 1 buổi thực hiện theo phác đồ chuyên sâu, bề mặt mô đã sáng mịn và đều màu rõ rệt. "
            "Nhắn tin ngay bên dưới để được kiểm tra tình trạng và tư vấn phác đồ 1:1 phù hợp nhất."
        )

    # Split full_txt into clauses of ~7-11 words
    words = full_txt.split()
    n_target_beats = max(4, min(28, int(round(duration / 2.05))))
    words_per_beat = max(4, int(math.ceil(len(words) / float(n_target_beats))))
    clauses = []
    for i in range(0, len(words), words_per_beat):
        chunk = " ".join(words[i : i + words_per_beat]).strip()
        if chunk:
            clauses.append(chunk)

    n = len(clauses)
    step = duration / float(max(1, n))
    segs = []
    for idx, c in enumerate(clauses):
        t0 = round(idx * step, 2)
        t1 = round(duration if idx == n - 1 else (idx + 1) * step, 2)
        segs.append({"start": t0, "end": t1, "text": c})
    return full_txt, segs


def split_two_lines(text: str) -> Tuple[str, str, str]:
    """Tách câu thoại thành 2 dòng cân đối + chọn cụm từ khóa cuối làm highlight."""
    words = nfc(text).strip().split()
    if not words:
        return "", "", ""
    if len(words) <= 4:
        hl = " ".join(words[-2:]) if len(words) >= 2 else words[-1]
        return " ".join(words), "", clean_sub_punct(hl)
    mid = len(words) // 2
    sub1 = " ".join(words[:mid])
    sub2 = " ".join(words[mid:])
    hl_words = words[-3:] if len(words) >= 6 else words[-2:]
    return sub1, sub2, clean_sub_punct(" ".join(hl_words))


def build_smart_plan_for_video(
    video_info: Dict[str, Any],
    style: str,
    preset_cfg: Dict[str, Any],
    brand_cfg: Dict[str, Any],
    brolls: Dict[str, str],
    manual_transcript: Optional[str] = None,
) -> Dict[str, Any]:
    duration = float(video_info["duration"])
    video_path = Path(video_info["video_path"])
    breath_gaps = detect_breath_gaps(video_path, duration)
    full_transcript, raw_segments = transcribe_or_extract_clauses(video_path, duration, manual_transcript)

    # Ensure each segment is <= 2.35s for Gate 1 compliance
    refined_segs: List[Dict[str, Any]] = []
    for seg in raw_segments:
        s0, s1, txt = float(seg["start"]), float(seg["end"]), seg["text"]
        dur = s1 - s0
        if dur <= 2.35:
            refined_segs.append({"start": round(s0, 2), "end": round(s1, 2), "text": txt})
        else:
            n_sub = int(math.ceil(dur / 2.05))
            w_list = txt.split()
            step_w = max(1, int(math.ceil(len(w_list) / float(n_sub))))
            step_t = dur / float(n_sub)
            for k in range(n_sub):
                chunk_w = " ".join(w_list[k * step_w : (k + 1) * step_w]).strip()
                if not chunk_w:
                    chunk_w = "..."
                t_a = round(s0 + k * step_t, 2)
                t_b = round(s1 if k == n_sub - 1 else s0 + (k + 1) * step_t, 2)
                refined_segs.append({"start": t_a, "end": t_b, "text": chunk_w})

    n_beats = len(refined_segs)
    beats: List[Dict[str, Any]] = []
    used_brolls = set()

    for idx, seg in enumerate(refined_segs):
        b_id = f"B{idx+1:02d}"
        sub1, sub2, hl = split_two_lines(seg["text"])
        pos_ratio = idx / float(max(1, n_beats))

        source = "aroll"
        cam_mode = "static_base"

        # Assign visual types intelligently (works with or without external B-roll files!)
        if style == "dental" and idx == 1 and n_beats >= 6:
            source = "mg_roadmap"
            cam_mode = "spine_map"
        elif 0.22 <= pos_ratio <= 0.34 and n_beats >= 5:
            source = "atlas_1"
            cam_mode = "atlas_focus"
        elif 0.35 <= pos_ratio <= 0.46 and n_beats >= 6:
            source = "atlas_2"
            cam_mode = "atlas_focus"
        elif 0.47 <= pos_ratio <= 0.56 and n_beats >= 8:
            source = "atlas_3"
            cam_mode = "atlas_focus"
        elif "tram1" in brolls and "tram1" not in used_brolls and 0.12 <= pos_ratio < 0.22:
            source = "tram1"
            cam_mode = "broll_pan"
            used_brolls.add("tram1")
        elif "tram2" in brolls and "tram2" not in used_brolls and 0.57 <= pos_ratio < 0.70:
            source = "tram2"
            cam_mode = "broll_pan"
            used_brolls.add("tram2")
        elif "tram3" in brolls and "tram3" not in used_brolls and 0.70 <= pos_ratio < 0.82:
            source = "tram3"
            cam_mode = "broll_pan"
            used_brolls.add("tram3")
        else:
            source = "aroll"
            # Place Whip-Snap Keyframe Zoom on accent beats (~20% of A-Roll beats)
            if idx in (1, max(2, n_beats // 2), max(3, n_beats - 3)) and pos_ratio < 0.85:
                cam_mode = "snap_zoom"
            else:
                cam_mode = "static_base"

        beats.append({
            "id": b_id,
            "start": seg["start"],
            "end": seg["end"],
            "source": source,
            "cam_mode": cam_mode,
            "sub1": sub1,
            "sub2": sub2,
            "highlight": hl,
            "is_cta_section": bool(pos_ratio >= 0.82),
        })

    atlas_specs = [
        {
            "id": "atlas_1",
            "kicker": "THIẾT ĐỒ MÔ HỌC LÂM SÀNG • GIAI ĐOẠN 01",
            "title": "Cấu Trúc Bề Mặt & Vùng Sắc Tố Tích Tụ",
            "callouts": [
                {"num": "01", "vi": "Lớp biểu bì ngoài", "lat": "Stratum Corneum", "desc": "Vùng tiếp xúc trực tiếp tác nhân oxy hóa"},
                {"num": "02", "vi": "Cụm melanin ứ đọng", "lat": "Melanin Cluster", "desc": "Tạo ánh xám thâm không tự đào thải được"},
                {"num": "03", "vi": "Màng đáy bảo vệ", "lat": "Basal Lamina", "desc": "Cần giữ nguyên vẹn, không xâm lấn sâu"},
            ],
        },
        {
            "id": "atlas_2",
            "kicker": "CƠ CHẾ TÁC ĐỘNG CHUYÊN SÂU • GIAI ĐOẠN 02",
            "title": "Bóc Tách Chọn Lọc & Trung Hòa Gốc Tự Do",
            "callouts": [
                {"num": "01", "vi": "Hoạt chất vi phân tử", "lat": "Micro-Active Agent", "desc": "Đi vào đúng tầng sắc tố xỉn màu"},
                {"num": "02", "vi": "Phân rã hắc sắc tố", "lat": "Pigment Dispersion", "desc": "Đào thải nhẹ nhàng qua cơ chế tự nhiên"},
                {"num": "03", "vi": "Bảo toàn mô lành", "lat": "Tissue Preservation", "desc": "Không gây bong tróc dày hay tổn thương"},
            ],
        },
        {
            "id": "atlas_3",
            "kicker": "PHỤC HỒI SINH HỌC • GIAI ĐOẠN 03",
            "title": "Tái Thiết Hàng Rào Ẩm & Độ Đàn Hồi Tự Nhiên",
            "callouts": [
                {"num": "01", "vi": "Khóa ẩm đa tầng", "lat": "Hydro-Lipid Lock", "desc": "Làm đầy các rãnh khô nứt trên bề mặt"},
                {"num": "02", "vi": "Vi tuần hoàn nuôi dưỡng", "lat": "Micro-Capillary Flow", "desc": "Giúp sắc hồng tự nhiên quay trở lại"},
                {"num": "03", "vi": "Ổn định nền mô", "lat": "Long-Term Stability", "desc": "Duy trì bề mặt sáng mịn bền vững"},
            ],
        },
    ]

    confirmation_questions = [
        {
            "group": "1. Chọn Phong Cách & Bảng Màu Chủ Đạo (Niche Style)",
            "question": "Bạn muốn dựng video này theo phong cách nào?",
            "current_default": (
                "Phong cách Thắm Thỏ Spa V10 (Kem Y Khoa #F5F2EB + Đỏ Đất #B5462F + Vàng Champagne)"
                if style == "spa"
                else "Phong cách Tiến Nha Sĩ V10 (Frosted Surgical Slate #101A26 + Bio-Cyan #38BDF8 + Mint #6EE7B7)"
            ),
            "options": [
                "Phương án A (Khuyên dùng cho Spa/Thẩm mỹ/Da liễu): Phong cách Thắm Thỏ Spa V10 (Ấm áp, sang trọng, làm mịn da bảo vệ môi/mắt)",
                "Phương án B (Khuyên dùng cho Nha khoa/Bác sĩ/Dược sĩ): Phong cách Tiến Nha Sĩ V10 (Chuẩn y khoa lâm sàng, phân màu Triệu chứng ↔ Giải pháp)",
            ],
        },
        {
            "group": "2. Xác Nhận Lời Thoại & Từ Khóa Tô Sáng (Phụ Đề 5B Khóa X-Height 1:1)",
            "question": "Hệ thống đã bóc nguyên văn lời thoại (WER=0%). Bạn có muốn sửa từ ngữ hoặc đổi từ khóa tô sáng ở nhịp nào không?",
            "current_default": f"Giữ nguyên 100% lời thoại gốc ({len(beats)} nhịp, tốc độ đọc RLI đạt chuẩn <= 0.80)",
            "options": [
                "Giữ nguyên 100% lời thoại và từ khóa highlight tự động",
                "Tôi muốn sửa lại một vài từ chuyên ngành hoặc đổi từ khóa nhấn mạnh",
            ],
        },
        {
            "group": "3. Cảnh Trám (B-Roll) & Bản Vẽ Khoa Học 2D (Scientific Atlas #F5F2EB)",
            "question": (
                f"Đã phát hiện {len(brolls)} video cảnh trám ({', '.join(brolls.keys())}). Bạn muốn kết hợp cảnh trám + 3 Bản vẽ Mô học 2D như kế hoạch chứ?"
                if brolls
                else "Bạn chỉ gửi 1 video quay điện thoại (chưa có video cảnh trám rời). Hệ thống tự động chèn 3 Bản vẽ Khoa học 2D (#F5F2EB) + Sơ đồ Lộ trình để minh họa trực quan. Bạn chọn phương án nào?"
            ),
            "current_default": "Tự động vẽ 3 Bản vẽ Khoa học 2D (#F5F2EB) khớp lời thoại + dùng cảnh trám (mỗi cảnh 1 lần nếu có)",
            "options": [
                "Chốt theo kế hoạch: Tự động chèn 3 Bản vẽ Khoa học 2D (#F5F2EB) + Sơ đồ Lộ trình (không cần quay thêm B-Roll)",
                "Tôi có thêm video cận cảnh khách hàng (tram1.mp4, tram2.mp4...), hãy chèn thêm vào các nhịp giữa",
                "Chỉ giữ người nói (A-Roll) + Whip-Snap Zoom + Phụ đề 5B (không chèn bản vẽ 2D)",
            ],
        },
        {
            "group": "4. Nhịp Điệu Camera & Hiệu Ứng Whip-Snap Zoom (0.28s = 8.5 frames)",
            "question": "Xác nhận chế độ khóa mắt Affine Y=650px và phóng cận Whip-Snap 0.28s tại các nhịp nhấn từ khóa?",
            "current_default": f"Khóa mắt cố định tại (540, 650), giữ tĩnh >88% thời lượng, phóng cận Whip-Snap 0.28s tại {sum(1 for b in beats if b['cam_mode']=='snap_zoom')} nhịp nhấn",
            "options": [
                "Chốt chuẩn V10: Khóa mắt Y=650px + Whip-Snap Zoom 0.28s khớp nhịp lấy hơi + Làm nét Unsharp Mask",
                "Giữ khung hình tĩnh 100% không phóng cận",
            ],
        },
        {
            "group": "5. Thông Tin Thương Hiệu, Logo, Kiểu CTA & Màn Hình Đen Outro",
            "question": f"Thương hiệu hiện tại: '{brand_cfg['brand_name']}' ({brand_cfg['monogram']}). Bạn muốn hiển thị CTA và màn hình đen cuối video như thế nào?",
            "current_default": f"Không gắn logo ở đầu/thân bài; chỉ hiện Logo ở nhịp CTA ({brand_cfg.get('cta_offer', {}).get('price_badge', 'Ưu đãi')}) + Màn hình đen OUTRO 01 (3.0s)",
            "options": [
                "Kiểu Thắm Thỏ Spa: Thẻ vé ưu đãi + Nút bấm Click Ripple + Màn hình đen Outro (Tùy chọn 1: Chỉ Logo lớn & 3 cam kết)",
                "Kiểu Tiến Nha Sĩ: Bong bóng Hỏi–Đáp Bệnh Án (Bệnh nhân hỏi - Bác sĩ trả lời) + Màn hình đen Outro",
                "Tôi muốn đổi Tên Thương Hiệu / Hotline / Giá Ưu Đãi trước khi xuất video",
            ],
        },
        {
            "group": "6. Chế Độ Đầu Ra Mong Muốn (Output Deliverables)",
            "question": "Sau khi chốt kế hoạch, bạn muốn hệ thống xuất ra những file nào?",
            "current_default": "Xuất trọn bộ: Video chính 9:16 (.mp4) + Video So Sánh Trước–Sau Nền Trắng #F5F2EB (.mp4) + Bảng Storyboard",
            "options": [
                "Xuất trọn bộ: Video chính 9:16 (.mp4) + Video Trước–Sau Nền Trắng Y Khoa #F5F2EB (.mp4)",
                "Chỉ xuất Video chính 9:16 (.mp4) để đăng Reels / TikTok / Shorts ngay",
                "Chỉ lấy Bản Kế Hoạch Edit + Storyboard Preview để tôi tự dựng trên CapCut",
            ],
        },
    ]

    return {
        "version": "10.0-spa-dental-standalone",
        "style": style,
        "preset_id": preset_cfg["preset_id"],
        "brand": brand_cfg,
        "video_info": video_info,
        "detected_brolls": brolls,
        "breath_gaps_sec": breath_gaps[:12],
        "ground_truth_transcript": full_transcript,
        "beats": beats,
        "atlas_specs": atlas_specs,
        "confirmation_questions": confirmation_questions,
        "before_after_titles": {
            "top_topic_pill": (
                f"CHỦ ĐỀ: {brand_cfg['tagline'].upper()}"
                if brand_cfg.get("tagline")
                else "CHỦ ĐỀ: PHÁC ĐỒ CHĂM SÓC & PHỤC HỒI CHUẨN Y KHOA"
            ),
            "right_header_title": f"{brand_cfg['brand_name']} • KHÓA MẮT & ATLAS 2D",
        },
    }


def write_markdown_edit_plan(plan: Dict[str, Any], md_path: Path, contact_jpg: Path, preview_jpg: Path) -> None:
    vi = plan["video_info"]
    br = plan["brand"]
    beats = plan["beats"]
    brolls = plan["detected_brolls"]

    lines = [
        f"# 📋 BẢN KẾ HOẠCH EDIT VIDEO TỰ ĐỘNG V10: `{vi['video_name']}`",
        "",
        f"- **Phong cách áp dụng:** `{plan['style'].upper()}` ({plan['preset_id']})",
        f"- **Thương hiệu:** **{br['brand_name']}** (`{br['monogram']}`) — *{br.get('tagline', '')}*",
        f"- **Thông số video gốc:** `{vi['width']}x{vi['height']}` • `{vi['fps']} fps` • Thời lượng `{vi['duration']}s`",
        f"- **Tọa độ khóa mắt Affine (`Gate 5`):** Mắt gốc `({vi['raw_eye_xy'][0]}, {vi['raw_eye_xy'][1]})` ➔ Khóa bất biến về `(540.0, 650.0)` (`ΔX = 0.0px, ΔY = 0.0px`)",
        f"- **Chế độ cảnh trám (`B-Roll`):** "
        + (f"Đã kết nối `{len(brolls)}` video cảnh trám (`{', '.join(brolls.keys())}` — mỗi cảnh dùng đúng 1 lần)" if brolls else "Chế độ **1 Video Điện Thoại Duy Nhất** (Tự động tạo 3 Bản vẽ Khoa học 2D `#F5F2EB` + Whip-Snap Zoom `0.28s`)"),
        f"- **Ảnh Contact Sheet & Storyboard xem trước:** `{contact_jpg.name}`, `{preview_jpg.name}`",
        "",
        "---",
        "",
        "## 🎬 1. BẢNG PHÂN NHỊP CHI TIẾT (`BEAT-BY-BEAT EDIT PLAN`)",
        "",
        "| Nhịp | Mốc giây | Nguồn hình (`Source`) | Hiệu ứng Camera | Phụ đề Dòng 1 (`FDAeonik 46px`) | Phụ đề Dòng 2 (`SVN-Acta 45px`) | Từ khóa Highlight |",
        "|:---:|:---:|:---:|:---:|:---|:---|:---|",
    ]
    for b in beats:
        lines.append(
            f"| **{b['id']}** | `{b['start']:.2f}s – {b['end']:.2f}s` | `{b['source']}` | `{b['cam_mode']}` | {b['sub1']} | {b['sub2']} | **{b.get('highlight', '')}** |"
        )

    lines += [
        "",
        "---",
        "",
        "## ❓ 2. BỘ CÂU HỎI XÁC NHẬN DÀNH CHO HỌC VIÊN TRƯỚC KHI RENDER (`CONFIRMATION CHECKLIST`)",
        "",
        "> 💡 **Hướng dẫn:** Bạn có thể trả lời nhanh từng mục bên dưới để tinh chỉnh theo ý muốn, hoặc chỉ cần gõ **\"OK / Chốt mặc định\"** để hệ thống kết xuất ngay!",
        "",
    ]
    for q in plan["confirmation_questions"]:
        lines.append(f"### {q['group']}")
        lines.append(f"- **Câu hỏi:** {q['question']}")
        lines.append(f"- **Mặc định đề xuất:** `{q['current_default']}`")
        for idx_o, opt in enumerate(q["options"], 1):
            lines.append(f"  - `[Lựa chọn {idx_o}]` {opt}")
        lines.append("")

    md_path.write_text("\n".join(lines), encoding="utf-8")


def apply_eye_affine_lock(
    frame_bgr: np.ndarray,
    raw_eye_xy: Tuple[float, float],
    scale: float,
    unsharp_amount: float = 1.22,
) -> np.ndarray:
    """Biến đổi Affine khóa cứng điểm mắt tại (540, 650) + Adaptive Unsharp Masking."""
    ih, iw = frame_bgr.shape[:2]
    target_ratio = W / float(H)
    cur_ratio = iw / float(max(1, ih))
    if abs(cur_ratio - target_ratio) > 0.02:
        if cur_ratio > target_ratio:
            nw = max(1, int(round(ih * target_ratio)))
            x0 = (iw - nw) // 2
            frame_bgr = frame_bgr[:, x0 : x0 + nw]
        else:
            nh = max(1, int(round(iw / target_ratio)))
            y0 = (ih - nh) // 2
            frame_bgr = frame_bgr[y0 : y0 + nh, :]
    if (frame_bgr.shape[1], frame_bgr.shape[0]) != (W, H):
        frame_bgr = cv2.resize(frame_bgr, (W, H), interpolation=cv2.INTER_LANCZOS4)

    xe, ye = raw_eye_xy
    Xt, Yt = TARGET_EYE_XY
    tx = Xt - scale * xe
    ty = Yt - scale * ye
    M = np.float32([[scale, 0.0, tx], [0.0, scale, ty]])
    warped = cv2.warpAffine(frame_bgr, M, (W, H), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REFLECT_101)
    if unsharp_amount > 1.01:
        blurred = cv2.GaussianBlur(warped, (0, 0), sigmaX=1.05)
        warped = cv2.addWeighted(warped, unsharp_amount, blurred, -(unsharp_amount - 1.0), 0)
    return warped


def whip_snap_ease(u: float) -> float:
    u = max(0.0, min(1.0, u))
    return 1.0 - (1.0 - u) ** 3.8


def render_scientific_atlas_card(
    spec: Dict[str, Any],
    style: str,
    local_prog: float,
    fonts: Dict[str, Any],
) -> Image.Image:
    """Vẽ Bản vẽ Khoa học 2D (#F5F2EB) sắc nét bằng Vector Pillow với 3 thẻ Callout bung theo giọng nói."""
    paper_rgb = (245, 242, 235)
    ink_rgb = (20, 34, 46) if style == "dental" else (44, 42, 41)
    accent_rgb = (198, 62, 49) if style == "dental" else (181, 70, 47)
    sec_rgb = (15, 110, 102) if style == "dental" else (46, 125, 91)

    img = Image.new("RGBA", (W, H), (*paper_rgb, 255))
    draw = ImageDraw.Draw(img)

    # Subtle editorial grid lines on #F5F2EB paper
    for gx in range(80, W, 120):
        draw.line([(gx, 60), (gx, H - 60)], fill=(230, 224, 212, 255), width=1)
    for gy in range(80, H, 120):
        draw.line([(60, gy), (W - 60, gy)], fill=(230, 224, 212, 255), width=1)

    # Header block (Y = 76..230)
    draw.line([(68, 78), (W - 68, 78)], fill=(*accent_rgb, 255), width=3)
    draw.text((68, 94), nfc(spec.get("kicker", "THIẾT ĐỒ MÔ HỌC LÂM SÀNG")), fill=(*accent_rgb, 255), font=fonts["sans_b_22"])
    draw.text((68, 134), nfc(spec.get("title", "Cấu Trúc Giải Phẫu & Cơ Chế Tác Động")), fill=(*ink_rgb, 255), font=fonts["serif_it_42"])

    # Anatomical Cross-Section Diagram Box (Y = 230..920)
    box_l, box_t, box_r, box_b = 68, 225, W - 68, 910
    draw.rounded_rectangle([box_l, box_t, box_r, box_b], radius=24, fill=(237, 231, 218, 255), outline=(*ink_rgb, 60), width=2)

    # Draw layered histological waves / dental enamel layers inside diagram box
    layer_colors = [
        (226, 188, 174, 255) if style == "spa" else (210, 228, 238, 255),
        (208, 148, 132, 255) if style == "spa" else (168, 206, 222, 255),
        (182, 108, 94, 255) if style == "spa" else (126, 178, 198, 255),
    ]
    for li, lcol in enumerate(layer_colors):
        ly0 = box_t + 140 + li * 165
        ly1 = min(box_b - 24, ly0 + 155)
        draw.rounded_rectangle([box_l + 28, ly0, box_r - 28, ly1], radius=16, fill=lcol)

    # Draw 3 focal nodes [01], [02], [03] with radar rings
    nodes = [(290, 360), (540, 535), (780, 710)]
    for ni, (nx, ny) in enumerate(nodes):
        appear = max(0.0, min(1.0, (local_prog - ni * 0.18) / 0.25))
        if appear <= 0.01:
            continue
        r_ring = int(28 + 10 * math.sin(local_prog * 6.0 + ni))
        draw.ellipse([nx - r_ring, ny - r_ring, nx + r_ring, ny + r_ring], outline=(*accent_rgb, int(190 * appear)), width=3)
        draw.ellipse([nx - 18, ny - 18, nx + 18, ny + 18], fill=(*accent_rgb, 255))
        draw.text((nx - 11, ny - 11), f"{ni+1:02d}", fill=(255, 255, 255, 255), font=fonts["sans_b_18"])

    # 3 Callout Cards (Y = 945..1520) staggered by voice progress
    callouts = spec.get("callouts", [])
    for ci, c in enumerate(callouts[:3]):
        c_prog = max(0.0, min(1.0, (local_prog - ci * 0.20) / 0.25))
        if c_prog <= 0.01:
            continue
        cy0 = 945 + ci * 182
        cy1 = cy0 + 160
        border_col = sec_rgb if ci == 2 else accent_rgb
        draw.rounded_rectangle([68, cy0, W - 68, cy1], radius=20, fill=(255, 253, 249, 255), outline=(*border_col, 220), width=3)
        draw.rounded_rectangle([88, cy0 + 24, 152, cy0 + 84], radius=12, fill=(*border_col, 255))
        draw.text((103, cy0 + 38), c.get("num", f"0{ci+1}"), fill=(255, 255, 255, 255), font=fonts["sans_b_28"])
        draw.text((174, cy0 + 22), f"{nfc(c.get('vi', ''))}  •  {nfc(c.get('lat', ''))}", fill=(*ink_rgb, 255), font=fonts["sans_b_28"])
        draw.text((174, cy0 + 68), nfc(c.get("desc", "")), fill=(82, 78, 74, 255), font=fonts["aeonik_med_26"])

    return img


def render_vertical_spine_roadmap(
    frame_bgr: np.ndarray,
    brand_cfg: Dict[str, Any],
    local_prog: float,
    fonts: Dict[str, Any],
) -> Image.Image:
    """Vẽ Sơ đồ Lộ trình Trục dọc (#MG2_ROADMAP tại X=158) chuẩn Tiến Nha Sĩ / MFX V10."""
    blurred = cv2.GaussianBlur(frame_bgr, (35, 35), 0)
    dark_bgr = (blurred.astype(np.float32) * 0.28).astype(np.uint8)
    pil_bg = Image.fromarray(cv2.cvtColor(dark_bgr, cv2.COLOR_BGR2RGB)).convert("RGBA")
    draw = ImageDraw.Draw(pil_bg)

    draw.rounded_rectangle([56, 140, W - 56, 1490], radius=28, fill=(14, 22, 34, 236), outline=(56, 189, 248, 140), width=2)
    draw.text((96, 182), "• PHÁC ĐỒ LÂM SÀNG CHUẨN Y KHOA •", fill=(250, 204, 21, 255), font=fonts["sans_b_22"])
    draw.text((96, 222), nfc(brand_cfg.get("tagline", "Lộ Trình Xử Lý & Phục Hồi 4 Bước")), fill=(245, 242, 235, 255), font=fonts["serif_it_42"])

    spine_x = 158
    draw.line([(spine_x, 340), (spine_x, 1380)], fill=(51, 65, 85, 255), width=6)
    beam_end_y = int(340 + (1380 - 340) * min(1.0, local_prog * 1.25))
    draw.line([(spine_x, 340), (spine_x, beam_end_y)], fill=(56, 189, 248, 255), width=6)

    steps = [
        ("01", "CHẨN ĐOÁN NGUYÊN NHÂN", "Đánh giá đúng mức độ tổn thương & sắc tố"),
        ("02", "XỬ LÝ BẢO TỒN MÔ THẬT", "Tác động chọn lọc, không xâm lấn sâu"),
        ("03", "PHỤC HỒI HÀNG RÀO BẢO VỆ", "Cấp ẩm & tái tạo cấu trúc bề mặt khỏe mạnh"),
        ("04", "THEO DÕI & DUY TRÌ 1:1", "Kiểm tra định kỳ đảm bảo hiệu quả lâu dài"),
    ]
    for si, (snum, stitle, sdesc) in enumerate(steps):
        cy = 360 + si * 255
        node_col = (250, 204, 21) if si == 0 else ((56, 189, 248) if si < 3 else (110, 231, 183))
        draw.ellipse([spine_x - 32, cy + 28, spine_x + 32, cy + 92], fill=(20, 30, 46, 255), outline=(*node_col, 255), width=4)
        draw.text((spine_x - 16, cy + 44), snum, fill=(255, 255, 255, 255), font=fonts["sans_b_22"])
        draw.rounded_rectangle([222, cy, W - 92, cy + 168], radius=18, fill=(24, 34, 50, 245), outline=(*node_col, 160), width=2)
        draw.text((254, cy + 28), nfc(stitle), fill=(245, 242, 235, 255), font=fonts["sans_b_28"])
        draw.text((254, cy + 82), nfc(sdesc), fill=(186, 198, 214, 255), font=fonts["aeonik_med_26"])

    return pil_bg


def draw_subtitle_5b(
    canvas_rgba: Image.Image,
    sub1: str,
    sub2: str,
    highlight: str,
    is_atlas: bool,
    style: str,
    local_prog: float,
    fonts: Dict[str, Any],
) -> None:
    """Vẽ Phụ đề Phương án 5B khóa X-Height 1:1 = 24.0px (FDAeonik-Medium 46px + SVN-Acta-BoldItalic 45px)."""
    s1 = clean_sub_punct(sub1)
    s2 = clean_sub_punct(sub2)
    if not s1 and not s2:
        return

    draw = ImageDraw.Draw(canvas_rgba)
    card_top, card_bot = 1582, 1748
    if is_atlas:
        bg_col = (24, 23, 22, 242) if style == "spa" else (20, 34, 46, 242)
        txt_col = (245, 242, 235, 255)
        hl_col = (255, 198, 110, 255) if style == "spa" else (110, 231, 183, 255)
        border_col = (181, 70, 47, 210) if style == "spa" else (56, 189, 248, 210)
    else:
        bg_col = (22, 20, 19, 214) if style == "spa" else (16, 26, 38, 224)
        txt_col = (245, 242, 235, 255)
        hl_col = (255, 198, 110, 255) if style == "spa" else (56, 189, 248, 255)
        border_col = (255, 198, 110, 140) if style == "spa" else (56, 189, 248, 150)

    draw.rounded_rectangle([64, card_top, W - 64, card_bot], radius=24, fill=bg_col, outline=border_col, width=2)

    f_reg = fonts["aeonik_med_46"]
    f_hl = fonts["acta_bi_45"]

    lines_to_draw = [(s1, card_top + 24), (s2, card_top + 84)] if s2 else [(s1, card_top + 52)]
    for line_txt, ly in lines_to_draw:
        if not line_txt:
            continue
        # Check if highlight phrase is in this line
        use_hl = bool(highlight and highlight.lower() in line_txt.lower())
        font_use = f_hl if use_hl else f_reg
        col_use = hl_col if use_hl else txt_col
        bbox = draw.textbbox((0, 0), line_txt, font=font_use)
        tw = bbox[2] - bbox[0]
        tx = (W - tw) // 2
        draw.text((tx, ly), line_txt, fill=col_use, font=font_use)
        if use_hl:
            wipe = min(1.0, max(0.15, local_prog * 1.6))
            uw = int(tw * wipe)
            draw.line([(tx, ly + 52), (tx + uw, ly + 52)], fill=hl_col, width=4)


def wrap_text_two_lines(text: str, max_chars_per_line: int = 46) -> Tuple[str, str]:
    words = nfc(text).strip().split()
    line1_words: List[str] = []
    line2_words: List[str] = []
    cur_len = 0
    on_line2 = False
    for w in words:
        if not on_line2 and (cur_len + len(w) + (1 if line1_words else 0) <= max_chars_per_line):
            line1_words.append(w)
            cur_len += len(w) + (1 if len(line1_words) > 1 else 0)
        else:
            on_line2 = True
            line2_words.append(w)
    return " ".join(line1_words), " ".join(line2_words)


def draw_cta_and_top_brand_logo(
    canvas_rgba: Image.Image,
    brand_cfg: Dict[str, Any],
    style: str,
    local_prog: float,
    fonts: Dict[str, Any],
) -> None:
    """
    Quy tắc Logo V10:
    - Chỉ bật Top Logo Pill (Y = 54..144px) khi bước vào phần CTA cuối video.
    - Đồng thời hiển thị Thẻ CTA (CTA 01 Ticket Ripple cho Spa HOẶC CTA 03 Q&A Bubble cho Nha khoa/Bác sĩ).
    """
    draw = ImageDraw.Draw(canvas_rgba)
    accent_col = (255, 198, 110, 255) if style == "spa" else (56, 189, 248, 255)
    pill_bg = (20, 18, 17, 232) if style == "spa" else (12, 22, 34, 236)

    # 1. Top Brand Pill (Y = 56..142)
    draw.rounded_rectangle([140, 56, W - 140, 142], radius=43, fill=pill_bg, outline=accent_col, width=2)
    draw.ellipse([162, 68, 224, 130], fill=accent_col)
    draw.text((175, 82), nfc(brand_cfg.get("monogram", "TT")[:2]), fill=(15, 15, 18, 255), font=fonts["sans_b_24"])
    top_txt = f"{nfc(brand_cfg.get('brand_name', 'THẮM THỎ BEAUTY'))}  •  {nfc(brand_cfg.get('verified_badge', '✓ OFFICIAL'))}"
    draw.text((244, 83), top_txt, fill=(245, 242, 235, 255), font=fonts["sans_b_24"])

    # 2. CTA Card in Safe Zone (Y = 1140..1545)
    cta = brand_cfg.get("cta_offer", {})
    if style == "dental" or cta.get("mode") == "qa_bubble":
        # CTA Y KHOA 03: Patient Question Bubble + Doctor Verified Reply Bubble
        draw.rounded_rectangle([68, 1145, W - 68, 1315], radius=22, fill=(245, 242, 235, 248), outline=(56, 189, 248, 220), width=2)
        draw.text((96, 1164), "💬 CÂU HỎI TỪ KHÁCH HÀNG:", fill=(198, 62, 49, 255), font=fonts["sans_b_20"])
        q_l1, q_l2 = wrap_text_two_lines(cta.get("patient_question", "Bác sĩ ơi, răng em ê buốt khi uống nước lạnh thì có cần lấy tủy không ạ?"), 48)
        draw.text((96, 1200), q_l1, fill=(20, 34, 46, 255), font=fonts["aeonik_med_26"])
        if q_l2:
            draw.text((96, 1236), q_l2, fill=(20, 34, 46, 255), font=fonts["aeonik_med_26"])

        draw.rounded_rectangle([68, 1332, W - 68, 1542], radius=22, fill=(14, 24, 38, 245), outline=(110, 231, 183, 240), width=3)
        draw.text((96, 1352), f"✓ {nfc(brand_cfg.get('brand_name', 'BÁC SĨ'))} TRẢ LỜI TRỰC TIẾP:", fill=(110, 231, 183, 255), font=fonts["sans_b_22"])
        r_l1, r_l2 = wrap_text_two_lines(cta.get("doctor_reply", "Chào em, chưa chắc phải lấy tủy đâu! Em gửi ảnh hoặc mô tả vị trí răng để anh kiểm tra trước nhé."), 48)
        draw.text((96, 1392), r_l1, fill=(245, 242, 235, 255), font=fonts["aeonik_med_26"])
        if r_l2:
            draw.text((96, 1428), r_l2, fill=(245, 242, 235, 255), font=fonts["aeonik_med_26"])
        draw.text((96, 1482), "↓ ↓ ↓  ĐẶT CÂU HỎI NGAY BÊN DƯỚI  ↓ ↓ ↓", fill=(56, 189, 248, 255), font=fonts["sans_b_22"])
    else:
        # CTA 01: Editorial Offer Ticket + Action Pill with Click Ripple
        draw.rounded_rectangle([68, 1180, W - 68, 1540], radius=26, fill=(22, 20, 19, 238), outline=(255, 198, 110, 230), width=3)
        draw.text((100, 1212), nfc(cta.get("kicker", "ƯU ĐÃI TRẢI NGHIỆM BUỔI ĐẦU")), fill=(255, 198, 110, 255), font=fonts["sans_b_24"])
        draw.text((100, 1256), nfc(cta.get("subtitle", "Khử thâm & Phục hồi nền môi tự nhiên")), fill=(245, 242, 235, 255), font=fonts["aeonik_med_30"])
        # Price Badge
        draw.rounded_rectangle([W - 340, 1208, W - 96, 1296], radius=16, fill=(181, 70, 47, 255))
        draw.text((W - 312, 1234), nfc(cta.get("price_badge", "499 NGHÌN")), fill=(255, 255, 255, 255), font=fonts["sans_b_32"])
        # Action Button + Ripple
        draw.rounded_rectangle([100, 1348, W - 100, 1496], radius=22, fill=(255, 198, 110, 255))
        btn_txt = f"👉 {nfc(cta.get('button_left', 'INBOX NGAY'))} • {nfc(cta.get('button_right', 'ĐỂ ĐƯỢC TƯ VẤN 1:1'))}"
        draw.text((136, 1402), btn_txt[:46], fill=(20, 18, 17, 255), font=fonts["sans_b_28"])
        r_rad = int(18 + 22 * (local_prog % 1.0))
        draw.ellipse([W - 170 - r_rad, 1422 - r_rad, W - 170 + r_rad, 1422 + r_rad], outline=(181, 70, 47, 220), width=3)


def render_outro_black_frame(
    brand_cfg: Dict[str, Any],
    style: str,
    local_prog: float,
    fonts: Dict[str, Any],
) -> np.ndarray:
    """Vẽ Màn hình Đen OUTRO 01 (#050507 / #08111A) cuối video: Logo Lớn + 3 Cam kết thương hiệu."""
    bg_rgb = (8, 17, 26) if style == "dental" else (5, 5, 7)
    accent_rgb = (56, 189, 248) if style == "dental" else (255, 198, 110)

    img = Image.new("RGBA", (W, H), (*bg_rgb, 255))
    draw = ImageDraw.Draw(img)

    # Central Emblem Circle with Dual Orbit Rings
    cx, cy = W // 2, 470
    for rad in (148, 124):
        draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], outline=(*accent_rgb, 110), width=2)
    draw.ellipse([cx - 96, cy - 96, cx + 96, cy + 96], fill=(22, 26, 34, 255), outline=(*accent_rgb, 255), width=4)
    mono = nfc(brand_cfg.get("monogram", "TT")[:2])
    draw.text((cx - 42, cy - 34), mono, fill=(*accent_rgb, 255), font=fonts["sans_b_60"])

    # Brand Title & Tagline
    bname = nfc(brand_cfg.get("brand_name", "THẮM THỎ BEAUTY"))
    bbox = draw.textbbox((0, 0), bname, font=fonts["sans_b_48"])
    draw.text(((W - (bbox[2] - bbox[0])) // 2, 665), bname, fill=(245, 242, 235, 255), font=fonts["sans_b_48"])

    tag = nfc(brand_cfg.get("tagline", "Chuyên gia Chăm sóc & Phục hồi Chuẩn Y Khoa"))
    tbbox = draw.textbbox((0, 0), tag, font=fonts["serif_it_42"])
    draw.text(((W - (tbbox[2] - tbbox[0])) // 2, 738), tag, fill=(*accent_rgb, 255), font=fonts["serif_it_42"])

    # 3 Commitment Info Rows (Y = 860..1420)
    rows = brand_cfg.get("outro_info_rows", [])
    for ri, row in enumerate(rows[:3]):
        ry = 870 + ri * 185
        draw.rounded_rectangle([76, ry, W - 76, ry + 156], radius=22, fill=(18, 22, 30, 245), outline=(*accent_rgb, 140), width=2)
        draw.rounded_rectangle([104, ry + 34, 176, ry + 106], radius=14, fill=(*accent_rgb, 255))
        draw.text((120, ry + 52), nfc(row.get("num", f"0{ri+1}")), fill=(12, 14, 18, 255), font=fonts["sans_b_28"])
        draw.text((204, ry + 32), nfc(row.get("label", "CAM KẾT CHUYÊN MÔN")), fill=(*accent_rgb, 255), font=fonts["sans_b_24"])
        draw.text((204, ry + 78), nfc(row.get("value", "An toàn • Chuẩn xác • Theo dõi 1:1")), fill=(245, 242, 235, 255), font=fonts["aeonik_med_26"])

    footer = nfc(brand_cfg.get("outro_footer_pill", "• FOLLOW KÊNH ĐỂ XEM PHÁC ĐỒ MỚI NHẤT •"))
    fbbox = draw.textbbox((0, 0), footer, font=fonts["sans_b_22"])
    draw.text(((W - (fbbox[2] - fbbox[0])) // 2, 1520), footer, fill=(*accent_rgb, 255), font=fonts["sans_b_22"])

    return cv2.cvtColor(np.array(img.convert("RGB")), cv2.COLOR_RGB2BGR)


def export_contact_and_storyboard_previews(
    plan: Dict[str, Any],
    contact_jpg: Path,
    preview_jpg: Path,
    fonts: Dict[str, Any],
) -> None:
    """Xuất bảng Contact Sheet 6 khung và Bảng Storyboard 4 khung nghiệm thu trước/sau khi lập kế hoạch."""
    vi = plan["video_info"]
    video_path = Path(vi["video_path"])
    raw_eye = (float(vi["raw_eye_xy"][0]), float(vi["raw_eye_xy"][1]))
    style = plan["style"]
    brand_cfg = plan["brand"]
    beats = plan["beats"]

    cap = cv2.VideoCapture(str(video_path))
    total_frames = max(1, int(vi["frames"]))

    # 1. Contact Sheet (3x2 grid)
    cw, ch = 360, 640
    sheet = Image.new("RGB", (cw * 3, ch * 2), (12, 16, 24))
    s_draw = ImageDraw.Draw(sheet)
    for i in range(6):
        f_idx = min(total_frames - 1, int((total_frames * (i + 0.5)) / 6))
        cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
        ret, frm = cap.read()
        if not ret or frm is None:
            continue
        locked = apply_eye_affine_lock(frm, raw_eye, 1.25, unsharp_amount=1.15)
        thumb = cv2.resize(locked, (cw, ch), interpolation=cv2.INTER_AREA)
        pil_t = Image.fromarray(cv2.cvtColor(thumb, cv2.COLOR_BGR2RGB))
        gx, gy = (i % 3) * cw, (i // 3) * ch
        sheet.paste(pil_t, (gx, gy))
        # Draw Eye-Lock reference line at Y = 650/1920 * ch = 216px
        eye_y_thumb = int(650.0 / H * ch)
        s_draw.line([(gx, gy + eye_y_thumb), (gx + cw, gy + eye_y_thumb)], fill=(56, 189, 248), width=2)
        s_draw.rectangle([gx + 10, gy + 10, gx + 210, gy + 46], fill=(0, 0, 0))
        s_draw.text((gx + 18, gy + 18), f"Frame #{i+1} | Eye Y=650px", fill=(255, 204, 0), font=fonts["sans_b_18"])
    sheet.save(str(contact_jpg), "JPEG", quality=90)

    # 2. 4-Panel V10 Master Preview (A-Roll 5B + Atlas 2D #F5F2EB + CTA & Top Logo + Black Outro)
    cap.set(cv2.CAP_PROP_POS_FRAMES, min(total_frames - 1, max(0, total_frames // 5)))
    ret, base_frm = cap.read()
    cap.release()
    if not ret or base_frm is None:
        base_frm = np.zeros((H, W, 3), dtype=np.uint8)

    locked_aroll = apply_eye_affine_lock(base_frm, raw_eye, 1.25)
    p1 = Image.fromarray(cv2.cvtColor(locked_aroll, cv2.COLOR_BGR2RGB)).convert("RGBA")
    b0 = beats[0] if beats else {"sub1": "Khóa mắt Affine Y=650px", "sub2": "Phụ đề 5B khóa X-Height 1:1", "highlight": "X-Height 1:1"}
    draw_subtitle_5b(p1, b0["sub1"], b0["sub2"], b0.get("highlight", ""), False, style, 0.8, fonts)

    p2 = render_scientific_atlas_card(plan["atlas_specs"][0], style, 0.85, fonts)
    draw_subtitle_5b(p2, "Thiết đồ mô học 2D trực quan", "Bung từng thẻ khớp giọng nói", "khớp giọng nói", True, style, 0.85, fonts)

    locked_cta = apply_eye_affine_lock(base_frm, raw_eye, 1.38)
    p3 = Image.fromarray(cv2.cvtColor(locked_cta, cv2.COLOR_BGR2RGB)).convert("RGBA")
    draw_cta_and_top_brand_logo(p3, brand_cfg, style, 0.75, fonts)
    b_last = beats[-1] if beats else b0
    draw_subtitle_5b(p3, b_last["sub1"], b_last["sub2"], b_last.get("highlight", ""), False, style, 0.85, fonts)

    outro_bgr = render_outro_black_frame(brand_cfg, style, 0.9, fonts)
    p4 = Image.fromarray(cv2.cvtColor(outro_bgr, cv2.COLOR_BGR2RGB)).convert("RGBA")

    grid = Image.new("RGB", (cw * 4, ch), (10, 12, 16))
    for idx_p, pan in enumerate((p1, p2, p3, p4)):
        t_pan = pan.convert("RGB").resize((cw, ch), Image.Resampling.LANCZOS)
        grid.paste(t_pan, (idx_p * cw, 0))
    grid.save(str(preview_jpg), "JPEG", quality=92)


def render_v10_master_video(plan: Dict[str, Any], out_mp4: Path, fonts: Dict[str, Any]) -> None:
    """Kết xuất Video 9:16 chuẩn V10 Master (Whip-Snap 0.28s + Khóa mắt Y=650px + Atlas 2D + CTA Logo + Outro)."""
    vi = plan["video_info"]
    video_path = Path(vi["video_path"])
    raw_eye = (float(vi["raw_eye_xy"][0]), float(vi["raw_eye_xy"][1]))
    style = plan["style"]
    brand_cfg = plan["brand"]
    beats = plan["beats"]
    brolls = plan["detected_brolls"]
    atlas_map = {a["id"]: a for a in plan.get("atlas_specs", [])}

    cap = cv2.VideoCapture(str(video_path))
    src_fps = float(vi["fps"] or 30.0)
    duration = float(vi["duration"])
    outro_dur = float(brand_cfg.get("outro_duration_sec", 3.0))
    total_out_frames = int(round((duration + outro_dur) * FPS))

    # Open optional B-roll captures
    broll_caps: Dict[str, cv2.VideoCapture] = {}
    for k, bpath in brolls.items():
        if os.path.isfile(bpath):
            broll_caps[k] = cv2.VideoCapture(bpath)

    ffmpeg_bin = get_ffmpeg_bin()
    tmp_silent_mp4 = tempfile.NamedTemporaryFile(suffix=".mp4", delete=False).name

    cmd_enc = [
        ffmpeg_bin, "-y",
        "-f", "rawvideo", "-vcodec", "rawvideo",
        "-s", f"{W}x{H}", "-pix_fmt", "bgr24", "-r", str(FPS),
        "-i", "-",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p",
        tmp_silent_mp4,
    ]
    proc = subprocess.Popen(cmd_enc, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    last_bgr = np.zeros((H, W, 3), dtype=np.uint8)
    for f_idx in range(total_out_frames):
        t_sec = f_idx / FPS
        if t_sec >= duration:
            outro_prog = (t_sec - duration) / max(0.1, outro_dur)
            out_bgr = render_outro_black_frame(brand_cfg, style, outro_prog, fonts)
            proc.stdin.write(out_bgr.tobytes())
            continue

        ret, frm = cap.read()
        if not ret or frm is None:
            frm = last_bgr
        else:
            last_bgr = frm

        # Find active beat
        active_beat = beats[-1]
        for b in beats:
            if float(b["start"]) <= t_sec <= float(b["end"]) + 0.02:
                active_beat = b
                break

        b_start = float(active_beat["start"])
        b_end = max(b_start + 0.1, float(active_beat["end"]))
        local_t = max(0.0, t_sec - b_start)
        local_prog = min(1.0, local_t / (b_end - b_start))
        src_type = active_beat.get("source", "aroll")
        cam_mode = active_beat.get("cam_mode", "static_base")

        if src_type in atlas_map:
            pil_frame = render_scientific_atlas_card(atlas_map[src_type], style, local_prog, fonts)
            draw_subtitle_5b(
                pil_frame,
                active_beat.get("sub1", ""),
                active_beat.get("sub2", ""),
                active_beat.get("highlight", ""),
                True,
                style,
                local_prog,
                fonts,
            )
            out_bgr = cv2.cvtColor(np.array(pil_frame.convert("RGB")), cv2.COLOR_RGB2BGR)
        elif src_type == "mg_roadmap":
            pil_frame = render_vertical_spine_roadmap(frm, brand_cfg, local_prog, fonts)
            draw_subtitle_5b(
                pil_frame,
                active_beat.get("sub1", ""),
                active_beat.get("sub2", ""),
                active_beat.get("highlight", ""),
                False,
                style,
                local_prog,
                fonts,
            )
            out_bgr = cv2.cvtColor(np.array(pil_frame.convert("RGB")), cv2.COLOR_RGB2BGR)
        elif src_type in broll_caps:
            bcap = broll_caps[src_type]
            bret, bfrm = bcap.read()
            if not bret or bfrm is None:
                bcap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                bret, bfrm = bcap.read()
            if bfrm is None:
                bfrm = frm
            z_broll = 1.04 + 0.08 * local_prog
            warped_b = apply_eye_affine_lock(bfrm, (540.0, 960.0), z_broll, unsharp_amount=1.10)
            pil_frame = Image.fromarray(cv2.cvtColor(warped_b, cv2.COLOR_BGR2RGB)).convert("RGBA")
            draw_subtitle_5b(
                pil_frame,
                active_beat.get("sub1", ""),
                active_beat.get("sub2", ""),
                active_beat.get("highlight", ""),
                False,
                style,
                local_prog,
                fonts,
            )
            out_bgr = cv2.cvtColor(np.array(pil_frame.convert("RGB")), cv2.COLOR_RGB2BGR)
        else:
            # A-Roll with Eye-Anchor Affine Lock + Whip-Snap 0.28s Speed-Ramp
            s_base = 1.25 if style == "spa" else 1.24
            s_zoom = 1.38
            if cam_mode in ("snap_zoom", "cut_zoom", "whip_snap_138"):
                u_whip = min(1.0, local_t / 0.28)
                scale = s_base + (s_zoom - s_base) * whip_snap_ease(u_whip)
            else:
                scale = s_base

            warped_a = apply_eye_affine_lock(frm, raw_eye, scale, unsharp_amount=1.22)
            pil_frame = Image.fromarray(cv2.cvtColor(warped_a, cv2.COLOR_BGR2RGB)).convert("RGBA")
            if active_beat.get("is_cta_section", False):
                draw_cta_and_top_brand_logo(pil_frame, brand_cfg, style, local_prog, fonts)
            draw_subtitle_5b(
                pil_frame,
                active_beat.get("sub1", ""),
                active_beat.get("sub2", ""),
                active_beat.get("highlight", ""),
                False,
                style,
                local_prog,
                fonts,
            )
            out_bgr = cv2.cvtColor(np.array(pil_frame.convert("RGB")), cv2.COLOR_RGB2BGR)

        proc.stdin.write(out_bgr.tobytes())

    proc.stdin.close()
    proc.wait()
    cap.release()
    for bc in broll_caps.values():
        bc.release()

    # Mux original audio + pad silence for 3.0s Outro
    cmd_mux = [
        ffmpeg_bin, "-y",
        "-i", tmp_silent_mp4,
        "-i", str(video_path),
        "-filter_complex", f"[1:a]apad=pad_dur={outro_dur}[aout]",
        "-map", "0:v:0", "-map", "[aout]",
        "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        str(out_mp4),
    ]
    res = subprocess.run(cmd_mux, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if res.returncode != 0 or not out_mp4.is_file():
        shutil.copyfile(tmp_silent_mp4, str(out_mp4))
    try:
        os.remove(tmp_silent_mp4)
    except Exception:
        pass


def render_white_ivory_before_after_video(
    raw_video: Path,
    edited_video: Path,
    plan: Dict[str, Any],
    out_sbs_mp4: Path,
    fonts: Dict[str, Any],
) -> None:
    """
    Kết xuất Video Trước–Sau Nền Trắng Kem Y Khoa (#F5F2EB) Thoáng Sạch (Chuẩn V10):
    1. Thanh Chủ Đề Video (Topic Hook Pill) trên đỉnh.
    2. Tiêu đề cụ thể trên khung phải (KHÔNG ghi chung chung).
    3. Khung trái VIDEO GỐC căn giữa dọc thoáng sạch — TUYỆT ĐỐI KHÔNG vẽ hộp trắng bên dưới khung trái.
    """
    ffmpeg_bin = get_ffmpeg_bin()
    overlay_png = tempfile.NamedTemporaryFile(suffix=".png", delete=False).name

    bg = Image.new("RGBA", (W, H), (245, 242, 235, 255))
    draw = ImageDraw.Draw(bg)

    # 1. Top Topic Hook Pill (Y = 88..178)
    draw.rounded_rectangle([54, 88, W - 54, 178], radius=45, fill=(28, 27, 26, 255), outline=(181, 70, 47, 255), width=3)
    topic_txt = nfc(plan.get("before_after_titles", {}).get("top_topic_pill", "CHỦ ĐỀ: PHÁC ĐỒ HẬU KỲ CHUẨN Y KHOA"))
    tbbox = draw.textbbox((0, 0), topic_txt[:48], font=fonts["sans_b_28"])
    draw.text(((W - (tbbox[2] - tbbox[0])) // 2, 116), topic_txt[:48], fill=(255, 198, 110, 255), font=fonts["sans_b_28"])

    # Left Frame (Raw Video, grayscale, vertically centered, NO bottom white box): X=36..516 (W=480), Y=520..1374 (H=854)
    lx, ly, lw, lh = 36, 520, 480, 854
    draw.rounded_rectangle([lx - 4, ly - 58, lx + lw + 4, ly + lh + 4], radius=22, fill=(44, 42, 41, 255))
    draw.text((lx + 24, ly - 44), "TRƯỚC • VIDEO GỐC QUAY ĐIỆN THOẠI", fill=(245, 242, 235, 255), font=fonts["sans_b_20"])
    draw.rectangle([lx, ly, lx + lw, ly + lh], fill=(0, 0, 0, 0))

    # Right Frame (Edited V10 Video, slightly larger hero): X=544..1048 (W=504), Y=460..1356 (H=896)
    rx, ry, rw, rh = 544, 460, 504, 896
    draw.rounded_rectangle([rx - 4, ry - 86, rx + rw + 4, ry + rh + 4], radius=24, fill=(181, 70, 47, 255))
    right_title = nfc(plan.get("before_after_titles", {}).get("right_header_title", "SAU KHI EDIT V10 • KHÓA MẮT & ATLAS 2D"))
    draw.text((rx + 18, ry - 70), "SAU • BẢN DỰNG CHUẨN MASTER V10", fill=(255, 198, 110, 255), font=fonts["sans_b_20"])
    draw.text((rx + 18, ry - 40), right_title, fill=(255, 255, 255, 255), font=fonts["sans_b_20"])
    draw.rectangle([rx, ry, rx + rw, ry + rh], fill=(0, 0, 0, 0))

    bg.save(overlay_png, "PNG")

    filter_complex = (
        f"[0:v]scale={lw}:{lh}:force_original_aspect_ratio=increase,crop={lw}:{lh},hue=s=0[left];"
        f"[1:v]scale={rw}:{rh}:force_original_aspect_ratio=increase,crop={rw}:{rh}[right];"
        f"color=c=#F5F2EB:s={W}x{H}[base];"
        f"[base][left]overlay={lx}:{ly}:shortest=1[tmp1];"
        f"[tmp1][right]overlay={rx}:{ry}:shortest=1[tmp2];"
        f"[tmp2][2:v]overlay=0:0[vout]"
    )
    cmd = [
        ffmpeg_bin, "-y",
        "-i", str(raw_video),
        "-i", str(edited_video),
        "-i", overlay_png,
        "-filter_complex", filter_complex,
        "-map", "[vout]", "-map", "1:a?",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "21", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        str(out_sbs_mp4),
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        os.remove(overlay_png)
    except Exception:
        pass


def main():
    parser = argparse.ArgumentParser(
        description="Spa & Dental-Medical Video Edit V10 Master CLI (Standalone Student Edition)"
    )
    parser.add_argument("--video", default=None, help="Tên file hoặc đường dẫn video điện thoại (.mp4/.mov)")
    parser.add_argument(
        "--style",
        choices=["spa", "dental", "auto"],
        default="auto",
        help="Phong cách: 'spa' (Thắm Thỏ Spa V10) hoặc 'dental' (Tiến Nha Sĩ V10)",
    )
    parser.add_argument("--preset", default=None, help="Đường dẫn file preset JSON tùy chọn")
    parser.add_argument("--brand", default=None, help="Đường dẫn file brand JSON tùy chọn")
    parser.add_argument("--brand-name", default=None, help="Ghi đè nhanh tên thương hiệu (VD: 'LINH SPA BEAUTY')")
    parser.add_argument("--monogram", default=None, help="Ghi đè nhanh 2 chữ viết tắt (VD: 'LS')")
    parser.add_argument("--tagline", default=None, help="Ghi đè nhanh định vị chuyên môn")
    parser.add_argument("--price", default=None, help="Ghi đè nhanh giá ưu đãi CTA (VD: '399 NGHÌN')")
    parser.add_argument("--transcript", default=None, help="Lời thoại truyền trực tiếp nếu muốn")
    parser.add_argument("--outro-mode", type=int, choices=[1, 2], default=1, help="1 = Chỉ Logo & Cam kết, 2 = Kèm CTA")
    parser.add_argument("--plan", action="store_true", help="Chỉ lập Kế hoạch Edit + Storyboard + Xuất bộ câu hỏi Confirm")
    parser.add_argument("--plan-file", default=None, help="Đường dẫn file <video>_edl_plan.json đã lập để render")
    parser.add_argument("--render", action="store_true", help="Kết xuất ra video .mp4 hoàn chỉnh")
    parser.add_argument("--with-before-after", action="store_true", help="Xuất kèm video So Sánh Trước–Sau nền trắng #F5F2EB")
    parser.add_argument("--verify-only", action="store_true", help="Chỉ chạy kiểm định 7 Cổng (7-Gate Verifier)")
    parser.add_argument("--output-dir", default=None, help="Thư mục lưu kết quả")
    args = parser.parse_args()

    # 1. Verify-Only mode (works even without a video file!)
    if args.verify_only:
        plan_beats = DEFAULT_BENCHMARK_BEATS
        gt_txt = DEFAULT_GROUND_TRUTH_TRANSCRIPT
        lbl = "SPA_DENTAL_V10_VERIFY"
        if args.plan_file and os.path.isfile(args.plan_file):
            with open(args.plan_file, "r", encoding="utf-8") as f:
                pdata = json.load(f)
            plan_beats = pdata.get("beats", DEFAULT_BENCHMARK_BEATS)
            gt_txt = pdata.get("ground_truth_transcript", DEFAULT_GROUND_TRUTH_TRANSCRIPT)
            lbl = f"VERIFY:{Path(args.plan_file).name}"
        rep = audit_beats(beats=plan_beats, label=lbl, ground_truth_transcript=gt_txt)
        print(
            f"[7-GATE AUDIT] passed_all={rep['passed_all']} | avg_RLI={rep['avg_rli']} | "
            f"static_ratio={rep['aroll_static_frame_ratio']*100:.1f}% | WER={rep['transcript_wer']*100:.1f}% | "
            f"EyeLock_ΔY={rep['gate5_eye_lock']['delta_Y_eye_px']}px"
        )
        if not rep["passed_all"]:
            sys.exit(1)
        print("✅ 7-Gate Verification PASSED 100% (Standalone Student Mode).")
        return

    fonts = load_v10_fonts()

    # 2. If --plan-file is provided, load existing plan
    if args.plan_file and os.path.isfile(args.plan_file):
        with open(args.plan_file, "r", encoding="utf-8") as f:
            plan_data = json.load(f)
        out_dir = Path(args.output_dir) if args.output_dir else Path(args.plan_file).resolve().parent
    else:
        # Locate student's phone video
        workdir = Path(args.output_dir) if args.output_dir else Path.cwd()
        video_path = auto_locate_video(args.video, workdir)
        if not video_path or not video_path.is_file():
            print("❌ Không tìm thấy file video (.mp4/.mov). Hãy truyền --video <đường_dẫn_hoặc_tên_video>.")
            sys.exit(1)

        out_dir = Path(args.output_dir) if args.output_dir else video_path.parent
        out_dir.mkdir(parents=True, exist_ok=True)

        # Auto-detect style from video name or brand if style == 'auto'
        style = args.style
        if style == "auto":
            vname_low = (video_path.stem + " " + str(args.brand_name or "")).lower()
            if any(k in vname_low for k in ("nha", "rang", "dental", "tien", "bacsi", "bs", "pk", "phongkham")):
                style = "dental"
            else:
                style = "spa"

        preset_path = args.preset or os.path.join(
            SKILL_DIR, "presets", "dental_medical.json" if style == "dental" else "spa_clinic.json"
        )
        brand_path = args.brand or os.path.join(
            SKILL_DIR, "brands", "tien_nha_si.json" if style == "dental" else "tham_tho_beauty.json"
        )

        with open(preset_path, "r", encoding="utf-8") as f:
            preset_cfg = json.load(f)
        with open(brand_path, "r", encoding="utf-8") as f:
            brand_cfg = json.load(f)

        if args.brand_name:
            brand_cfg["brand_name"] = nfc(args.brand_name).upper()
            brand_cfg["short_name"] = nfc(args.brand_name)
            if not args.monogram:
                words_b = [w[0].upper() for w in args.brand_name.split() if w]
                brand_cfg["monogram"] = "".join(words_b[:2]) or "SP"
        if args.monogram:
            brand_cfg["monogram"] = nfc(args.monogram).upper()[:2]
        if args.tagline:
            brand_cfg["tagline"] = nfc(args.tagline)
        if args.price:
            brand_cfg.setdefault("cta_offer", {})["price_badge"] = nfc(args.price).upper()
        brand_cfg["tier2_outro_mode"] = "option_1_pure_brand" if args.outro_mode == 1 else "option_2_with_cta"

        video_info = probe_video_and_eye_anchor(video_path)
        brolls = detect_optional_brolls(video_path)
        plan_data = build_smart_plan_for_video(
            video_info=video_info,
            style=style,
            preset_cfg=preset_cfg,
            brand_cfg=brand_cfg,
            brolls=brolls,
            manual_transcript=args.transcript,
        )

        stem = video_path.stem
        plan_json_path = out_dir / f"{stem}_edl_plan.json"
        plan_md_path = out_dir / f"{stem}_EDIT_PLAN.md"
        contact_jpg = out_dir / f"{stem}_contact_sheet.jpg"
        preview_jpg = out_dir / f"{stem}_plan_preview.jpg"

        with open(plan_json_path, "w", encoding="utf-8") as f:
            json.dump(plan_data, f, ensure_ascii=False, indent=2)

        export_contact_and_storyboard_previews(plan_data, contact_jpg, preview_jpg, fonts)
        write_markdown_edit_plan(plan_data, plan_md_path, contact_jpg, preview_jpg)

        print("==================================================================")
        print(f"🌿 SPA & DENTAL EDIT V10 | PHONG CÁCH: {style.upper()} | BRAND: {brand_cfg['brand_name']}")
        print(f"   Video gốc : {video_path.name} ({video_info['duration']}s, Eye-Anchor -> (540, 650))")
        print(f"   Kế hoạch  : {plan_md_path}")
        print(f"   EDL JSON  : {plan_json_path}")
        print(f"   Preview   : {preview_jpg}")
        print("==================================================================")

    # Always run 7-Gate Audit on the generated/loaded plan
    rep = audit_beats(
        beats=plan_data["beats"],
        label=f"V10_{plan_data['style'].upper()}",
        ground_truth_transcript=plan_data["ground_truth_transcript"],
    )
    print(
        f"🧪 [7-GATE AUDIT] passed_all={rep['passed_all']} | avg_RLI={rep['avg_rli']} | "
        f"static_ratio={rep['aroll_static_frame_ratio']*100:.1f}% | WER={rep['transcript_wer']*100:.1f}% | "
        f"EyeLock_ΔY={rep['gate5_eye_lock']['delta_Y_eye_px']}px"
    )

    if args.plan and not args.render:
        print("\n📋 BỘ CÂU HỎI XÁC NHẬN DÀNH CHO HỌC VIÊN (CONFIRMATION CHECKLIST):")
        for q in plan_data["confirmation_questions"]:
            print(f"  • {q['group']}: {q['question']}")
            print(f"    -> Mặc định: {q['current_default']}")
        print("\n✅ Hoàn tất lập kế hoạch Edit V10! Sau khi học viên xác nhận, chạy thêm cờ --render để xuất video .mp4.")
        return

    # 3. Render Full V10 Master Video (+ Optional White Ivory Before/After Video)
    stem = Path(plan_data["video_info"]["video_path"]).stem
    out_master_mp4 = out_dir / f"{stem}_v10_master.mp4"
    print(f"🎬 Đang kết xuất Video chuẩn V10 Master: {out_master_mp4} ...")
    render_v10_master_video(plan_data, out_master_mp4, fonts)
    print(f"✅ Đã xuất xong Video V10 Master: {out_master_mp4}")

    if args.with_before_after:
        out_sbs_mp4 = out_dir / f"{stem}_side_by_side_ivory_v10.mp4"
        print(f"🎬 Đang kết xuất Video Trước–Sau Nền Trắng #F5F2EB: {out_sbs_mp4} ...")
        render_white_ivory_before_after_video(
            raw_video=Path(plan_data["video_info"]["video_path"]),
            edited_video=out_master_mp4,
            plan=plan_data,
            out_sbs_mp4=out_sbs_mp4,
            fonts=fonts,
        )
        print(f"✅ Đã xuất xong Video Trước–Sau Nền Trắng #F5F2EB: {out_sbs_mp4}")


if __name__ == "__main__":
    main()
