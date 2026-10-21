#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
atlas_2d_helper.py — Bộ Dựng Bản Vẽ Khoa Học 2D (Scientific Atlas Style V2)
===========================================================================
Tạo ảnh B-Roll 9:16 chuẩn Y khoa / Da liễu / Nha khoa / Chuyên gia:
- Lớp 1: Đưa nền ảnh minh họa 2D về giấy y khoa cổ điển phẳng tuyệt đối (#F5F2EB),
         nếu chưa có ảnh gốc thì tự sinh hình vẽ mặt cắt mô học 2D vector sạch.
- Lớp 2: Vẽ khung tiêu đề Editorial (FDTiemposHeadline-RegularItalic + SVN-Aeonik),
         đường dẫn vuông góc dot_leader, nhãn [1]..[4] song ngữ Việt – Latinh,
         và hộp Ghi chú lâm sàng phía trên Y = 1158px (nhường 40% đáy cho phụ đề MFX V3.2).
"""

import argparse
import os
from pathlib import Path
from typing import List, Tuple, Optional

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920
BG = (245, 242, 235)      # Giấy y khoa #F5F2EB
INK = (44, 42, 41)        # Mực than #2C2A29
LEAD = (43, 41, 39)       # Đường dẫn #2B2927
GREY = (110, 104, 98)     # Chữ phụ #6E6862
SAFE_BOTTOM = 1158        # Giới hạn trên vùng chữ phụ đề MFX V3.2

SCRIPT_DIR = Path(__file__).resolve().parent


def _resolve_font_path(candidates: List[str]) -> Optional[str]:
    roots = [
        SCRIPT_DIR.parent / "resources" / "fonts",
        Path.home() / ".mfx_v3" / "resources" / "fonts",
        Path.home() / ".gemini" / "config" / "skills" / "aiedit" / "resources" / "fonts",
        Path.home() / "Library" / "Fonts",
        Path("/Library/Fonts"),
        Path("/System/Library/Fonts/Supplemental"),
        Path("/System/Library/Fonts"),
        Path("C:/Windows/Fonts"),
    ]
    for name in candidates:
        for r in roots:
            p = r / name
            if p.is_file():
                return str(p)
    return None


def get_atlas_font(role: str, size: int) -> ImageFont.FreeTypeFont:
    role_map = {
        "serif_it": [
            "FDTiemposHeadline-RegularItalic.otf",
            "FDTiemposText-RegularItalic.otf",
            "Times New Roman Italic.ttf",
            "Arial.ttf",
        ],
        "text_reg": [
            "FDTiemposText-Regular.otf",
            "SVN-Aeonik-Regular.ttf",
            "Times New Roman.ttf",
            "Arial.ttf",
        ],
        "text_it": [
            "FDTiemposText-RegularItalic.otf",
            "FDTiemposHeadline-RegularItalic.otf",
            "Times New Roman Italic.ttf",
            "Arial.ttf",
        ],
        "sans_reg": [
            "SVN-Aeonik-Regular.ttf",
            "FDTiemposText-Regular.otf",
            "Arial.ttf",
            "Helvetica.ttc",
        ],
        "sans_bold": [
            "SVN-Aeonik-Bold.ttf",
            "FDAeonikExtended-Bold.otf",
            "FDIntegralCF-Bold.ttf",
            "Arial Bold.ttf",
        ],
    }
    p = _resolve_font_path(role_map.get(role, role_map["sans_reg"]))
    if p:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            pass
    return ImageFont.load_default()


def flatten_bg(rgb: np.ndarray) -> np.ndarray:
    """Đưa nền giấy về đúng #F5F2EB phẳng tuyệt đối."""
    a = rgb.astype(np.float32)
    h, w = a.shape[:2]
    top_strip = a[: max(10, min(120, h // 8))].reshape(-1, 3)
    bot_strip = a[max(0, h - min(200, h // 6)) :].reshape(-1, 3)
    corner = np.concatenate([top_strip, bot_strip], axis=0)
    med = np.maximum(np.median(corner, axis=0), 1.0)
    gain = np.array(BG, np.float32) / med
    a = np.clip(a * gain, 0, 255)
    dist = np.linalg.norm(a - np.array(BG, np.float32), axis=2)
    alpha = np.clip((dist - 6.0) / 14.0, 0.0, 1.0)
    alpha = cv2.GaussianBlur(alpha, (5, 5), 0)[..., None]
    out = a * alpha + np.array(BG, np.float32) * (1.0 - alpha)
    return out.astype(np.uint8)


def _draw_procedural_histology_2d(canvas: Image.Image) -> List[Tuple[int, int]]:
    """
    Khi chưa có ảnh minh họa đầu vào, vẽ một thiết đồ mô học 2D nét bút kim (Pen-and-Ink)
    kèm màu nước trầm trực tiếp trên giấy #F5F2EB và trả về 4 điểm neo (anchor points).
    """
    d = ImageDraw.Draw(canvas, "RGBA")
    box_x1, box_y1, box_x2, box_y2 = 110, 250, 620, 820
    # Nền lát cắt mô học màu nước trầm
    d.rounded_rectangle([box_x1, box_y1, box_x2, box_y2], radius=14, fill=(236, 224, 210, 255), outline=INK, width=2)
    # Lớp biểu bì / bề mặt (tầng trên)
    d.rectangle([box_x1 + 2, box_y1 + 2, box_x2 - 2, box_y1 + 135], fill=(222, 186, 165, 220))
    # Lớp trung bì / cấu trúc giữa
    d.rectangle([box_x1 + 2, box_y1 + 136, box_x2 - 2, box_y1 + 370], fill=(232, 206, 188, 220))
    # Lớp mô sâu / nang
    d.ellipse([box_x1 + 140, box_y1 + 110, box_x1 + 350, box_y1 + 490], fill=(205, 152, 134, 215), outline=INK, width=2)
    d.ellipse([box_x1 + 195, box_y1 + 220, box_x1 + 295, box_y1 + 420], fill=(168, 98, 86, 230), outline=INK, width=2)

    # Đường lượn sóng màng đáy & lưới tế bào nét bút kim
    pts_wave = []
    for x in range(box_x1 + 4, box_x2 - 4, 8):
        y = box_y1 + 135 + int(np.sin((x - box_x1) * 0.045) * 14)
        pts_wave.append((x, y))
    if len(pts_wave) > 1:
        d.line(pts_wave, fill=INK, width=2)

    for cx in range(box_x1 + 36, box_x2 - 30, 52):
        d.ellipse([cx - 12, box_y1 + 55, cx + 12, box_y1 + 75], fill=(142, 88, 78, 190), outline=INK, width=1)

    return [
        (box_x1 + 110, box_y1 + 68),
        (box_x1 + 245, box_y1 + 165),
        (box_x1 + 245, box_y1 + 315),
        (box_x1 + 410, box_y1 + 465),
    ]


def _wrap_text(d: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, max_w: int) -> List[str]:
    lines, cur = [], ""
    for word in (text or "").split():
        t = (cur + " " + word).strip()
        if d.textlength(t, font=f) <= max_w or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = word
    return lines + ([cur] if cur else [])


def _spaced_text(d: ImageDraw.ImageDraw, xy: Tuple[int, int], text: str, f: ImageFont.FreeTypeFont, fill, tracking: float = 2.0):
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=f, fill=fill)
        x += d.textlength(ch, font=f) + tracking
    return x


def render_scientific_atlas_v2(
    title: str = "Cấu trúc giải phẫu & Cơ chế tác động chuyên sâu",
    category: str = "TÀI LIỆU MÔ HỌC LÂM SÀNG • HÌNH 01",
    subtitle_right: str = "MẶT CẮT GIẢI PHẪU 2D • THIẾT ĐỒ MÔ HỌC 2D",
    labels: Optional[List[Tuple[str, str]]] = None,
    note_title: str = "GHI CHÚ LÂM SÀNG",
    note_body: str = "Cấu trúc mô học 2D minh họa vị trí tác động trọng tâm và lộ trình phục hồi tự nhiên theo chuẩn y khoa.",
    base_image_path: Optional[str] = None,
    output_path: Optional[str] = None,
) -> Image.Image:
    canvas = Image.new("RGB", (W, H), BG)
    anchors = []

    if base_image_path and os.path.exists(base_image_path):
        bgr = cv2.imread(base_image_path)
        if bgr is not None:
            rgb = flatten_bg(cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB))
            ih, iw = rgb.shape[:2]
            target_w = 540
            scale = target_w / float(max(1, iw))
            target_h = min(620, int(round(ih * scale)))
            pil_ill = Image.fromarray(rgb).resize((target_w, target_h), Image.Resampling.LANCZOS)
            ix, iy = 80, 240
            canvas.paste(pil_ill, (ix, iy))
            anchors = [
                (ix + int(target_w * 0.45), iy + int(target_h * 0.20)),
                (ix + int(target_w * 0.55), iy + int(target_h * 0.42)),
                (ix + int(target_w * 0.50), iy + int(target_h * 0.65)),
                (ix + int(target_w * 0.60), iy + int(target_h * 0.84)),
            ]

    if not anchors:
        anchors = _draw_procedural_histology_2d(canvas)

    if not labels:
        labels = [
            ("Lớp bề mặt & Hàng rào bảo vệ", "Stratum corneum & Epidermal barrier"),
            ("Cổ nang & Vùng tập trung hoạt chất", "Infundibulum & Active target zone"),
            ("Cấu trúc mô đệm & Tuần hoàn vi mạch", "Dermal matrix & Micro-circulation"),
            ("Tái tạo nền tảng & Ổn định cấu trúc", "Basal regeneration & Structural lock"),
        ]

    d = ImageDraw.Draw(canvas)
    f_sans_b17 = get_atlas_font("sans_bold", 17)
    f_sans_17 = get_atlas_font("sans_reg", 17)
    f_serif_it40 = get_atlas_font("serif_it", 38)

    # Header chuẩn Editorial
    d.line([(60, 92), (1020, 92)], fill=INK, width=2)
    _spaced_text(d, (60, 106), category.upper(), f_sans_b17, INK, tracking=1.6)
    rw = sum(d.textlength(c, font=f_sans_17) + 1.4 for c in subtitle_right.upper())
    _spaced_text(d, (max(520, int(1020 - rw)), 106), subtitle_right.upper(), f_sans_17, GREY, tracking=1.4)
    d.text((60, 134), title, font=f_serif_it40, fill=INK)
    d.line([(60, 192), (1020, 192)], fill=INK, width=1)

    # Callout Labels [1]..[4] bên phải (X = 660..1020)
    f_num = get_atlas_font("sans_bold", 22)
    f_vi = get_atlas_font("sans_reg", 22)
    f_lat = get_atlas_font("text_it", 20)

    label_x = 655
    cur_y = 260
    for idx, (vi_txt, lat_txt) in enumerate(labels[:4]):
        ax, ay = anchors[min(idx, len(anchors) - 1)]
        target_y = max(cur_y, ay - 10)
        # Đường dẫn vuông góc dot_leader
        mid_x = max(ax + 30, label_x - 32)
        d.line([(ax, ay), (mid_x, ay), (mid_x, target_y + 12), (label_x - 10, target_y + 12)], fill=LEAD, width=2)
        d.ellipse([ax - 4, ay - 4, ax + 4, ay + 4], fill=LEAD)

        tag = f"[{idx + 1}]"
        d.text((label_x, target_y), tag, font=f_num, fill=INK)
        indent = int(d.textlength(tag, font=f_num) + 10)
        yy = target_y
        for i_line, line in enumerate(_wrap_text(d, vi_txt, f_vi, 1020 - label_x - indent)):
            d.text((label_x + (indent if i_line == 0 else 0), yy), line, font=f_vi, fill=INK)
            yy += 27
        for line in _wrap_text(d, lat_txt, f_lat, 1020 - label_x):
            d.text((label_x, yy), line, font=f_lat, fill=GREY)
            yy += 24
        cur_y = yy + 28

    # Hộp Ghi chú lâm sàng phía trên Y = 1158px
    note_y1 = 910
    note_y2 = SAFE_BOTTOM - 28
    d.line([(60, note_y1), (1020, note_y1)], fill=INK, width=2)
    _spaced_text(d, (60, note_y1 + 16), note_title.upper(), get_atlas_font("sans_bold", 19), INK, tracking=1.8)
    f_body = get_atlas_font("text_reg", 24)
    by = note_y1 + 52
    for line in _wrap_text(d, note_body, f_body, 960)[:4]:
        d.text((60, by), line, font=f_body, fill=INK)
        by += 32
    d.line([(60, note_y2), (1020, note_y2)], fill=INK, width=1)

    if output_path:
        out_p = Path(output_path)
        out_p.parent.mkdir(parents=True, exist_ok=True)
        if out_p.suffix.lower() in (".jpg", ".jpeg"):
            canvas.save(str(out_p), "JPEG", quality=95)
        else:
            canvas.save(str(out_p), "PNG")
    return canvas


def main():
    parser = argparse.ArgumentParser(description="Scientific Atlas Style V2 Builder (2D Medical/Expert Illustration)")
    parser.add_argument("--base-image", help="Ảnh minh họa 2D đầu vào (tùy chọn)")
    parser.add_argument("--title", default="Cấu trúc giải phẫu & Cơ chế tác động chuyên sâu", help="Tiêu đề chính (Tiempos Italic)")
    parser.add_argument("--category", default="TÀI LIỆU MÔ HỌC LÂM SÀNG • HÌNH 01", help="Nhãn danh mục phía trên trái")
    parser.add_argument("--subtitle", default="MẶT CẮT GIẢI PHẪU 2D • THIẾT ĐỒ MÔ HỌC 2D", help="Nhãn kỹ thuật phía trên phải")
    parser.add_argument("--labels", default="", help="Chuỗi nhãn phân tách bởi '|', mỗi nhãn dạng 'Tiếng Việt::Latinh'")
    parser.add_argument("--note", default="Cấu trúc mô học 2D minh họa vị trí tác động trọng tâm và lộ trình phục hồi tự nhiên.", help="Nội dung ghi chú lâm sàng")
    parser.add_argument("--out", required=True, help="Đường dẫn ảnh đầu ra (.png/.jpg)")
    args = parser.parse_args()

    parsed_labels = None
    if args.labels.strip():
        parsed_labels = []
        for item in args.labels.split("|"):
            item = item.strip()
            if not item:
                continue
            if "::" in item:
                vi, lat = item.split("::", 1)
                parsed_labels.append((vi.strip(), lat.strip()))
            else:
                parsed_labels.append((item, "Anatomical structure 2D"))

    render_scientific_atlas_v2(
        title=args.title,
        category=args.category,
        subtitle_right=args.subtitle,
        labels=parsed_labels,
        note_body=args.note,
        base_image_path=args.base_image,
        output_path=args.out,
    )
    print(f"✅ [Atlas 2D V2] Đã xuất bản vẽ khoa học 2D: {args.out}")


if __name__ == "__main__":
    main()
