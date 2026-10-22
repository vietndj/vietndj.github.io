#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SPA EDIT CLI V7.2 — ONE-COMMAND DETERMINISTIC PACKAGING ENGINE FOR SPA / CLINIC VIDEOS
Reads `presets/spa_clinic.json` + `brands/<brand>.json` (with optional CLI overrides),
runs the 6-Gate Verifier, and executes the full V7.2 Eye-Lock Master Render.
"""

import os
import sys
import json
import shutil
import argparse
import subprocess

SKILL_DIR = os.path.expanduser("~/.gemini/config/skills/spa-edit")
DEFAULT_PRESET = os.path.join(SKILL_DIR, "presets", "spa_clinic.json")
DEFAULT_BRAND = os.path.join(SKILL_DIR, "brands", "tham_tho_beauty.json")
WORKDIR = "/Users/vietmac/Documents/CODE/AI VIDEO EDIT"


def main():
    parser = argparse.ArgumentParser(description="Spa Video Edit V7.2 Master CLI")
    parser.add_argument("--preset", default=DEFAULT_PRESET, help="Path to niche preset JSON")
    parser.add_argument("--brand", default=DEFAULT_BRAND, help="Path to student brand JSON")
    parser.add_argument("--brand-name", default=None, help="Override brand_name on the fly")
    parser.add_argument("--monogram", default=None, help="Override 2-letter monogram on the fly")
    parser.add_argument("--tagline", default=None, help="Override brand tagline on the fly")
    parser.add_argument("--price", default=None, help="Override CTA offer price badge on the fly")
    parser.add_argument("--outro-mode", type=int, choices=[1, 2], default=1, help="1 = Pure Brand Identity on Black, 2 = Brand + CTA on Black")
    parser.add_argument("--verify-only", action="store_true", help="Only run the 6-Gate Deterministic Verifier")
    args = parser.parse_args()

    with open(args.preset, "r", encoding="utf-8") as f:
        preset_cfg = json.load(f)
    with open(args.brand, "r", encoding="utf-8") as f:
        brand_cfg = json.load(f)

    if args.brand_name:
        brand_cfg["brand_name"] = args.brand_name.upper()
        brand_cfg["short_name"] = args.brand_name
    if args.monogram:
        brand_cfg["monogram"] = args.monogram.upper()
    if args.tagline:
        brand_cfg["tagline"] = args.tagline
    if args.price:
        brand_cfg.setdefault("cta_offer", {})["price_badge"] = args.price.upper()
    brand_cfg["tier2_outro_mode"] = "option_1_pure_brand" if args.outro_mode == 1 else "option_2_with_cta"

    print("==================================================================")
    print(f"🌿 SPA-EDIT V7.2 ENGINE | BRAND: {brand_cfg['brand_name']} ({brand_cfg['monogram']})")
    print(f"   Preset: {preset_cfg['preset_id']} | Outro Mode: Option {args.outro_mode}")
    print("==================================================================")

    sys.path.insert(0, WORKDIR)
    from verify_readability_and_sync import audit_beats
    from build_thamtho_v5_clean_master import MICRO_BEATS_V6

    rep = audit_beats(MICRO_BEATS_V6, f"SPA_EDIT_{brand_cfg['brand_id'].upper()}", camera_transform_mode="eye_affine_v7")
    print(
        f"[6-GATE AUDIT] passed_all={rep['passed_all']} | avg_RLI={rep['avg_rli']} | "
        f"static_ratio={rep['aroll_static_frame_ratio']*100:.1f}% | WER={rep['transcript_wer']*100:.1f}% | "
        f"EyeLock_ΔY={rep['gate5_eye_lock']['delta_Y_eye_px']}px | "
        f"Unique_Broll={rep['gate6_unique_broll']['broll_counts']}"
    )
    if not rep["passed_all"]:
        sys.exit(1)

    if args.verify_only:
        print("✅ 6-Gate Verification PASSED 100% (Verify-Only mode).")
        return

    # Save active runtime brand config and run master renderer
    active_brand_path = os.path.join(WORKDIR, "active_brand_profile.json")
    with open(active_brand_path, "w", encoding="utf-8") as f:
        json.dump(brand_cfg, f, ensure_ascii=False, indent=2)

    subprocess.run([sys.executable, os.path.join(WORKDIR, "build_thamtho_v7_eyelock_master.py")], cwd=WORKDIR, check=True)
    print("✅ DONE! Master video exported to:", os.path.join(WORKDIR, "thamtho_detox_v7_eyelock_master.mp4"))


if __name__ == "__main__":
    main()
