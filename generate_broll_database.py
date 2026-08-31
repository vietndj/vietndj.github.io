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
GDRIVE_CATALOG_PATH = '/Users/vietmac/Documents/CODE/Quản gia/broll_gdrive_catalog.json'
OUT_JSON = '/Users/vietmac/Documents/CODE/vietndj.github.io/broll_bank_master.json'

yt_catalog = {}
if os.path.exists(CATALOG_PATH):
    try:
        with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
            yt_catalog = json.load(f)
    except:
        yt_catalog = {}

gdrive_catalog = {}
gdrive_files_norm = {}
if os.path.exists(GDRIVE_CATALOG_PATH):
    try:
        with open(GDRIVE_CATALOG_PATH, 'r', encoding='utf-8') as f:
            gdrive_catalog = json.load(f)
        import unicodedata
        for gname, ginfo in gdrive_catalog.get("files", {}).items():
            gdrive_files_norm[unicodedata.normalize('NFC', gname.lower())] = ginfo
    except:
        gdrive_catalog = {}

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

def norm(s):
    import unicodedata
    return unicodedata.normalize('NFC', s.lower().strip()) if s else ''

yt_catalog_norm = {norm(k): v for k, v in yt_catalog.items()}

items = []
for i, f in enumerate(all_filenames):
    idx = i + 1
    fn_norm = norm(f)
    
    # GDrive links
    g_info = gdrive_files_norm.get(fn_norm, {})
    if not g_info:
        for gk, gv in gdrive_files_norm.items():
            if gk == fn_norm or gk in fn_norm or fn_norm in gk:
                g_info = gv
                break
    gdrive_file_id = g_info.get("file_id", "")
    gdrive_download_url = g_info.get("download_url", "")
    gdrive_view_url = g_info.get("view_url", "")

    # YouTube mapping
    yt_item = yt_catalog.get(f) or yt_catalog_norm.get(fn_norm, {})
    if not yt_item:
        for yk, yv in yt_catalog_norm.items():
            if yk == fn_norm or yk in fn_norm or fn_norm in yk:
                yt_item = yv
                break
    vid_id = yt_item.get('video_id', '') if yt_item else ''
    yt_url = yt_item.get('youtube_url', f"https://www.youtube.com/watch?v={vid_id}" if vid_id else '') if yt_item else ''

    # Check if we have existing record
    if f in existing_data:
        record = existing_data[f].copy()
        record['id'] = idx
        record['thumbnail'] = f"thumb_{idx:03d}.jpg"
        record['gdrive_file_id'] = gdrive_file_id
        record['gdrive_download_url'] = gdrive_download_url
        record['gdrive_view_url'] = gdrive_view_url
        if vid_id:
            record['video_id'] = vid_id
            record['youtube_url'] = yt_url
        items.append(record)
        continue

    # New item classification
    path = os.path.join(VIDEO_DIR, f)
    if not os.path.exists(path):
        for alt_d in ['/Users/vietmac/Documents/RENDER THANG 7', '/Users/vietmac/Documents/RENDER THANG 7/convert done', '/Volumes/1TB 2230/BAT DAU VOI THU VO VAN /BROLL']:
            alt_p = os.path.join(alt_d, f)
            if os.path.exists(alt_p):
                path = alt_p
                break

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
    fn_lower = norm(f)

    # Specific semantic rules for new files
    if "can-phong-la" in fn_lower or "căn phòng lá" in fn_lower or "149" in fn_lower:
        cat_id = "negative_space"
        title_vi = "Negative Space - Căn Phòng Lá & Bước Đi Tĩnh Lặng Chiêm Nghiệm"
        shot_type = "Medium Shot (MS) / 9:16 Dọc"
        location = "Căn Phòng Lá Home Studio"
        action = "Anh Việt bước đi chậm rãi trong căn phòng nhiều cây xanh cạnh cửa kính lớn, dáng vẻ suy tư và tĩnh tại"
        mood = "Zen / Tĩnh lặng / Chiêm nghiệm / Thư thái"
        director_note = "Khoảng lặng thị giác tuyệt đẹp với mảng xanh tự nhiên và ánh sáng xiên qua cửa kính, tạo nhịp thở lắng đọng trước khi mở ra câu chuyện sâu sắc."
        cues = [
            "Đôi khi, để tìm ra câu trả lời rõ ràng nhất, bạn chỉ cần một khoảng không gian yên tĩnh để lắng nghe chính mình...",
            "Trước khi bắt đầu một hành trình mới, hãy dành cho mình vài phút chậm lại giữa thiên nhiên...",
            "Không gian làm việc tràn ngập cây xanh giúp tâm trí luôn giữ được sự cân bằng và sáng suốt."
        ]
        keywords = ["căn phòng lá", "cây xanh", "tĩnh tâm", "suy tư", "studio", "khoảng lặng", "negative space", "zen"]
    elif "go-binh-luan" in fn_lower or "gõ rồi xóa" in fn_lower or "150" in fn_lower:
        cat_id = "metaphor"
        title_vi = "Metaphor - Ngập Ngừng Mở Lời (Gõ Bình Luận Rồi Xóa Đi)"
        shot_type = "Close-up (CU) Màn hình điện thoại / 9:16 Dọc"
        location = "Bàn làm việc Home Studio"
        action = "Cận cảnh hai bàn tay cầm iPhone, gõ dòng bình luận vào bài post trên mạng xã hội rồi ngập ngừng bấm xóa sạch"
        mood = "Trăn trở / Ngại ngùng / Sợ phán xét / Đồng cảm sâu sắc"
        director_note = "Ẩn dụ thị giác đánh trúng tâm lý ngập ngừng, sợ bị phán xét khi mở lời kết nối hoặc bình luận trên mạng xã hội của đa số người xem."
        cues = [
            "Bao nhiêu lần bạn đã gõ một dòng tin nhắn thật dài rồi lại lặng lẽ ấn nút xóa đi?...",
            "Nỗi sợ bị phán xét khiến chúng ta ngần ngại mở lời kết nối với thế giới bên ngoài...",
            "Đừng để sự tự ti ngăn cản bạn chia sẻ góc nhìn và giá trị thực sự của mình."
        ]
        keywords = ["gõ rồi xóa", "ngại mở lời", "sợ phán xét", "mạng xã hội", "đồng cảm", "metaphor", "broll mở lời"]
    elif "nu-cuoi-thau-cam" in fn_lower or "chất lượng không phải xã" in fn_lower or "151" in fn_lower:
        cat_id = "in_situ"
        title_vi = "Thoại In-Situ - Nụ Cười Thấu Cảm & Kết Nối Chân Thành"
        shot_type = "Medium Close-Up (MCU) / 9:16 Dọc"
        location = "Căn Phòng Lá Home Studio"
        action = "Anh Việt từ từ quay người lại nhìn thẳng vào ống kính máy quay với nụ cười rạng rỡ, ánh mắt ấm áp và thấu cảm"
        mood = "Ấm áp / Chân thành / Tin cậy / Đồng điệu cảm xúc"
        director_note = "Cảnh quay mỏ neo cảm xúc với nụ cười tự nhiên và ánh mắt trực diện, kéo gần khoảng cách với người xem và tạo cảm giác đối thoại 1-1 ấm áp."
        cues = [
            "Chúng ta không cần những mối quan hệ xã giao hời hợt, thứ chúng ta cần là sự kết nối thực sự chất lượng...",
            "Chỉ cần bạn mở lòng chân thành, người phù hợp sẽ luôn lắng nghe bạn...",
            "Mỗi cuộc trò chuyện sâu sắc đều bắt đầu từ một nụ cười và sự thấu hiểu."
        ]
        keywords = ["nụ cười", "thấu cảm", "mở lời", "kết nối chân thành", "chất lượng không xã giao", "in-situ", "anh việt"]
    elif "dat-ly-tra" in fn_lower or "mời trà kéo ghế" in fn_lower or "152" in fn_lower:
        cat_id = "cutaway"
        title_vi = "Cutaway - Đặt Ly Trà Mời Trà & Kéo Ghế Đối Thoại (Bàn Gỗ)"
        shot_type = "Close-Up (CU) Bàn gỗ / 9:16 Dọc"
        location = "Góc Trà Đạo Home Studio"
        action = "Cận cảnh bàn tay kéo nhẹ ghế gỗ và trượt ly trà nóng thủy tinh hai lớp bốc khói nhẹ nhàng vào giữa bàn mời người đối diện"
        mood = "Mến khách / Gần gũi / Chậm rãi / Thư thái"
        director_note = "Cảnh Cutaway mộc mạc mang tính biểu tượng của văn hóa mời trà, tạo không khí ấm cúng như một buổi trò chuyện trà đá tâm tình."
        cues = [
            "Kéo một chiếc ghế lại gần, nhấp một ngụm trà nóng và cùng nhau ngồi lại trò chuyện...",
            "Mọi câu chuyện lớn đều bắt đầu bên tách trà giản dị...",
            "Hãy dành một khoảng không gian ấm áp để lắng nghe những người bạn trân quý."
        ]
        keywords = ["mời trà", "kéo ghế", "bàn gỗ", "tách trà nóng", "đối thoại", "gần gũi", "cutaway", "home studio"]
    elif "anh-mat-thau-cam" in fn_lower or "thau cam" in fn_lower or "153" in fn_lower:
        cat_id = "cutaway"
        title_vi = "Cutaway - Ánh Mắt Thấu Cảm & Sự Lắng Nghe Chân Thực"
        shot_type = "Medium Close-Up (MCU) / 9:16 Dọc"
        location = "Home Studio"
        action = "Đặc tả anh Việt xoay người hướng về phía người xem, ánh mắt tập trung và nụ cười khích lệ"
        mood = "Lắng nghe / Thấu cảm / Tự nhiên / Chân thực"
        director_note = "Shot quay đặc tả sự lắng nghe và thấu cảm, rất thích hợp chèn vào các đoạn kết bài giảng hoặc lời khuyên chân thành."
        cues = [
            "Tôi hiểu những khó khăn bạn đang trải qua, bởi tôi cũng từng đứng ở vị trí đó...",
            "Hãy kiên trì với con đường của mình, kết quả tốt đẹp sẽ đến...",
            "Sự chân thật luôn có sức mạnh chạm đến trái tim người nghe hơn mọi kỹ xảo."
        ]
        keywords = ["thấu cảm", "ánh mắt", "lắng nghe", "chân thực", "cutaway", "home studio"]
    elif "đợi đón con" in fn_lower or "ngồi chill" in fn_lower:
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
    elif "loa phong cách" in fn_lower or "cuối tuần" in fn_lower or "loa phong cách" in fn_lower or "cuối tuần" in fn_lower:
        cat_id = "in_situ"
        title_vi = "Thoại In-Situ - Review Loa Bluetooth Hài Hước & Phản Ứng Tự Nhiên"
        shot_type = "Medium Close-Up (MCU) / 9:16 Dọc"
        location = "Studio Sáng Tạo / Không Gian Thoáng"
        action = "Anh Việt ngồi cạnh bàn tròn, cầm loa Bluetooth mini bật nguồn nghe âm báo 'Páo-ờ-on' với biểu cảm hài hước sinh động"
        mood = "Hài hước / Gần gũi / Đời thường / Thực chiến Review"
        director_note = "Shot In-situ thoại thực tế phong cách mộc mạc, phá vỡ sự khô cứng của bài review công nghệ thông thường bằng phản ứng chân thực và biểu cảm hài hước, tạo điểm giữ chân (hook retention) xuất sắc ở 3s đầu."
        cues = [
            "Cuối tuần mình chỉ bạn cách quay video review sản phẩm phong cách mới...",
            "Đừng đọc thông số khô cứng, hãy để biểu cảm và âm thanh thực tế tự nói lên câu chuyện...",
            "Khi sản phẩm phát ra âm thanh khó đỡ, chính phản ứng bất ngờ tự nhiên của bạn là điểm ăn tiền nhất của video!"
        ]
        keywords = ["review loa", "in-situ", "thoại đời thường", "hài hước", "biểu cảm tự nhiên", "páo-ờ-on", "review sản phẩm", "fedu broll"]
    elif "chay" in fn_lower or "chạy" in fn_lower or "san bong ro" in fn_lower or "sân bóng rổ" in fn_lower:
        cat_id = "in_situ"
        title_vi = f"Thoại In-Situ - Chạy Bộ & Kỷ Luật Thể Chất: {f.replace('.mp4', '')}"
        shot_type = "Tracking Shot / Medium Shot"
        location = "Khuôn viên ngoài trời & Sân bóng rổ Times City"
        action = "Chạy bộ thể thao, đón gió trời, rèn luyện thể lực và giải phóng áp lực tâm trí"
        mood = "Năng động / Thể thao / Kỷ luật / Tràn đầy sức sống"
        director_note = "Cảnh chạy bộ ngoài trời thể hiện tính kỷ luật và sức bền của một Solopreneur, truyền cảm hứng tích cực và nâng cao nhịp điệu thị giác của video."
        cues = [
            "Chạy bộ không chỉ để rèn luyện cơ thể, mà là cách tôi làm sạch tâm trí mỗi ngày...",
            "Khi bế tắc ý tưởng, hãy xỏ giày vào và chạy...",
            "Kỷ luật thể chất tạo ra sức bền cho mọi dự án dài hạn."
        ]
        keywords = ["chạy bộ", "thể thao", "times city", "kỷ luật", "sức bền", "năng lượng", "in-situ"]
    elif "uống trà" in fn_lower or "uống trà" in fn_lower:
        cat_id = "negative_space"
        title_vi = "Negative Space - Thưởng Trà Nóng & Khoảng Lặng Chiêm Nghiệm"
        shot_type = "Medium Close-Up (MCU) / 9:16 Dọc"
        location = "Góc Thưởng Trà Home Studio"
        action = "Cầm tách trà nóng bốc khói nhẹ nhàng, tận hưởng không gian tĩnh lặng"
        mood = "Tĩnh lặng / Thư thái / Chiêm nghiệm"
        director_note = "Khoảng lặng thị giác đắt giá với làn khói trà mờ ảo, giúp xoa dịu nhận thức người xem sau những đoạn phân tích kỹ thuật dồn dập."
        cues = [
            "Một ngụm trà nóng để chậm lại giữa nhịp sống hối hả...",
            "Dành ra vài phút yên tĩnh trước khi bắt đầu phiên làm việc sâu...",
            "Đôi khi, không làm gì cả lại là cách tốt nhất để nạp đầy năng lượng."
        ]
        keywords = ["uống trà", "trà nóng", "thư thái", "tĩnh lặng", "khoảng lặng", "negative space"]
    elif "xoa video" in fn_lower or "xóa video" in fn_lower:
        cat_id = "metaphor"
        title_vi = f"Metaphor - Nỗi Đau Xóa Video & Sự Tự Ti Ban Đầu: {f.replace('.mp4', '')}"
        shot_type = "Extreme Close-Up (ECU) / Cận cảnh điện thoại"
        location = "Bàn làm việc Home Studio"
        action = "Thao tác chọn xóa hàng loạt video quay hỏng trên màn hình điện thoại rồi buông máy xuống bàn"
        mood = "Thất vọng / Trăn trở / Đồng cảm sâu sắc"
        director_note = "Ẩn dụ thị giác đánh thẳng vào nỗi sợ thất bại của người mới bắt đầu sáng tạo nội dung: quay mãi không ưng, xóa đi quay lại trong bất lực."
        cues = [
            "Bạn đã bao giờ quay cả chục lần rồi lại lặng lẽ ấn nút xóa tất cả?...",
            "Sự hoàn hảo là kẻ thù số một của sự bắt đầu...",
            "Đừng xóa video của bạn, hãy biến những thước phim vụng về đó thành bài học."
        ]
        keywords = ["xóa video", "nỗi đau creator", "tự ti", "đồng cảm", "bàn làm việc", "metaphor"]
    elif "lướt instagram" in fn_lower or "lướt instagram" in fn_lower:
        cat_id = "metaphor"
        title_vi = "Metaphor - Bẫy Tiêu Thụ Nội Dung & Overthinking"
        shot_type = "Close-up (CU) Màn hình điện thoại"
        location = "Bàn làm việc"
        action = "Ngón tay lướt feed Instagram vô định, so sánh bản thân với người khác"
        mood = "Mất tập trung / Quá tải thông tin / Áp lực ngầm"
        director_note = "Cảnh quay đánh trúng tâm lý Doomscrolling và hội chứng FOMO của người xem, làm bước đệm hoàn hảo để mở ra giải pháp tập trung sáng tạo."
        cues = [
            "Chúng ta mất hàng giờ lướt xem thành công của người khác thay vì bắt tay vào làm việc của mình...",
            "Ngừng tiêu thụ nội dung rác và bắt đầu sản xuất giá trị thực...",
            "Mỗi phút bạn lướt mạng là một phút ý tưởng của bạn bị trì hoãn."
        ]
        keywords = ["lướt instagram", "doomscrolling", "fomo", "overthinking", "metaphor"]
    elif "mặt cứng" in fn_lower or "mặt cứng" in fn_lower or "tay đơ" in fn_lower or "tay đơ" in fn_lower:
        cat_id = "metaphor"
        title_vi = "Metaphor - Nỗi Sợ Ống Kính (Mặt Cứng, Tay Đơ)"
        shot_type = "Medium Close-Up (MCU)"
        location = "Trước ống kính máy quay"
        action = "Ngồi trước máy quay với vẻ mặt căng thẳng, tay chân lúng túng không biết diễn thế nào"
        mood = "Ngượng ngùng / Gượng gạo / Chân thực đời thường"
        director_note = "Khắc họa chân thực cảm giác sợ hãi khi lần đầu đứng trước máy quay. Tạo sự giải tỏa tâm lý và kết nối chân thật với học viên."
        cues = [
            "Cảm giác ngồi trước ống kính mà người cứ cứng đơ, đầu óc trống rỗng...",
            "Ai cũng phải trải qua những thước phim vụng về đầu tiên...",
            "Tự nhiên không phải do năng khiếu, mà là kết quả của việc quay đủ nhiều."
        ]
        keywords = ["sợ máy quay", "mặt cứng tay đơ", "ngượng ngùng", "thực tế", "metaphor"]
    elif "offline" in fn_lower or "lớp offline" in fn_lower:
        cat_id = "sequence"
        title_vi = f"Sequence - Lớp Học Thực Chiến Fedu: {f.replace('.mp4', '')}"
        shot_type = "Medium / Over-The-Shoulder (OTS)"
        location = "Studio Lớp Học Offline Fedu"
        action = "Anh Việt trực tiếp hướng dẫn học viên cầm máy Sony, chỉnh thông số và thực hành bối cảnh"
        mood = "Nhiệt huyết / Tương tác / Chuyên môn sâu / Uy tín"
        director_note = "Chuỗi cảnh thực chiến tại lớp học offline minh chứng cho năng lực đào tạo và kinh nghiệm thực chiến dày dạn của tác giả."
        cues = [
            "Tại lớp học offline, mọi lý thuyết đều được chuyển hóa thành thao tác bấm máy ngay lập tức...",
            "Cầm tay chỉ việc giúp bạn vượt qua nỗi sợ kỹ thuật chỉ trong một buổi...",
            "Không có gì nhanh bằng việc thực hành trực tiếp cùng người có kinh nghiệm."
        ]
        keywords = ["lớp offline", "fedu", "đào tạo thực chiến", "hướng dẫn cầm máy", "sony", "sequence"]
    elif "timeline" in fn_lower or "editorial" in fn_lower or "edit" in fn_lower:
        cat_id = "archival"
        title_vi = f"Archival - Thao Tác Biên Tập Timeline Chuyên Nghiệp: {f.replace('.mp4', '')}"
        shot_type = "Screen Recording / Close-Up Màn hình MacBook"
        location = "Home Studio / Bàn dựng phim"
        action = "Thao tác cắt cúp, kéo thả hiệu ứng và sắp xếp nhịp điệu timeline trên phần mềm dựng"
        mood = "Tập trung cao độ / Kỹ thuật / Chuyên nghiệp"
        director_note = "Minh họa quy trình hậu kỳ thực tế, chứng minh tính logic và sự tỉ mỉ trong từng đường cắt timeline."
        cues = [
            "Một video hay được quyết định ở nhịp thở trên timeline dựng...",
            "Cắt bỏ mọi phần thừa để giữ sự chú ý của người xem từ đầu đến cuối...",
            "Biên tập là khâu thổi linh hồn vào những thước phim thô."
        ]
        keywords = ["timeline", "dựng phim", "editorial", "premiere", "capcut", "archival"]
    elif "thiền" in fn_lower or "thiền" in fn_lower:
        cat_id = "negative_space"
        title_vi = f"Negative Space - Thiền Định & Tĩnh Tâm: {f.replace('.mp4', '')}"
        shot_type = "Wide Shot (WS) / Tĩnh"
        location = "Vườn cây / Công viên Times City sáng sớm"
        action = "Ngồi thiền định tĩnh lặng đón những tia nắng sớm đầu ngày"
        mood = "Zen / Thanh tịnh / Bình yên / Tái tạo năng lượng"
        director_note = "Khoảng lặng tâm hồn giúp tái thiết lập tâm trí, tạo chiều sâu thị giác và triết lý sống cho video."
        cues = [
            "Bắt đầu ngày mới bằng sự tĩnh lặng để lắng nghe chính mình...",
            "Tâm có tĩnh thì ý tưởng mới sắc...",
            "Dành tặng bản thân những phút giây không vướng bận công việc."
        ]
        keywords = ["thiền định", "sáng sớm", "tĩnh tâm", "times city", "zen", "negative space"]
    elif "chuyển cảnh" in fn_lower or "chuyen canh" in fn_lower or "chuyển cảnh" in fn_lower or "practice" in fn_lower or "cinematic" in fn_lower:
        cat_id = "sequence"
        title_vi = f"Sequence - Kỹ Thuật Chuyển Cảnh Điện Ảnh: {f.replace('.mp4', '')}"
        shot_type = "Action Cut / Match Cut / Whip Pan"
        location = "Hiện trường quay thực chiến"
        action = "Thực hiện chuỗi chuyển động máy mượt mà, kết nối các phân cảnh liền mạch"
        mood = "Điện ảnh / Nhịp điệu / Mượt mà / Ấn tượng"
        director_note = "Kỹ thuật chuyển cảnh mượt mà giúp video chuyển mạch tự nhiên mà không gây giật cục nhận thức."
        cues = [
            "Chuyển cảnh tốt nhất là chuyển cảnh mà người xem không nhận ra có vết cắt...",
            "Dùng chuyển động của chủ thể để dẫn dắt ánh nhìn của khán giả...",
            "Biến các góc quay đơn giản thành một mạch truyện điện ảnh liền mạch."
        ]
        keywords = ["chuyển cảnh", "cinematic", "match cut", "sequence", "thực chiến"]
    elif "text animation" in fn_lower or "motion" in fn_lower:
        cat_id = "archival"
        title_vi = f"Archival - Mẫu Text Animation & Motion Graphic: {f.replace('.mp4', '')}"
        shot_type = "Motion Graphic Demo / 4K"
        location = "Đồ họa số Fedu"
        action = "Hiệu ứng chữ chuyển động dynamic, làm nổi bật thông điệp chính"
        mood = "Hiện đại / Rõ ràng / Trực quan"
        director_note = "Minh họa đồ họa chuyển động giúp nhấn mạnh từ khóa và nâng tầm tính chuyên nghiệp của video."
        cues = [
            "Đồ họa chuyển động giúp thông điệp của bạn đập ngay vào mắt người xem...",
            "Nhấn mạnh từ khóa để người xem nắm bắt nội dung ngay cả khi tắt tiếng."
        ]
        keywords = ["text animation", "motion graphic", "đồ họa", "archival"]
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
        "gdrive_file_id": gdrive_file_id,
        "gdrive_download_url": gdrive_download_url,
        "gdrive_view_url": gdrive_view_url,
        "director_note": director_note,
        "dialogue_cues": cues,
        "keywords": keywords
    })

db_output = {
    "version": "1.2.0",
    "total_videos": len(items),
    "vertical_count": len([x for x in items if x["orientation"] == "vertical"]),
    "horizontal_count": len([x for x in items if x["orientation"] == "horizontal"]),
    "playlist_url": "https://www.youtube.com/playlist?list=PLPs82ezbs9Lo",
    "playlist_id": "PLPs82ezbs9Lo",
    "gdrive_folder_url": gdrive_catalog.get("folder_url", "https://drive.google.com/open?id=1R4Wyl_c8MxLPqBJRR-5Dc5I3P3Hb7tSA"),
    "gdrive_folder_id": "1R4Wyl_c8MxLPqBJRR-5Dc5I3P3Hb7tSA",
    "categories": BROLL_CATEGORIES,
    "videos": items
}

with open(OUT_JSON, 'w', encoding='utf-8') as f_out:
    json.dump(db_output, f_out, ensure_ascii=False, indent=2)

print(f"Generated Master B-Roll Database with {len(items)} items saved to {OUT_JSON}")
