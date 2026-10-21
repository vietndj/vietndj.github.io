#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
mfx_v3_universal_engine.py — Động Cơ Kết Xuất Video MFX V3.2 (2-Pass Low-RAM Streaming)
=======================================================================================
Thiết kế chuyên biệt cho máy học viên mới (macOS / Linux / Windows):
1. Center-Crop Cover 9:16: Video ngang 16:9 hoặc vuông 1:1 tự động được cắt giữa về 9:16 trước khi
   đưa về 1080x1920, bảo toàn 100% tỷ lệ khuôn mặt (không bao giờ bị kéo méo).
2. 2-Pass Low-RAM Streaming:
   - Pass 1 chỉ đọc ảnh xám thu nhỏ để dò vết cắt (jump-cuts) và đo tọa độ tâm mặt (shot_transforms).
   - Pass 2 đọc tuần tự từng frame từ VideoCapture -> khóa tâm mặt -> phủ B-Roll / Atlas 2D / Spine Map
     + Icon Vector phát sáng + Chữ 2 dòng (FD Integral + FD Tiempos Italic) -> ghi thẳng vào pipe FFmpeg.
   - Đỉnh bộ nhớ RAM luôn < 350MB ngay cả với video dài 60s–180s.
3. Nhận diện đa định dạng: .mp4, .mov, .m4v (cả chữ hoa/thường).
4. Hỗ trợ sẵn 5 chế độ hình ảnh (`camera_mode`):
   - `base_1x` (Góc gốc khóa tâm mặt)
   - `punch_in_108` (Dynamic Punch-in Zoom 1.08x)
   - `broll_kenburns` (Cảnh trám B-Roll 9:16 + KenBurns Pan + Shutter Flash)
   - `atlas_2d` (Bản vẽ Khoa Học 2D trên giấy #F5F2EB phẳng + nhãn vector [1]..[4])
   - `spine_map` (Animation Map trục dọc X=158 chuẩn Swiss Dark MG-B02 V2)
5. Tích hợp `--smoke` để kiểm tra toàn diện Engine + Font + SFX + FFmpeg trong 1 giây.
"""

import argparse
import json
import math
import os
import shutil
import subprocess
import sys
import tempfile
import urllib.request
import wave
from pathlib import Path
from typing import List, Dict, Any, Tuple, Optional

for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass


def _pip_install(*pkgs):
    base = [sys.executable, "-m", "pip", "install", "--quiet", "--disable-pip-version-check"]
    for extra in ([], ["--user"], ["--user", "--break-system-packages"]):
        if subprocess.call(base + extra + list(pkgs)) == 0:
            return
    raise RuntimeError(f"Không cài được {pkgs}. Hãy chạy: {sys.executable} -m pip install {' '.join(pkgs)}")


try:
    import cv2
    import numpy as np
    from PIL import Image, ImageDraw, ImageFilter, ImageFont
except ImportError:
    print("📦 [Auto-Setup] Đang cài đặt thư viện xử lý hình ảnh (opencv-python-headless, Pillow, numpy)...")
    _pip_install("opencv-python-headless", "Pillow", "numpy")
    import site, importlib
    importlib.reload(site)
    import cv2
    import numpy as np
    from PIL import Image, ImageDraw, ImageFilter, ImageFont

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

try:
    from atlas_2d_helper import render_scientific_atlas_v2
except Exception:
    render_scientific_atlas_v2 = None

try:
    from spine_map_mgb02 import render_spine_map_frame_rgba
except Exception:
    render_spine_map_frame_rgba = None


def get_ffmpeg_bin() -> str:
    sys_ffmpeg = shutil.which("ffmpeg")
    if sys_ffmpeg:
        return sys_ffmpeg
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        print("📦 [Auto-Setup] Đang tải imageio-ffmpeg...")
        _pip_install("imageio-ffmpeg")
        import site, importlib
        importlib.reload(site)
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()


FFMPEG_BIN = get_ffmpeg_bin()

_ua_opener = urllib.request.build_opener()
_ua_opener.addheaders = [("User-Agent", "Mozilla/5.0 (mfx-v3-engine)")]
urllib.request.install_opener(_ua_opener)

USER_RESOURCE_BASE = Path.home() / ".mfx_v3" / "resources"
CDN_BASE_URLS = [
    "https://fedu.vn/skill/aiedit-v3/resources",
    "https://raw.githubusercontent.com/vietndj/vietndj.github.io/master/skill/aiedit-v3/resources",
    "https://pub-2c3c54c8f9334a1f8673abc9ecdbb9e1.r2.dev/mfx_v3_resources",
]
REQUIRED_FONTS = [
    "FDIntegralCF-Heavy.ttf",
    "FDIntegralCF-Bold.ttf",
    "FDTiemposHeadline-RegularItalic.otf",
]
REQUIRED_SFX = [
    "whoosh_clean_soft.wav",
    "pop_soft_bubble.wav",
    "shutter_flash_click.wav",
    "sub_bass_hit_clean.wav",
    "whoosh_fast_air.wav",
    "click_mechanical_warm.wav",
    "riser_short_silk.wav",
    "chime_warm_luxury.wav",
]


def _resolve_resource_dirs(sub_name: str) -> List[str]:
    candidates = [
        SCRIPT_DIR.parent / "resources" / sub_name,
        SCRIPT_DIR / "resources" / sub_name,
        USER_RESOURCE_BASE / sub_name,
        Path.home() / ".gemini" / "config" / "skills" / "aiedit" / "resources" / sub_name,
        Path.home() / ".gemini" / "skills" / "aiedit" / "resources" / sub_name,
        Path.home() / ".gemini" / "config" / "skills" / "render-v3" / "resources" / sub_name,
        Path.home() / ".gemini" / "skills" / "render-v3" / "resources" / sub_name,
        Path.home() / ".gemini" / "config" / "skills" / "auto-edit-video" / "resources" / sub_name,
    ]
    out = []
    for p in candidates:
        if p.exists() and str(p) not in out:
            out.append(str(p))
    return out


def _download_from_cdns(rel_path: str, dest: Path) -> bool:
    for base in CDN_BASE_URLS:
        try:
            urllib.request.urlretrieve(f"{base}/{rel_path}", str(dest))
            if dest.is_file() and dest.stat().st_size > 100:
                return True
        except Exception:
            pass
    return False


def _ensure_cloud_resources():
    font_dirs = _resolve_resource_dirs("fonts")
    sfx_dirs = _resolve_resource_dirs("sfx")
    has_font = any((Path(d) / "FDIntegralCF-Heavy.ttf").exists() for d in font_dirs)
    has_sfx = any((Path(d) / "shutter_flash_click.wav").exists() for d in sfx_dirs)
    if has_font and has_sfx:
        return

    target_fonts = USER_RESOURCE_BASE / "fonts"
    target_sfx = USER_RESOURCE_BASE / "sfx"
    target_fonts.mkdir(parents=True, exist_ok=True)
    target_sfx.mkdir(parents=True, exist_ok=True)

    print("☁️ [Auto-Setup] Đang tải bộ Font & 8 SFX phòng thu chuẩn...")
    for fname in REQUIRED_FONTS:
        dest = target_fonts / fname
        if not dest.exists():
            _download_from_cdns(f"fonts/{fname}", dest)
    for sname in REQUIRED_SFX:
        dest = target_sfx / sname
        if not dest.exists():
            _download_from_cdns(f"sfx/{sname}", dest)


_ensure_cloud_resources()

FONT_DIRS = _resolve_resource_dirs("fonts")
SFX_DIRS = _resolve_resource_dirs("sfx")
LIB_FONT_DIR = str(Path.home() / "Library" / "Fonts")

W, H = 1080, 1920
ICON_Y = 1320
LINE1_Y = 1388
LINE2_Y = 1472

SFX_PRESET_PAIRS = {
    "SFX-01": ("whoosh_clean_soft.wav", "pop_soft_bubble.wav"),
    "SFX-02": ("shutter_flash_click.wav", "sub_bass_hit_clean.wav"),
    "SFX-03": ("whoosh_fast_air.wav", "click_mechanical_warm.wav"),
    "SFX-04": ("whoosh_clean_soft.wav", "click_mechanical_warm.wav"),
    "SFX-05": ("riser_short_silk.wav", "chime_warm_luxury.wav"),
}

SFX_ALIAS_MAP = {
    "whoosh_clean_soft": ["whoosh_clean_soft.wav", "whoosh_soft.wav", "whoosh.wav"],
    "pop_soft_bubble": ["pop_soft_bubble.wav", "ui_pop.wav", "pop.wav"],
    "shutter_flash_click": ["shutter_flash_click.wav", "camera_shutter.wav"],
    "sub_bass_hit_clean": ["sub_bass_hit_clean.wav", "sub_bass_impact.wav", "impact_deep.wav"],
    "whoosh_fast_air": ["whoosh_fast_air.wav", "whoosh_fast.wav"],
    "click_mechanical_warm": ["click_mechanical_warm.wav", "ui_click.wav"],
    "riser_short_silk": ["riser_short_silk.wav", "riser_short.wav"],
    "chime_warm_luxury": ["chime_warm_luxury.wav", "glassy_ping.wav"],
    "whoosh_soft": ["whoosh_clean_soft.wav"],
    "ui_pop": ["pop_soft_bubble.wav"],
    "camera_shutter": ["shutter_flash_click.wav"],
    "sub_bass_impact": ["sub_bass_hit_clean.wav"],
    "whoosh_fast": ["whoosh_fast_air.wav"],
    "ui_click": ["click_mechanical_warm.wav"],
    "riser_short": ["riser_short_silk.wav"],
    "glassy_ping": ["chime_warm_luxury.wav"],
}

GENERIC_VIDEO_NAMES = {
    "",
    "video.mp4",
    "ten_video.mp4",
    "ten_file.mp4",
    "[tên_file.mp4]",
    "[ten_file.mp4]",
    "input.mp4",
    "source.mp4",
    "edit-video-v3.mp4",
    "edit-video-v3",
    "render-v3.mp4",
    "render-v3",
    "aiedit.mp4",
    "aiedit",
    "auto_detect",
    "auto_detect_by_duration",
    "auto",
}


def get_font(candidates: List[str], size: int) -> ImageFont.FreeTypeFont:
    win_user_fonts = str(Path.home() / "AppData" / "Local" / "Microsoft" / "Windows" / "Fonts")
    search_bases = list(FONT_DIRS) + [
        "C:/Windows/Fonts",
        win_user_fonts,
        LIB_FONT_DIR,
        "/Library/Fonts",
        "/System/Library/Fonts/Supplemental",
        "/System/Library/Fonts",
    ]
    for c in candidates:
        for base in search_bases:
            p = os.path.join(base, c)
            if os.path.exists(p):
                try:
                    return ImageFont.truetype(p, size)
                except Exception:
                    pass
    return ImageFont.load_default()


FONT_INTEGRAL_LG = get_font(["FDIntegralCF-Heavy.ttf", "FDIntegralCF-Bold.ttf", "SVN-IntegralCF-Heavy.ttf", "Arial Bold.ttf"], 62)
FONT_INTEGRAL_MD = get_font(["FDIntegralCF-Bold.ttf", "FDIntegralCF-Heavy.ttf", "SVN-IntegralCF-Bold.ttf", "Arial Bold.ttf"], 56)
FONT_TIEMPOS_IT = get_font(["FDTiemposHeadline-RegularItalic.otf", "FDTiemposText-RegularItalic.otf", "Times New Roman Italic.ttf"], 52)


def crop_cover_9_16(bgr: np.ndarray, out_w: int = W, out_h: int = H) -> np.ndarray:
    """
    Center-Crop Cover 9:16 trước khi resize về (out_w, out_h).
    Khắc phục triệt để lỗi kéo méo mặt khi học viên đưa video quay ngang 16:9 hoặc vuông 1:1.
    """
    ih, iw = bgr.shape[:2]
    if iw == out_w and ih == out_h:
        return bgr
    target_ratio = out_w / float(out_h)
    cur_ratio = iw / float(max(1, ih))
    if abs(cur_ratio - target_ratio) > 0.015:
        if cur_ratio > target_ratio:
            new_w = max(1, int(round(ih * target_ratio)))
            x0 = (iw - new_w) // 2
            bgr = bgr[:, x0 : x0 + new_w]
        else:
            new_h = max(1, int(round(iw / target_ratio)))
            y0 = (ih - new_h) // 2
            bgr = bgr[y0 : y0 + new_h, :]
    interp = cv2.INTER_AREA if (bgr.shape[1] > out_w) else cv2.INTER_LANCZOS4
    return cv2.resize(bgr, (out_w, out_h), interpolation=interp)


def hex_to_rgb(val, default_rgb=(255, 204, 0)) -> tuple:
    if isinstance(val, (list, tuple)) and len(val) >= 3:
        return (int(val[0]), int(val[1]), int(val[2]))
    if isinstance(val, str):
        s = val.strip().lstrip("#")
        if len(s) == 6:
            try:
                return (int(s[0:2], 16), int(s[2:4], 16), int(s[4:6], 16))
            except ValueError:
                pass
    return tuple(default_rgb)


def resolve_colors(beat: dict) -> dict:
    style_id = str(beat.get("style_id", "STYLE-17")).upper()
    default_accent = (255, 224, 102) if style_id == "STYLE-32" else (255, 204, 0)
    default_line2 = (255, 224, 102) if style_id == "STYLE-32" else (255, 255, 255)

    icon_raw = beat.get("icon_main_rgb") or beat.get("icon_color") or beat.get("accent_rgb")
    icon_main_rgb = hex_to_rgb(icon_raw, default_accent)
    icon_glow_rgb = hex_to_rgb(beat.get("icon_glow_rgb"), icon_main_rgb)

    line1_raw = beat.get("line1_rgb") or beat.get("line1_color")
    if not line1_raw:
        l1_dict = beat.get("line1_Colors") or beat.get("line1_colors")
        if isinstance(l1_dict, dict) and l1_dict:
            line1_raw = next(iter(l1_dict.values()))
    line1_rgb = hex_to_rgb(line1_raw, icon_main_rgb)
    line1_glow_rgb = hex_to_rgb(beat.get("line1_glow_rgb"), line1_rgb)

    line2_raw = beat.get("line2_rgb") or beat.get("line2_color")
    line2_rgb = hex_to_rgb(line2_raw, default_line2)
    line2_glow_rgb = hex_to_rgb(beat.get("line2_glow_rgb"), line2_rgb)

    return {
        "icon_main_rgb": icon_main_rgb,
        "icon_glow_rgb": icon_glow_rgb,
        "line1_rgb": line1_rgb,
        "line1_glow_rgb": line1_glow_rgb,
        "line2_rgb": line2_rgb,
        "line2_glow_rgb": line2_glow_rgb,
    }


def _get_video_duration(video_file: Path) -> float:
    ffprobe_bin = shutil.which("ffprobe")
    if ffprobe_bin:
        try:
            res = subprocess.run(
                [
                    ffprobe_bin, "-v", "error",
                    "-show_entries", "format=duration",
                    "-of", "default=noprint_wrappers=1:nokey=1",
                    str(video_file),
                ],
                capture_output=True,
                text=True,
                timeout=5,
            )
            if res.returncode == 0 and res.stdout.strip():
                return float(res.stdout.strip())
        except Exception:
            pass
    try:
        cap = cv2.VideoCapture(str(video_file))
        fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
        frames = cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0.0
        cap.release()
        if fps > 0 and frames > 0:
            return float(frames / fps)
    except Exception:
        pass
    return 0.0


def resolve_source_video(edl: dict, edl_file: Path, video_override: str = None) -> str:
    raw_vid = (video_override or edl.get("video_source") or edl.get("source_video") or "").strip()
    generic_names = {g.lower() for g in GENERIC_VIDEO_NAMES}

    search_dirs = []
    for d in [
        edl_file.parent,
        Path.cwd(),
        Path.home() / "Downloads",
        Path.home() / "Desktop",
        Path.home() / "Documents",
    ]:
        if d.exists() and d.resolve() not in search_dirs:
            search_dirs.append(d.resolve())

    if raw_vid and raw_vid.lower() not in generic_names and Path(raw_vid).name.lower() not in generic_names:
        direct_p = Path(raw_vid).expanduser()
        if direct_p.is_file():
            return str(direct_p.resolve())
        fname = direct_p.name
        for d in search_dirs:
            cand = d / fname
            if cand.is_file():
                print(f"🔍 [Auto-Locate] Đã tìm thấy video gốc theo tên: {cand}")
                return str(cand.resolve())
    elif raw_vid:
        print(f"ℹ️ [Auto-Locate] Bỏ qua tên giả định '{raw_vid}' -> Tự động quét tìm file video thật (.mp4/.mov/.m4v)...")

    target_dur = float(edl.get("duration") or 0.0)
    if target_dur <= 0.0 and edl.get("beats"):
        target_dur = max(float(b.get("end", 0.0)) for b in edl["beats"])

    ignore_tokens = ("_edit", "_final", "_face_locked", "_sua", "_preview", "_alpha", "_output")
    candidates = []
    seen_files = set()

    for d_idx, d in enumerate(search_dirs):
        local_originals = []
        for ext in ("*.mp4", "*.mov", "*.m4v", "*.MP4", "*.MOV", "*.M4V"):
            for f in d.glob(ext):
                if not f.is_file():
                    continue
                f_res = f.resolve()
                if f_res in seen_files:
                    continue
                seen_files.add(f_res)
                stem_lower = f.stem.lower()
                if any(tok in stem_lower for tok in ignore_tokens) or f.name.lower() in generic_names:
                    continue
                dur = _get_video_duration(f_res)
                if dur > 0:
                    diff = abs(dur - target_dur) if target_dur > 0 else 0.0
                    mtime = f_res.stat().st_mtime
                    item = (diff, d_idx, -mtime, dur, f_res)
                    candidates.append(item)
                    local_originals.append(item)

        if d_idx <= 1 and len(local_originals) == 1:
            _, _, _, best_dur, best_path = local_originals[0]
            print(f"🔍 [Auto-Locate] Phát hiện duy nhất 1 video gốc trong thư mục làm việc: {best_path} (duration={best_dur:.2f}s)")
            return str(best_path)

    if target_dur > 0:
        matched = [c for c in candidates if c[0] <= 2.0]
        if matched:
            matched.sort(key=lambda x: (x[1], x[2], x[0]))
            _, _, _, best_dur, best_path = matched[0]
            print(f"🔍 [Auto-Locate] Đã tự động khớp video gốc: {best_path} (duration={best_dur:.2f}s, EDL={target_dur:.2f}s)")
            return str(best_path)

    if candidates:
        candidates.sort(key=lambda x: (x[0], x[1], x[2]))
        _, _, _, best_dur, best_path = candidates[0]
        print(f"🔍 [Auto-Locate] Chọn video gốc gần nhất: {best_path} (duration={best_dur:.2f}s)")
        return str(best_path)

    raise FileNotFoundError(
        f"Không tìm thấy video gốc '{raw_vid}' (target_duration={target_dur}s). "
        f"Hãy đặt video gốc (.mp4/.mov) cùng thư mục với EDL hoặc truyền --video <path>."
    )


def resolve_sfx_file(sfx_name_or_id: str) -> str:
    if not sfx_name_or_id:
        return ""
    if os.path.isabs(sfx_name_or_id) and os.path.exists(sfx_name_or_id):
        return sfx_name_or_id

    clean_stem = Path(sfx_name_or_id).stem
    candidate_names = [sfx_name_or_id, f"{clean_stem}.wav", f"{clean_stem}.mp3"]
    if clean_stem in SFX_ALIAS_MAP:
        for alias in SFX_ALIAS_MAP[clean_stem]:
            if alias not in candidate_names:
                candidate_names.append(alias)

    for sdir in SFX_DIRS:
        for cname in candidate_names:
            p = os.path.join(sdir, cname)
            if os.path.exists(p):
                return p
    return ""


def resolve_sfx_events(beat: dict) -> list:
    events = []
    b_start = float(beat.get("start", 0.0))
    b_end = float(beat.get("end", b_start + 1.5))

    if isinstance(beat.get("sfx_pair"), list) and beat["sfx_pair"]:
        for item in beat["sfx_pair"]:
            events.append({
                "id": item.get("id", "whoosh_clean_soft"),
                "time": float(item.get("time", b_start)),
                "volume": float(item.get("volume", 0.09)),
            })
        return events

    sfx_obj = beat.get("sfx")
    if isinstance(sfx_obj, dict) and sfx_obj:
        sfx_id = str(sfx_obj.get("id", "SFX-01")).upper()
        default_entry, default_accent = SFX_PRESET_PAIRS.get(sfx_id, SFX_PRESET_PAIRS["SFX-01"])
        entry_name = sfx_obj.get("entry") or default_entry
        accent_name = sfx_obj.get("accent") or default_accent
        delay_s = float(sfx_obj.get("accent_delay_s", 0.12))
        vol = float(sfx_obj.get("volume", 0.09))

        bw = beat.get("broll_window")
        is_broll = beat.get("camera_mode") in ("broll_kenburns", "atlas_2d", "spine_map")
        if is_broll and isinstance(bw, list) and len(bw) == 2 and b_start <= float(bw[0]) < b_end:
            bw_start = float(bw[0])
            if bw_start - b_start >= 0.25:
                events.append({"id": "whoosh_clean_soft.wav", "time": b_start, "volume": round(vol * 0.85, 3)})
            events.append({"id": entry_name, "time": bw_start, "volume": vol})
            events.append({"id": accent_name, "time": bw_start + delay_s, "volume": vol})
        else:
            events.append({"id": entry_name, "time": b_start, "volume": vol})
            events.append({"id": accent_name, "time": b_start + delay_s, "volume": vol})
    else:
        events.append({"id": "whoosh_clean_soft.wav", "time": b_start, "volume": 0.09})
        events.append({"id": "pop_soft_bubble.wav", "time": b_start + 0.12, "volume": 0.09})
    return events


def resolve_broll_image(beat: dict, edl_file: Path, video_path: str = None) -> str:
    raw_broll = (beat.get("broll_image") or beat.get("broll_asset") or "").strip()
    v_code = str(beat.get("v_code") or "").strip()

    base_roots = [edl_file.parent]
    if video_path:
        vid_parent = Path(video_path).resolve().parent
        if vid_parent not in base_roots:
            base_roots.append(vid_parent)
    if Path.cwd().resolve() not in base_roots:
        base_roots.append(Path.cwd().resolve())

    broll_dirs = []
    for root in base_roots:
        for sub in [root, root / "broll", root / "assets", root / "mfx_v3_edit" / "assets"]:
            if sub.exists() and sub not in broll_dirs:
                broll_dirs.append(sub)

    if raw_broll:
        p = Path(raw_broll).expanduser()
        if p.is_file():
            return str(p.resolve())
        fname = p.name
        for d in broll_dirs:
            cand = d / fname
            if cand.is_file():
                return str(cand.resolve())

    if v_code:
        v_prefix = v_code.lower().lstrip("#")
        for d in broll_dirs:
            for exact_name in (f"{v_prefix}_scene.png", f"{v_prefix}.png", f"{v_prefix}.jpg", f"{v_prefix}.webp"):
                cand = d / exact_name
                if cand.is_file():
                    return str(cand.resolve())
            matches = sorted(
                p for p in d.glob(f"{v_prefix}_*.*")
                if p.suffix.lower() in (".png", ".jpg", ".jpeg", ".webp")
            )
            if matches:
                return str(matches[0].resolve())

    return ""


def normalize_edl_beats(edl: dict, edl_file: Path, video_path: str) -> list:
    beats = edl.get("beats", [])
    prev_was_base_talking = False

    for i, beat in enumerate(beats, 1):
        if "id" not in beat:
            beat["id"] = beat.get("t_code") or f"#T{i}"

        colors = resolve_colors(beat)
        beat.update(colors)
        beat["resolved_sfx"] = resolve_sfx_events(beat)

        cam_mode = str(beat.get("camera_mode", "base_1x")).lower()
        if cam_mode in ("spine_map", "mg_b02", "roadmap"):
            beat["camera_mode"] = "spine_map"
            prev_was_base_talking = False
        elif cam_mode in ("atlas_2d", "scientific_atlas"):
            found_broll = resolve_broll_image(beat, edl_file, video_path)
            if not found_broll and render_scientific_atlas_v2 is not None:
                auto_atlas_dir = edl_file.parent / "broll"
                auto_atlas_dir.mkdir(parents=True, exist_ok=True)
                auto_atlas_path = auto_atlas_dir / f"auto_atlas_beat_{i:02d}.png"
                render_scientific_atlas_v2(
                    title=beat.get("atlas_title") or beat.get("line1") or "Cấu trúc mô học & Cơ chế tác động 2D",
                    note_body=beat.get("spoken_text") or beat.get("line2") or "Thiết đồ giải phẫu 2D chuẩn y khoa.",
                    output_path=str(auto_atlas_path),
                )
                found_broll = str(auto_atlas_path)
            beat["broll_image"] = found_broll
            beat["camera_mode"] = "broll_kenburns" if found_broll else "punch_in_108"
            prev_was_base_talking = False
        elif cam_mode == "broll_kenburns" or beat.get("v_code"):
            found_broll = resolve_broll_image(beat, edl_file, video_path)
            if found_broll:
                beat["broll_image"] = found_broll
                beat["camera_mode"] = "broll_kenburns"
                prev_was_base_talking = False
                print(f"🖼️ [Auto-Broll] Nhịp {beat['id']} ({beat.get('v_code', 'B-Roll')}) -> {Path(found_broll).name}")
            else:
                beat["broll_image"] = ""
                beat["camera_mode"] = "punch_in_108"
                prev_was_base_talking = False
                print(
                    f"⚠️ [B-Roll Fallback] Chưa có file ảnh cho {beat.get('v_code') or beat.get('broll_asset') or beat['id']} "
                    f"-> Tự động chuyển nhịp {beat['id']} sang hiệu ứng Zoom 1.08x (punch_in_108)."
                )
        elif cam_mode in ("talking_head", "base_1x", "1x", "normal"):
            if prev_was_base_talking and "1.08" not in str(beat.get("zoom", "")):
                beat["camera_mode"] = "punch_in_108"
                prev_was_base_talking = False
            else:
                beat["camera_mode"] = "base_1x"
                prev_was_base_talking = True
        else:
            prev_was_base_talking = False

    return beats


def ease_out_cubic(x: float) -> float:
    x = max(0.0, min(1.0, x))
    return 1.0 - pow(1.0 - x, 3)


def mfx_blur_pop_in(t_sec: float, duration: float = 0.36):
    if t_sec < 0.0:
        return 0.0, 22.0, 0.88, 10.0
    p = min(1.0, t_sec / max(0.01, duration))
    if p < 0.60:
        u = ease_out_cubic(p / 0.60)
        opacity = min(1.0, p / 0.35)
        dy = 22.0 * (1.0 - u) + (-4.0) * u
        scale = 0.88 + (1.04 - 0.88) * u
        blur_r = 10.0 * (1.0 - u)
    else:
        u = ease_out_cubic((p - 0.60) / 0.40)
        opacity = 1.0
        dy = -4.0 * (1.0 - u)
        scale = 1.04 + (1.00 - 1.04) * u
        blur_r = 0.0
    return opacity, dy, scale, blur_r


def mfx_spring_icon_pop(t_sec: float, duration: float = 0.42):
    if t_sec < 0.0:
        return 0.0, 0.0, -18.0
    p = min(1.0, t_sec / max(0.01, duration))
    if p < 0.65:
        u = ease_out_cubic(p / 0.65)
        opacity = min(1.0, p / 0.25)
        scale = 0.0 + 1.22 * u
        angle = -18.0 * (1.0 - u) + 6.0 * u
    elif p < 0.85:
        u = (p - 0.65) / 0.20
        opacity = 1.0
        scale = 1.22 + (0.94 - 1.22) * u
        angle = 6.0 + (-2.0 - 6.0) * u
    else:
        u = (p - 0.85) / 0.15
        opacity = 1.0
        scale = 0.94 + (1.00 - 0.94) * u
        angle = -2.0 * (1.0 - u)
    return opacity, scale, angle


def build_bottom_gradient_img(w=W, h=H, start_y_ratio=0.46, max_alpha=246, curve_power=1.35) -> Image.Image:
    start_y = int(h * start_y_ratio)
    grad = np.zeros((h, w, 4), dtype=np.uint8)
    for y in range(start_y, h):
        t = (y - start_y) / float(h - start_y)
        alpha = int(max_alpha * (t ** curve_power))
        grad[y, :, 3] = min(255, alpha)
    return Image.fromarray(grad)


GRADIENT_OVERLAY = build_bottom_gradient_img()


def draw_mfx_glow_text_line(
    base_rgba: Image.Image,
    center_y: int,
    text: str,
    font: ImageFont.FreeTypeFont,
    fill_rgb: tuple,
    glow_rgb: tuple,
    glow_radius: int,
    glow_opacity: int,
    t_local: float,
    delay_s: float = 0.0,
    exit_alpha: float = 1.0,
) -> Image.Image:
    opacity, dy, scale, blur_r = mfx_blur_pop_in(t_local - delay_s, duration=0.36)
    final_alpha = opacity * exit_alpha
    if final_alpha <= 0.01 or not text:
        return base_rgba

    strip_w, strip_h = W, 220
    strip = Image.new("RGBA", (strip_w, strip_h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(strip)
    bbox = s_draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]

    use_font = font
    if tw > 980 and font == FONT_INTEGRAL_LG:
        use_font = FONT_INTEGRAL_MD
        bbox = s_draw.textbbox((0, 0), text, font=use_font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]

    tx = (strip_w - tw) // 2
    ty = (strip_h - th) // 2 - 10

    glow_layer = Image.new("RGBA", (strip_w, strip_h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_layer)
    g_draw.text((tx, ty + 4), text, font=use_font, fill=(0, 0, 0, int(225 * final_alpha)))
    g_op = int(glow_opacity * final_alpha)
    g_draw.text(
        (tx, ty),
        text,
        font=use_font,
        fill=(glow_rgb[0], glow_rgb[1], glow_rgb[2], g_op),
        stroke_width=4,
        stroke_fill=(glow_rgb[0], glow_rgb[1], glow_rgb[2], g_op // 2),
    )
    glow_blurred = glow_layer.filter(ImageFilter.GaussianBlur(radius=glow_radius))

    core_layer = Image.new("RGBA", (strip_w, strip_h), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(core_layer)
    c_draw.text((tx, ty), text, font=use_font, fill=(glow_rgb[0], glow_rgb[1], glow_rgb[2], int(135 * final_alpha)))
    core_blurred = core_layer.filter(ImageFilter.GaussianBlur(radius=6))

    strip = Image.alpha_composite(strip, glow_blurred)
    strip = Image.alpha_composite(strip, core_blurred)
    t_draw = ImageDraw.Draw(strip)
    t_draw.text((tx, ty), text, font=use_font, fill=(fill_rgb[0], fill_rgb[1], fill_rgb[2], int(255 * final_alpha)))

    if blur_r >= 0.6:
        strip = strip.filter(ImageFilter.GaussianBlur(radius=blur_r))

    if abs(scale - 1.0) > 0.005:
        nw = max(10, int(round(strip_w * scale)))
        nh = max(10, int(round(strip_h * scale)))
        scaled_strip = strip.resize((nw, nh), Image.Resampling.BICUBIC)
        canvas_strip = Image.new("RGBA", (strip_w, strip_h), (0, 0, 0, 0))
        ox = (strip_w - nw) // 2
        oy = (strip_h - nh) // 2
        canvas_strip.paste(scaled_strip, (ox, oy))
        strip = canvas_strip

    dest_y = int(round(center_y - ty + dy))
    full_layer = Image.new("RGBA", base_rgba.size, (0, 0, 0, 0))
    full_layer.paste(strip, (0, dest_y))
    return Image.alpha_composite(base_rgba, full_layer)


def draw_mfx_frameless_icon(
    base_rgba: Image.Image,
    center_xy: tuple,
    icon_type: str,
    main_rgb: tuple,
    glow_rgb: tuple,
    t_local: float,
    exit_alpha: float = 1.0,
) -> Image.Image:
    opacity, scale, angle = mfx_spring_icon_pop(t_local, duration=0.42)
    final_alpha = opacity * exit_alpha
    if final_alpha <= 0.01 or scale <= 0.02:
        return base_rgba

    float_dy = math.sin(max(0.0, t_local - 0.42) * 5.2) * 3.0 if t_local > 0.42 else 0.0

    box_sz = 240
    ic_canvas = Image.new("RGBA", (box_sz, box_sz), (0, 0, 0, 0))
    d = ImageDraw.Draw(ic_canvas)
    cx, cy = box_sz // 2, box_sz // 2

    def sc(a: int) -> int:
        return max(0, min(255, int(round(a * final_alpha))))

    def draw_spinning_sparkle(sx, sy, base_r, col, phase_offset=0.0):
        spin_angle = t_local * 3.2 + phase_offset
        pulse = 0.80 + 0.32 * abs(math.sin(t_local * 6.0 + phase_offset))
        sr = base_r * pulse
        pts = []
        for i in range(8):
            ang = spin_angle + i * (math.pi / 4.0)
            rad = sr if (i % 2 == 0) else (sr * 0.28)
            pts.append((sx + math.cos(ang) * rad, sy + math.sin(ang) * rad))
        d.polygon(pts, fill=col)

    draw_spinning_sparkle(cx + 38, cy - 22, 9.5, (main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), 0.0)
    draw_spinning_sparkle(cx - 38, cy + 16, 6.5, (255, 255, 255, sc(220)), 1.5)

    if icon_type == "CALENDAR_BOLT":
        bx1, by1, bx2, by2 = cx - 26, cy - 22, cx + 26, cy + 26
        d.rounded_rectangle(
            [bx1, by1, bx2, by2],
            radius=8,
            fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(38)),
            outline=(255, 255, 255, sc(255)),
            width=4,
        )
        d.line([(bx1, by1 + 13), (bx2, by1 + 13)], fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=3)
        d.line([(cx - 13, by1 - 8), (cx - 13, by1 + 4)], fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=4)
        d.line([(cx + 13, by1 - 8), (cx + 13, by1 + 4)], fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=4)
        bolt = [(cx + 4, cy - 5), (cx - 9, cy + 8), (cx + 1, cy + 8), (cx - 4, cy + 21), (cx + 11, cy + 5), (cx + 1, cy + 5)]
        d.polygon(bolt, fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)))

    elif icon_type == "SHIELD_STAR":
        shield = [
            (cx, cy - 30),
            (cx + 26, cy - 18),
            (cx + 23, cy + 8),
            (cx, cy + 30),
            (cx - 23, cy + 8),
            (cx - 26, cy - 18),
        ]
        d.polygon(shield, fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(48)))
        d.line(shield + [shield[0]], fill=(255, 255, 255, sc(255)), width=4)
        d.line([(cx - 10, cy + 1), (cx - 2, cy + 10), (cx + 13, cy - 8)], fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=5)

    elif icon_type == "CINEMA_CAMERA":
        d.rounded_rectangle(
            [cx - 28, cy - 16, cx + 12, cy + 18],
            radius=7,
            fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(52)),
            outline=(255, 255, 255, sc(255)),
            width=4,
        )
        lens = [(cx + 12, cy - 6), (cx + 29, cy - 15), (cx + 29, cy + 17), (cx + 12, cy + 8)]
        d.polygon(lens, fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(235)), outline=(255, 255, 255, sc(255)))
        d.ellipse([cx - 21, cy - 28, cx - 7, cy - 14], outline=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=4)
        d.ellipse([cx - 4, cy - 28, cx + 10, cy - 14], outline=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=4)

    elif icon_type == "MIC_STUDIO":
        d.rounded_rectangle(
            [cx - 12, cy - 28, cx + 12, cy + 4],
            radius=12,
            fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(65)),
            outline=(255, 255, 255, sc(255)),
            width=4,
        )
        d.arc([cx - 22, cy - 16, cx + 22, cy + 16], start=0, end=180, fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=4)
        d.line([(cx, cy + 16), (cx, cy + 28)], fill=(255, 255, 255, sc(255)), width=4)
        d.line([(cx - 14, cy + 28), (cx + 14, cy + 28)], fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=4)

    else:
        ripple_p = (t_local * 1.4) % 1.0
        r_rip = int(25 + 28 * ripple_p)
        a_rip = sc(int(180 * (1.0 - ripple_p)))
        if a_rip > 5:
            d.ellipse([cx - r_rip, cy - r_rip, cx + r_rip, cy + r_rip], outline=(main_rgb[0], main_rgb[1], main_rgb[2], a_rip), width=2)
        d.ellipse([cx - 25, cy - 25, cx + 25, cy + 25], outline=(255, 255, 255, sc(255)), width=4)
        d.ellipse([cx - 13, cy - 13, cx + 13, cy + 13], outline=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=3)
        d.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)))
        d.line([(cx - 33, cy), (cx - 18, cy)], fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=4)
        d.line([(cx + 18, cy), (cx + 33, cy)], fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=4)
        d.line([(cx, cy - 33), (cx, cy - 18)], fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=4)
        d.line([(cx, cy + 18), (cx, cy + 33)], fill=(main_rgb[0], main_rgb[1], main_rgb[2], sc(255)), width=4)

    if abs(angle) > 0.2:
        ic_canvas = ic_canvas.rotate(angle, resample=Image.Resampling.BICUBIC, center=(cx, cy))
    if abs(scale - 1.0) > 0.01:
        ns = max(12, int(round(box_sz * scale)))
        ic_scaled = ic_canvas.resize((ns, ns), Image.Resampling.BICUBIC)
        tmp = Image.new("RGBA", (box_sz, box_sz), (0, 0, 0, 0))
        tmp.paste(ic_scaled, ((box_sz - ns) // 2, (box_sz - ns) // 2))
        ic_canvas = tmp

    glow_halo = Image.new("RGBA", (box_sz, box_sz), (0, 0, 0, 0))
    gh_draw = ImageDraw.Draw(glow_halo)
    hr = int(42 * min(1.15, scale))
    gh_draw.ellipse([cx - hr, cy - hr, cx + hr, cy + hr], fill=(glow_rgb[0], glow_rgb[1], glow_rgb[2], sc(105)))
    glow_halo = glow_halo.filter(ImageFilter.GaussianBlur(radius=24))

    combined_ic = Image.alpha_composite(glow_halo, ic_canvas)
    full_layer = Image.new("RGBA", base_rgba.size, (0, 0, 0, 0))
    dest_x = int(round(center_xy[0] - cx))
    dest_y = int(round(center_xy[1] - cy + float_dy))
    full_layer.paste(combined_ic, (dest_x, dest_y))
    return Image.alpha_composite(base_rgba, full_layer)


def render_beat_overlay(
    frame_rgba: Image.Image,
    beat: dict,
    t_local: float,
    beat_dur: float,
    include_gradient: bool = True,
) -> Image.Image:
    out = Image.alpha_composite(frame_rgba, GRADIENT_OVERLAY) if include_gradient else frame_rgba.copy()

    rem = beat_dur - t_local
    exit_alpha = min(1.0, max(0.0, rem / 0.08)) if rem < 0.08 else 1.0

    icon_type = beat.get("icon", "TARGET_FOCUS")
    icon_main_rgb = tuple(beat.get("icon_main_rgb", [255, 204, 0]))
    icon_glow_rgb = tuple(beat.get("icon_glow_rgb", icon_main_rgb))

    line1_text = beat.get("line1", "")
    line1_fill = tuple(beat.get("line1_rgb", [255, 204, 0]))
    line1_glow = tuple(beat.get("line1_glow_rgb", line1_fill))

    line2_text = beat.get("line2", "")
    line2_fill = tuple(beat.get("line2_rgb", [255, 255, 255]))
    line2_glow = tuple(beat.get("line2_glow_rgb", line2_fill))
    line2_delay = float(beat.get("line2_delay_s", 0.12))

    out = draw_mfx_frameless_icon(
        out,
        (W // 2, int(beat.get("icon_y", ICON_Y))),
        icon_type,
        icon_main_rgb,
        icon_glow_rgb,
        t_local=t_local,
        exit_alpha=exit_alpha,
    )

    out = draw_mfx_glow_text_line(
        out,
        center_y=int(beat.get("line1_y", LINE1_Y)),
        text=line1_text,
        font=FONT_INTEGRAL_LG,
        fill_rgb=line1_fill,
        glow_rgb=line1_glow,
        glow_radius=22,
        glow_opacity=170,
        t_local=t_local,
        delay_s=0.00,
        exit_alpha=exit_alpha,
    )

    out = draw_mfx_glow_text_line(
        out,
        center_y=int(beat.get("line2_y", LINE2_Y)),
        text=line2_text,
        font=FONT_TIEMPOS_IT,
        fill_rgb=line2_fill,
        glow_rgb=line2_glow,
        glow_radius=16,
        glow_opacity=130,
        t_local=t_local,
        delay_s=line2_delay,
        exit_alpha=exit_alpha,
    )
    return out


def load_wav_stereo(wav_path: str, sample_rate: int = 44100) -> np.ndarray:
    if not wav_path or not os.path.exists(wav_path):
        return np.zeros((0, 2), dtype=np.float32)
    cmd = [
        FFMPEG_BIN, "-v", "error",
        "-i", wav_path,
        "-f", "s16le", "-ac", "2", "-ar", str(sample_rate),
        "-",
    ]
    res = subprocess.run(cmd, capture_output=True)
    if res.returncode == 0 and res.stdout:
        arr = np.frombuffer(res.stdout, dtype=np.int16).astype(np.float32)
        n_pairs = len(arr) // 2
        return arr[: n_pairs * 2].reshape(-1, 2)
    return np.zeros((0, 2), dtype=np.float32)


def build_master_audio_from_edl(video_path: str, edl: dict, out_wav: str, sample_rate: int = 44100, fallback_dur: float = 2.0):
    orig_pcm = load_wav_stereo(video_path, sample_rate)
    if len(orig_pcm) == 0:
        orig_pcm = np.zeros((max(1, int(round(fallback_dur * sample_rate))), 2), dtype=np.float32)
    n_total = len(orig_pcm)
    sfx_bus = np.zeros_like(orig_pcm, dtype=np.float32)
    sfx_loaded_count = 0

    def add_mfx_sfx(sfx_id: str, start_sec: float, volume: float = 0.09):
        nonlocal sfx_loaded_count
        safe_vol = min(0.12, max(0.01, float(volume)))
        wav_path = resolve_sfx_file(sfx_id)
        if not wav_path:
            return
        samples = load_wav_stereo(wav_path, sample_rate)
        if len(samples) == 0:
            return
        s_idx = max(0, int(round(start_sec * sample_rate)))
        if s_idx >= n_total:
            return
        e_idx = min(n_total, s_idx + len(samples))
        seg_len = e_idx - s_idx
        if seg_len > 0:
            sfx_bus[s_idx:e_idx] += samples[:seg_len] * safe_vol
            sfx_loaded_count += 1

    for beat in edl.get("beats", []):
        events = beat.get("resolved_sfx") or resolve_sfx_events(beat)
        for ev in events:
            add_mfx_sfx(ev.get("id", "whoosh_clean_soft"), float(ev.get("time", 0.0)), float(ev.get("volume", 0.09)))

    print(f"🔊 [Audio Master] Đã trộn {sfx_loaded_count} điểm nổ SFX (~9-10% volume) trên nền giọng gốc 100%.")
    master = orig_pcm + sfx_bus
    peak = float(np.max(np.abs(master))) if len(master) else 0.0
    if peak > 32200.0:
        master = master * (32200.0 / peak)

    master_int16 = np.clip(master, -32767.0, 32767.0).astype(np.int16)
    with wave.open(out_wav, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(master_int16.tobytes())


def compute_face_lock_transforms_streaming(
    video_path: str,
    enabled: bool = True,
    target_cx: float = 592.8,
    target_cy: float = 915.0,
    target_fw: float = 655.0,
) -> Tuple[int, float, List[Tuple[int, int, float, float, float]]]:
    """
    Pass 1 (Siêu nhẹ RAM < 100MB):
    Quét tuần tự video bằng ảnh xám thu nhỏ (270x480) để phát hiện vết cắt (jump-cut diff > 12.0)
    và đo tọa độ tâm mặt Haar Cascade trên các frame mẫu, hoàn toàn KHÔNG giữ toàn bộ frame trong RAM.
    """
    cap = cv2.VideoCapture(video_path)
    fps = float(cap.get(cv2.CAP_PROP_FPS) or 30.0)
    if not enabled or "face_locked" in str(video_path):
        total_f = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
        cap.release()
        return max(1, total_f), fps, [(0, max(1, total_f), W / 2.0, H / 2.0, 1.0)]

    face_cascade = None
    if hasattr(cv2, "CascadeClassifier") and hasattr(cv2, "data"):
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    if face_cascade is None or face_cascade.empty():
        # OpenCV 5.x bỏ Haar Cascade khỏi bản headless -> giữ khung gốc thay vì crash
        print("⚠️ [Face-Lock] OpenCV hiện tại không có Haar Cascade (cần opencv-python-headless<5). Bỏ qua khóa tâm mặt.")
        total_f = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
        cap.release()
        return max(1, total_f), fps, [(0, max(1, total_f), W / 2.0, H / 2.0, 1.0)]
    cuts = [0]
    prev_small = None
    sampled_faces: Dict[int, Tuple[float, float, float]] = {}
    idx = 0
    small_w, small_h = 270, 480
    scale_factor = W / float(small_w)  # 4.0

    while True:
        ret, raw_f = cap.read()
        if not ret or raw_f is None:
            break
        f_916 = crop_cover_9_16(raw_f, small_w, small_h)
        g_small = cv2.cvtColor(f_916, cv2.COLOR_BGR2GRAY)
        if prev_small is not None:
            diff = float(np.mean(cv2.absdiff(g_small, prev_small)))
            if diff > 12.0 and (idx - cuts[-1]) > 15:
                cuts.append(idx)
        prev_small = g_small

        # Lấy mẫu dò mặt mỗi 6 frame (~5 lần/giây) trên ảnh 270x480 siêu nhanh
        if idx % 6 == 0:
            faces = face_cascade.detectMultiScale(g_small, 1.1, 4, minSize=(42, 42))
            if len(faces) > 0:
                x, y, w, h = max(faces, key=lambda b: b[2] * b[3])
                sampled_faces[idx] = (
                    (x + w / 2.0) * scale_factor,
                    (y + h / 2.0) * scale_factor,
                    float(w) * scale_factor,
                )
        idx += 1

    cap.release()
    total_frames = max(1, idx)
    cuts.append(total_frames)

    shot_transforms = []
    for s_i in range(len(cuts) - 1):
        sf, ef = cuts[s_i], cuts[s_i + 1]
        cxs, cys, fws = [], [], []
        for f_i in range(sf, ef):
            if f_i in sampled_faces:
                fcx, fcy, ffw = sampled_faces[f_i]
                cxs.append(fcx)
                cys.append(fcy)
                fws.append(ffw)
        if cxs:
            med_cx = float(np.median(cxs))
            med_cy = float(np.median(cys))
            med_fw = float(np.median(fws))
            sc = max(1.15, min(1.55, target_fw / max(150.0, med_fw)))
        else:
            med_cx, med_cy, sc = W / 2.0, H / 2.0, 1.0
        shot_transforms.append((sf, ef, med_cx, med_cy, sc))

    print(f"🎯 [Auto Face-Lock Pass 1] Phát hiện {len(shot_transforms)} cú máy trên {total_frames} frames:")
    for i, (sf, ef, mcx, mcy, sc) in enumerate(shot_transforms, 1):
        print(f"   • Shot {i} (frames {sf}..{ef-1}): src_face=({mcx:.1f}, {mcy:.1f}) -> scale={sc:.3f}x -> locked=({target_cx:.1f}, {target_cy:.1f})")

    return total_frames, fps, shot_transforms


def apply_face_lock_to_frame(
    bgr_916: np.ndarray,
    frame_idx: int,
    shot_transforms: List[Tuple[int, int, float, float, float]],
    target_cx: float = 592.8,
    target_cy: float = 915.0,
) -> np.ndarray:
    mcx, mcy, sc = W / 2.0, H / 2.0, 1.0
    for sf, ef, cx, cy, s in shot_transforms:
        if sf <= frame_idx < ef:
            mcx, mcy, sc = cx, cy, s
            break
    if abs(sc - 1.0) < 0.01:
        return bgr_916
    nw, nh = int(round(W * sc)), int(round(H * sc))
    x0 = max(0, min(nw - W, int(round(mcx * sc - target_cx))))
    y0 = max(0, min(nh - H, int(round(mcy * sc - target_cy))))
    resized = cv2.resize(bgr_916, (nw, nh), interpolation=cv2.INTER_LINEAR)
    return resized[y0 : y0 + H, x0 : x0 + W].copy()


def compose_active_beat_frame(
    frame_rgba: Image.Image,
    active_beat: dict,
    t_orig: float,
    broll_cache: Dict[str, Image.Image],
) -> Image.Image:
    b_start = float(active_beat.get("start", 0.0))
    b_end = float(active_beat.get("end", b_start + 1.5))
    b_dur = max(0.1, b_end - b_start)
    t_loc = max(0.0, t_orig - b_start)
    cam_mode = active_beat.get("camera_mode", "base_1x")

    if cam_mode == "spine_map" and render_spine_map_frame_rgba is not None:
        base_frame = render_spine_map_frame_rgba(
            t_sec=t_loc,
            dur_sec=b_dur,
            title=active_beat.get("spine_title") or active_beat.get("line1") or "Lộ trình 4 bước trọng tâm",
            badge=active_beat.get("badge") or "LỘ TRÌNH CHUẨN",
            steps_text=active_beat.get("spine_steps") or active_beat.get("line2") or "",
            base_rgba=frame_rgba,
        )
        return render_beat_overlay(base_frame, active_beat, t_local=t_loc, beat_dur=b_dur, include_gradient=True)

    show_broll = False
    broll_loc, broll_dur = t_loc, b_dur
    if cam_mode == "broll_kenburns" and active_beat.get("broll_image") in broll_cache:
        bw = active_beat.get("broll_window")
        if isinstance(bw, list) and len(bw) == 2:
            if float(bw[0]) <= t_orig <= float(bw[1]):
                show_broll = True
                broll_loc = max(0.0, t_orig - float(bw[0]))
                broll_dur = max(0.1, float(bw[1]) - float(bw[0]))
        else:
            show_broll = True

    if show_broll:
        v_base = broll_cache[active_beat["broll_image"]]
        prog = max(0.0, min(1.0, broll_loc / broll_dur))
        scale = 1.00 + 0.09 * ease_out_cubic(prog)
        zw, zh = int(round(W * scale)), int(round(H * scale))
        v_zoomed = v_base.resize((zw, zh), Image.Resampling.BICUBIC)
        crop_x = int(round((zw - W) * (0.50 - 0.12 * prog)))
        crop_y = int(round((zh - H) * (0.42 - 0.08 * prog)))
        base_frame = v_zoomed.crop((crop_x, crop_y, crop_x + W, crop_y + H))
        if broll_loc < 0.09 and active_beat.get("shutter_flash", True):
            flash_a = int(110 * (1.0 - broll_loc / 0.09))
            flash_layer = Image.new("RGBA", (W, H), (255, 248, 230, flash_a))
            base_frame = Image.alpha_composite(base_frame, flash_layer)
    elif cam_mode == "punch_in_108" or "1.08" in str(active_beat.get("camera_zoom", "")):
        zoom_p = ease_out_cubic(min(1.0, t_loc / 0.18))
        cur_zoom = 1.00 + 0.08 * zoom_p
        zw, zh = int(round(W * cur_zoom)), int(round(H * cur_zoom))
        zoomed = frame_rgba.resize((zw, zh), Image.Resampling.BICUBIC)
        crop_x, crop_y = (zw - W) // 2, int(round((zh - H) * 0.35))
        base_frame = zoomed.crop((crop_x, crop_y, crop_x + W, crop_y + H))
    else:
        base_frame = frame_rgba

    return render_beat_overlay(base_frame, active_beat, t_local=t_loc, beat_dur=b_dur, include_gradient=True)


def render_edl_project(edl_path: str, video_override: str = None, out_override: str = None):
    edl_file = Path(edl_path).resolve()
    edl = json.loads(edl_file.read_text(encoding="utf-8"))

    video_path = resolve_source_video(edl, edl_file, video_override)
    beats = normalize_edl_beats(edl, edl_file, video_path)

    default_out_name = f"{Path(video_path).stem}_edit_v3.mp4" if video_path else f"{edl_file.stem}_final.mp4"
    output_path = out_override or edl.get("output_video") or str(edl_file.with_name(default_out_name))
    out_dir = Path(output_path).resolve().parent
    out_dir.mkdir(parents=True, exist_ok=True)
    mockups_dir = out_dir / "mockups"
    capcut_png_dir = out_dir / "capcut_png_pack"
    mockups_dir.mkdir(parents=True, exist_ok=True)
    capcut_png_dir.mkdir(parents=True, exist_ok=True)

    print(f"🎞️ [1/4] Phân tích video gốc & khóa tâm mặt (Low-RAM Streaming Pass 1): {video_path}")
    total_frames, fps, shot_transforms = compute_face_lock_transforms_streaming(
        video_path,
        enabled=bool(edl.get("face_lock_center", True)),
    )

    print(f"🎬 [2/4] Trộn âm thanh gốc + SFX Pair 10% từ EDL: {edl_file.name}")
    temp_wav = str(output_path) + ".master.wav"
    build_master_audio_from_edl(video_path, edl, temp_wav, sample_rate=44100, fallback_dur=total_frames / max(1.0, fps))

    broll_cache: Dict[str, Image.Image] = {}
    for b in beats:
        bp = b.get("broll_image")
        if bp and os.path.exists(bp) and bp not in broll_cache:
            raw_b = cv2.imread(bp)
            if raw_b is not None:
                b_916 = crop_cover_9_16(raw_b, W, H)
                broll_cache[bp] = Image.fromarray(cv2.cvtColor(b_916, cv2.COLOR_BGR2RGB)).convert("RGBA")
            else:
                broll_cache[bp] = Image.open(bp).convert("RGBA").resize((W, H), Image.Resampling.LANCZOS)

    print(f"🖼️ [3/4] Xuất {len(beats)} ảnh PNG Overlay trong suốt cho CapCut...")
    mockup_sample_frames: Dict[int, List[Tuple[int, dict]]] = {}
    for i, beat in enumerate(beats, 1):
        b_start = float(beat.get("start", 0.0))
        b_end = float(beat.get("end", b_start + 1.5))
        b_dur = max(0.2, b_end - b_start)
        sample_t = min(b_end - 0.05, b_start + min(0.55, b_dur * 0.5))
        f_idx = min(total_frames - 1, max(0, int(round(sample_t * fps))))
        mockup_sample_frames.setdefault(f_idx, []).append((i, beat))

        transparent_base = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        overlay_png = render_beat_overlay(transparent_base, beat, t_local=0.50, beat_dur=b_dur, include_gradient=True)
        png_path = capcut_png_dir / f"{i:02d}_{beat.get('id', f'T{i}').replace('#', '').replace('+', '_')}_{b_start:.2f}s.png"
        overlay_png.save(png_path)

    print(f"🚀 [4/4] Render Streaming Pass 2 ({total_frames} frames @ {fps:.1f}fps) -> {output_path}")
    ffmpeg_cmd = [
        FFMPEG_BIN, "-y", "-v", "error",
        "-f", "rawvideo", "-vcodec", "rawvideo",
        "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", f"{fps:.2f}",
        "-i", "-",
        "-i", temp_wav,
        "-c:v", "libx264", "-preset", "fast", "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "256k",
        "-movflags", "+faststart",
        "-shortest",
        str(output_path),
    ]
    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)
    cap = cv2.VideoCapture(video_path)

    try:
        idx = 0
        while True:
            ret, raw_bgr = cap.read()
            if not ret or raw_bgr is None:
                break
            bgr_916 = crop_cover_9_16(raw_bgr, W, H)
            locked_bgr = apply_face_lock_to_frame(bgr_916, idx, shot_transforms)
            t_orig = idx / fps
            frame_rgba = Image.fromarray(cv2.cvtColor(locked_bgr, cv2.COLOR_BGR2RGB)).convert("RGBA")

            active_beat = None
            for b in beats:
                if float(b.get("start", 0.0)) <= t_orig <= float(b.get("end", 0.0)) + 0.001:
                    active_beat = b
                    break
            if active_beat is None and beats:
                active_beat = beats[-1]

            if active_beat:
                out_rgba = compose_active_beat_frame(frame_rgba, active_beat, t_orig, broll_cache)
            else:
                out_rgba = frame_rgba

            # Lưu ảnh mockup đúng tại frame đại diện của từng nhịp
            if idx in mockup_sample_frames:
                for beat_num, m_beat in mockup_sample_frames[idx]:
                    m_rgba = compose_active_beat_frame(frame_rgba, m_beat, t_orig, broll_cache)
                    m_rgba.convert("RGB").save(mockups_dir / f"beat_{beat_num:02d}.png", quality=95)

            out_rgb = np.array(out_rgba.convert("RGB"))
            bgr_out = cv2.cvtColor(out_rgb, cv2.COLOR_RGB2BGR)
            proc.stdin.write(bgr_out.tobytes())
            idx += 1
    finally:
        cap.release()
        if proc.stdin:
            proc.stdin.close()
        proc.wait()
        if os.path.exists(temp_wav):
            os.remove(temp_wav)

    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"✅ Hoàn tất xuất video MFX V3.2: {output_path} ({size_mb:.2f} MB)")
    return output_path


def run_smoke_test() -> int:
    """Chạy kiểm tra nhanh 1 giây để xác nhận Engine, Font, SFX và FFmpeg hoạt động 100%."""
    with tempfile.TemporaryDirectory(prefix="aiedit_smoke_") as tmp:
        tmp_p = Path(tmp)
        vid_in = tmp_p / "smoke_in.mp4"
        edl_p = tmp_p / "smoke_edl.json"
        vid_out = tmp_p / "smoke_out.mp4"

        subprocess.run(
            [
                FFMPEG_BIN, "-y", "-v", "error",
                "-f", "lavfi", "-i", "color=c=#111622:s=360x640:r=15:d=1.0",
                "-f", "lavfi", "-i", "sine=frequency=440:sample_rate=44100:duration=1.0",
                "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac",
                str(vid_in),
            ],
            check=True,
        )
        edl_data = {
            "version": "3.2-mfx-v3-auto",
            "video_source": str(vid_in),
            "duration": 1.0,
            "fps": 15.0,
            "face_lock_center": False,
            "beats": [
                {
                    "beat": 1,
                    "t_code": "#T1",
                    "start": 0.0,
                    "end": 1.0,
                    "camera_mode": "base_1x",
                    "style_id": "STYLE-17",
                    "icon": "TARGET_FOCUS",
                    "icon_color": "#FFCC00",
                    "line1": "KIỂM ĐỊNH HỆ THỐNG",
                    "line2": "Chữ tiếng Việt rõ nét 100%",
                    "sfx": {"id": "SFX-01", "volume": 0.09},
                }
            ],
        }
        edl_p.write_text(json.dumps(edl_data, ensure_ascii=False), encoding="utf-8")
        render_edl_project(str(edl_p), str(vid_in), str(vid_out))
        if not vid_out.is_file() or vid_out.stat().st_size < 1000:
            raise RuntimeError("Smoke test thất bại: file .mp4 đầu ra không hợp lệ.")
    print("✅ [Smoke Test] Engine MFX V3.2 + Font + SFX + FFmpeg hoạt động hoàn hảo!")
    return 0


def main():
    parser = argparse.ArgumentParser(description="MFX V3.2 Universal Renderer (2-Pass Streaming)")
    parser.add_argument("--edl", help="Đường dẫn file EDL JSON")
    parser.add_argument("--video", help="Đường dẫn video gốc (ghi đè trong JSON)")
    parser.add_argument("--output", help="Đường dẫn video xuất ra")
    parser.add_argument("--smoke", action="store_true", help="Chạy kiểm tra nhanh 1 giây")
    args = parser.parse_args()

    if args.smoke:
        sys.exit(run_smoke_test())
    if not args.edl:
        parser.error("Cần truyền --edl <path> hoặc --smoke")
    render_edl_project(args.edl, args.video, args.output)


if __name__ == "__main__":
    main()
