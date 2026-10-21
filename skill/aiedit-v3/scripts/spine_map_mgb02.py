#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
spine_map_mgb02.py — Bộ Dựng Vertical Linear Spine Map (MG-B02 V2)
==================================================================
Thiết kế chuẩn Swiss Dark Editorial:
- Xóa bỏ đường chữ S ngoằn ngoèo & sóng radar cũ.
- Trục thẳng đứng duy nhất bên trái (X = 158) với thanh tiến độ vàng #FACC15 chạy dọc từ Node 01 -> 04.
- 4 Thẻ ngang (#1C2534) căn thẳng hàng, thanh màu nhấn dọc 6px bên trái thẻ.
- Có thể gọi qua CLI để xuất ảnh tĩnh (.png/.jpg) hoặc gọi hàm `render_spine_map_frame_rgba` theo từng frame trong video.
"""

import argparse
import re
from pathlib import Path
from typing import List, Optional

from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920
SCRIPT_DIR = Path(__file__).resolve().parent


def _ease_out_cubic(x: float) -> float:
    x = max(0.0, min(1.0, x))
    return 1.0 - pow(1.0 - x, 3)


def _ease_in_out_cubic(x: float) -> float:
    x = max(0.0, min(1.0, x))
    return 4 * x * x * x if x < 0.5 else 1 - pow(-2 * x + 2, 3) / 2


def _get_font(candidates: List[str], size: int) -> ImageFont.FreeTypeFont:
    roots = [
        SCRIPT_DIR.parent / "resources" / "fonts",
        Path.home() / ".mfx_v3" / "resources" / "fonts",
        Path.home() / ".gemini" / "config" / "skills" / "aiedit" / "resources" / "fonts",
        Path.home() / "Library" / "Fonts",
        Path("/Library/Fonts"),
        Path("/System/Library/Fonts/Supplemental"),
        Path("C:/Windows/Fonts"),
    ]
    for name in candidates:
        for r in roots:
            p = r / name
            if p.is_file():
                try:
                    return ImageFont.truetype(str(p), size)
                except Exception:
                    pass
    return ImageFont.load_default()


def render_spine_map_frame_rgba(
    t_sec: float = 1.8,
    dur_sec: float = 3.0,
    title: str = "Lộ trình 4 bước xử lý dứt điểm",
    badge: str = "LỘ TRÌNH CHUẨN",
    steps_text: str = "Chẩn đoán gốc rễ & Nhận diện bẫy | Phân tích cơ chế chuyển biến | Tầm soát dấu hiệu & Giải pháp | Bảo tồn bền vững & Hệ thống hóa",
    base_rgba: Optional[Image.Image] = None,
) -> Image.Image:
    if base_rgba is not None:
        canvas = base_rgba.copy().convert("RGBA")
        # Phủ lớp tối mờ để nổi bật bảng Spine Map
        dim = Image.new("RGBA", (W, H), (7, 9, 14, 215))
        canvas = Image.alpha_composite(canvas, dim)
    else:
        canvas = Image.new("RGBA", (W, H), (7, 9, 14, 255))

    draw = ImageDraw.Draw(canvas, "RGBA")
    card_w = 920
    card_h = 880
    cx1 = (W - card_w) // 2  # 80
    cy1 = 150
    cx2, cy2 = cx1 + card_w, cy1 + card_h

    # Khung bao Swiss Dark
    draw.rounded_rectangle(
        [cx1, cy1, cx2, cy2],
        radius=24,
        fill=(17, 22, 34, 248),
        outline=(56, 70, 94, 240),
        width=2,
    )
    # Thanh nhấn dọc bên trái header
    draw.rectangle([cx1, cy1 + 32, cx1 + 6, cy1 + 88], fill=(250, 204, 21, 255))

    f_tag = _get_font(["SVN-Aeonik-Bold.ttf", "FDAeonikExtended-Bold.otf", "FDIntegralCF-Bold.ttf"], 19)
    f_title = _get_font(["FDTiemposHeadline-RegularItalic.otf", "FDTiemposText-RegularItalic.otf", "SVN-Aeonik-Bold.ttf"], 38)
    f_num = _get_font(["SVN-Aeonik-Bold.ttf", "FDIntegralCF-Bold.ttf"], 20)
    f_stage = _get_font(["SVN-Aeonik-Bold.ttf", "FDAeonikExtended-Bold.otf"], 17)
    f_step = _get_font(["SVN-Aeonik-Bold.ttf", "FDTiemposText-Regular.otf"], 27)

    draw.text((cx1 + 38, cy1 + 32), f"CẤU TRÚC LỘ TRÌNH  •  {badge.upper()}", font=f_tag, fill=(250, 204, 21, 255))
    draw.text((cx1 + 38, cy1 + 64), title, font=f_title, fill=(245, 242, 235, 255))
    draw.line([(cx1 + 38, cy1 + 124), (cx2 - 38, cy1 + 124)], fill=(45, 55, 72, 220), width=1)

    raw_nodes = [n.strip() for n in re.split(r"➔|->|•|\||;", steps_text or "") if n.strip()]
    defaults = [
        "Chẩn đoán gốc rễ & Nhận diện bẫy",
        "Phân tích cơ chế chuyển biến",
        "Tầm soát dấu hiệu & Giải pháp",
        "Bảo tồn bền vững & Hệ thống hóa",
    ]
    while len(raw_nodes) < 4:
        raw_nodes.append(defaults[len(raw_nodes)])
    nodes_txt = raw_nodes[:4]

    # Trục thẳng đứng duy nhất bên trái (X = 158)
    axis_x = 158
    node_ys = [cy1 + 215, cy1 + 390, cy1 + 565, cy1 + 740]
    prog_curve = _ease_in_out_cubic(min(1.0, max(0.0, t_sec) / max(0.6, dur_sec * 0.72)))

    draw.line([(axis_x, node_ys[0]), (axis_x, node_ys[-1])], fill=(51, 65, 85, 220), width=4)
    active_y = int(node_ys[0] + (node_ys[-1] - node_ys[0]) * prog_curve)
    draw.line([(axis_x, node_ys[0]), (axis_x, active_y)], fill=(250, 204, 21, 245), width=4)

    stage_colors = [
        (250, 204, 21),   # 01 Gold
        (248, 113, 113),  # 02 Coral
        (56, 189, 248),   # 03 Sky Cyan
        (16, 185, 129),   # 04 Emerald
    ]
    thresholds = [0.0, 0.28, 0.56, 0.84]
    item_x1 = axis_x + 56
    item_x2 = cx2 - 38
    item_h = 132

    for idx, ny in enumerate(node_ys):
        reached = prog_curve >= thresholds[idx]
        col = stage_colors[idx]
        st_p = _ease_out_cubic(max(0.0, min(1.0, (t_sec - idx * 0.14) / 0.32)))
        a_item = int(255 * st_p)
        if a_item <= 5:
            continue

        # Đường nối ngang vuông góc
        draw.line(
            [(axis_x + 25, ny), (item_x1, ny)],
            fill=(col[0], col[1], col[2], int(215 * st_p)) if reached else (71, 85, 105, a_item),
            width=3,
        )

        # Node tròn trên trục X=158
        r_node = 25
        draw.ellipse(
            [axis_x - r_node, ny - r_node, axis_x + r_node, ny + r_node],
            fill=(24, 32, 46, a_item),
            outline=(col[0], col[1], col[2], a_item) if reached else (100, 116, 139, a_item),
            width=3,
        )
        num_txt = f"0{idx + 1}"
        tb = draw.textbbox((0, 0), num_txt, font=f_num)
        draw.text(
            (axis_x - (tb[2] - tb[0]) // 2, ny - (tb[3] - tb[1]) // 2 - 2),
            num_txt,
            font=f_num,
            fill=(245, 242, 235, a_item),
        )

        # Thẻ ngang #1C2534
        ty1 = ny - item_h // 2 + int((1.0 - st_p) * 16)
        ty2 = ty1 + item_h
        draw.rounded_rectangle(
            [item_x1, ty1, item_x2, ty2],
            radius=16,
            fill=(28, 37, 52, int(244 * st_p)),
            outline=(col[0], col[1], col[2], int(195 * st_p)) if reached else (51, 65, 85, a_item),
            width=2,
        )
        # Thanh màu nhấn dọc 6px bên trái thẻ
        draw.rounded_rectangle([item_x1, ty1, item_x1 + 7, ty2], radius=4, fill=(col[0], col[1], col[2], a_item))

        draw.text((item_x1 + 26, ty1 + 22), f"CHẶNG 0{idx + 1}", font=f_stage, fill=(col[0], col[1], col[2], a_item))
        draw.text((item_x1 + 26, ty1 + 58), nodes_txt[idx][:44], font=f_step, fill=(248, 250, 252, a_item))

    return canvas


def main():
    parser = argparse.ArgumentParser(description="MG-B02 V2 Vertical Linear Spine Map Builder")
    parser.add_argument("--title", default="Lộ trình 4 bước xử lý dứt điểm", help="Tiêu đề lộ trình")
    parser.add_argument("--badge", default="LỘ TRÌNH CHUẨN", help="Nhãn góc trên")
    parser.add_argument("--steps", default="Chẩn đoán gốc rễ|Phân tích cơ chế|Tầm soát & Giải pháp|Bảo tồn bền vững", help="4 chặng cách nhau bởi dấu |")
    parser.add_argument("--out", required=True, help="Đường dẫn ảnh xuất ra (.png/.jpg)")
    args = parser.parse_args()

    img = render_spine_map_frame_rgba(t_sec=2.5, dur_sec=3.0, title=args.title, badge=args.badge, steps_text=args.steps)
    out_p = Path(args.out)
    out_p.parent.mkdir(parents=True, exist_ok=True)
    if out_p.suffix.lower() in (".jpg", ".jpeg"):
        img.convert("RGB").save(str(out_p), "JPEG", quality=95)
    else:
        img.save(str(out_p), "PNG")
    print(f"✅ [MG-B02 V2 Spine Map] Đã xuất: {args.out}")


if __name__ == "__main__":
    main()
