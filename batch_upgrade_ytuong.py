#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🎬 BATCH UPGRADE YTUONG ENGINE (batch_upgrade_ytuong.py)
Nâng cấp toàn diện kho 210 video trong YTUONG HUB theo Ma trận 3 Bản Thể Video:
- Nhóm 1: Video Kịch Bản Thoại (Bảng thoại 2 cột: Việt liền mạch + Anh chữ bé + Mega Prompt Kịch Bản Nói)
- Nhóm 2: Video Kỹ Thuật Quay Thuần Túy (Bỏ qua bảng thoại + Bảng cú máy + Mega Prompt Kỹ Thuật Quay STU)
- Nhóm 3: Video B-Roll / ASMR Showcase (Bỏ qua thoại + Giữ Storyboard + Mega Prompt B-Roll Shotlist STU)

Cách dùng:
  python3 batch_upgrade_ytuong.py --dry-run          # Quét và xuất bảng đối soát, không ghi đè
  python3 batch_upgrade_ytuong.py --single <ID>      # Thử nghiệm 1 video cụ thể
  python3 batch_upgrade_ytuong.py --batch 10         # Cập nhật thử cụm 10 video
  python3 batch_upgrade_ytuong.py --all              # Cập nhật toàn bộ kho YTUONG
"""

import os
import sys
import re
import json
import argparse
import subprocess

REPO_DIR = os.path.dirname(os.path.abspath(__file__))
REPORTS_DIR = os.path.join(REPO_DIR, "reports")
SCENE_HTML = os.path.join(REPO_DIR, "scene.html")
BUILD_IDEAS_SCRIPT = os.path.join(REPO_DIR, "build_ideas_bank.py")

sys.path.insert(0, "/Users/vietmac/Documents/CODE/Quản gia")
from check_scene_duplicate import load_portal_data

# CSS styles to inject
CSS_COMPONENT = """
/* Styling for 2-Column Dialogue Script & Remake Prompt Box */
.dialogue-container-2col {
    display: flex;
    gap: 16px;
    align-items: stretch;
    margin-bottom: 20px;
}

@media (max-width: 900px) {
    .dialogue-container-2col {
        flex-direction: column;
    }
}

.col-vietnamese-flow {
    flex: 1;
    min-width: 0;
    background: #0d1422;
    border: 1px solid #1e2b40;
    border-radius: 12px;
    padding: 18px 22px;
    display: flex;
    flex-direction: column;
}

.col-flow-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid #1a2538;
    flex-wrap: wrap;
    gap: 8px;
}

.col-flow-badge {
    font-family: var(--font-heading, sans-serif);
    font-size: 14.5px;
    font-weight: 800;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 6px;
    letter-spacing: 0.3px;
}

.col-flow-subtag {
    font-size: 11.5px;
    color: #10b981;
    font-weight: 700;
    background: rgba(16, 185, 129, 0.12);
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid rgba(16, 185, 129, 0.25);
}

.vn-script-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.vn-script-para {
    background: #111a2c;
    border: 1px solid #1e2c44;
    border-left: 3px solid #f59e0b;
    border-radius: 8px;
    padding: 11px 14px;
    cursor: pointer;
    transition: all 0.15s ease;
}

.vn-script-para:hover {
    background: #162238;
    border-color: #2b3d5c;
    transform: translateX(2px);
}

.para-meta-line {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
}

.para-timestamp-tag {
    font-family: monospace;
    font-size: 11px;
    font-weight: 700;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.25);
    padding: 1px 6px;
    border-radius: 3px;
}

.para-beat-label {
    font-size: 11px;
    font-weight: 700;
    color: #f59e0b;
    text-transform: uppercase;
    letter-spacing: 0.4px;
}

.para-text {
    font-size: 14.5px;
    color: #f8fafc;
    line-height: 1.6;
    font-weight: 500;
    display: block;
}

.col-english-aside {
    width: 270px;
    min-width: 250px;
    background: #090e18;
    border: 1px solid #162030;
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
}

@media (max-width: 900px) {
    .col-english-aside {
        width: 100%;
        min-width: 0;
    }
}

.col-aside-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 6px;
    border-bottom: 1px solid #141c2b;
}

.aside-title {
    font-family: monospace;
    font-size: 10.5px;
    font-weight: 700;
    color: #64748b;
    letter-spacing: 0.8px;
    text-transform: uppercase;
}

.aside-note {
    font-size: 10px;
    color: #475569;
    font-style: italic;
}

