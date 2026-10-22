#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
6-GATE DETERMINISTIC VERIFIER FOR SPA-EDIT SKILL
"""
import os
import sys

WORKDIR = "/Users/vietmac/Documents/CODE/AI VIDEO EDIT"
sys.path.insert(0, WORKDIR)

from verify_readability_and_sync import audit_beats
from build_thamtho_v5_clean_master import MICRO_BEATS_V6

if __name__ == "__main__":
    rep = audit_beats(MICRO_BEATS_V6, "SPA_EDIT_V7_VERIFY", camera_transform_mode="eye_affine_v7")
    print("==================================================================")
    print("🧪 KẾT QUẢ KIỂM TOÁN 6 CHỐT CHẶN (6-GATE SPA VERIFIER)")
    print("==================================================================")
    print(f"  • Gate 1 (Tải đọc RLI <= 0.80)          : avg_RLI = {rep['avg_rli']} (max = {rep['max_rli']})")
    print(f"  • Gate 2 (Khóa tĩnh A-Roll >= 80%)      : static_ratio = {rep['aroll_static_frame_ratio']*100:.1f}%")
    print(f"  • Gate 3 (Không bịa số liệu %/năm)      : fake_stats = {rep['fake_stat_count']}")
    print(f"  • Gate 4 (Khớp 100% lời thoại WER=0%)   : WER = {rep['transcript_wer']*100:.1f}%")
    print(f"  • Gate 5 (Khóa mắt Affine Y=650px)      : ΔX = {rep['gate5_eye_lock']['delta_X_eye_px']}px, ΔY = {rep['gate5_eye_lock']['delta_Y_eye_px']}px")
    print(f"  • Gate 6 (Mỗi cảnh trám dùng đúng 1 lần): {rep['gate6_unique_broll']['broll_counts']}")
    print("------------------------------------------------------------------")
    print(f"👉 TRẠNG THÁI TỔNG THỂ: {'✅ PASSED 100% (6/6 CỔNG)' if rep['passed_all'] else '❌ FAILED'}")
    sys.exit(0 if rep["passed_all"] else 1)
