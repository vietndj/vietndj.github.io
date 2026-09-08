#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_ideas_bank.py
Engine tự động phân loại, chuẩn hóa dữ liệu kho ý tưởng theo ngành (Ideas Bank)
từ cơ sở dữ liệu scene.html và kho báo cáo reports/.
Tác giả: FEDU Creative Engineering
"""

import os
import re
import json
from collections import defaultdict, Counter

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCENE_PATH = os.path.join(BASE_DIR, "scene.html")
REPORTS_DIR = os.path.join(BASE_DIR, "reports")
EXCLUDED_CONFIG_PATH = os.path.join(BASE_DIR, "curation_config.json")
OUTPUT_JS_PATH = os.path.join(BASE_DIR, "ideas_data.js")

# Định nghĩa 8 ngành cốt lõi cho học viên quay dựng
INDUSTRIES = [
    {
        "id": "thoi-trang",
        "name": "Thời Trang & Phụ Kiện",
        "en_name": "Fashion & Style",
        "icon": "👔",
        "badge_color": "rose",
        "desc": "Lookbook biến hóa outfit, mỏ neo món đồ, chuyển động bước chân đổi cảnh, Infinite Loop.",
        "keywords": ["fashion", "thời trang", "lookbook", "outfit", "baggy jeans", "calvin klein", "linen", "y2k", "denim", "quần jean", "phối đồ", "styling", "tsangtastic", "jenny tsang", "slaohuairen", "new balance"]
    },
    {
        "id": "am-thuc",
        "name": "Ẩm Thực & F&B",
        "en_name": "Food & Beverage",
        "icon": "🍜",
        "badge_color": "amber",
        "desc": "Nghệ thuật bếp lửa, món ăn bốc khói, quán cafe hè, hẻm ẩm thực đêm, trà đạo, ASMR ẩm thực.",
        "keywords": ["ẩm thực", "bếp củi", "woodfire", "dining", "nấu ăn", "kitchen film", "ruby's cafe", "rubyscafe", "yokocho", "sứa đỏ", "trà đạo", "chef", "nhà hàng", "món ăn", "food", "firewood klcc", "cafe", "cook a video"]
    },
    {
        "id": "du-lich",
        "name": "Du Lịch & Văn Hóa",
        "en_name": "Travel & Culture",
        "icon": "✈️",
        "badge_color": "sky",
        "desc": "Khung hình tĩnh đón thế giới di chuyển (Static Lock-off), ánh sáng Chiaroscuro tự nhiên, phong cảnh đại ngàn, chân dung bản địa.",
        "keywords": ["du lịch", "du ký", "bhutan", "porto", "venice", "copenhagen", "shanghai", "london", "bangkok", "new york", "himalaya", "pacific northwest", "road trip", "biển", "hoàng hôn", "sunset", "coastline", "saigon", "wilderness", "vietnam", "nomadic", "traveler"]
    },
    {
        "id": "cong-nghe",
        "name": "Công Nghệ & Thiết Bị",
        "en_name": "Tech & Gear",
        "icon": "📱",
        "badge_color": "purple",
        "desc": "5 nhịp unboxing mở hộp, ASMR bóc seal/click phím, review máy ảnh & gear cao cấp, giao diện AR/Spatial.",
        "keywords": ["sony kando", "unboxing", "mở hộp", "jbl", "sandisk", "dji mic", "earbuds", "ssd", "firefly", "ray-ban meta", "camera gear", "thiết bị quay", "asmr điện ảnh", "đèn bàn", "koti", "projector", "canva"]
    },
    {
        "id": "kien-truc",
        "name": "Kiến Trúc & Không Gian",
        "en_name": "Architecture & Living",
        "icon": "🏛️",
        "badge_color": "emerald",
        "desc": "Bố cục đối xứng kiến trúc, nghệ thuật nhịp sống ga tàu điện ngầm, không gian gỗ tĩnh lặng (Slow Living), ánh sáng sớm đô thị.",
        "keywords": ["kiến trúc", "không gian gỗ", "slow living", "tĩnh lặng", "urban symmetry", "đối xứng", "metro", "ga tàu điện", "kyoto", "hẻm cổ", "morning light", "the vantage point", "tinh thần hygge", "cổ kính", "đô thị"]
    },
    {
        "id": "ky-thuat-quay",
        "name": "Kỹ Thuật Quay Dựng",
        "en_name": "Filmmaking Mastery",
        "icon": "🎬",
        "badge_color": "blue",
        "desc": "Bóc tách 4 kỹ thuật cắt cảnh, tâm lý học góc máy, 8 quy tắc chuyển động bình thường hóa điện ảnh, thiết kế âm thanh SFX.",
        "keywords": ["cắt cảnh", "4 cuts", "cuts mastery", "bố cục", "composition", "lighting", "đánh đèn", "static shot", "khung hình tĩnh", "góc máy", "sound design", "sfx", "camera angles", "match cut", "visual sequence", "photoknack", "mridupawasharma", "bryan hynes", "shogentle"]
    },
    {
        "id": "the-thao",
        "name": "Thể Thao & Năng Động",
        "en_name": "Sports & Motion",
        "icon": "🏃",
        "badge_color": "orange",
        "desc": "Góc quay FPV drone tốc độ cao, ánh sáng Low-key ngược sáng trong phòng tập gym, nhịp bước chân chạy bộ, kỷ luật rèn luyện.",
        "keywords": ["chạy bộ", "bóng rổ", "gym", "fitness", "fpv drone", "lướt drone", "thể thao", "rèn luyện", "willwfit", "alpine fpv", "kỷ luật thép", "colecoppolino"]
    },
    {
        "id": "thuong-hieu",
        "name": "Thương Hiệu & Kể Chuyện",
        "en_name": "Personal Brand & Story",
        "icon": "💼",
        "badge_color": "indigo",
        "desc": "Kịch bản bán khóa học chuyển đổi cao, tâm lý nói chuyện trước ống kính (Yap Triangle), quy trình kể chuyện 1 ngày sáng tạo, phá vỡ bế tắc.",
        "keywords": ["thương hiệu cá nhân", "khóa học", "workshop", "yap triangle", "nói chuyện trên camera", "bế tắc sáng tạo", "creative block", "choices", "elsa qin", "commercial", "quảng cáo", "project 100", "daily life", "anh sắc ánh"]
    }
]

PERSONAL_IDENTIFIERS = [
    "@vietmac", "practice_cinematic", "self_practice", "broll_plan", "@local", "vietnd"
]

def load_portal_data():
    with open(SCENE_PATH, "r", encoding="utf-8") as f:
        content = f.read()
    m = re.search(r'const portalData\s*=\s*(\[.*?\]);', content, re.DOTALL)
    if not m:
        raise ValueError("Could not extract portalData from scene.html")
    return json.loads(m.group(1))

def load_curation_config():
    if os.path.exists(EXCLUDED_CONFIG_PATH):
        try:
            with open(EXCLUDED_CONFIG_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"excluded_ids": [], "custom_industry_overrides": {}, "custom_title_overrides": {}}

def extract_shortcode(item):
    ig = item.get("ig_url", "")
    m = re.search(r"/(?:p|reel|tv)/([A-Za-z0-9_-]+)", ig)
    if m:
        return m.group(1)
    
    vid_id = item.get("id", "")
    m_code = re.search(r"_(D[A-Za-z0-9_-]{10})_", vid_id)
    if m_code:
        return m_code.group(1)
        
    return vid_id

def clean_creator_info(creator_raw, ig_url="", vid_id=""):
    handle = ""
    name = creator_raw.strip()
    
    # Check Video_by_ suffix in id
    m_by = re.search(r"Video_by_([a-zA-Z0-9._]+)", vid_id)
    if m_by:
        handle = "@" + m_by.group(1)
    else:
        m = re.search(r"@([a-zA-Z0-9._]+)", creator_raw)
        if m:
            handle = "@" + m.group(1)
    
    name_m = re.search(r"\((.*?)\)", creator_raw)
    if name_m:
        name = name_m.group(1).strip()
    elif handle:
        name = handle.replace("@", "").title()
        
    profile_url = ig_url
    if handle:
        raw_h = handle.replace("@", "").strip()
        profile_url = f"https://www.instagram.com/{raw_h}/"
    elif ig_url and "instagram.com" in ig_url:
        m_ig = re.search(r"instagram\.com/([a-zA-Z0-9._]+)/?", ig_url)
        if m_ig and m_ig.group(1) not in ["p", "reel", "tv"]:
            handle = "@" + m_ig.group(1)
            name = handle.replace("@", "").title()
            profile_url = f"https://www.instagram.com/{m_ig.group(1)}/"
            
    return {
        "raw": creator_raw,
        "name": name,
        "handle": handle or "@creator",
        "profile_url": profile_url
    }

def clean_title_and_takeaway(item, title_overrides={}):
    vid_id = item.get("id", "")
    if vid_id in title_overrides:
        clean_title = title_overrides[vid_id]
    else:
        clean_title = item.get("title_vi", "").strip()
        
    desc_vi = item.get("desc_vi", "").strip()
    key_tech = item.get("key_tech", "").strip()
    html_rel = item.get("root_html_rel") or item.get("main_html_rel", "")
    full_html_path = os.path.join(BASE_DIR, html_rel)
    
    report_title = ""
    report_desc = ""
    report_duration = ""
    
    if os.path.exists(full_html_path):
        try:
            with open(full_html_path, "r", encoding="utf-8", errors="ignore") as rf:
                html_head = rf.read(25000)
                
                # Check duration e.g. 26.07s
                m_dur = re.search(r"(\d+(?:\.\d+)?s)\b", html_head)
                if m_dur:
                    report_duration = m_dur.group(1)
                
                tm = re.search(r"<title>(.*?)</title>", html_head, re.IGNORECASE)
                if tm:
                    report_title = tm.group(1).strip()
                    
                # Check overview-card
                m_card = re.search(r"<div class=\"overview-card\">.*?<div[^>]*>(.*?)</div>", html_head, re.DOTALL)
                if m_card:
                    report_desc = re.sub(r"<.*?>", "", m_card.group(1)).strip()
                else:
                    sm = re.search(r"<div class=\"synopsis-card\">\s*<div[^>]*>(.*?)</div>", html_head, re.DOTALL)
                    if not sm:
                        sm = re.search(r"<div class=\"overview-desc\">(.*?)</div>", html_head, re.DOTALL)
                    if sm:
                        report_desc = re.sub(r"<.*?>", "", sm.group(1)).strip()
        except Exception:
            pass

    if vid_id not in title_overrides:
        if clean_title.startswith("@") or "DXf1LldT5co" in clean_title or "Video by" in clean_title or "Carousel Analysis" in clean_title:
            if report_title and not report_title.startswith("@creator"):
                cleaned_rt = re.sub(r"^@[a-zA-Z0-9._\s]+[\-–—•]\s*", "", report_title).strip()
                if cleaned_rt and len(cleaned_rt) > 5:
                    clean_title = cleaned_rt
            elif "DXf1LldT5co" in item.get("id", ""):
                clean_title = "Jenny Tsang • Calvin Klein Baggy Jeans Hong Kong Lookbook"

    clean_title = re.sub(r"^[🎬📄📸👤\s]+", "", clean_title).strip()

    takeaway = desc_vi
    if report_desc and len(report_desc) > 30:
        takeaway = report_desc
    elif not takeaway or len(takeaway) < 20:
        takeaway = f"Bóc tách ngôn ngữ điện ảnh và nghệ thuật thị giác: {key_tech}."

    sentences = re.split(r'(?<=[.!?])\s+', takeaway)
    short_takeaway = " ".join(sentences[:2]).strip()
    if len(short_takeaway) > 240:
        short_takeaway = short_takeaway[:237] + "..."

    return clean_title, short_takeaway, report_duration

def classify_item(item, title, takeaway, industry_overrides={}):
    vid_id = item.get("id", "")
    if vid_id in industry_overrides:
        target_id = industry_overrides[vid_id]
        match = next((i for i in INDUSTRIES if i["id"] == target_id), None)
        if match:
            return match

    text = f"{title} {takeaway} {item.get('key_tech', '')} {item.get('creator', '')} {item.get('id', '')}".lower()
    
    best_ind = None
    best_score = 0
    
    for ind in INDUSTRIES:
        score = 0
        for kw in ind["keywords"]:
            if kw in text:
                score += 2 if len(kw) > 4 else 1
        if score > best_score:
            best_score = score
            best_ind = ind
            
    if not best_ind or best_score == 0:
        if any(w in text for w in ["du lịch", "phong cảnh", "himalaya", "sunset"]):
            best_ind = next(i for i in INDUSTRIES if i["id"] == "du-lich")
        elif any(w in text for w in ["bố cục", "góc máy", "ánh sáng", "cắt"]):
            best_ind = next(i for i in INDUSTRIES if i["id"] == "ky-thuat-quay")
        else:
            best_ind = next(i for i in INDUSTRIES if i["id"] == "kien-truc")
            
    return best_ind

def build_database():
    portal_data = load_portal_data()
    curation_cfg = load_curation_config()
    manually_excluded_ids = set(curation_cfg.get("excluded_ids", []))
    ind_overrides = curation_cfg.get("custom_industry_overrides", {})
    title_overrides = curation_cfg.get("custom_title_overrides", {})
    
    print(f"Loaded {len(portal_data)} items from scene.html")

    unique_items_map = {}
    for idx, item in enumerate(portal_data):
        code = extract_shortcode(item)
        if code in unique_items_map:
            prev = unique_items_map[code]
            cur_score = len(item.get("title_vi", "")) + (0 if item.get("title_vi", "").startswith("@") else 40)
            prev_score = len(prev.get("title_vi", "")) + (0 if prev.get("title_vi", "").startswith("@") else 40)
            if cur_score > prev_score:
                unique_items_map[code] = item
        else:
            unique_items_map[code] = item

    print(f"Unique master videos: {len(unique_items_map)}")

    processed_ideas = []
    creators_dict = defaultdict(list)

    for code, item in unique_items_map.items():
        vid_id = item.get("id", "")
        creator_raw = item.get("creator", "Unknown")
        c_info = clean_creator_info(creator_raw, item.get("ig_url", ""), vid_id)
        
        is_personal = False
        check_str = f"{creator_raw} {vid_id}".lower()
        if any(p in check_str for p in PERSONAL_IDENTIFIERS):
            is_personal = True

        is_excluded = is_personal or (vid_id in manually_excluded_ids) or (code in manually_excluded_ids)
        
        clean_title, short_takeaway, rep_dur = clean_title_and_takeaway(item, title_overrides)
        industry = classify_item(item, clean_title, short_takeaway, ind_overrides)
        
        folder = item.get("folder_name") or vid_id
        thumbs = item.get("thumbnails") or item.get("thumbs") or []
        if not thumbs or len(thumbs) < 2:
            thumb_hook = f"https://pub-447bd44dfdac4938912655c855b8631c.r2.dev/images/{folder}/shot_01_mid.jpg"
            thumb_key = f"https://pub-447bd44dfdac4938912655c855b8631c.r2.dev/images/{folder}/shot_03_mid.jpg"
        else:
            thumb_hook = thumbs[0]
            thumb_key = thumbs[1] if len(thumbs) > 1 else thumbs[0]

        vid_url = item.get("root_vid_rel") or item.get("main_vid_rel") or ""
        if not vid_url and item.get("all_vids"):
            vid_url = item["all_vids"][0].get("rel_url", "")
            
        html_url = item.get("root_html_rel") or item.get("main_html_rel") or ""
        shots_count = item.get("shots_count", 0)
        
        duration_str = item.get("duration", "") or rep_dur or (f"{shots_count * 2}s" if shots_count else "15s")
        
        if shots_count <= 8:
            complexity = {"id": "de", "label": "🟢 Dễ làm theo (3-8 shots)"}
        elif shots_count <= 18:
            complexity = {"id": "trung-binh", "label": "🟡 Trung bình (9-18 shots)"}
        else:
            complexity = {"id": "nang-cao", "label": "🔴 Nâng cao (>18 shots)"}

        idea_obj = {
            "id": vid_id,
            "shortcode": code,
            "title_vi": clean_title,
            "quick_takeaway": short_takeaway,
            "key_tech": item.get("key_tech", ""),
            "industry": {
                "id": industry["id"],
                "name": industry["name"],
                "en_name": industry["en_name"],
                "icon": industry["icon"],
                "badge_color": industry["badge_color"]
            },
            "creator": c_info,
            "ig_url": item.get("ig_url", "") or c_info["profile_url"],
            "gdrive_folder": item.get("gdrive_folder", ""),
            "media": {
                "thumb_hook": thumb_hook,
                "thumb_key": thumb_key,
                "video_url": vid_url,
                "report_url": html_url,
                "shots_count": shots_count,
                "duration": duration_str
            },
            "complexity": complexity,
            "is_personal": is_personal,
            "is_excluded": is_excluded
        }

        processed_ideas.append(idea_obj)

        if not is_personal and not is_excluded:
            creators_dict[c_info["handle"]].append(idea_obj)

    creators_hub = []
    for handle, vids in sorted(creators_dict.items(), key=lambda x: len(x[1]), reverse=True):
        first_vid = vids[0]
        c_meta = first_vid["creator"]
        ind_counts = Counter(v["industry"]["name"] for v in vids)
        top_ind = ind_counts.most_common(1)[0][0]
        
        creators_hub.append({
            "handle": handle,
            "name": c_meta["name"],
            "profile_url": c_meta["profile_url"],
            "video_count": len(vids),
            "top_industry": top_ind,
            "sample_thumb": first_vid["media"]["thumb_hook"],
            "video_ids": [v["id"] for v in vids]
        })

    active_ideas = [x for x in processed_ideas if not x["is_excluded"]]
    industry_stats = {}
    for ind in INDUSTRIES:
        c = sum(1 for x in active_ideas if x["industry"]["id"] == ind["id"])
        industry_stats[ind["id"]] = c

    database_payload = {
        "generated_at": "2026-09-08T22:30:00+07:00",
        "total_scene_items": len(portal_data),
        "total_unique_ideas": len(processed_ideas),
        "total_active_ideas": len(active_ideas),
        "total_excluded_ideas": len(processed_ideas) - len(active_ideas),
        "total_creators": len(creators_hub),
        "industries": INDUSTRIES,
        "industry_stats": industry_stats,
        "creators_hub": creators_hub,
        "ideas": processed_ideas
    }

    with open(OUTPUT_JS_PATH, "w", encoding="utf-8") as f:
        f.write("/**\n * FEDU CREATIVE IDEAS BANK DATABASE (Auto-generated)\n")
        f.write(" * Do not edit manually. Re-run build_ideas_bank.py to update.\n */\n")
        json_str = json.dumps(database_payload, ensure_ascii=False, indent=2)
        f.write("var FEDU_IDEAS_DATABASE = " + json_str + ";\n")
        f.write("if (typeof window !== 'undefined') { window.FEDU_IDEAS_DATABASE = FEDU_IDEAS_DATABASE; }\n")

    print(f"\n==========================================")
    print(f"✅ Generated ideas_data.js successfully!")
    print(f"📊 Total Unique Videos: {len(processed_ideas)}")
    print(f"🌟 Active Ideas for Students: {len(active_ideas)}")
    print(f"🔒 Excluded Personal/Hidden Videos: {len(processed_ideas) - len(active_ideas)}")
    print(f"👥 Top Creators in Hub: {len(creators_hub)}")
    print(f"🏷️ Industry Breakdown:")
    for ind in INDUSTRIES:
        print(f"   {ind['icon']} {ind['name']}: {industry_stats[ind['id']]} videos")
    print(f"==========================================\n")
    return database_payload

if __name__ == "__main__":
    build_database()