.en-lines-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.en-line-item {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid #141d2c;
    border-radius: 6px;
    padding: 7px 10px;
    cursor: pointer;
    transition: all 0.15s ease;
}

.en-line-item:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: #1e2c40;
}

.en-time {
    font-family: monospace;
    font-size: 9.5px;
    color: #475569;
    font-weight: 600;
    display: block;
    margin-bottom: 2px;
}

.en-text {
    font-size: 11px;
    color: #64748b;
    font-style: italic;
    line-height: 1.45;
}

/* Remake Mega Prompt Box (Accordion Closed Default) */
.remake-prompt-card {
    background: linear-gradient(135deg, #0e1726 0%, #16243b 100%);
    border: 1px solid rgba(56, 189, 248, 0.35);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
    transition: all 0.2s ease;
}

.prompt-accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    cursor: pointer;
    user-select: none;
    background: rgba(15, 23, 42, 0.6);
    gap: 10px;
    transition: background 0.15s ease;
}

.prompt-accordion-header:hover {
    background: rgba(30, 41, 59, 0.85);
}

.prompt-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;
}

.remake-header-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    border: 1px solid rgba(56, 189, 248, 0.3);
    font-size: 10.5px;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    flex-shrink: 0;
}

.remake-accordion-title {
    font-family: var(--font-heading, sans-serif);
    font-size: 13.5px;
    font-weight: 700;
    color: #f8fafc;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.prompt-header-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
}

.copy-prompt-btn-compact {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #38bdf8;
    color: #041324;
    border: none;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 11.5px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.copy-prompt-btn-compact:hover {
    filter: brightness(1.15);
    transform: translateY(-1px);
}

.prompt-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: #94a3b8;
    font-weight: 600;
    white-space: nowrap;
}

.toggle-icon {
    font-size: 9px;
    transition: transform 0.2s ease;
}

.prompt-accordion-body {
    padding: 14px 16px 16px 16px;
    border-top: 1px solid rgba(56, 189, 248, 0.2);
    background: rgba(8, 13, 22, 0.5);
}

.remake-subtext {
    font-size: 12.5px;
    color: #cbd5e1;
    line-height: 1.5;
    margin-bottom: 12px;
}

.prompt-code-wrapper {
    position: relative;
    background: #080d16;
    border: 1px solid #1e2d45;
    border-radius: 8px;
    overflow: hidden;
}

.prompt-code-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #0f172a;
    padding: 8px 14px;
    border-bottom: 1px solid #1e2d45;
}

.prompt-code-filename {
    font-family: monospace;
    font-size: 11px;
    color: #94a3b8;
    font-weight: 600;
}

.copy-prompt-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #38bdf8;
    color: #041324;
    border: none;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 11.5px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
}

.copy-prompt-btn:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
}

.prompt-code-content {
    font-family: monospace;
    font-size: 12px;
    color: #cbd5e1;
    line-height: 1.6;
    padding: 14px;
    max-height: 280px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
}

@media (max-width: 640px) {
    .remake-accordion-title {
        font-size: 12px;
    }
    .prompt-accordion-header {
        padding: 8px 10px;
    }
}
\"\"\"

JS_COMPONENT = \"\"\"
function togglePromptAccordion(headerEl) {
    const card = headerEl.closest('.remake-prompt-card');
    if (!card) return;
    const body = card.querySelector('.prompt-accordion-body');
    const icon = card.querySelector('.toggle-icon');
    const label = card.querySelector('.toggle-label');
    if (!body) return;
    const isCollapsed = (body.style.display === 'none' || getComputedStyle(body).display === 'none');
    if (isCollapsed) {
        body.style.display = 'block';
        if (icon) icon.textContent = '▲';
        if (label) label.textContent = 'Thu gọn';
    } else {
        body.style.display = 'none';
        if (icon) icon.textContent = '▼';
        if (label) label.textContent = 'Mở xem';
    }
}

