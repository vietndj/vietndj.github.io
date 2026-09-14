#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
user_note_parser.py
Module phân tích ghi chú tự nhiên từ người dùng (User Note Parser)
Hỗ trợ bóc tách đa trục:
- Ngành nghề / Chủ đề (9 ngành chuẩn YTUONG HUB + UGC)
- Kiểu quay (6 Shooting Styles)
- Danh sách Tags chuyên sâu (từ khóa, #hashtag, sau tiền tố tag:/thẻ:)
"""

import re

# 1. Danh mục 9 Ngành Nghề & UGC chuẩn YTUONG HUB
INDUSTRIES = [
    {
        "id": "spa-lam-dep",
        "name": "Làm Đẹp & Spa / Y Tế",
        "icon": "💆",
        "keywords": [
            "spa làm đẹp", "spa lam dep", "viện thẩm mỹ", "vien tham my", "chăm sóc da",
            "cham soc da", "nặn mụn", "nan mun", "trị mụn", "tri mun", "y khoa", "y tế",
            "da liễu", "da lieu", "thẩm mỹ", "tham my", "phẫu thuật", "phau thuat",
            "nha khoa", "răng", "rang", "filler", "botox", "laser", "gội đầu dưỡng sinh",
            "dưỡng sinh", "skincare", "clinic", "bác sĩ da liễu", "bác sĩ thẩm mỹ", "spa", "làm đẹp", "lam dep"
        ]
    },
    {
        "id": "thuong-hieu",
        "name": "Thương Hiệu Cá Nhân & Dịch Vụ",
        "icon": "💼",
        "keywords": [
            "thương hiệu cá nhân", "thuong hieu ca nhan", "personal brand", "xây kênh", "xay kenh",
            "solo creator", "bán khóa học", "ban khoa hoc", "khóa học", "khoa hoc", "coaching",
            "dịch vụ", "dich vu", "tư duy", "tu duy", "thương hiệu", "thuong hieu", "cá nhân", "ca nhan"
        ]
    },
    {
        "id": "thoi-trang",
        "name": "Thời Trang & Phụ Kiện",
        "icon": "👔",
        "keywords": [
            "thời trang", "thoi trang", "phụ kiện", "phu kien", "lookbook", "outfit", "phối đồ",
            "phoi do", "quần áo", "quan ao", "váy vóc", "váy", "vay", "túi xách", "tui xach",
            "giày dép", "giày", "sneaker", "streetwear", "fashion", "trang phục", "style", "model"
        ]
    },
    {
        "id": "am-thuc",
        "name": "Ẩm Thực & F&B",
        "icon": "🍜",
        "keywords": [
            "ẩm thực", "am thuc", "fnb", "f&b", "quán cafe", "quan cafe", "cà phê", "ca phe", "cafe",
            "nhà hàng", "nha hang", "quán ăn", "quan an", "nấu ăn", "nau an", "nấu nướng", "đồ ăn",
            "do an", "món ăn", "mon an", "bếp củi", "bep cui", "asmr nấu", "đồ uống", "do uong",
            "trà sữa", "tra sua", "bar", "pha chế", "food", "beverage", "cooking"
        ]
    },
    {
        "id": "du-lich",
        "name": "Du Lịch & Văn Hóa",
        "icon": "✈️",
        "keywords": [
            "du lịch", "du lich", "văn hóa", "van hoa", "travel", "khám phá", "kham pha", "phong cảnh",
            "phong canh", "phượt", "phuot", "nghỉ dưỡng", "nghi duong", "khách sạn", "khach san",
            "resort", "tour", "phố cổ", "pho co", "checkin", "đà lạt", "tây bắc", "biển", "núi"
        ]
    },
    {
        "id": "cong-nghe",
        "name": "Công Nghệ & Thiết Bị",
        "icon": "📱",
        "keywords": [
            "công nghệ", "cong nghe", "thiết bị", "thiet bi", "tech", "unboxing", "mở hộp", "mo hop",
            "máy ảnh", "may anh", "camera", "gear", "điện thoại", "dien thoai", "iphone", "gimbal",
            "micro", "mic", "lens", "ống kính", "ong kinh", "gadget", "tai nghe", "setup", "đèn ulanzi", "ulanzi"
        ]
    },
    {
        "id": "kien-truc",
        "name": "Kiến Trúc & Không Gian Sống",
        "icon": "🏛️",
        "keywords": [
            "kiến trúc", "kien truc", "không gian sống", "khong gian song", "không gian", "khong gian",
            "nhà đẹp", "nha dep", "nội thất", "noi that", "thiết kế nội thất", "nhà gỗ", "nha go",
            "villa", "decor", "căn hộ", "can ho", "slow living", "thiết kế nhà", "architecture", "interior"
        ]
    },
    {
        "id": "the-thao",
        "name": "Thể Thao & Năng Động",
        "icon": "🏃",
        "keywords": [
            "thể thao", "the thao", "gym", "chạy bộ", "chay bo", "running", "tập gym", "thể hình",
            "the hinh", "workout", "fitness", "bơi lội", "bóng rổ", "cầu lông", "yoga", "pilates", "boxing", "sport"
        ]
    },
    {
        "id": "ky-thuat-quay",
        "name": "Kỹ Thuật Quay Dựng & Điện Ảnh",
        "icon": "🎯",
        "keywords": [
            "kỹ thuật quay", "ky thuat quay", "quay dựng", "quay dung", "góc máy", "goc may", "cú máy",
            "cu may", "lighting", "bố cục", "bo cuc", "phân cảnh", "phan canh", "storyboard", "camera movement",
            "4 cuts", "tips quay", "mẹo quay", "meo quay", "hướng dẫn quay", "filmmaking", "broll tutorial", "đạo diễn"
        ]
    },
    {
        "id": "ugc",
        "name": "UGC",
        "icon": "📱",
        "keywords": [
            "ugc", "quảng cáo sàn", "quảng cáo shopee", "quảng cáo tiktok", "tiktok shop", "shopee",
            "affiliate", "video bán hàng", "aida", "ads", "review sản phẩm", "quảng cáo"
        ]
    }
]

# 2. Danh mục 6 Kiểu Quay chuẩn YTUONG HUB
SHOOTING_STYLES = [
    {
        "id": "walk-and-talk",
        "name": "Walk and Talk",
        "icon": "🚶",
        "keywords": [
            "walk and talk", "walk & talk", "walkandtalk", "vừa đi vừa nói", "vua di vua noi",
            "di chuyển vừa nói", "vừa đi vừa quay", "theo bước chân"
        ]
    },
    {
        "id": "voice-over",
        "name": "Voice Over",
        "icon": "🎙️",
        "keywords": [
            "voice over", "voice-over", "voiceover", "lồng tiếng", "long tieng", "thuyết minh",
            "thuyet minh", "b-roll lồng tiếng", "đọc thuyết minh", "podcast voice"
        ]
    },
    {
        "id": "talking-head",
        "name": "Talking Head",
        "icon": "🗣️",
        "keywords": [
            "talking head", "talking-head", "talkinghead", "nói trực diện", "noi truc dien",
            "ngồi nói", "ngoi noi", "chia sẻ trước máy", "trước camera", "đối diện ống kính"
        ]
    },
    {
        "id": "storytelling",
        "name": "Storytelling",
        "icon": "📖",
        "keywords": [
            "storytelling", "kể chuyện", "ke chuyen", "tự sự", "tu su", "câu chuyện",
            "cau chuyen", "hành trình", "hanh trinh", "tâm sự"
        ]
    },
    {
        "id": "dien-anh",
        "name": "Điện Ảnh (Cinematic)",
        "icon": "🎬",
        "keywords": [
            "điện ảnh", "dien anh", "cinematic", "khung hình tĩnh", "khung hinh tinh",
            "thước phim", "phim ngắn", "aesthetic"
        ]
    },
    {
        "id": "chuyen-canh",
        "name": "Chuyển Cảnh (Transition)",
        "icon": "⚡",
        "keywords": [
            "chuyển cảnh", "chuyen canh", "transition", "match cut", "whip pan", "zoom in",
            "kinetic", "cắt cảnh", "nối cảnh", "biến hình"
        ]
    }
]

def clean_tag(raw: str) -> str:
    """Làm sạch và chuẩn hóa tag"""
    t = re.sub(r"^[#•\-\*\s]+", "", raw)
    t = re.sub(r"[#\s]+$", "", t)
    t = re.sub(r"\s+", " ", t).strip()
    if not t:
        return ""
    words = t.split()
    if len(words) <= 5:
        return " ".join(w.capitalize() if not w.isupper() else w for w in words)
    return t

def normalize_for_search(text: str) -> str:
    """Chuẩn hóa chuỗi để tìm kiếm từ khóa an toàn"""
    clean_chars = []
    for ch in text.lower():
        if ch.isalnum() or ch.isspace() or ch == '_':
            clean_chars.append(ch)
        else:
            clean_chars.append(' ')
    t = "".join(clean_chars)
    return " " + re.sub(r'\s+', ' ', t).strip() + " "

def parse_user_note(raw_text: str) -> dict:
    """
    Phân tích ghi chú từ người dùng (text hoặc caption).
    Trả về dict gồm:
    - matched_industry: Dict ngành nghề hoặc None
    - matched_style: Dict kiểu quay hoặc None
    - user_tags: Danh sách các tag người dùng chỉ định
    - cleaned_note: Nội dung ghi chú đã bóc tách
    """
    if not raw_text or not isinstance(raw_text, str):
        return {
            "raw_note": "",
            "matched_industry": None,
            "matched_style": None,
            "user_tags": [],
            "cleaned_note": ""
        }

    text = raw_text.strip()
    
    # 1. Bóc tách hashtag trước
    hashtags = re.findall(r"#([A-Za-z0-9_À-ỹ]+)", text)
    extracted_tags = [clean_tag(h.replace("_", " ")) for h in hashtags if clean_tag(h)]

    # 2. Bóc tách đoạn sau từ khóa tag / tags / thẻ
    tag_patterns = [
        r'(?:tags?|thẻ|gắn tag|gán tag|tag là|thẻ là)[\s:]+([^;\r\n\.]+)',
    ]
    for pattern in tag_patterns:
        m = re.search(pattern, text, re.IGNORECASE)
        if m:
            raw_tag_str = m.group(1)
            # Tách riêng hashtag nếu có trong chuỗi tag
            if '#' in raw_tag_str:
                sub_hash = re.findall(r'#([A-Za-z0-9_À-ỹ]+)', raw_tag_str)
                for sh in sub_hash:
                    c_sh = clean_tag(sh.replace('_', ' '))
                    if c_sh and c_sh.lower() not in [x.lower() for x in extracted_tags]:
                        extracted_tags.append(c_sh)
                raw_tag_str = re.sub(r'#[A-Za-z0-9_À-ỹ]+', '', raw_tag_str)

            parts = re.split(r'[,;/•]+', raw_tag_str)
            for p in parts:
                cleaned = clean_tag(p)
                if cleaned and cleaned.lower() not in [x.lower() for x in extracted_tags] and len(cleaned) > 1:
                    extracted_tags.append(cleaned)

    # 3. Nhận diện ngành nghề
    norm_text = normalize_for_search(text)
    matched_industry = None
    best_ind_len = 0

    for ind in INDUSTRIES:
        for kw in ind["keywords"]:
            search_target = f" {kw.lower()} "
            if search_target in norm_text:
                if len(kw) > best_ind_len:
                    best_ind_len = len(kw)
                    matched_industry = {
                        "id": ind["id"],
                        "name": ind["name"],
                        "icon": ind["icon"]
                    }

    # 4. Nhận diện kiểu quay
    matched_style = None
    best_style_len = 0
    for st in SHOOTING_STYLES:
        for kw in st["keywords"]:
            search_target = f" {kw.lower()} "
            if search_target in norm_text:
                if len(kw) > best_style_len:
                    best_style_len = len(kw)
                    matched_style = {
                        "id": st["id"],
                        "name": st["name"],
                        "icon": st["icon"]
                    }

    # 5. Nếu chưa có tags nhưng có các cụm từ phân cách bởi dấu phẩy
    if not extracted_tags and "," in text:
        parts = text.split(",")
        for p in parts[1:]:
            c = clean_tag(p)
            if c and len(c) < 35 and not any(kw in c.lower() for kw in ["mục", "ngành", "cho vào", "kiểu"]):
                extracted_tags.append(c)

    # 6. Làm sạch trùng lặp
    final_tags = []
    for t in extracted_tags:
        # Bỏ các tag quá dài hoặc trùng với tên mục đã chọn
        if t and t.lower() not in [x.lower() for x in final_tags]:
            final_tags.append(t)

    return {
        "raw_note": text,
        "matched_industry": matched_industry,
        "matched_style": matched_style,
        "user_tags": final_tags,
        "cleaned_note": text
    }
