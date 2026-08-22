#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate master database for all B-roll videos in BROLL BANK (historical + new).
Includes full 8 B-roll types, multi-dimensional matrix, dialogue cues, director notes, and youtube/thumbnail mapping.
"""

import os
import json
import subprocess

VIDEO_DIR = '/Users/vietmac/Documents/BROLL BANK'
THUMB_DIR = '/Users/vietmac/Documents/CODE/vietndj.github.io/broll_thumbnails'
CATALOG_PATH = '/Users/vietmac/Documents/CODE/Quản gia/broll_youtube_catalog.json'
OUT_JSON = '/Users/vietmac/Documents/CODE/vietndj.github.io/broll_bank_master.json'

yt_catalog = {}
if os.path.exists(CATALOG_PATH):
    try:
        with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
            yt_catalog = json.load(f)
    except:
        yt_catalog = {}

BROLL_CATEGORIES = {
    "cutaway": {
        "id": "cutaway",
        "name": "1. Cutaway (Insert Shot)",
        "badge": "Minh họa trực diện",
        "icon": "✂️",
        "color": "blue",
        "desc": "'Nói gì, hình nấy' - Cảnh chèn đặc tả vật thể/thao tác đúng vào từ khóa để giảm tải nhận thức và giấu vết cắt."
    },
    "sequence": {
        "id": "sequence",
        "name": "2. Sequence (Montage)",
        "badge": "Băng chuyền hành động",
        "icon": "🎞️",
        "color": "purple",
        "desc": "Chuỗi hành động liên hoàn nhiều góc máy (Rộng - Trung - Cận) mô tả trọn vẹn một quy trình mượt mà, giữ retention >70%."
    },
    "pov": {
        "id": "pov",
        "name": "3. POV (Point Of View)",
        "badge": "Mượn mắt khán giả",
        "icon": "👁️",
        "color": "teal",
        "desc": "Góc nhìn thứ nhất mượn mắt người xem, kích hoạt nơ-ron gương giúp khán giả cảm giác chính mình đang trải nghiệm."
    },
    "in_situ": {
        "id": "in_situ",
        "name": "4. Thoại In-Situ (Walk-and-Talk)",
        "badge": "Vừa làm vừa nói",
        "icon": "🎬",
        "color": "red",
        "desc": "Người nói vừa thực hiện thao tác công việc thực tế vừa chia sẻ, tạo cảm giác chân thực sống động và tăng uy tín chuyên gia."
    },
    "intercut": {
        "id": "intercut",
        "name": "5. Dựng Intercut (Docu-Style)",
        "badge": "Nửa tĩnh, nửa động",
        "icon": "⚖️",
        "color": "indigo",
        "desc": "Dựng luân phiên giữa A-roll (người ngồi nói tĩnh) và B-roll thao tác hiện trường sinh động để duy trì nhịp thở thị giác."
    },
    "metaphor": {
        "id": "metaphor",
        "name": "6. Metaphor (Visual Metaphor)",
        "badge": "Mượn vật thay lời",
        "icon": "♟️",
        "color": "amber",
        "desc": "Ẩn dụ thị giác: mượn hình ảnh biểu tượng (cà phê nhỏ giọt = thời gian/chờ đợi, note lộn xộn = quá tải não bộ) để khắc sâu thông điệp."
    },
    "negative_space": {
        "id": "negative_space",
        "name": "7. Negative Space (Breathing Room)",
        "badge": "Khoảng lặng đắt giá",
        "icon": "⏸️",
        "color": "slate",
        "desc": "Khoảng trống thư giãn thị giác, tạo điểm dừng cảm xúc sau chuỗi thông tin dồn dập, giúp não bộ người xem kịp tiêu hóa bài học."
    },
    "archival": {
        "id": "archival",
        "name": "8. Archival / Timeline (Tư liệu)",
        "badge": "Cỗ máy thời gian",
        "icon": "⏳",
        "color": "emerald",
        "desc": "Hình ảnh màn hình dựng timeline, tư liệu thực chứng, bản thảo viết tay hoặc meme chứng minh luận điểm."
    }
}

# Collect all files from catalog + any currently in VIDEO_DIR
all_filenames = sorted(list(set(list(yt_catalog.keys()) + [f for f in os.listdir(VIDEO_DIR) if f.lower().endswith(('.mp4', '.mov'))])))

# Load existing database to keep manual / precise metadata if available
existing_data = {}
if os.path.exists(OUT_JSON):
    try:
        with open(OUT_JSON, 'r', encoding='utf-8') as f:
            old_db = json.load(f)
            for v in old_db.get('videos', []):
                existing_data[v['filename']] = v
    except:
        pass

items = []
for i, f in enumerate(all_filenames):
    idx = i + 1
    fn_lower = f.lower()
    
    # Check if we have existing record
    if f in existing_data:
        record = existing_data[f].copy()
        record['id'] = idx
        record['thumbnail'] = f"thumb_{idx:03d}.jpg"
        yt_item = yt_catalog.get(f, {})
        if yt_item.get('video_id'):
            record['video_id'] = yt_item['video_id']
            record['youtube_url'] = yt_item.get('youtube_url', f"https://www.youtube.com/watch?v={yt_item['video_id']}")
        items.append(record)
        continue

    # New item classification
    path = os.path.join(VIDEO_DIR, f)
    size_mb = round(os.path.getsize(path)/(1024*1024), 2) if os.path.exists(path) else 50.0
    
    w, h, dur_sec = 2160, 3840, 20.0
    if os.path.exists(path):
        cmd = ['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,duration', '-of', 'json', path]
        try:
            out = json.loads(subprocess.check_output(cmd, stderr=subprocess.DEVNULL).decode())
            v = out.get('streams', [{}])[0]
            w = int(v.get('width', 2160))
            h = int(v.get('height', 3840))
            dur_sec = round(float(v.get('duration', 20.0)), 1)
        except:
            pass
            
    dur_str = f"{int(dur_sec // 60):02d}:{int(dur_sec % 60):02d}"
    orientation = "vertical" if h > w else "horizontal"
    thumb_file = f"thumb_{idx:03d}.jpg"

    # Specific semantic rules for new files
    if "đợi đón con" in fn_lower or "ngồi chill" in fn_lower:
        cat_id = "negative_space"
        title_vi = "Khoảng Lặng Ban Chiều - Ngồi Chill Đợi Con (Times City)"
        shot_type = "Medium Shot (MS) / Tĩnh"
        location = "Khuôn viên Times City"
        action = "Ngồi ghế đá thư thái, quan sát xung quanh trong lúc chờ đón con"
        mood = "Thư thái / Bình yên / Cân bằng cuộc sống"
        director_note = "Khoảng lặng đắt giá thể hiện cuộc sống cân bằng của một Solopreneur / Creator, giúp video gần gũi và tạo sự đồng cảm sâu sắc."
        cues = [
            "Những khoảng thời gian chờ đợi này chính là lúc tâm trí tôi được nghỉ ngơi thực sự...",
            "Cân bằng giữa công việc sáng tạo bận rộn và trách nhiệm gia đình...",
            "Dành ra 15 phút mỗi ngày để chậm lại và cảm nhận nhịp sống xung quanh."
        ]
        keywords = ["ngồi chill", "đợi con", "times city", "khoảng lặng", "gia đình", "cân bằng", "nghỉ ngơi", "thư thái"]
    elif "thiên nhiên" in fn_lower or "đợi miu" in fn_lower:
        cat_id = "negative_space"
        title_vi = "Negative Space - Thiên Nhiên & Tái Tạo Năng Lượng Tâm Hồn"
        shot_type = "Wide / Medium Shot"
        location = "Vườn cây Times City"
        action = "Đứng ngắm nhìn vòm cây xanh mát, hít thở không khí tự nhiên"
        mood = "Zen / Tĩnh lặng / Xanh mát"
        director_note = "Khoảng thở thị giác cực kỳ quý giá sau chuỗi kiến thức nặng nề, giúp xoa dịu nhận thức người xem và giữ chân họ đến cuối video."
        cues = [
            "Khi não bộ bị quá tải bởi màn hình và thông tin số, thiên nhiên là liều thuốc giải độc duy nhất...",
            "Hãy cho phép đôi mắt được nghỉ ngơi bên những mảng xanh dịu mát.",
            "Một tâm trí tĩnh lặng giữa thiên nhiên sẽ đưa ra những quyết định sáng suốt nhất."
        ]
        keywords = ["thiên nhiên", "cây xanh", "zen", "tĩnh lặng", "nghỉ ngơi", "times city", "xanh mát", "tái tạo"]
    else:
        cat_id = "cutaway"
        title_vi = f"B-Roll: {f.replace('.mp4', '')}"
        shot_type = "Close-up (CU)"
        location = "Home Studio"
        action = "Thao tác làm việc thực tế"
        mood = "Tập trung / Chuyên nghiệp"
        director_note = "Minh họa trực diện cho câu thoại để giảm tải nhận thức và giấu vết cắt."
        cues = ["Để tối ưu hiệu quả công việc, hãy bắt đầu từ những thói quen nhỏ nhất..."]
        keywords = ["b-roll", "thực chiến", "làm việc"]

    yt_item = yt_catalog.get(f, {})
    vid_id = yt_item.get('video_id', '')
    yt_url = yt_item.get('youtube_url', f"https://www.youtube.com/watch?v={vid_id}" if vid_id else '')

    items.append({
        "id": idx,
        "filename": f,
        "title": title_vi,
        "category_id": cat_id,
        "category_name": BROLL_CATEGORIES[cat_id]["name"],
        "category_badge": BROLL_CATEGORIES[cat_id]["badge"],
        "category_icon": BROLL_CATEGORIES[cat_id]["icon"],
        "category_color": BROLL_CATEGORIES[cat_id]["color"],
        "shot_type": shot_type,
        "location": location,
        "action": action,
        "mood": mood,
        "orientation": orientation,
        "resolution": f"{w}x{h}",
        "duration_sec": dur_sec,
        "duration": dur_str,
        "size_mb": size_mb,
        "thumbnail": thumb_file,
        "video_id": vid_id,
        "youtube_url": yt_url,
        "director_note": director_note,
        "dialogue_cues": cues,
        "keywords": keywords
    })

db_output = {
    "version": "1.1.0",
    "total_videos": len(items),
    "vertical_count": len([x for x in items if x["orientation"] == "vertical"]),
    "horizontal_count": len([x for x in items if x["orientation"] == "horizontal"]),
    "playlist_url": "https://www.youtube.com/playlist?list=PLPs82ezbs9Lo",
    "playlist_id": "PLPs82ezbs9Lo",
    "categories": BROLL_CATEGORIES,
    "videos": items
}

with open(OUT_JSON, 'w', encoding='utf-8') as f_out:
    json.dump(db_output, f_out, ensure_ascii=False, indent=2)

print(f"Generated Master B-Roll Database with {len(items)} items saved to {OUT_JSON}")