function copyMegaPrompt(e, btn) {
    if (e && e.stopPropagation) e.stopPropagation();
    const card = btn.closest('.remake-prompt-card');
    const codeEl = card ? card.querySelector('.prompt-code-content') : document.getElementById('megaPromptText');
    if (!codeEl) return;
    const text = codeEl.innerText || codeEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '✅ Đã chép!';
        const oldBg = btn.style.background;
        const oldColor = btn.style.color;
        btn.style.background = '#10b981';
        btn.style.color = '#fff';
        setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = oldBg;
            btn.style.color = oldColor;
        }, 2000);
    }).catch(err => {
        alert('Lỗi sao chép, bạn vui lòng bôi đen văn bản để copy nhé!');
    });
}
"""

def classify_video(item):
    """Phân loại video vào 1 trong 3 nhóm chuẩn đạo diễn"""
    cid = (item.get("id") or "").lower()
    title = (item.get("title_vi") or "").lower()
    desc = (item.get("desc_vi") or "").lower()
    key_tech = (item.get("key_tech") or "").lower()
    corpus = f"{cid} {title} {desc} {key_tech}"

    # Nhóm 1: Có lời thoại / kể chuyện
    is_spoken = any(k in corpus for k in [
        "podcast", "talking", "storytelling", "voice_over", "voice over", "tâm sự", "chia sẻ",
        "lời khuyên", "phóng sự", "mindset", "thương hiệu cá nhân", "nói chuyện", "hospital bag",
        "flash sale", "double day", "challenge"
    ])

    # Nhóm 2: Kỹ thuật quay thuần túy (Camera / Transition / Angles / Cuts)
    is_tech = any(k in corpus for k in [
        "transition", "camera_angle", "camera angle", "4_cut", "4 cut", "6_shot", "6 shot",
        "static_shot", "static shot", "whip_pan", "whip pan", "spin_whip", "spin whip",
        "ky_thuat_quay", "kỹ thuật quay", "chuyen-canh", "chuyển cảnh", "goc_may", "góc máy",
        "movement", "match_cut", "match cut", "speed_ramp", "speed ramp", "pan", "tilt"
    ])

    if is_spoken and not (is_tech and "tutorial" in corpus):
        return "NHOM_1_THOAI"
    elif is_tech:
        return "NHOM_2_KY_THUAT"
    else:
        return "NHOM_3_BROLL"

def generate_technique_prompt_html(title):
    clean_title = title.replace('"', '&quot;')
    return f"""
        <!-- KHỐI PROMPT ÁNH XẠ KỸ THUẬT CÚ MÁY SANG NGÀNH NGHỀ STU (ACCORDION ĐÓNG MẶC ĐỊNH) -->
        <div class="remake-prompt-card" id="remakePromptCard">
            <div class="prompt-accordion-header" onclick="togglePromptAccordion(this)">
                <div class="prompt-header-left">
                    <span class="remake-header-badge">🎥 CÚ MÁY STU</span>
                    <span class="remake-accordion-title">Ánh xạ kỹ thuật quay này sang ngành nghề của bạn (Gemini Prompt)</span>
                </div>
                <div class="prompt-header-right">
                    <button class="copy-prompt-btn-compact" onclick="copyMegaPrompt(event, this)">📋 Sao chép</button>
                    <div class="prompt-toggle-btn">
                        <span class="toggle-icon">▼</span>
                        <span class="toggle-label">Mở xem</span>
                    </div>
                </div>
            </div>
            <div class="prompt-accordion-body" style="display: none;">
                <p class="remake-subtext">Video này thuần túy về kỹ thuật quay (không thoại). Sao chép Mega Prompt này dán vào Gemini để AI hướng dẫn áp dụng cú máy/chuyển cảnh này vào quay sản phẩm thực tế cho học viên STU (100% hình ảnh xúc giác, không cần nói).</p>

                <div class="prompt-code-wrapper">
                    <div class="prompt-code-toolbar">
                        <span class="prompt-code-filename">📄 MEGA_PROMPT_TECHNIQUE_REMAKE_GEMINI.md</span>
                        <button class="copy-prompt-btn" onclick="copyMegaPrompt(event, this)">📋 Sao chép Prompt</button>
                    </div>
                    <div class="prompt-code-content" id="megaPromptText">Bạn là Đạo diễn Hình ảnh &amp; Chuyên gia Hướng Dẫn Thao Tác Cú Máy Thực Chiến (In-Camera Cinematography) theo trường phái mộc mạc của anh Việt.

Tôi vừa học được kỹ thuật quay / chuyển cảnh cực kỳ đắt giá: {clean_title}.
Video này KHÔNG CÓ LỜI THOẠI, sức hút nằm ở góc đặt máy, tiêu cự và chuyển động camera.

