#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate master database for 90 B-roll videos in BROLL BANK.
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

files = sorted([f for f in os.listdir(VIDEO_DIR) if f.lower().endswith(('.mp4', '.mov'))])

items = []
for i, f in enumerate(files):
    idx = i + 1
    path = os.path.join(VIDEO_DIR, f)
    size_mb = round(os.path.getsize(path) / (1024 * 1024), 2)
    
    cmd = ['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,duration', '-of', 'json', path]
    try:
        out = json.loads(subprocess.check_output(cmd, stderr=subprocess.DEVNULL).decode())
        v = out.get('streams', [{}])[0]
        w = int(v.get('width', 0))
        h = int(v.get('height', 0))
        dur_sec = round(float(v.get('duration', 0)), 1)
    except:
        w, h, dur_sec = 0, 0, 0
        
    dur_str = f"{int(dur_sec // 60):02d}:{int(dur_sec % 60):02d}"
    orientation = "vertical" if h > w else "horizontal"
    thumb_file = f"thumb_{idx:03d}.jpg"
    
    fn_lower = f.lower()
    
    cat_id = "cutaway"
    clean_name = f.replace('.mp4', '').replace('.MP4', '').replace('.mov', '').replace('Broll - ', '').replace('broll - ', '').replace('BRoll - ', '').replace('Broll ', '').replace('BRoll ', '')
    title_vi = f"Cảnh Trám: {clean_name}"
    shot_type = "Close-up (CU)"
    location = "Home Studio Times City"
    action = "Thao tác làm việc tập trung"
    mood = "Deep Work / Tập trung"
    director_note = "Dùng làm cảnh cắt minh họa trực diện cho câu thoại, giúp giấu vết cắt và neo thị giác người xem."
    cues = [
        "Để làm được điều này, bạn cần nắm vững quy trình cốt lõi...",
        "Khi nhìn sâu vào chi tiết, bạn sẽ thấy sự khác biệt nằm ở cách thực thi.",
        "Đây chính là bước then chốt giúp tối ưu hóa hiệu suất làm việc."
    ]
    keywords = ["thao tác", "làm việc", "quy trình", "chi tiết", "thực chiến"]
    
    if "ban công" in fn_lower or "balcony" in fn_lower:
        if "và nói" in fn_lower:
            cat_id = "in_situ"
            title_vi = "Thoại In-situ Tại Ban Công - Chia Sẻ Trực Diện"
        else:
            cat_id = "negative_space"
            title_vi = "Ban Công Chill & Trầm Tư - Times City"
        shot_type = "Medium Shot (MS)"
        location = "Ban công Times City"
        action = "Đứng ngắm cảnh / Thoại ban công"
        mood = "Zen / Chill / Suy ngẫm"
        director_note = "Khoảng thở thị giác cực kỳ đắt giá sau một chuỗi luận điểm dồn dập. Giúp người xem thẩm thấu tri thức."
        cues = [
            "Đôi khi, việc dừng lại để nhìn lại toàn cảnh quan trọng hơn là cứ cắm đầu chạy tiếp...",
            "Khi bạn cảm thấy quá tải với mớ bòng bong hàng ngày, hãy dành 5 phút nhìn ra ngoài...",
            "Tự do thực sự không phải là làm nhiều hơn, mà là làm chủ được khoảng lặng của chính mình."
        ]
        keywords = ["ban công", "chill", "nghỉ ngơi", "khoảng lặng", "suy tư", "tự do", "times city"]

    elif "uống cam" in fn_lower or "thái cam" in fn_lower or "vắt cam" in fn_lower:
        if "thái cam" in fn_lower or "vắt cam" in fn_lower:
            cat_id = "sequence"
            title_vi = "Quy Trình Vắt Nước Cam - Thư Giãn Tươi Mới"
            shot_type = "Top-down / Close-up"
            location = "Bếp Home Studio"
            action = "Thái lát và ép nước cam tươi"
            mood = "Tươi sáng / Tràn đầy năng lượng"
            director_note = "Chuỗi hành động tạo cảm giác 'Oddly Satisfying', kích thích dopamine thị giác và giữ retention vượt 70%."
            cues = [
                "Mỗi sáng bắt đầu bằng một thói quen nhỏ giúp tái nạp 100% năng lượng...",
                "Đừng bắt não bộ làm việc kiệt quệ mà không có thời gian phục hồi sinh học.",
                "Tập trung vào dinh dưỡng và sự tỉnh táo là nền tảng của mọi phiên Deep Work."
            ]
            keywords = ["uống cam", "nước cam", "thái cam", "năng lượng", "sức khỏe", "sáng sớm", "thói quen"]
        else:
            cat_id = "negative_space" if "nghỉ ngơi" in fn_lower or "chill" in fn_lower else "in_situ"
            title_vi = "Ngồi Thưởng Thức Nước Cam - Khoảnh Khắc Nạp Năng Lượng"
            shot_type = "Medium Close-up (MCU)"
            location = "Home Studio"
            action = "Cầm cốc nước cam nhâm nhi thư thái"
            mood = "Thư thái / Bình yên"
            director_note = "Dùng khi chuyển đổi từ phần lý thuyết căng thẳng sang giải pháp nhẹ nhàng, giúp nhịp video hạ cánh mềm."
            cues = [
                "Nạp lại năng lượng trước khi bước vào ca làm việc quan trọng tiếp theo...",
                "Những khoảnh khắc nhỏ này chính là lúc bạn nảy ra những ý tưởng đột phá nhất.",
                "Cân bằng giữa hiệu suất cao và sự thư giãn chủ động."
            ]
            keywords = ["thư giãn", "nước cam", "nghỉ ngơi", "tập trung", "refresh"]

    elif "cafe" in fn_lower or "chiết xuất" in fn_lower or "nhỏ giọt" in fn_lower:
        if "nhỏ giọt" in fn_lower:
            cat_id = "metaphor"
            title_vi = "Cà Phê Nhỏ Giọt - Ẩn Dụ Thời Gian & Bế Tắc"
            shot_type = "Extreme Close-up (ECU)"
            location = "Home Studio Bàn gỗ"
            action = "Từng giọt cà phê đen rơi chậm rãi"
            mood = "Trầm lắng / Ẩn dụ thời gian"
            director_note = "Ẩn dụ thị giác xuất sắc cho cảm giác chờ đợi, sự bế tắc, hoặc quá trình tích lũy chậm rãi nhưng bền bỉ."
            cues = [
                "Cảm giác công việc của bạn cứ nhỏ giọt từng chút một mà không thấy lối ra...",
                "Mọi sự chuyển hóa lớn đều bắt đầu từ những tích lũy nhỏ giọt không nhìn thấy bằng mắt thường.",
                "Thời gian trôi qua rất nhanh, nhưng nếu bạn không có hệ thống, kết quả vẫn sẽ chỉ giậm chân tại chỗ."
            ]
            keywords = ["cà phê", "nhỏ giọt", "thời gian", "chờ đợi", "bế tắc", "tích lũy", "chậm rãi"]
        else:
            cat_id = "sequence"
            title_vi = "Pha Cà Phê Barista - Nén & Chiết Xuất Đậm Đà"
            shot_type = "Close-up (CU)"
            location = "Góc Barista Home Studio"
            action = "Thao tác nén bột cà phê và bấm máy chiết xuất"
            mood = "Chuyên nghiệp / Đẳng cấp"
            director_note = "Chuỗi hình ảnh cực bắt mắt, tạo nhịp điệu dứt khoát và phong cách sống chỉn chu của creator."
            cues = [
                "Chuẩn bị một ly cà phê chuẩn vị để bắt đầu ngày làm việc hiệu quả...",
                "Quy trình đòi hỏi sự chính xác từng gram và lực nén chuẩn mực.",
                "Thói quen tạo nên sự tập trung cao độ cho cả ngày dài."
            ]
            keywords = ["barista", "chiết xuất", "cà phê", "nén cà phê", "chuyên nghiệp", "thói quen"]

    elif "fpt" in fn_lower or "dạy học" in fn_lower:
        cat_id = "in_situ" if "dạy học" in fn_lower else "intercut"
        title_vi = "Giảng Dạy & Tương Tác Tại Giảng Đường FPT"
        shot_type = "Medium Shot (MS)"
        location = "Giảng đường Đại học FPT"
        action = "Đứng lớp chia sẻ, tương tác với sinh viên và hướng dẫn máy móc"
        mood = "Sư phạm / Truyền cảm hứng / Uy tín cao"
        director_note = "Cảnh xây dựng Social Proof (Bằng chứng xã hội) cực mạnh. Tăng ngay 200% độ uy tín cho người nói khi bàn về kiến thức."
        cues = [
            "Khi tôi đứng lớp chia sẻ cho hàng trăm bạn sinh viên tại FPT...",
            "Kinh nghiệm thực chiến qua nhiều năm đào tạo cho thấy sai lầm lớn nhất của các bạn là...",
            "Lý thuyết chỉ có giá trị khi nó được kiểm chứng qua các buổi thực hành thực tế."
        ]
        keywords = ["fpt", "dạy học", "giảng đường", "sinh viên", "đào tạo", "uy tín", "chuyên gia"]

    elif "typing" in fn_lower or "gõ máy" in fn_lower or "desk" in fn_lower or "làm việc" in fn_lower:
        if "top" in fn_lower:
            shot_type = "Top-down / Flatlay"
        elif "ots" in fn_lower:
            shot_type = "Over-the-Shoulder (OTS)"
        else:
            shot_type = "Close-up (CU)"
            
        if "nhiễu loạn" in fn_lower or "quá tải" in fn_lower or "lộn xộn" in fn_lower:
            cat_id = "metaphor"
            title_vi = "Deep Work - Bàn Làm Việc Quá Tải & Nhiễu Loạn Thông Tin"
            mood = "Dồn dập / Áp lực / Quá tải"
            director_note = "Minh họa hoàn hảo cho nỗi đau của khán giả khi đối mặt với Deadline, đa nhiệm (multitasking) và stress."
            cues = [
                "Có bao giờ bạn mở máy tính lên và bị ngập trong hàng tá tab trình duyệt cùng lúc?",
                "Sự nhiễu loạn thông tin đang âm thầm bào mòn khả năng tập trung sâu của bạn...",
                "Khi khối lượng công việc vượt ngưỡng chịu đựng, não bộ sẽ tự động rơi vào trạng thái tê liệt."
            ]
            keywords = ["quá tải", "nhiễu loạn", "stress", "áp lực", "deadline", "hỗn loạn", "bàn làm việc"]
        else:
            cat_id = "sequence" if "chuỗi" in fn_lower or "sequence" in fn_lower else "cutaway"
            title_vi = "Gõ Phím & Lướt Màn Hình - Tập Trung Tuyệt Đối"
            mood = "Deep Work / Tập trung"
            director_note = "Cảnh chèn kinh điển cho các đoạn nói về coding, viết lách, xây dựng hệ thống tự động hoặc dựng phim."
            cues = [
                "Bắt tay vào gõ những dòng mã đầu tiên của hệ thống tự động hóa...",
                "Khi bạn bước vào trạng thái dòng chảy (Flow State), thời gian dường như dừng lại.",
                "Tập trung cao độ để biến ý tưởng thành sản phẩm thực tế."
            ]
            keywords = ["gõ phím", "laptop", "deep work", "làm việc", "coding", "tập trung", "bàn gỗ"]

    elif "note" in fn_lower or "viết" in fn_lower or "writing" in fn_lower:
        cat_id = "pov" if "pov" in fn_lower else "cutaway"
        title_vi = "Viết Sổ Ghi Chép Ý Tưởng - Lập Kế Hoạch Chiến Lược"
        shot_type = "POV / Close-up Cận Cảnh"
        location = "Bàn làm việc gỗ sồi"
        action = "Cầm bút viết ghi chú, phác thảo tư duy lên sổ tay"
        mood = "Tư duy / Sáng tạo"
        director_note = "Góc cận ngòi bút lướt trên trang giấy kích thích cảm giác sáng tạo thủ công, tăng tính chân thật và chiều sâu."
        cues = [
            "Trước khi mở máy tính làm việc, tôi luôn viết cấu trúc kịch bản ra sổ...",
            "Viết tay giúp não bộ sàng lọc những suy nghĩ rác và cô đọng ý tưởng sắc bén nhất.",
            "Một bản kế hoạch rõ ràng trên giấy sẽ tiết kiệm 80% thời gian thực thi."
        ]
        keywords = ["viết sổ", "ghi chép", "kế hoạch", "ý tưởng", "sổ tay", "chiến lược", "sáng tạo"]

    elif "eye" in fn_lower or "mắt" in fn_lower:
        cat_id = "cutaway"
        title_vi = "Đặc Tả Ánh Mắt Mở Ra - Đột Phá Nhận Thức"
        shot_type = "Extreme Close-up (ECU)"
        location = "Home Studio Dark Room"
        action = "Đôi mắt mở to, tập trung ánh nhìn vào màn hình"
        mood = "Thức tỉnh / Tập trung cao độ"
        director_note = "Extreme Close-up ánh mắt tạo cú hích cảm xúc mạnh mẽ, dùng ngay tại khoảnh khắc 'Aha Moment' hoặc mở đầu video."
        cues = [
            "Khoảnh khắc bạn nhận ra toàn bộ cách làm trước đây của mình đã hoàn toàn lỗi thời...",
            "Chỉ cần mở rộng góc nhìn, bạn sẽ thấy cơ hội ở khắp mọi nơi.",
            "Hãy nhìn thẳng vào sự thật mà bấy lâu nay bạn đang cố tình né tránh."
        ]
        keywords = ["ánh mắt", "mở mắt", "nhận thức", "thức tỉnh", "tập trung", "đột phá", "aha moment"]

    elif "chuyển cây" in fn_lower or "xếp cây" in fn_lower:
        cat_id = "in_situ" if "nói" in fn_lower else "sequence"
        title_vi = "Chăm Sóc Cây Xanh - Nuôi Dưỡng Sự Điềm Tĩnh"
        shot_type = "Medium Close-up (MCU)"
        location = "Studio cây xanh / Lương Yên"
        action = "Chuyển chậu cây, tỉa cành và sắp xếp không gian xanh"
        mood = "Thiên nhiên / Điềm tĩnh / Zen"
        director_note = "Minh họa cho sự chăm sóc lâu dài, gieo trồng nhân quả hoặc nuôi dưỡng một dự án từ lúc còn non trẻ."
        cues = [
            "Xây dựng một sự nghiệp hay nhân hiệu cũng giống như trồng một cái cây non...",
            "Bạn không thể ép cái cây lớn nhanh trong một đêm bằng cách kéo ngọn nó lên.",
            "Kiên nhẫn tưới tắm mỗi ngày bằng sự kỷ luật không ồn ào."
        ]
        keywords = ["xếp cây", "trồng cây", "chăm sóc", "kiên nhẫn", "thiên nhiên", "zen", "phát triển"]

    elif "chuyển cảnh" in fn_lower or "match cut" in fn_lower or "phím b" in fn_lower or "pan cam" in fn_lower or "bấm b" in fn_lower:
        cat_id = "cutaway" if "phím b" in fn_lower or "bấm b" in fn_lower else "intercut"
        title_vi = "Kỹ Thuật Chuyển Cảnh Thực Chiến - Cut Match Cut & Motion"
        shot_type = "Movement Cut / Close-up"
        location = "Studio & Ngoại cảnh Lương Yên"
        action = "Bấm phím B, quẹt tay chuyển cảnh, đổi góc quay động"
        mood = "Nhanh / Kịch tính / Điện ảnh"
        director_note = "Chuyển động liên tục (Motion Continuity) dùng để kết nối giữa 2 phân cảnh kịch bản khác nhau không bị giật cục."
        cues = [
            "Bí quyết để video giữ chân người xem nằm ở các điểm nối chuyển cảnh vô hình...",
            "Chỉ cần một phím tắt duy nhất, toàn bộ nhịp điệu video sẽ thay đổi hoàn toàn.",
            "Chuyển cảnh mượt mà giúp khán giả bị cuốn từ giây đầu tiên đến giây cuối cùng."
        ]
        keywords = ["chuyển cảnh", "phím b", "match cut", "kỹ thuật dựng", "premiere", "capcut", "thực chiến"]

    elif "nấu mỳ" in fn_lower or "ăn mỳ" in fn_lower:
        cat_id = "sequence"
        title_vi = "Nấu Mỳ & Thưởng Thức - Cuộc Sống Tự Do Của Creator"
        shot_type = "Sequence / Medium Shot"
        location = "Bếp Home Studio"
        action = "Đun nước sôi, nấu bát mỳ thơm nóng và thưởng thức"
        mood = "Gần gũi / Đời thường / Chân thật"
        director_note = "Tạo sự đồng cảm sâu sắc với cuộc sống của người làm sáng tạo độc lập (Solo Creator / Solopreneur)."
        cues = [
            "Sau những giờ làm việc căng thẳng, một bữa ăn đơn giản là quá đủ để nạp lại tinh thần...",
            "Cuộc sống của một solopreneur không hào nhoáng như mạng xã hội, nó chân thực và tự do.",
            "Tự nấu cho mình một bữa ăn và tận hưởng sự bình yên tuyệt đối."
        ]
        keywords = ["nấu mỳ", "ăn mỳ", "cuộc sống", "đời thường", "solo creator", "chân thật", "tự do"]

    elif "đèn" in fn_lower or "lighting" in fn_lower or "spotlight" in fn_lower:
        cat_id = "cutaway" if "spotlight" in fn_lower else "sequence"
        title_vi = "Setup Ánh Sáng Studio - 2 Đèn & Spotlight Chuyên Nghiệp"
        shot_type = "Medium Close-up (MCU)"
        location = "Home Studio"
        action = "Bật đèn keylight, chỉnh nhiệt độ màu và hướng sáng spotlight"
        mood = "Điện ảnh / Chuyên nghiệp"
        director_note = "Dùng khi nói về chuẩn bị thiết bị, nâng cấp chất lượng hình ảnh hoặc kỹ thuật setup phòng quay."
        cues = [
            "Ánh sáng chính là yếu tố phân định giữa một video nghiệp dư và một thước phim điện ảnh...",
            "Chỉ cần bố trí đúng 2 nguồn sáng chính, chủ thể sẽ nổi bật hoàn toàn khỏi phông nền.",
            "Setup góc quay chuẩn giúp bạn tự tin xuất hiện trước ống kính."
        ]
        keywords = ["setup đèn", "ánh sáng", "lighting", "spotlight", "studio", "chuyên nghiệp", "điện ảnh"]

    elif "đi tập" in fn_lower or "gym" in fn_lower or "lai xe" in fn_lower:
        cat_id = "pov"
        title_vi = "POV Lái Xe & Đi Tập Rèn Luyện Thân Tâm"
        shot_type = "Point Of View (POV)"
        location = "Phòng Gym & Đường phố"
        action = "Cầm vô lăng lái xe và bước chân vào phòng tập thể lực"
        mood = "Mạnh mẽ / Kỷ luật / Năng động"
        director_note = "Kích hoạt tinh thần rèn luyện thể chất, kỷ luật cá nhân và lối sống năng động của người làm chủ cuộc sống."
        cues = [
            "Kỷ luật không đến từ động lực nhất thời, nó được rèn giũa qua từng buổi tập luyện...",
            "Khi bạn kiểm soát được thân thể của mình, bạn mới kiểm soát được tâm trí và sự nghiệp.",
            "Trên đường đi đến mục tiêu, sự bền bỉ là vũ khí tối thượng duy nhất."
        ]
        keywords = ["tập gym", "lái xe", "pov", "kỷ luật", "rèn luyện", "thể thao", "năng động"]

    elif "timeline" in fn_lower or "capcut" in fn_lower or "edit" in fn_lower or "máy ảnh" in fn_lower:
        cat_id = "archival"
        title_vi = "Màn Hình Dựng Phim & Thao Tác Máy Ảnh Chuyên Sâu"
        shot_type = "Extreme Close-up (ECU) / Screen Recording"
        location = "Phòng dựng phim Home Studio"
        action = "Kéo cắt clip trên Timeline, tinh chỉnh keyframe và chuyển cảnh"
        mood = "Kỹ thuật / Tập trung cao / Pro Editor"
        director_note = "Tư liệu thực chứng hoàn hảo cho các video dạy dựng phim, hướng dẫn workflow hoặc tối ưu hóa thời gian sản xuất."
        cues = [
            "Nhìn vào dòng Timeline này, bạn sẽ thấy cách tôi sắp xếp từng lớp âm thanh và hình ảnh...",
            "Một quy trình dựng phim thông minh sẽ cắt giảm 70% thời gian ngồi trước máy tính.",
            "Từng vết cắt đều có chủ đích tâm lý học để dẫn dắt cảm xúc người xem."
        ]
        keywords = ["timeline", "dựng phim", "capcut", "premiere", "máy ảnh", "kỹ thuật", "editor"]

    elif "chần chừ" in fn_lower or "bế tắc" in fn_lower or "nhồi nhét" in fn_lower:
        cat_id = "metaphor"
        title_vi = "Ẩn Dụ Về Sự Chần Chừ & Nhồi Nhét Quá Tải"
        shot_type = "Medium Close-up (MCU)"
        location = "Home Studio"
        action = "Tay đặt lên phím rồi dừng lại, nhồi nhét tài liệu"
        mood = "Trăn trở / Do dự / Bế tắc"
        director_note = "Khơi gợi nỗi sợ trì hoãn (Procrastination) của khán giả, tạo điểm chạm cảm xúc để dẫn vào giải pháp hành động."
        cues = [
            "Kẻ thù lớn nhất cản bước bạn không phải là đối thủ, mà chính là sự chần chừ trong đầu bạn...",
            "Bạn đã dành bao nhiêu tháng trời để lên kế hoạch hoàn hảo mà chưa từng dám bấm nút bắt đầu?",
            "Nỗi sợ thất bại đang biến những ý tưởng tuyệt vời nhất của bạn thành con số không."
        ]
        keywords = ["chần chừ", "do dự", "bế tắc", "trì hoãn", "nỗi sợ", "nhồi nhét", "áp lực"]

    elif "phi máy bay" in fn_lower:
        cat_id = "metaphor"
        title_vi = "Phóng Máy Bay Giấy - Khởi Phát Ý Tưởng & Ước Mơ"
        shot_type = "Medium Shot (MS)"
        location = "Home Studio"
        action = "Gấp và phóng chiếc máy bay giấy bay lượn"
        mood = "Bay bổng / Sáng tạo / Tự do"
        director_note = "Hình ảnh biểu tượng tuyệt vời cho việc phát hành sản phẩm (Launch), giải phóng ý tưởng ra thế giới."
        cues = [
            "Đừng giữ mãi ý tưởng trong ngăn kéo, hãy phóng nó ra thế giới...",
            "Mọi dự án vĩ đại đều bắt đầu từ một cánh máy bay giấy đơn sơ.",
            "Hành động nhỏ hôm nay là khởi đầu cho chuyến bay xa ngày mai."
        ]
        keywords = ["máy bay", "ý tưởng", "khởi nghiệp", "launch", "sáng tạo", "tự do"]

    elif "negative space" in fn_lower or "thời gian trôi" in fn_lower:
        cat_id = "negative_space"
        title_vi = "Negative Space - Không Gian Tĩnh Lặng & Thời Gian Trôi"
        shot_type = "Wide / Medium Shot"
        location = "Góc Studio Tĩnh Lặng"
        action = "Khung cảnh tĩnh lặng với ánh sáng nhẹ trôi qua"
        mood = "Tĩnh lặng / Thiền định / Nghỉ ngơi thị giác"
        director_note = "Khoảng trống tĩnh lặng tuyệt đối, tạo điểm dừng cho mắt nghỉ ngơi giữa các đoạn thoại dồn dập."
        cues = [
            "Dành một khoảng lặng để suy ngẫm về những gì bạn vừa nghe...",
            "Trong một thế giới đầy tiếng ồn, sự tĩnh lặng chính là sức mạnh xa xỉ nhất.",
            "Hãy cho phép bản thân được thở và tái tạo năng lượng."
        ]
        keywords = ["negative space", "tĩnh lặng", "thời gian trôi", "nghỉ ngơi", "không gian", "thiền"]

    # Check YouTube upload status
    yt_data = yt_catalog.get(f, {})
    vid_id = yt_data.get('video_id', '')
    yt_url = yt_data.get('youtube_url', f'https://www.youtube.com/watch?v={vid_id}' if vid_id else '')
    
    item_record = {
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
    }
    items.append(item_record)

db_output = {
    "version": "1.0.0",
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
