#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
7-GATE DETERMINISTIC VERIFIER FOR SPA-EDIT & DENTAL-MEDICAL SKILL (V10 STANDALONE)
Works 100% standalone on any student machine without requiring /Users/vietmac/... paths.
Usage:
  python3 ~/.gemini/config/skills/spa-edit/scripts/verify_6gates.py
  python3 ~/.gemini/config/skills/spa-edit/scripts/verify_6gates.py --plan /path/to/video_edl_plan.json
"""
import argparse
import json
import os
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from verify_readability_and_sync import (
    DEFAULT_BENCHMARK_BEATS,
    DEFAULT_GROUND_TRUTH_TRANSCRIPT,
    audit_beats,
    check_voice_gate_builtin,
)


def main():
    parser = argparse.ArgumentParser(description="7-Gate Deterministic Verifier for Spa & Dental Video Edit V10")
    parser.add_argument("--plan", default=None, help="Optional path to student <video>_edl_plan.json to verify")
    args = parser.parse_args()

    beats = DEFAULT_BENCHMARK_BEATS
    gt_transcript = DEFAULT_GROUND_TRUTH_TRANSCRIPT
    label = "SPA_EDIT_V10_BENCHMARK"

    if args.plan and os.path.isfile(args.plan):
        with open(args.plan, "r", encoding="utf-8") as f:
            plan_data = json.load(f)
        beats = plan_data.get("beats", DEFAULT_BENCHMARK_BEATS)
        gt_transcript = plan_data.get("ground_truth_transcript")
        if not gt_transcript:
            gt_transcript = " ".join(
                f"{b.get('sub1', b.get('line1', ''))} {b.get('sub2', b.get('line2', ''))}".strip()
                for b in beats
                if not b.get("is_pause_bridge", False)
            )
        label = f"STUDENT_PLAN:{Path(args.plan).name}"

    rep = audit_beats(
        beats=beats,
        label=label,
        camera_transform_mode="eye_affine_v7",
        ground_truth_transcript=gt_transcript,
    )

    text_fields = []
    for idx, b in enumerate(beats):
        if isinstance(b, dict):
            for k in ("title", "subtitle", "callout", "label", "kicker", "sub1", "sub2", "line1", "line2"):
                if b.get(k):
                    text_fields.append((f"beat_{idx+1}.{k}", str(b[k])))

    vg_res = check_voice_gate_builtin(text_fields)
    passed_all = bool(rep["passed_all"] and vg_res["pass"])

    print("==================================================================")
    print(f"🧪 KẾT QUẢ KIỂM TOÁN 7 CHỐT CHẶN V10 ({label})")
    print("==================================================================")
    print(f"  • Gate 1 (Tải đọc RLI <= 0.85)          : avg_RLI = {rep['avg_rli']} (max = {rep['max_rli']})")
    print(f"  • Gate 2 (Khóa tĩnh A-Roll >= 80%)      : static_ratio = {rep['aroll_static_frame_ratio']*100:.1f}%")
    print(f"  • Gate 3 (Không bịa số liệu %/năm)      : fake_stats = {rep['fake_stat_count']}")
    print(f"  • Gate 4 (Khớp 100% lời thoại WER=0%)   : WER = {rep['transcript_wer']*100:.1f}%")
    print(f"  • Gate 5 (Khóa mắt Affine Y=650px)      : ΔX = {rep['gate5_eye_lock']['delta_X_eye_px']}px, ΔY = {rep['gate5_eye_lock']['delta_Y_eye_px']}px")
    print(f"  • Gate 6 (Mỗi cảnh trám dùng đúng 1 lần): {rep['gate6_unique_broll']['broll_counts'] or 'Single-Video / Atlas Mode (OK)'}")
    vg_status = "PASS (0 từ cấm)" if vg_res["pass"] else f"FAIL ({vg_res['violation_count']} lỗi)"
    print(f"  • Gate 7 (Voice Gate Micro-Copy)        : {vg_status}")
    print("------------------------------------------------------------------")
    print(f"👉 TRẠNG THÁI TỔNG THỂ: {'✅ PASSED 100% (7/7 CỔNG)' if passed_all else '❌ FAILED'}")
    sys.exit(0 if passed_all else 1)


if __name__ == "__main__":
    main()
