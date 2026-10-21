#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script sinh Thẻ QR Cài Đặt AI Edit Video V3.2 (qr-aiedit.png).
Tương thích hoàn toàn với Antigravity Vision (kéo thả ảnh vào chat là AI tự đọc lệnh cài) và quét trên điện thoại.
"""

import os
import qrcode
from PIL import Image, ImageDraw, ImageFont


def build_qr_card():
    width, height = 1200, 1500
    card = Image.new("RGB", (width, height), (5, 7, 12))
    draw = ImageDraw.Draw(card)

    for y in range(height):
        draw.line([(0, y), (width, y)], fill=(11, 16, 28))

    for r in range(450, 0, -15):
        draw.ellipse([(width - 250 - r, -150 - r), (width - 250 + r, -150 + r)], fill=(16, 185, 129))
    for r in range(350, 0, -15):
        draw.ellipse([(-100 - r, height - 200 - r), (-100 + r, height - 200 + r)], fill=(37, 99, 235))

    margin = 35
    draw.rounded_rectangle(
        [(margin, margin), (width - margin, height - margin)],
        radius=32,
        outline=(16, 185, 129),
        width=2,
    )
    draw.rounded_rectangle(
        [(margin + 16, margin + 16), (width - margin - 16, height - margin - 16)],
        radius=24,
        fill=(11, 15, 25),
        outline=(255, 255, 255),
        width=1,
    )

    font_paths = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf",
        "/Library/Fonts/Arial.ttf",
    ]
    font_bold_path = next((p for p in font_paths if os.path.exists(p) and "Bold" in p), None)
    font_reg_path = next((p for p in font_paths if os.path.exists(p) and "Bold" not in p), font_bold_path)

    font_badge = ImageFont.truetype(font_bold_path, 20) if font_bold_path else ImageFont.load_default()
    font_title = ImageFont.truetype(font_bold_path, 52) if font_bold_path else ImageFont.load_default()
    font_sub = ImageFont.truetype(font_reg_path, 25) if font_reg_path else ImageFont.load_default()
    font_cmd_label = ImageFont.truetype(font_bold_path, 22) if font_bold_path else ImageFont.load_default()
    font_cmd = ImageFont.truetype(font_bold_path, 24) if font_bold_path else ImageFont.load_default()
    font_step_title = ImageFont.truetype(font_bold_path, 22) if font_bold_path else ImageFont.load_default()
    font_step_desc = ImageFont.truetype(font_reg_path, 19) if font_reg_path else ImageFont.load_default()

    badge_w, badge_h = 460, 42
    badge_x = (width - badge_w) // 2
    draw.rounded_rectangle([(badge_x, 70), (badge_x + badge_w, 70 + badge_h)], radius=20, fill=(16, 185, 129), outline=(52, 211, 153), width=1)
    draw.text((badge_x + 32, 79), "AI EDIT VIDEO V3.2 · ANTIGRAVITY", fill=(7, 10, 17), font=font_badge)

    title_text = "AI EDIT VIDEO TỰ ĐỘNG"
    bbox = draw.textbbox((0, 0), title_text, font=font_title)
    draw.text(((width - (bbox[2] - bbox[0])) // 2, 130), title_text, fill=(255, 255, 255), font=font_title)

    sub_text = "Khóa tâm mặt, phủ chữ 2 dòng, trám B-Roll & Atlas 2D trong 1 chạm"
    bbox = draw.textbbox((0, 0), sub_text, font=font_sub)
    draw.text(((width - (bbox[2] - bbox[0])) // 2, 195), sub_text, fill=(148, 163, 184), font=font_sub)

    qr = qrcode.QRCode(
        version=2,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=12,
        border=2,
    )
    qr.add_data("https://fedu.vn/skill/aiedit.html")
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="#070a11", back_color="#ffffff").convert("RGB")

    qr_size = 460
    qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.LANCZOS)
    qr_x = (width - qr_size) // 2
    qr_y = 260

    pad = 20
    draw.rounded_rectangle(
        [(qr_x - pad, qr_y - pad), (qr_x + qr_size + pad, qr_y + qr_size + pad)],
        radius=28,
        fill=(255, 255, 255),
        outline=(16, 185, 129),
        width=4,
    )
    card.paste(qr_img, (qr_x, qr_y))

    box_w = 1020
    box_x = (width - box_w) // 2
    box_y = qr_y + qr_size + 50

    draw.rounded_rectangle([(box_x, box_y), (box_x + box_w, box_y + 160)], radius=20, fill=(15, 23, 42), outline=(16, 185, 129), width=2)
    draw.text((box_x + 30, box_y + 22), "KÉO THẢ ẢNH NÀY VÀO CHAT ANTIGRAVITY (AI TỰ CÀI ĐẶT):", fill=(52, 211, 153), font=font_cmd_label)

    cmd_text = "curl -sSL https://fedu.vn/skill/install-aiedit.sh | bash"
    draw.rounded_rectangle([(box_x + 25, box_y + 65), (box_x + box_w - 25, box_y + 135)], radius=12, fill=(6, 95, 70))
    draw.text((box_x + 45, box_y + 85), cmd_text, fill=(255, 255, 255), font=font_cmd)

    steps_y = box_y + 195
    step_w = 320
    step_gap = 30
    start_x = (width - (step_w * 3 + step_gap * 2)) // 2

    steps_data = [
        ("1. CÀI ĐẶT 1 CHẠM", "Thả ảnh QR vào chat hoặc\ndán lệnh vào Terminal"),
        ("2. GỬI VIDEO / EDL", "Thả file .mp4/.mov hoặc\ndán mã EDL JSON vào chat"),
        ("3. NHẬN VIDEO .MP4", "Gõ 'EDIT VIDEO' để AI tự\nxuất .mp4 + gói CapCut"),
    ]

    for idx, (stitle, sdesc) in enumerate(steps_data):
        sx = start_x + idx * (step_w + step_gap)
        draw.rounded_rectangle([(sx, steps_y), (sx + step_w, steps_y + 130)], radius=16, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
        draw.text((sx + 20, steps_y + 20), stitle, fill=(52, 211, 153), font=font_step_title)
        lines = sdesc.split("\n")
        draw.text((sx + 20, steps_y + 55), lines[0], fill=(203, 213, 225), font=font_step_desc)
        if len(lines) > 1:
            draw.text((sx + 20, steps_y + 85), lines[1], fill=(148, 163, 184), font=font_step_desc)

    foot_text = "Trang hướng dẫn & tài liệu: https://fedu.vn/skill/aiedit.html"
    bbox = draw.textbbox((0, 0), foot_text, font=font_step_desc)
    draw.text(((width - (bbox[2] - bbox[0])) // 2, height - 70), foot_text, fill=(100, 116, 139), font=font_step_desc)

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "install")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "qr-aiedit.png")
    card.save(out_path, "PNG", quality=95)
    print(f"✅ Đã tạo Thẻ QR thành công: {out_path}")


if __name__ == "__main__":
    build_qr_card()