=== QUY TẮC BẮT BUỘC (TUÂN THỦ 100%) ===
- CẤM BỊA KỊCH BẢN NÓI DÔNG DÀI: Tôi không cần kịch bản nói hay lý thuyết đạo lý. Tôi cần hướng dẫn cầm điện thoại quay gì, lia máy hướng nào, đặt góc nào tại bàn làm việc thực tế.
- CẤM VĂN MẪU AI: Không dùng 'nâng tầm', 'bứt phá', 'thần thái', 'vũ khí', 'chuyển hóa'...
- VĂN PHONG MỘC MẠC: Xưng 'mình - bạn', hướng dẫn cầm tay chỉ việc như người làm nghề chỉ cho nhau.

=== HƯỚNG DẪN TƯƠNG TÁC THEO NGÀNH HỌC VIÊN STU ===
Nếu tôi chưa ghi ngành, hãy hỏi đúng 1 câu:
"Chào bạn, bạn muốn áp dụng cú máy này vào quay sản phẩm nào trong 4 nhóm ngành STU:
1. Làm đẹp & Spa / Da liễu Clinic / Salon tóc (Quay cận cảnh chất kem, thao tác tay, máy soi da)
2. Nội thất / Decor / Kiến trúc / Vật liệu xây dựng (Quay lia từ thớ gỗ/mẫu đá sang không gian hoàn thiện)
3. Ẩm thực & F&B / Tiệm bánh / Trà đồ uống (Quay lia chuyển động quanh món ăn, đổ sốt, khói bốc lên)
4. Nông nghiệp / Phân bón / Sức khỏe (Quay kiểm tra lá cây, rễ cây, hạt giống, bao bì sản phẩm)
5. Ngành khác của bạn trong STU: [Tên nghề] + [Sản phẩm muốn quay]"

