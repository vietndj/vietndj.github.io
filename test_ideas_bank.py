#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
test_ideas_bank.py
Kiểm thử tự động toàn diện cho Kho Ý Tưởng Theo Ngành (FEDU Reference Hub)
"""

import os
import re
import json
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IDEAS_JS = os.path.join(BASE_DIR, "ideas_data.js")
YTUONG_HTML = os.path.join(BASE_DIR, "ytuong.html")
CURATION_CFG = os.path.join(BASE_DIR, "curation_config.json")
SCENE_HTML = os.path.join(BASE_DIR, "scene.html")

def test_all():
    print("🔍 [TEST 1] Kiểm tra sự tồn tại của các tệp cốt lõi...")
    assert os.path.exists(IDEAS_JS), "ideas_data.js không tồn tại!"
    assert os.path.exists(YTUONG_HTML), "ytuong.html không tồn tại!"
    assert os.path.exists(CURATION_CFG), "curation_config.json không tồn tại!"
    assert os.path.exists(SCENE_HTML), "scene.html không tồn tại!"
    print("  ✅ Tệp cốt lõi đầy đủ.")

    print("\n🔍 [TEST 2] Phân tích cấu trúc dữ liệu trong ideas_data.js...")
    with open(IDEAS_JS, "r", encoding="utf-8") as f:
        content = f.read()
    m = re.search(r"var FEDU_IDEAS_DATABASE\s*=\s*({.*?});", content, re.DOTALL)
    assert m, "Không thể đọc dữ liệu FEDU_IDEAS_DATABASE!"
    db = json.loads(m.group(1))
    
    assert db["total_unique_ideas"] > 100, f"Số video quá ít: {db['total_unique_ideas']}"
    assert db["total_active_ideas"] > 100, f"Số active ideas quá ít: {db['total_active_ideas']}"
    assert db["total_creators"] >= 40, f"Số creator quá ít: {db['total_creators']}"
    assert len(db["industries"]) == 8, f"Không đủ 8 ngành: {len(db['industries'])}"
    print(f"  ✅ Dữ liệu hợp lệ: {db['total_unique_ideas']} video tổng, {db['total_active_ideas']} active ideas, {db['total_creators']} creators.")

    print("\n🔍 [TEST 3] Kiểm tra phân loại case mẫu mực (Jenny Tsang Lookbook)...")
    jenny = next((x for x in db["ideas"] if "DXf1LldT5co" in x["shortcode"] or "tsangtastic" in x["id"]), None)
    assert jenny, "Không tìm thấy video Jenny Tsang!"
    assert jenny["industry"]["id"] == "thoi-trang", f"Jenny Tsang không thuộc ngành thời trang: {jenny['industry']}"
    assert "Calvin Klein" in jenny["title_vi"], f"Tiêu đề không chuẩn: {jenny['title_vi']}"
    assert not jenny["is_excluded"], "Jenny Tsang bị loại trừ nhầm!"
    print(f"  ✅ Jenny Tsang: Ngành [{jenny['industry']['name']}] - Tiêu đề: [{jenny['title_vi']}]")

    print("\n🔍 [TEST 4] Kiểm tra loại trừ các video cá nhân của anh Việt khỏi kho học viên...")
    personal_items = [x for x in db["ideas"] if x["is_personal"]]
    assert len(personal_items) >= 5, f"Số video cá nhân phát hiện quá ít: {len(personal_items)}"
    for p in personal_items:
        assert p["is_excluded"], f"Video cá nhân {p['id']} chưa được loại trừ!"
    print(f"  ✅ Toàn bộ {len(personal_items)} video cá nhân của anh Việt đã được ẩn mặc định khỏi học viên.")

    print("\n🔍 [TEST 5] Kiểm tra liên kết điều hướng trong scene.html...")
    with open(SCENE_HTML, "r", encoding="utf-8") as f:
        scene_content = f.read()
    assert "ytuong.html" in scene_content, "scene.html chưa liên kết tới ytuong.html!"
    print("  ✅ scene.html đã nhúng liên kết tới ytuong.html.")

    print("\n🎉 ========================================================")
    print("   TẤT CẢ 5 BỘ KIỂM THỬ TỰ ĐỘNG ĐÃ VƯỢT QUA 100% THÀNH CÔNG!")
    print("========================================================\n")

if __name__ == "__main__":
    test_all()
