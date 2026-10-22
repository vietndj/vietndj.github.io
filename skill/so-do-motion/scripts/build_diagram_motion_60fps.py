#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
STEP 1: AI VIDEO EDIT WORKFLOW DIAGRAM MOTION 60FPS (NO SPEECH + THAM THO 5B SUBTITLE SYNC + 4-LAYER SFX)
- Resolution: 1080x1920 @ 60.0 fps (19.50s = 1,170 frames)
- Visual Style: Dark Neon Glow Blueprint (#050507) with Progressive Mystery Box [ ? ] Unbox,
  Animated Solid/Dashed Dual Arrows, Spotlight Dimming, and Smooth Camera Pan/Scale at Beat #09.
- Subtitle Style: Exact Tham Tho Detox Moi 5B Spec (Y=1586..1736px, FDAeonik-Medium 46px + SVN-Acta-BoldItalic 45px
  X-Height=24.0px Lock, Elastic Card Width Lerp, and Wipe-In Terracotta Underline synced to arrow impact).
"""

import os
import re
import math
import wave
import subprocess
import unicodedata
import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WORKDIR = "/Users/vietmac/Documents/CODE/AI VIDEO EDIT"
ARTIFACT_DIR = "/Users/vietmac/.gemini/antigravity/brain/105eb0df-7ed0-4ed3-82b8-7a87cb371c77"
FONT_DIR = "/Users/vietmac/.gemini/config/skills/auto-edit-video/remotion-studio/public/fonts"
SFX_DIR = "/Users/vietmac/.gemini/config/skills/auto-edit-video/resources/sfx"

W, H = 1080, 1920
FPS = 60.0
TOTAL_DUR = 19.50
TOTAL_FRAMES = int(round(TOTAL_DUR * FPS))

F_BLACK = os.path.join(FONT_DIR, "SVN-AEONIK-BLACK.TTF")
F_BOLD = os.path.join(FONT_DIR, "FDAeonik-Bold.ttf")
F_MED = os.path.join(FONT_DIR, "FDAeonik-Medium.ttf")
F_ITALIC = os.path.join(FONT_DIR, "FDAeonik-MediumItalic.ttf")
F_ACTA_BI = os.path.join(FONT_DIR, "SVN-Acta-BoldItalic.ttf")


def nfc(s: str) -> str:
    return unicodedata.normalize("NFC", s)


def clean_sub_punct(s: str) -> str:
    return re.sub(r"[.,;:]+\s*$", "", nfc(s).strip())


def get_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


FONT_SUB_NORM = get_font(F_MED, 46)
FONT_SUB_HL = get_font(F_ACTA_BI, 45)

# ==============================================================================
# 10 MICRO-BEATS SCHEDULE (1.8s - 2.2s PER BEAT, SYNCED WITH DIAGRAM & SUBTITLE 5B)
# ==============================================================================
BEATS = [
    {
        "id": "01", "start": 0.00, "end": 1.90,
        "sub1": "Khi đưa AI vào", "sub2": "quy trình edit video", "hl": "edit video",
    },
    {
        "id": "02", "start": 1.90, "end": 3.80,
        "sub1": "bạn vẫn là người", "sub2": "giữ hồn cốt thật", "hl": "hồn cốt thật",
    },
    {
        "id": "03", "start": 3.80, "end": 5.60,
        "sub1": "chỉ cần quay một", "sub2": "bản nói thô tự nhiên", "hl": "bản nói thô",
    },
    {
        "id": "04", "start": 5.60, "end": 7.50,
        "sub1": "AI sẽ làm thợ phụ", "sub2": "bóc băng và cắt nhịp nghỉ", "hl": "bóc băng",
    },
    {
        "id": "05", "start": 7.50, "end": 9.40,
        "sub1": "tự chia nhịp chữ", "sub2": "khớp từng mốc phát âm", "hl": "mốc phát âm",
    },
    {
        "id": "06", "start": 9.40, "end": 11.30,
        "sub1": "giúp bạn bớt ngay", "sub2": "80% giờ ngồi cắt dạo", "hl": "80% giờ",
    },
    {
        "id": "07", "start": 11.30, "end": 13.20,
        "sub1": "Khi bạn nhìn qua", "sub2": "và duyệt một chạm", "hl": "duyệt một chạm",
    },
    {
        "id": "08", "start": 13.20, "end": 15.20,
        "sub1": "hệ thống mới tự phủ", "sub2": "đồ họa 60fps và âm thanh", "hl": "đồ họa 60fps",
    },
    {
        "id": "09", "start": 15.20, "end": 17.30,
        "sub1": "vừa giữ nguyên cảm xúc", "sub2": "vừa dựng xong trong 5 phút", "hl": "5 phút",
    },
    {
        "id": "10", "start": 17.30, "end": 19.50,
        "sub1": "nhàn tay hơn hẳn mà vẫn", "sub2": "giữ trọn chất riêng", "hl": "giữ trọn chất riêng",
    },
]

SFX_EVENTS = [
    # Beat 01: Title + Mystery boxes pop
    {"file": "whoosh_clean_soft.wav", "time": 0.06, "vol": 0.14},
    {"file": "sub_bass_hit_clean.wav", "time": 0.18, "vol": 0.13},
    {"file": "pop_soft_bubble.wav", "time": 0.42, "vol": 0.11},
    # Beat 02: Unlock NGƯỜI NÓI
    {"file": "click_mechanical_warm.wav", "time": 1.96, "vol": 0.14},
    {"file": "whoosh_clean_soft.wav", "time": 2.15, "vol": 0.11},
    # Beat 03: Solid vertical arrow down + Unlock AI ĐẠO DIỄN
    {"file": "whoosh_fast_air.wav", "time": 3.85, "vol": 0.13},
    {"file": "click_mechanical_warm.wav", "time": 4.22, "vol": 0.14},
    # Beat 04: Dashed vertical arrow up
    {"file": "whoosh_clean_soft.wav", "time": 5.65, "vol": 0.12},
    {"file": "click_mechanical_warm.wav", "time": 6.02, "vol": 0.13},
    # Beat 05: Dual diagonal arrows to BẢN DỰNG THÔ
    {"file": "whoosh_fast_air.wav", "time": 7.55, "vol": 0.13},
    {"file": "pop_soft_bubble.wav", "time": 8.05, "vol": 0.12},
    # Beat 06: ~80% yellow stat glow
    {"file": "chime_warm_luxury.wav", "time": 9.65, "vol": 0.15},
    # Beat 07: Horizontal arrow + Unlock [ AI MOTION 60FPS ]
    {"file": "shutter_flash_click.wav", "time": 11.36, "vol": 0.13},
    {"file": "chime_warm_luxury.wav", "time": 11.72, "vol": 0.14},
    # Beat 08: Long diagonal arrow down
    {"file": "whoosh_fast_air.wav", "time": 13.26, "vol": 0.14},
    {"file": "click_mechanical_warm.wav", "time": 13.68, "vol": 0.14},
    # Beat 09: Smooth camera pan + Bottom breakdown reveal
    {"file": "whoosh_clean_soft.wav", "time": 15.22, "vol": 0.14},
    {"file": "sub_bass_hit_clean.wav", "time": 15.55, "vol": 0.14},
    {"file": "chime_warm_luxury.wav", "time": 15.85, "vol": 0.14},
    # Beat 10: Pre-cut riser (17.30 - 1.25 = 16.05s truncated at 17.30s) + Final Box Slam
    {"file": "riser_short_silk.wav", "time": 16.05, "vol": 0.11, "truncate_s": 1.25},
    {"file": "sub_bass_hit_clean.wav", "time": 17.32, "vol": 0.15},
    {"file": "chime_warm_luxury.wav", "time": 17.58, "vol": 0.16},
]


# ==============================================================================
# EASING & MATH HELPERS
# ==============================================================================
def clamp(v: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, v))


def ease_out_cubic(t: float) -> float:
    t = clamp(t)
    return 1.0 - (1.0 - t) ** 3


def ease_in_out_cubic(t: float) -> float:
    t = clamp(t)
    return 4.0 * t * t * t if t < 0.5 else 1.0 - ((-2.0 * t + 2.0) ** 3) / 2.0


def ease_out_back(t: float, s: float = 1.45) -> float:
    t = clamp(t)
    t1 = t - 1.0
    return t1 * t1 * ((s + 1.0) * t1 + s) + 1.0


def prog_window(t: float, t0: float, dur: float, ease_fn=ease_out_cubic) -> float:
    if dur <= 1e-6:
        return 1.0 if t >= t0 else 0.0
    return ease_fn((t - t0) / dur)


def lerp(a: float, b: float, p: float) -> float:
    return a + (b - a) * p


# ==============================================================================
# SPRITE CACHE FOR HIGH-SPEED 60FPS GLOW RENDERING
# ==============================================================================
SPRITE_CACHE = {}


def make_text_sprite(text: str, font_path: str, size: int, fill=(255, 255, 255, 255), glow_col=(255, 255, 255, 165), glow_r: int = 16) -> Image.Image:
    key = ("txt", text, font_path, size, fill, glow_col, glow_r)
    if key in SPRITE_CACHE:
        return SPRITE_CACHE[key]
    font = get_font(font_path, size)
    txt = nfc(text)
    dummy = ImageDraw.Draw(Image.new("RGBA", (10, 10)))
    bbox = dummy.textbbox((0, 0), txt, font=font, anchor="lt")
    pad = glow_r * 2 + 14
    sw = max(20, (bbox[2] - bbox[0]) + pad * 2)
    sh = max(20, (bbox[3] - bbox[1]) + pad * 2)

    glow_img = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow_img)
    gd.text((pad - bbox[0], pad - bbox[1]), txt, font=font, fill=glow_col, anchor="lt")
    if glow_r > 0:
        glow_img = glow_img.filter(ImageFilter.GaussianBlur(glow_r))

    d = ImageDraw.Draw(glow_img)
    d.text((pad - bbox[0], pad - bbox[1]), txt, font=font, fill=fill, anchor="lt")
    SPRITE_CACHE[key] = glow_img
    return glow_img


def make_stat_80_sprite() -> Image.Image:
    key = ("stat_80_line",)
    if key in SPRITE_CACHE:
        return SPRITE_CACHE[key]
    f_sub = get_font(F_MED, 27)
    f_b = get_font(F_BOLD, 30)
    p1, p2, p3 = nfc("rút gọn ~"), nfc("80%"), nfc(" giờ ngồi cắt")
    dummy = ImageDraw.Draw(Image.new("RGBA", (10, 10)))
    w1 = dummy.textlength(p1, font=f_sub)
    w2 = dummy.textlength(p2, font=f_b)
    w3 = dummy.textlength(p3, font=f_sub)
    tot_w = int(w1 + w2 + w3)
    sw, sh = tot_w + 80, 90
    cy = sh // 2
    sx = 40

    glow_img = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow_img)
    gd.text((sx, cy), p1, font=f_sub, fill=(255, 255, 255, 110), anchor="lm")
    gd.text((sx + w1, cy), p2, font=f_b, fill=(255, 200, 0, 210), anchor="lm")
    gd.text((sx + w1 + w2, cy), p3, font=f_sub, fill=(255, 255, 255, 110), anchor="lm")
    glow_img = glow_img.filter(ImageFilter.GaussianBlur(11))

    d = ImageDraw.Draw(glow_img)
    d.text((sx, cy), p1, font=f_sub, fill=(230, 230, 235, 255), anchor="lm")
    d.text((sx + w1, cy), p2, font=f_b, fill=(255, 212, 38, 255), anchor="lm")
    d.text((sx + w1 + w2, cy), p3, font=f_sub, fill=(230, 230, 235, 255), anchor="lm")
    SPRITE_CACHE[key] = glow_img
    return glow_img


def make_box_sprite(w: int, h: int, radius: int = 16, width: int = 3, outline=(255, 255, 255, 240), glow_col=(255, 255, 255, 135), glow_r: int = 14, fill=(14, 14, 18, 228)) -> Image.Image:
    key = ("box", w, h, radius, width, outline, glow_col, glow_r, fill)
    if key in SPRITE_CACHE:
        return SPRITE_CACHE[key]
    pad = glow_r * 2 + 12
    sw, sh = w + pad * 2, h + pad * 2
    glow_img = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow_img)
    gd.rounded_rectangle([pad, pad, pad + w, pad + h], radius=radius, outline=glow_col, width=width + 5, fill=None)
    if glow_r > 0:
        glow_img = glow_img.filter(ImageFilter.GaussianBlur(glow_r))
    d = ImageDraw.Draw(glow_img)
    d.rounded_rectangle([pad, pad, pad + w, pad + h], radius=radius, outline=outline, width=width, fill=fill)
    SPRITE_CACHE[key] = glow_img
    return glow_img


def paste_sprite(canvas: Image.Image, sprite: Image.Image, cx: float, cy: float, alpha: float = 1.0, scale_x: float = 1.0, scale_y: float = 1.0, anchor: str = "mm"):
    if alpha <= 0.01 or scale_x <= 0.02 or scale_y <= 0.02:
        return
    sw, sh = sprite.size
    nw = max(2, int(round(sw * scale_x)))
    nh = max(2, int(round(sh * scale_y)))
    sp = sprite if (nw == sw and nh == sh) else sprite.resize((nw, nh), Image.Resampling.BILINEAR)
    if alpha < 0.995:
        sp = sp.copy()
        a_ch = sp.getchannel("A").point(lambda p: int(p * alpha))
        sp.putalpha(a_ch)
    if anchor == "mm":
        px, py = int(round(cx - nw / 2.0)), int(round(cy - nh / 2.0))
    elif anchor == "lm":
        px, py = int(round(cx - 28 * scale_x)), int(round(cy - nh / 2.0))
    elif anchor == "rm":
        px, py = int(round(cx - nw + 28 * scale_x)), int(round(cy - nh / 2.0))
    else:
        px, py = int(round(cx)), int(round(cy))
    canvas.alpha_composite(sp, (px, py))


def draw_animated_arrow(canvas: Image.Image, p1, p2, prog: float, dashed: bool = False, dash_phase: float = 0.0, alpha: float = 1.0, width: int = 4, head_len: float = 20.0, head_w: float = 11.0):
    if prog <= 0.01 or alpha <= 0.01:
        return
    x1, y1 = p1
    x2_full, y2_full = p2
    x2 = lerp(x1, x2_full, prog)
    y2 = lerp(y1, y2_full, prog)
    dx, dy = x2 - x1, y2 - y1
    dist = math.hypot(dx, dy)
    if dist < 4.0:
        return
    ux, uy = dx / dist, dy / dist
    px, py = -uy, ux

    draw = ImageDraw.Draw(canvas, "RGBA")
    a_main = int(242 * alpha)
    a_glow = int(78 * alpha)
    col_main = (255, 255, 255, a_main)
    col_glow = (255, 255, 255, a_glow)

    hl = min(head_len, dist * 0.65)
    hw = head_w * (hl / head_len)
    lx2, ly2 = x2 - ux * (hl * 0.7), y2 - uy * (hl * 0.7)

    for col, w in [(col_glow, width + 6), (col_main, width)]:
        if not dashed:
            draw.line([(x1, y1), (lx2, ly2)], fill=col, width=w)
        else:
            dash_len = 16.0
            gap_len = 12.0
            period = dash_len + gap_len
            line_dist = math.hypot(lx2 - x1, ly2 - y1)
            cur = -(dash_phase % period)
            while cur < line_dist:
                s_d = max(0.0, cur)
                e_d = min(line_dist, cur + dash_len)
                if e_d > s_d + 1.0:
                    sx, sy = x1 + ux * s_d, y1 + uy * s_d
                    ex, ey = x1 + ux * e_d, y1 + uy * e_d
                    draw.line([(sx, sy), (ex, ey)], fill=col, width=w)
                cur += period

        bx, by = x2 - ux * hl, y2 - uy * hl
        left = (bx + px * hw, by + py * hw)
        right = (bx - px * hw, by - py * hw)
        draw.polygon([(x2, y2), left, right], fill=col)


# ==============================================================================
# SUBTITLE 5B (THAM THO DETOX MOI SPEC WITH SMOOTH ELASTIC CARD WIDTH)
# ==============================================================================
def measure_kieu5_line_width(draw: ImageDraw.ImageDraw, line_str: str, hl_str: str) -> float:
    l_nfc = clean_sub_punct(line_str)
    h_nfc = clean_sub_punct(hl_str)
    pos = l_nfc.lower().find(h_nfc.lower()) if h_nfc else -1
    if pos < 0:
        return draw.textlength(l_nfc, font=FONT_SUB_NORM)
    pre = l_nfc[:pos]
    mid = l_nfc[pos : pos + len(h_nfc)]
    post = l_nfc[pos + len(h_nfc) :]
    return (
        (draw.textlength(pre, font=FONT_SUB_NORM) if pre else 0.0)
        + draw.textlength(mid, font=FONT_SUB_HL)
        + (draw.textlength(post, font=FONT_SUB_NORM) if post else 0.0)
        + 7.0
    )


def precompute_beat_card_widths():
    dummy = ImageDraw.Draw(Image.new("RGBA", (10, 10)))
    for b in BEATS:
        lines = [clean_sub_punct(l) for l in [b["sub1"], b["sub2"]] if l.strip()]
        max_tw = max([measure_kieu5_line_width(dummy, l, b["hl"]) for l in lines]) if lines else 400
        b["card_w"] = float(max(580, min(920, max_tw + 116)))


precompute_beat_card_widths()


def draw_kieu5_xheight_locked_line(
    canvas: Image.Image,
    line_str: str,
    hl_str: str,
    center_x: float,
    baseline_y: float,
    wipe_prog: float = 1.0,
    pop_alpha: float = 1.0,
):
    draw = ImageDraw.Draw(canvas, "RGBA")
    line_nfc = clean_sub_punct(line_str)
    hl_clean = clean_sub_punct(hl_str)
    pos = line_nfc.lower().find(hl_clean.lower()) if hl_clean else -1

    ink_alpha = int(255 * pop_alpha)
    norm_fill = (245, 242, 235, ink_alpha)
    hl_pre_fill = (218, 210, 198, ink_alpha)
    hl_active_fill = (255, 198, 110, ink_alpha)
    underline_rgb = (232, 108, 66)

    if pos < 0:
        tw = draw.textlength(line_nfc, font=FONT_SUB_NORM)
        x0 = center_x - tw / 2.0
        draw.text((x0, baseline_y), line_nfc, font=FONT_SUB_NORM, anchor="ls", fill=norm_fill)
        return

    pre = line_nfc[:pos]
    mid = line_nfc[pos : pos + len(hl_clean)]
    post = line_nfc[pos + len(hl_clean) :]

    w_pre = draw.textlength(pre, font=FONT_SUB_NORM) if pre else 0.0
    w_mid = draw.textlength(mid, font=FONT_SUB_HL)
    w_post = draw.textlength(post, font=FONT_SUB_NORM) if post else 0.0

    kern_l = 3.0 if pre else 0.0
    kern_r = 4.0 if post else 0.0
    total_w = w_pre + kern_l + w_mid + kern_r + w_post
    cur_x = center_x - total_w / 2.0

    if pre:
        draw.text((cur_x, baseline_y), pre, font=FONT_SUB_NORM, anchor="ls", fill=norm_fill)
        cur_x += w_pre + kern_l

    mid_x = cur_x
    e = ease_out_cubic(wipe_prog)
    if e > 0.01:
        draw.text((mid_x, baseline_y), mid, font=FONT_SUB_HL, anchor="ls", fill=hl_pre_fill)
        hl_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        hld = ImageDraw.Draw(hl_layer, "RGBA")
        hld.text((mid_x, baseline_y), mid, font=FONT_SUB_HL, anchor="ls", fill=hl_active_fill)
        bar_y = int(round(baseline_y + 10))
        bar_w = max(4, int(round(w_mid * e)))
        hld.rounded_rectangle(
            [int(mid_x), bar_y, int(mid_x) + bar_w, bar_y + 3],
            radius=1,
            fill=(*underline_rgb, int(235 * pop_alpha)),
        )
        mask = Image.new("L", (W, H), 0)
        clip_r = int(round(mid_x + (w_mid + 12) * e))
        ImageDraw.Draw(mask).rectangle([int(mid_x) - 4, int(baseline_y - 52), clip_r, int(baseline_y + 24)], fill=255)
        canvas.paste(hl_layer, (0, 0), mask)
        draw = ImageDraw.Draw(canvas, "RGBA")
    else:
        draw.text((mid_x, baseline_y), mid, font=FONT_SUB_HL, anchor="ls", fill=hl_pre_fill)

    cur_x += w_mid + kern_r
    if post:
        draw.text((cur_x, baseline_y), post, font=FONT_SUB_NORM, anchor="ls", fill=norm_fill)


def draw_subtitle_5b_animated(canvas: Image.Image, t_sec: float):
    beat_idx = 0
    for i, b in enumerate(BEATS):
        if b["start"] <= t_sec <= b["end"] + 0.001:
            beat_idx = i
            break
    b = BEATS[beat_idx]
    prev_w = BEATS[beat_idx - 1]["card_w"] if beat_idx > 0 else b["card_w"]
    local_t = max(0.0, t_sec - b["start"])
    beat_dur = b["end"] - b["start"]

    # Smooth card entrance + elastic width interpolation
    pop_prog = ease_out_cubic(min(1.0, local_t / 0.22)) if beat_idx == 0 else 1.0
    text_pop = ease_out_cubic(min(1.0, local_t / 0.20))
    w_Morph = ease_out_cubic(min(1.0, local_t / 0.24))
    card_w = int(round(lerp(prev_w, b["card_w"], w_Morph)))

    y_shift = int(round((1.0 - text_pop) * 14))
    left = (W - card_w) // 2
    right = left + card_w
    top, bot = 1586, 1736

    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.rounded_rectangle([left, top + 6, right, bot + 6], radius=16, fill=(0, 0, 0, int(125 * pop_prog)))
    draw.rounded_rectangle(
        [left, top, right, bot],
        radius=16,
        fill=(22, 20, 19, int(228 * pop_prog)),
        outline=(255, 248, 235, int(58 * pop_prog)),
        width=1,
    )
    draw.line([(left + 26, top), (right - 26, top)], fill=(218, 92, 58, int(245 * pop_prog)), width=3)
    draw.line([(left + 26, bot), (right - 26, bot)], fill=(255, 220, 170, int(95 * pop_prog)), width=2)

    lines = [clean_sub_punct(l) for l in [b["sub1"], b["sub2"]] if l.strip()]
    b_ys = [top + 58 + y_shift, top + 114 + y_shift] if len(lines) == 2 else [top + 86 + y_shift]

    # Sync underline wipe with arrow arrival (~0.20s into beat, sweeping over 0.34s)
    wipe_p = clamp((local_t - 0.18) / 0.34)
    for idx_l, line_str in enumerate(lines):
        draw_kieu5_xheight_locked_line(
            canvas,
            line_str,
            b["hl"],
            center_x=W / 2.0,
            baseline_y=b_ys[idx_l],
            wipe_prog=wipe_p,
            pop_alpha=text_pop,
        )


# ==============================================================================
# MAIN 60FPS FRAME COMPOSITOR (WITH SMOOTH STAGE 1 -> STAGE 2 INTERPOLATION)
# ==============================================================================
def make_base_bg() -> np.ndarray:
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    dx = (xx - 540.0) / 520.0
    dy = (yy - 760.0) / 680.0
    r2 = dx * dx + dy * dy
    halo = np.exp(-r2 * 1.6)
    bg = np.zeros((H, W, 4), dtype=np.uint8)
    bg[..., 0] = np.clip(5 + halo * 11, 0, 255).astype(np.uint8)
    bg[..., 1] = np.clip(5 + halo * 11, 0, 255).astype(np.uint8)
    bg[..., 2] = np.clip(7 + halo * 15, 0, 255).astype(np.uint8)
    bg[..., 3] = 255
    return bg


BASE_BG_IMG = Image.fromarray(make_base_bg())


def render_frame_60fps(f_idx: int) -> np.ndarray:
    t = f_idx / FPS
    canvas = BASE_BG_IMG.copy()

    # Camera pan progress p_pan (0.0 before 15.20s -> 1.0 at 15.80s)
    p_pan = prog_window(t, 15.20, 0.62, ease_in_out_cubic)
    dash_phase = t * 52.0  # Continuous upward/reverse data flow on dashed arrows

    # Spotlight dimming factor for upper left chain when right branch or bottom breakdown activates
    left_dim = 1.0
    if 11.30 <= t < 15.20:
        left_dim = lerp(1.0, 0.78, prog_window(t, 11.30, 0.35))
    elif t >= 15.20:
        left_dim = lerp(0.78, 0.85, p_pan)

    # 1. TOP TITLE
    p_title = prog_window(t, 0.05, 0.45)
    if p_title > 0.01:
        ty = lerp(340.0, 110.0, p_pan) + (1.0 - p_title) * -18.0
        ts = lerp(1.0, 0.86, p_pan)
        sp_title = make_text_sprite("A I   L À M   G Ì   T R O N G   K H Â U   E D I T   V I D E O", F_MED, 34, fill=(235, 235, 240, 255), glow_r=10)
        paste_sprite(canvas, sp_title, W / 2.0, ty, alpha=p_title, scale_x=ts, scale_y=ts)

    # 2. NODE 1 (TOP LEFT): Mystery Box [ ? ] at Beat #01 -> Flips into NGƯỜI NÓI at Beat #02 (t=1.90s)
    n1_x = lerp(260.0, 235.0, p_pan)
    n1_y = lerp(505.0, 225.0, p_pan)
    n1_sc = lerp(1.0, 0.84, p_pan)
    p_box1_in = prog_window(t, 0.18, 0.42, ease_out_back)
    if t < 2.05:
        flip_out = 1.0 - prog_window(t, 1.90, 0.15)
        sp_mb1 = make_box_sprite(320, 100, radius=16, width=3, glow_r=12)
        sp_q = make_text_sprite("?", F_BLACK, 48, glow_r=16)
        paste_sprite(canvas, sp_mb1, n1_x, n1_y, alpha=clamp(p_box1_in * flip_out), scale_x=n1_sc * max(0.05, flip_out), scale_y=n1_sc)
        paste_sprite(canvas, sp_q, n1_x, n1_y, alpha=clamp(p_box1_in * flip_out), scale_x=n1_sc * max(0.05, flip_out), scale_y=n1_sc)
    if t >= 2.02:
        flip_in = prog_window(t, 2.02, 0.24, ease_out_back)
        sp_n1 = make_text_sprite("NGƯỜI NÓI", F_BLACK, 46, glow_r=18)
        sp_n1_sub = make_text_sprite("giữ hồn cốt & câu chuyện thật", F_MED, 28, fill=(215, 215, 220, 255), glow_r=6)
        paste_sprite(canvas, sp_n1, n1_x, n1_y, alpha=clamp(flip_in) * left_dim, scale_x=n1_sc * clamp(flip_in), scale_y=n1_sc)
        paste_sprite(canvas, sp_n1_sub, n1_x, n1_y + lerp(55.0, 44.0, p_pan), alpha=clamp(flip_in) * left_dim, scale_x=n1_sc, scale_y=n1_sc)

    # 3. NODE 2 (MID LEFT): Mystery Box [ ? ] at Beat #01 -> Flips into AI ĐẠO DIỄN at Beat #03 (t=4.15s)
    n2_x = lerp(260.0, 235.0, p_pan)
    n2_y = lerp(900.0, 530.0, p_pan)
    n2_sc = lerp(1.0, 0.84, p_pan)
    p_box2_in = prog_window(t, 0.30, 0.42, ease_out_back)
    if t < 4.28:
        flip_out2 = 1.0 - prog_window(t, 4.12, 0.16)
        sp_mb2 = make_box_sprite(320, 100, radius=16, width=3, glow_r=12)
        sp_q = make_text_sprite("?", F_BLACK, 48, glow_r=16)
        paste_sprite(canvas, sp_mb2, n2_x, n2_y, alpha=clamp(p_box2_in * flip_out2), scale_x=n2_sc * max(0.05, flip_out2), scale_y=n2_sc)
        paste_sprite(canvas, sp_q, n2_x, n2_y, alpha=clamp(p_box2_in * flip_out2), scale_x=n2_sc * max(0.05, flip_out2), scale_y=n2_sc)
    if t >= 4.25:
        flip_in2 = prog_window(t, 4.25, 0.24, ease_out_back)
        sp_n2 = make_text_sprite("AI ĐẠO DIỄN", F_BLACK, 46, glow_r=18)
        sp_n2_sub = make_text_sprite("chỉ làm thợ phụ phân tích thô", F_MED, 28, fill=(215, 215, 220, 255), glow_r=6)
        paste_sprite(canvas, sp_n2, n2_x, n2_y, alpha=clamp(flip_in2) * left_dim, scale_x=n2_sc * clamp(flip_in2), scale_y=n2_sc)
        paste_sprite(canvas, sp_n2_sub, n2_x, n2_y + lerp(55.0, 44.0, p_pan), alpha=clamp(flip_in2) * left_dim, scale_x=n2_sc, scale_y=n2_sc)

    # 4. VERTICAL DUAL ARROWS BETWEEN NODE 1 & NODE 2 (Beat #03 solid down + Beat #04 dashed up)
    v_x_down = lerp(225.0, 205.0, p_pan)
    v_x_up = lerp(285.0, 265.0, p_pan)
    v_y_top = lerp(615.0, 308.0, p_pan)
    v_y_bot = lerp(835.0, 480.0, p_pan)

    p_arr_vdown = prog_window(t, 3.82, 0.38)
    if p_arr_vdown > 0.01:
        draw_animated_arrow(canvas, (v_x_down, v_y_top), (v_x_down, v_y_bot), p_arr_vdown, dashed=False, alpha=left_dim)
        sp_lbl1 = make_text_sprite("quay 1 bản", F_ITALIC, 27, fill=(230, 230, 235, 255), glow_r=6)
        sp_lbl2 = make_text_sprite("nói thô", F_ITALIC, 27, fill=(230, 230, 235, 255), glow_r=6)
        paste_sprite(canvas, sp_lbl1, lerp(195.0, 182.0, p_pan), lerp(715.0, 380.0, p_pan), alpha=p_arr_vdown * left_dim, scale_x=n1_sc, scale_y=n1_sc, anchor="rm")
        paste_sprite(canvas, sp_lbl2, lerp(195.0, 182.0, p_pan), lerp(755.0, 410.0, p_pan), alpha=p_arr_vdown * left_dim, scale_x=n1_sc, scale_y=n1_sc, anchor="rm")

    p_arr_vup = prog_window(t, 5.64, 0.42)
    if p_arr_vup > 0.01:
        draw_animated_arrow(canvas, (v_x_up, v_y_bot), (v_x_up, v_y_top), p_arr_vup, dashed=True, dash_phase=dash_phase, alpha=left_dim)
        sp_u1 = make_text_sprite("bóc băng chuẩn 100%", F_ITALIC, 27, fill=(230, 230, 235, 255), glow_r=6)
        sp_u2 = make_text_sprite("+ cắt khoảng nghỉ", F_ITALIC, 27, fill=(230, 230, 235, 255), glow_r=6)
        paste_sprite(canvas, sp_u1, lerp(315.0, 288.0, p_pan), lerp(705.0, 378.0, p_pan), alpha=p_arr_vup * left_dim, scale_x=n1_sc, scale_y=n1_sc, anchor="lm")
        paste_sprite(canvas, sp_u2, lerp(315.0, 288.0, p_pan), lerp(745.0, 408.0, p_pan), alpha=p_arr_vup * left_dim, scale_x=n1_sc, scale_y=n1_sc, anchor="lm")

    # 5. DIAGONAL DUAL ARROWS BETWEEN NODE 2 & NODE 3 (Beat #05)
    p_diag_down = prog_window(t, 7.52, 0.40)
    if p_diag_down > 0.01:
        p1_d = (lerp(335.0, 310.0, p_pan), lerp(1010.0, 610.0, p_pan))
        p2_d = (lerp(535.0, 505.0, p_pan), lerp(1155.0, 730.0, p_pan))
        draw_animated_arrow(canvas, p1_d, p2_d, p_diag_down, dashed=False, alpha=left_dim)
        sp_d1 = make_text_sprite("chia nhịp chữ · cảnh trám", F_ITALIC, 27, fill=(230, 230, 235, 255), glow_r=6)
        paste_sprite(canvas, sp_d1, lerp(410.0, 395.0, p_pan), lerp(1125.0, 705.0, p_pan), alpha=p_diag_down * left_dim, scale_x=n1_sc, scale_y=n1_sc, anchor="rm")

    p_diag_up = prog_window(t, 7.92, 0.42)
    if p_diag_up > 0.01:
        p1_u = (lerp(590.0, 560.0, p_pan), lerp(1140.0, 718.0, p_pan))
        p2_u = (lerp(405.0, 385.0, p_pan), lerp(1005.0, 605.0, p_pan))
        draw_animated_arrow(canvas, p1_u, p2_u, p_diag_up, dashed=True, dash_phase=dash_phase, alpha=left_dim)
        sp_d2 = make_text_sprite("khớp từng mốc phát âm", F_ITALIC, 24, fill=(230, 230, 235, 255), glow_r=6)
        paste_sprite(canvas, sp_d2, lerp(476.0, 442.0, p_pan), lerp(1032.0, 632.0, p_pan), alpha=p_diag_up * left_dim, scale_x=n1_sc, scale_y=n1_sc, anchor="lm")

    # 6. NODE 3: [ BẢN DỰNG THÔ ] (Appears at Beat #01, stat lines appear at Beat #05/#06)
    n3_x = lerp(665.0, 640.0, p_pan)
    n3_y = lerp(1221.0, 783.0, p_pan)
    n3_sc = lerp(1.0, 0.88, p_pan)
    p_box3_in = prog_window(t, 0.42, 0.45, ease_out_back)
    if p_box3_in > 0.01:
        sp_b3 = make_box_sprite(376, 92, radius=16, width=4, glow_r=16)
        sp_t3 = make_text_sprite("BẢN DỰNG THÔ", F_BLACK, 39, glow_r=14)
        paste_sprite(canvas, sp_b3, n3_x, n3_y, alpha=clamp(p_box3_in), scale_x=n3_sc * p_box3_in, scale_y=n3_sc * p_box3_in)
        paste_sprite(canvas, sp_t3, n3_x, n3_y, alpha=clamp(p_box3_in), scale_x=n3_sc * p_box3_in, scale_y=n3_sc * p_box3_in)

    p_sub3_1 = prog_window(t, 8.35, 0.35)
    if p_sub3_1 > 0.01:
        sp_s31 = make_text_sprite("Khóa mắt 1/3 · Phụ đề 2 dòng", F_MED, 27, fill=(230, 230, 235, 255), glow_r=6)
        paste_sprite(canvas, sp_s31, n3_x, lerp(1312.0, 854.0, p_pan), alpha=p_sub3_1, scale_x=n3_sc, scale_y=n3_sc)

    p_sub3_2 = prog_window(t, 9.42, 0.38, ease_out_back)
    if p_sub3_2 > 0.01:
        stat_y = lerp(1356.0, 890.0, p_pan)
        sp_stat80 = make_stat_80_sprite()
        sc_80 = n3_sc * (1.0 + 0.08 * math.sin(clamp((t - 9.45) / 0.45) * math.pi))
        paste_sprite(canvas, sp_stat80, n3_x, stat_y, alpha=clamp(p_sub3_2), scale_x=sc_80, scale_y=sc_80, anchor="mm")

    # 7. NODE 4 (TOP RIGHT): Mystery Box [ ? ] at Beat #01 -> Unlocked into [ AI MOTION 60FPS ] at Beat #07 (t=11.30s)
    n4_x = 810.0
    n4_y = lerp(505.0, 225.0, p_pan)
    n4_sc = lerp(1.0, 0.90, p_pan)
    p_box4_in = prog_window(t, 0.24, 0.42, ease_out_back)

    # Short horizontal arrow at Stage 1 (t=2.2s..11.3s), extending to full arrow at Beat #07 (t=11.3s)
    if t >= 2.20:
        hx1 = lerp(410.0, 380.0, p_pan)
        hx2 = 535.0 if t < 11.30 else lerp(535.0, 610.0, prog_window(t, 11.30, 0.30))
        p_h_arr = prog_window(t, 2.20, 0.35)
        draw_animated_arrow(canvas, (hx1, n4_y), (hx2, n4_y), p_h_arr, dashed=False, alpha=1.0)
        if t >= 11.32:
            p_hlbl = prog_window(t, 11.32, 0.35)
            sp_hlbl = make_text_sprite("chốt gu · duyệt 1 chạm", F_ITALIC, 23, fill=(225, 225, 230, 255), glow_r=5)
            paste_sprite(canvas, sp_hlbl, lerp(508.0, 495.0, p_pan), n4_y - lerp(35.0, 30.0, p_pan), alpha=p_hlbl, scale_x=n4_sc, scale_y=n4_sc)

    if t < 11.58:
        flip_out4 = 1.0 - prog_window(t, 11.42, 0.16)
        q_pulse = 1.0 + 0.05 * math.sin(t * 4.5)
        sp_mb4 = make_box_sprite(340, 96, radius=16, width=3, glow_r=12)
        sp_q4 = make_text_sprite("?", F_BLACK, 48, glow_r=16)
        paste_sprite(canvas, sp_mb4, n4_x, n4_y, alpha=clamp(p_box4_in * flip_out4), scale_x=n4_sc * max(0.05, flip_out4), scale_y=n4_sc)
        paste_sprite(canvas, sp_q4, n4_x, n4_y, alpha=clamp(p_box4_in * flip_out4), scale_x=n4_sc * max(0.05, flip_out4) * q_pulse, scale_y=n4_sc * q_pulse)

    if t >= 11.55:
        flip_in4 = prog_window(t, 11.55, 0.26, ease_out_back)
        sp_b4 = make_box_sprite(366, 88, radius=15, width=3, glow_r=14)
        sp_t4 = make_text_sprite("AI MOTION 60FPS", F_BLACK, 35, glow_r=12)
        sp_s4 = make_text_sprite("đồ họa động · B-Roll · âm thanh", F_MED, 25, fill=(215, 215, 220, 255), glow_r=6)
        paste_sprite(canvas, sp_b4, n4_x, n4_y, alpha=clamp(flip_in4), scale_x=n4_sc * clamp(flip_in4), scale_y=n4_sc)
        paste_sprite(canvas, sp_t4, n4_x, n4_y, alpha=clamp(flip_in4), scale_x=n4_sc * clamp(flip_in4), scale_y=n4_sc)
        paste_sprite(canvas, sp_s4, n4_x, n4_y + lerp(76.0, 68.0, p_pan), alpha=clamp(flip_in4), scale_x=n4_sc, scale_y=n4_sc)

    # 8. LONG DIAGONAL ARROW FROM [ AI MOTION 60FPS ] DOWN TO [ BẢN DỰNG THÔ ] (Beat #08, t=13.20s)
    p_long_arr = prog_window(t, 13.22, 0.45)
    if p_long_arr > 0.01:
        lp1 = (lerp(825.0, 815.0, p_pan), lerp(625.0, 332.0, p_pan))
        lp2 = (lerp(765.0, 748.0, p_pan), lerp(1155.0, 728.0, p_pan))
        draw_animated_arrow(canvas, lp1, lp2, p_long_arr, dashed=False, alpha=1.0)
        sp_l1 = make_text_sprite("phủ đồ họa 60fps", F_ITALIC, 24, fill=(230, 230, 235, 255), glow_r=6)
        sp_l2 = make_text_sprite("+ phối 4 lớp SFX", F_ITALIC, 24, fill=(230, 230, 235, 255), glow_r=6)
        paste_sprite(canvas, sp_l1, lerp(812.0, 800.0, p_pan), lerp(880.0, 530.0, p_pan), alpha=p_long_arr, scale_x=n4_sc, scale_y=n4_sc, anchor="lm")
        paste_sprite(canvas, sp_l2, lerp(812.0, 800.0, p_pan), lerp(914.0, 560.0, p_pan), alpha=p_long_arr, scale_x=n4_sc, scale_y=n4_sc, anchor="lm")

    # 9. BOTTOM BREAKDOWN SECTION (Beat #09, t=15.20s) & FINAL CONCLUSION BOX (Beat #10, t=17.30s)
    if t >= 15.35:
        draw = ImageDraw.Draw(canvas, "RGBA")
        p_div = prog_window(t, 15.35, 0.35)
        half_w = int(440 * p_div)
        draw.line([(540 - half_w, 950), (540 + half_w, 950)], fill=(255, 255, 255, int(80 * p_div)), width=2)

        p_sec_title = prog_window(t, 15.48, 0.35)
        if p_sec_title > 0.01:
            sp_st = make_text_sprite("Đ Ầ U   R A   T H Ự C   T Ế   Đ Ạ T   Đ Ư Ợ C", F_MED, 25, fill=(235, 235, 240, 255), glow_r=7)
            paste_sprite(canvas, sp_st, W / 2.0, 1002.0 + (1.0 - p_sec_title) * 14.0, alpha=p_sec_title)

        # Left & Right Branches
        p_br = prog_window(t, 15.65, 0.40, ease_out_back)
        if p_br > 0.01:
            sp_bl = make_text_sprite("CHẤT NGƯỜI", F_BLACK, 31, glow_r=10)
            sp_bls = make_text_sprite("giữ trọn 100% giọng & ánh mắt", F_MED, 21, fill=(220, 220, 225, 255), glow_r=5)
            paste_sprite(canvas, sp_bl, 265.0, 1072.0, alpha=clamp(p_br), scale_x=clamp(p_br), scale_y=clamp(p_br))
            paste_sprite(canvas, sp_bls, 265.0, 1120.0, alpha=clamp(p_br))

            sp_br = make_text_sprite("TỐC ĐỘ DỰNG", F_BLACK, 31, glow_r=10)
            sp_br_box = make_box_sprite(300, 60, radius=12, width=3, glow_r=10, fill=(18, 18, 22, 230))
            sp_br_val = make_text_sprite("5 – 10 phút / clip", F_BOLD, 27, fill=(255, 212, 38, 255), glow_col=(255, 200, 0, 170), glow_r=10)
            paste_sprite(canvas, sp_br, 790.0, 1062.0, alpha=clamp(p_br), scale_x=clamp(p_br), scale_y=clamp(p_br))
            paste_sprite(canvas, sp_br_box, 790.0, 1124.0, alpha=clamp(p_br), scale_x=clamp(p_br), scale_y=clamp(p_br))
            paste_sprite(canvas, sp_br_val, 790.0, 1124.0, alpha=clamp(p_br), scale_x=clamp(p_br), scale_y=clamp(p_br))

        # Two numbered detail lines
        p_n1 = prog_window(t, 16.05, 0.35)
        if p_n1 > 0.01:
            a1 = int(235 * p_n1)
            draw.ellipse((145 - 13, 1212 - 13, 145 + 13, 1212 + 13), outline=(225, 225, 230, a1), width=2)
            draw.text((145, 1212), "1", font=get_font(F_BOLD, 16), fill=(235, 235, 240, a1), anchor="mm")
            sp_line1 = make_text_sprite("Không bịa chữ, không làm méo giọng hay giả mặt người nói", F_MED, 21, fill=(225, 225, 230, 255), glow_r=5)
            paste_sprite(canvas, sp_line1, 178.0, 1212.0, alpha=p_n1, anchor="lm")

        p_n2 = prog_window(t, 16.32, 0.35)
        if p_n2 > 0.01:
            a2 = int(235 * p_n2)
            draw.ellipse((145 - 13, 1256 - 13, 145 + 13, 1256 + 13), outline=(225, 225, 230, a2), width=2)
            draw.text((145, 1256), "2", font=get_font(F_BOLD, 16), fill=(235, 235, 240, a2), anchor="mm")
            sp_line2 = make_text_sprite("AI gánh việc tay chân: cắt vấp, căn chữ, đặt SFX đúng từng frame", F_MED, 21, fill=(225, 225, 230, 255), glow_r=5)
            paste_sprite(canvas, sp_line2, 178.0, 1256.0, alpha=p_n2, anchor="lm")

    # Beat #10 (17.30s): Final Arrow + Glowing Conclusion Box [ VIDEO CHUẨN STUDIO 60FPS ]
    if t >= 17.30:
        p_farr = prog_window(t, 17.30, 0.25)
        draw_animated_arrow(canvas, (W / 2.0, 1305.0), (W / 2.0, 1375.0), p_farr, dashed=False, alpha=1.0)
        p_fbox = prog_window(t, 17.48, 0.38, ease_out_back)
        if p_fbox > 0.01:
            sp_fb = make_box_sprite(610, 92, radius=16, width=4, glow_col=(255, 255, 255, 195), glow_r=18, fill=(22, 22, 28, 245))
            sp_ft = make_text_sprite("VIDEO CHUẨN STUDIO 60FPS", F_BLACK, 35, glow_r=15)
            paste_sprite(canvas, sp_fb, W / 2.0, 1438.0, alpha=clamp(p_fbox), scale_x=clamp(p_fbox), scale_y=clamp(p_fbox))
            paste_sprite(canvas, sp_ft, W / 2.0, 1438.0, alpha=clamp(p_fbox), scale_x=clamp(p_fbox), scale_y=clamp(p_fbox))

    # 10. THAM THO 5B SUBTITLE AT BOTTOM (Y=1586..1736px)
    draw_subtitle_5b_animated(canvas, t)

    return cv2.cvtColor(np.array(canvas.convert("RGB")), cv2.COLOR_RGB2BGR)


# ==============================================================================
# 4-LAYER STUDIO SFX MIXER (48KHZ STEREO WAV)
# ==============================================================================
def build_sfx_audio(out_wav: str):
    sr = 48000
    total_samples = int(TOTAL_DUR * sr)
    master = np.zeros((total_samples, 2), dtype=np.float32)

    for ev in SFX_EVENTS:
        fpath = os.path.join(SFX_DIR, ev["file"])
        if not os.path.exists(fpath):
            continue
        tmp_wav = "/tmp/tmp_sfx_48k.wav"
        subprocess.run(
            ["ffmpeg", "-y", "-i", fpath, "-ar", str(sr), "-ac", "2", "-f", "wav", tmp_wav],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        with wave.open(tmp_wav, "rb") as wf:
            n_ch = wf.getnchannels()
            n_fr = wf.getnframes()
            raw = wf.readframes(n_fr)
            data = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
            if n_ch == 2:
                data = data.reshape(-1, 2)
            else:
                data = np.column_stack([data, data])

        if "truncate_s" in ev:
            max_s = int(ev["truncate_s"] * sr)
            if len(data) > max_s:
                data = data[:max_s]
                fade_len = min(int(0.015 * sr), len(data))
                fade = np.linspace(1.0, 0.0, fade_len, dtype=np.float32)[:, None]
                data[-fade_len:] *= fade

        start_idx = max(0, int(ev["time"] * sr))
        end_idx = min(total_samples, start_idx + len(data))
        if end_idx > start_idx:
            master[start_idx:end_idx] += data[: end_idx - start_idx] * float(ev["vol"])

    master = np.clip(master, -0.95, 0.95)
    pcm16 = (master * 32767.0).astype(np.int16)
    with wave.open(out_wav, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(pcm16.tobytes())


def main():
    tmp_vid = "/tmp/ai_edit_diagram_raw_60fps.mp4"
    tmp_wav = "/tmp/ai_edit_diagram_sfx.wav"
    final_mp4 = os.path.join(WORKDIR, "ai_edit_diagram_motion_60fps_nospeech.mp4")

    print(f"[1/3] Mixing 4-Layer Studio SFX ({TOTAL_DUR}s)...")
    build_sfx_audio(tmp_wav)

    print(f"[2/3] Rendering {TOTAL_FRAMES} frames @ {FPS}fps (1080x1920)...")
    cmd_enc = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{W}x{H}",
        "-pix_fmt", "bgr24",
        "-r", str(FPS),
        "-i", "-",
        "-i", tmp_wav,
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "17",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        final_mp4,
    ]
    proc = subprocess.Popen(cmd_enc, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    storyboard_frames = []
    sample_times = [b["start"] + (b["end"] - b["start"]) * 0.68 for b in BEATS]
    sample_indices = {int(round(st * FPS)): i for i, st in enumerate(sample_times)}

    for f_idx in range(TOTAL_FRAMES):
        bgr = render_frame_60fps(f_idx)
        proc.stdin.write(bgr.tobytes())
        if f_idx in sample_indices:
            b_i = sample_indices[f_idx]
            small = cv2.resize(bgr, (270, 480), interpolation=cv2.INTER_AREA)
            cv2.putText(
                small,
                f"Beat #{b_i+1:02d} ({f_idx/FPS:.1f}s)",
                (14, 34),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.68,
                (0, 215, 255),
                2,
                cv2.LINE_AA,
            )
            storyboard_frames.append(small)
        if (f_idx + 1) % 240 == 0 or f_idx == TOTAL_FRAMES - 1:
            print(f"  -> Rendered {f_idx + 1}/{TOTAL_FRAMES} frames ({(f_idx+1)/TOTAL_FRAMES*100:.1f}%)")

    proc.stdin.close()
    proc.wait()

    # Save 10-beat verification grid (2 rows x 5 cols)
    row1 = np.hstack(storyboard_frames[:5])
    row2 = np.hstack(storyboard_frames[5:10])
    grid = np.vstack([row1, row2])
    grid_path = os.path.join(ARTIFACT_DIR, "ai_edit_diagram_60fps_10beats_grid.jpg")
    cv2.imwrite(grid_path, grid, [int(cv2.IMWRITE_JPEG_QUALITY), 94])

    print(f"[3/3] Completed! Video: {final_mp4}")
    print(f"      Verification Grid: {grid_path}")


if __name__ == "__main__":
    main()