Sau khi tôi chọn, hãy xuất bản ngay 3 PHƯƠNG ÁN BỐ TRÍ CÚ MÁY (Gồm 4 thông số: Tiêu cự ống kính | Hướng lia máy & Điểm giấu vết cắt | Đạo cụ trên bàn | Cách phối ánh sáng tự nhiên)!</div>
                </div>
            </div>
        </div>
    """

def find_report_file(item):
    rel = item.get("main_html_rel") or item.get("root_html_rel")
    if rel:
        import urllib.parse
        clean_rel = urllib.parse.unquote(rel)
        p = os.path.join(REPO_DIR, clean_rel)
        if os.path.exists(p):
            return p
        # try without encoding
        p2 = os.path.join(REPO_DIR, rel)
        if os.path.exists(p2):
            return p2
    cid = item.get("id")
    if cid:
        matches = [f for f in os.listdir(REPORTS_DIR) if cid in f and f.endswith(".html")]
        if matches:
            return os.path.join(REPORTS_DIR, matches[0])
    return None

def patch_report_html(report_path, html_snippet):
    with open(report_path, "r", encoding="utf-8") as f:
        content = f.read()

    # If already patched, skip
    if "remake-prompt-card" in content:
        return False, "Đã có khối remake-prompt-card"

    # Inject CSS before </style>
    if "/* Styling for 2-Column Dialogue Script & Remake Prompt Box */" not in content and "/* Remake Mega Prompt Box" not in content:
        content = content.replace("</style>", CSS_COMPONENT + "\n</style>", 1)

    # Inject HTML snippet right after overview-card (newer template) or after report-header (older template)
    overview_pattern = r"(<div class=\"overview-card\">[\s\S]*?</div>)"
    report_header_pattern = r"(<header class=\"report-header\">[\s\S]*?</header>)"
    summary_pattern = r"(<div class=\"report-summary\">[\s\S]*?</div>)"

    if re.search(overview_pattern, content):
        content = re.sub(overview_pattern, r"\1\n" + html_snippet, content, count=1)
    elif re.search(report_header_pattern, content):
        content = re.sub(report_header_pattern, r"\1\n" + html_snippet, content, count=1)
    elif re.search(summary_pattern, content):
        content = re.sub(summary_pattern, r"\1\n" + html_snippet, content, count=1)
    else:
        return False, "Không tìm thấy thẻ overview-card hoặc report-header"

    # Inject JS before </script>
    if "function togglePromptAccordion" not in content:
        content = content.replace("</script>", JS_COMPONENT + "\n</script>", 1)

    with open(report_path, "w", encoding="utf-8") as f:
        f.write(content)
    return True, "Thành công"

def main():
    parser = argparse.ArgumentParser(description="Batch Upgrade YTUONG Engine")
    parser.add_argument("--dry-run", action="store_true", help="Chỉ quét phân loại, không sửa file")
    parser.add_argument("--single", type=str, help="Chạy thử 1 video theo ID hoặc tên file")
    parser.add_argument("--batch", type=int, help="Cập nhật theo số lượng chỉ định")
    parser.add_argument("--all", action="store_true", help="Cập nhật toàn bộ kho YTUONG")
    args = parser.parse_args()

    items = load_portal_data()
    print(f"[*] Nạp thành công {len(items)} mục từ scene.html")

    classified = {
        "NHOM_1_THOAI": [],
        "NHOM_2_KY_THUAT": [],
        "NHOM_3_BROLL": []
    }

    for it in items:
        cat = classify_video(it)
        report_path = find_report_file(it)
        classified[cat].append((it, report_path))

    print("\n" + "="*70)
    print("📊 KẾT QUẢ ĐỐI SOÁT PHÂN LOẠI 3 BẢN THỂ VIDEO TRONG KHO YTUONG")
    print("="*70)
    print(f"🎙️ Nhóm 1 (Kịch bản thoại & Kể chuyện): {len(classified['NHOM_1_THOAI'])} video")
    print(f"🎥 Nhóm 2 (Kỹ thuật quay thuần túy - Không thoại): {len(classified['NHOM_2_KY_THUAT'])} video")
    print(f"🎞️ Nhóm 3 (B-Roll Showcase & ASMR): {len(classified['NHOM_3_BROLL'])} video")

    if args.dry_run or (not args.single and not args.batch and not args.all):
        print("\n[!] Đang ở chế độ --dry-run (An toàn). Xem trước 5 video mỗi nhóm:")
        for grp, title_grp in [("NHOM_1_THOAI", "Nhóm 1: Thoại"), ("NHOM_2_KY_THUAT", "Nhóm 2: Cú máy"), ("NHOM_3_BROLL", "Nhóm 3: B-Roll")]:
            print(f"\n--- {title_grp} ---")
            for it, rp in classified[grp][:5]:
                rp_status = "✅ Có file" if rp else "❌ Thiếu file"
                cid_str = (it.get('id') or 'N/A')[:32]
                title_str = (it.get('title_vi') or 'N/A')[:40]
                print(f" • [{cid_str}] {title_str}... ({rp_status})")
        print("\n👉 Để nâng cấp thử 1 video, gõ: python3 batch_upgrade_ytuong.py --single <ID>")
        print("👉 Để nâng cấp toàn bộ Nhóm 2 (Kỹ thuật quay), gõ: python3 batch_upgrade_ytuong.py --batch 10")
        return

    # Execution logic
    targets = []
    if args.single:
        for grp in classified:
            for it, rp in classified[grp]:
                if args.single in (it.get("id") or "") or (rp and args.single in rp):
                    targets.append((it, rp, grp))
        if not targets:
            print(f"[-] Không tìm thấy video nào khớp với: {args.single}")
            return
    elif args.batch:
        count = 0
        for grp in ["NHOM_2_KY_THUAT", "NHOM_1_THOAI"]:
            for it, rp in classified[grp]:
                if rp and count < args.batch:
                    targets.append((it, rp, grp))
                    count += 1
    elif args.all:
        for grp in classified:
            for it, rp in classified[grp]:
                if rp:
                    targets.append((it, rp, grp))

    print(f"\n[*] Bắt đầu cập nhật {len(targets)} video...")
    success_count = 0
    skipped_count = 0
    failed_count = 0

    for it, rp, grp in targets:
        if not rp or not os.path.exists(rp):
            failed_count += 1
            continue

        title = it.get("title_vi") or it.get("title") or "Kỹ thuật quay"
        if grp == "NHOM_2_KY_THUAT":
            snippet = generate_technique_prompt_html(title)
            ok, msg = patch_report_html(rp, snippet)
            if ok:
                success_count += 1
                print(f" [VÁ NHÓM 2] {os.path.basename(rp)}: {msg}")
            else:
                skipped_count += 1
        elif grp == "NHOM_1_THOAI":
            # Nhóm 1 cần audio transcript, nếu đã có rồi thì bỏ qua
            skipped_count += 1
        else:
            skipped_count += 1

    print(f"\n🎉 Hoàn thành: Đã vá {success_count} file | Bỏ qua {skipped_count} | Lỗi {failed_count}")

if __name__ == "__main__":
    main()
