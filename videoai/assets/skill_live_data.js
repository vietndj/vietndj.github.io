/**
 * skill_live_data.js - DỮ LIỆU SỐNG TỰ ĐỘNG ĐỒNG BỘ CHO VIDEOAI.FEDU.VN
 * Sinh tự động bởi sync_videoai.py vào lúc: 22/10/2026 14:51:35
 * Chuẩn màu sắc sáng giấy ấm (#FDFCF9), tích hợp với hub.js và style.css của kenh.fedu.vn
 */

window.SKILL_LIVE_DATA = {
  "last_synced_formatted": "22/10/2026 14:51:35",
  "last_synced_iso": "2026-10-22T14:51:35.051898",
  "summary": {
    "styles_count": 35,
    "motions_count": 16,
    "sfx_presets_count": 16,
    "profiles_count": 5,
    "presets_count": 8,
    "compositions_count": 16,
    "components_count": 22,
    "scripts_count": 26,
    "skills_count": 5,
    "studios_count": 6,
    "evolution_entries_count": 1
  },
  "evolution": {
    "version": 1,
    "_huong_dan": [
      "SỔ ĐĂNG KÝ QUY CHUẨN SỐNG — nguồn dữ liệu duy nhất để sync_videoai.py tự bơm nội dung mới lên videoai.fedu.vn.",
      "Thêm quy chuẩn mới = thêm 1 object vào đầu mảng 'entries' rồi chạy: videoai-sync (hoặc python3 /Users/vietmac/Documents/CODE/videoai.fedu.vn/sync_videoai.py --deploy).",
      "step_target: dinh-dang | buoc-1 | buoc-2 | buoc-3 | buoc-4 | buoc-5 (trùng id trong public/assets/manifest.js). Có thể là chuỗi hoặc mảng.",
      "preview_images[].src: đường dẫn tuyệt đối trên máy — script tự copy sang public/assets/<asset_dir>/.",
      "studio_file: tên file Studio trong '/Users/vietmac/Documents/CODE/AI VIDEO EDIT/' — script tự copy sang public/studios/ (slug lấy từ mảng 'studios', không có thì tự sinh).",
      "Mảng 'studios' chỉ để làm đẹp thẻ Studio (tiêu đề, mô tả, nút chế độ). File *studio*.html / *preview*.html mới KHÔNG cần khai báo vẫn tự hiện ở trang 07."
    ],
    "studios": [
      {
        "source": "studio_35_kieu_chu_va_phu_de.html",
        "slug": "studio-35-kieu-chu.html",
        "order": 1,
        "icon": "🔤",
        "title": "Studio 35 Kiểu Chữ & Phụ Đề 5A/5B/5C",
        "badge": "35 Styles • FDAeonik & SVN-Acta",
        "badge_class": "editorial",
        "desc": "Thử nghiệm 35 mẫu typography thương hiệu cho 5 nhóm ngành (Học viên, Chuyên gia, Đời sống, Case study, White text). Tích hợp bộ chọn phụ đề khóa chiều cao chữ (x-height lock FDAeonik 46px & SVN-Acta 45px) trên video thật."
      },
      {
        "source": "cta_3_motion_studio.html",
        "slug": "studio-3-cta.html",
        "order": 2,
        "icon": "⚡",
        "title": "Studio 3 Kiểu Hoạt Ảnh CTA 60fps",
        "badge": "60fps GSAP • CTA 01 • 02 • 03",
        "badge_class": "motion",
        "desc": "3 kiểu CTA trong clip (CTA-01 Chữ trượt & Khung thẻ, CTA-02 Badge bento nổi, CTA-03 Con dấu ký tên) chuyển động GSAP 60fps, xem thử trên video thật Lip Detox (32.75s – 41.43s) với slider chỉnh biến thời gian thực."
      },
      {
        "source": "subtitle_5_styles_preview.html",
        "slug": "studio-5-phu-de.html",
        "order": 3,
        "icon": "📐",
        "title": "Bảng Chọn 5 Phong Cách Phụ Đề FDAeonik",
        "badge": "Phương án 5A • 5B • 5C",
        "badge_class": "sci",
        "desc": "So sánh trực quan 5 phương án căn chỉnh phụ đề tiếng Việt: Cân bằng, Thẻ chữ nhật, Chữ phát sáng, Gradient và Khóa x-height 1:1."
      },
      {
        "source": null,
        "slug": "studio-mfx.html",
        "order": 4,
        "icon": "🎬",
        "title": "Studio 16 Kiểu Motion & Alpha Pack",
        "badge": "16 Archetypes • Alpha Transparency",
        "badge_class": "case",
        "desc": "Thư viện 16 Archetypes motion graphic cho CapCut & Remotion, kèm gói video Alpha trong suốt xuất sẵn và 17 âm thanh SFX đồng bộ tự động."
      },
      {
        "source": "brand_logo_3_motion_studio.html",
        "slug": "studio-brand-logo-outro.html",
        "order": 5,
        "icon": "🏷️",
        "title": "Studio Motion Logo Thương Hiệu & Outro Nền Đen 2 Tầng",
        "badge": "OUTRO 01–03 • BRAND 01–03",
        "badge_class": "life",
        "desc": "Tầng cuối clip: 3 kiểu Logo To trên nền đen #050507 (+2.8s–3.5s) — Gold Halo Monolith, Royal Laser Frame, 3D Bento Identity Stack — với 2 chế độ Thuần Thương Hiệu / Kèm CTA Ưu Đãi. Tầng trong clip: 3 kiểu Logo Nhỏ trên đỉnh (Headroom Y=58..166px, cách xa mắt Y=650px).",
        "modes": [
          {
            "label": "🏛️ Chế độ Thuần Thương Hiệu",
            "query": ""
          },
          {
            "label": "🔥 Chế độ Kèm CTA Ưu Đãi",
            "query": "mode=cta"
          }
        ]
      },
      {
        "source": null,
        "slug": "studio-motion00.html",
        "order": 6,
        "icon": "🏛️",
        "title": "Kho 5 Khuôn Motion 60fps Khuôn Gốc .TSX",
        "badge": "5 Khuôn Gốc • Remotion React",
        "badge_class": "life",
        "desc": "Tổng hợp 11 video reference quốc tế, 12 thành phẩm 60fps thực tế và 5 khuôn thiết kế gốc .TSX Remotion (Pinterest Gold, Claude Motion Risograph, Clean V3, MasterClass Power, Semantic Era) tái sử dụng trong 3 giây."
      }
    ],
    "entries": [
      {
        "id": "brand-outro-2tang",
        "date": "2026-10-22",
        "title": "Hệ Thống Logo Thương Hiệu 2 Tầng & Outro Nền Đen Cuối Clip (BRAND 01–03 • OUTRO 01–03)",
        "step_target": "buoc-4",
        "source_thread": "24a7e7f9-83aa-4775-abe7-88287b50b1b9",
        "what": "Nhận diện thương hiệu chia 2 tầng: <strong>Logo Nhỏ trên đỉnh khi đang phát clip</strong> (BRAND 01•02•03 tại Headroom Y=58..166px) và <strong>Logo To trên nền đen sau câu nói cuối</strong> (OUTRO 01•02•03, +2.8s–3.5s trên nền #050507). Outro có 2 chế độ: Mode 1 Thuần Thương Hiệu và Mode 2 Kèm Thẻ Vé Ưu Đãi + Nút Hành Động.",
        "why": "Logo đặt lung tung sẽ đè lên mặt/mắt người nói và cạnh tranh với phụ đề. Tách 2 tầng giúp clip vẫn sạch (logo nhỏ nằm trên đỉnh tóc, cách xa đường khóa mắt Y=650px), còn khoảnh khắc chốt thương hiệu/ưu đãi được dồn hết vào màn hình đen cuối — người xem không bị phân tâm khi đang nghe.",
        "how_cmd": "Gắn logo thương hiệu BRAND-01 nhỏ trên đỉnh suốt clip, kết thúc bằng OUTRO-01 Gold Halo trên nền đen 3s, chế độ kèm CTA ưu đãi 499 nghìn",
        "items": [
          {
            "tier": "Tầng cuối clip — Logo To trên nền đen #050507 (+2.8s–3.5s)",
            "code": "OUTRO-01",
            "name": "Gold Halo Monolith (khuyên dùng)",
            "desc": "Quầng sáng vàng đồng nở nhẹ, vòng tròn Logo lớn 72px có 2 quỹ đạo xoay ngược chiều + huy hiệu ✓ OFFICIAL, Tên thương hiệu lớn + thẻ kính thông tin 3 dòng (Chuyên khoa • Hotline • @Handle). Đồng bộ với BRAND-01 & Phụ đề 5B."
          },
          {
            "tier": "Tầng cuối clip — Logo To trên nền đen #050507 (+2.8s–3.5s)",
            "code": "OUTRO-02",
            "name": "Royal Laser Frame",
            "desc": "Khung tia laser vàng đồng khóa 4 góc, ấn chương vuông lớn đóng dấu xuống tâm + 2 cánh tia đối xứng, bảng hồ sơ trên nền giấy kem #F5F2EB tương phản mạnh với nền đen. Đồng bộ với BRAND-02 & Thẻ Vé CTA 01."
          },
          {
            "tier": "Tầng cuối clip — Logo To trên nền đen #050507 (+2.8s–3.5s)",
            "code": "OUTRO-03",
            "name": "3D Bento Identity Stack",
            "desc": "3 khối Bento 3D lật mở liên hoàn theo trục rotateX: Khối Hero (Logo + Tên + Định vị) → Lưới 2 cột (Dịch vụ mũi nhọn • Hotline) → Thanh kênh @handle + nút + THEO DÕI KÊNH (hoặc khối CTA)."
          },
          {
            "tier": "Tầng trong clip — Logo Nhỏ trên đỉnh (Headroom Y=58..166px)",
            "code": "BRAND-01",
            "name": "Viên thuốc kính tối + ấn xác thực ✓",
            "desc": "Viên thuốc kính tối kẻ chỉ, ấn xác thực ✓ và vệt sáng shimmer chạy ngang."
          },
          {
            "tier": "Tầng trong clip — Logo Nhỏ trên đỉnh (Headroom Y=58..166px)",
            "code": "BRAND-02",
            "name": "Ấn chương giấy kem + tia laser vàng",
            "desc": "Ấn chương tạp chí nền giấy kem #F5F2EB, đường kẻ laser vàng chạy mở."
          },
          {
            "tier": "Tầng trong clip — Logo Nhỏ trên đỉnh (Headroom Y=58..166px)",
            "code": "BRAND-03",
            "name": "Trụ guồng quay 3D lật 3 mặt",
            "desc": "Tự lật mỗi 2.2s: Tên Brand → Chuyên môn → @Handle."
          }
        ],
        "asset_dir": "brand_outro",
        "preview_images": [
          {
            "src": "/Users/vietmac/.gemini/antigravity/brain/24a7e7f9-83aa-4775-abe7-88287b50b1b9/brand_outro_mode1_pure.jpg",
            "caption": "Mode 1 — Chỉ Logo To + Thông tin thương hiệu trên nền đen (không CTA)",
            "web_src": "assets/brand_outro/brand_outro_mode1_pure.jpg"
          },
          {
            "src": "/Users/vietmac/.gemini/antigravity/brain/24a7e7f9-83aa-4775-abe7-88287b50b1b9/brand_outro_mode2_cta.jpg",
            "caption": "Mode 2 — Logo To + Thông tin + Thẻ Vé Ưu Đãi & Nút Hành Động trên nền đen",
            "web_src": "assets/brand_outro/brand_outro_mode2_cta.jpg"
          },
          {
            "src": "/Users/vietmac/.gemini/antigravity/brain/24a7e7f9-83aa-4775-abe7-88287b50b1b9/brand_logo_3_archetypes_preview.jpg",
            "caption": "3 kiểu Logo Nhỏ BRAND 01 • 02 • 03 trên khung khóa mắt Y=650px",
            "web_src": "assets/brand_outro/brand_logo_3_archetypes_preview.jpg"
          }
        ],
        "studio_file": "brand_logo_3_motion_studio.html",
        "studio_modes": [
          {
            "label": "🏷️ Mở Studio Logo & Outro 2 Tầng",
            "query": ""
          },
          {
            "label": "🔥 Mở thẳng chế độ Kèm CTA",
            "query": "mode=cta"
          }
        ],
        "tech_specs": [
          "Outro nền đen <code>#050507</code>, thời lượng <code>+2.8s – 3.5s</code> ngay sau câu nói cuối; nút Studio <em>Chạy thử hết video ➔ vào nền đen</em> phát 1.8s cuối clip rồi chuyển cảnh.",
          "Logo Nhỏ đặt trong <code>Headroom Y=58..166px</code> (khung 1080×1920), luôn cách đường khóa mắt <code>Y=650px</code> — không bao giờ đè mặt hay phụ đề.",
          "Cặp đồng bộ khuyên dùng: <code>BRAND-01 ↔ OUTRO-01 ↔ Phụ đề 5B</code>, <code>BRAND-02 ↔ OUTRO-02 ↔ Thẻ Vé CTA 01</code>, <code>BRAND-03 ↔ OUTRO-03</code>.",
          "Mode 2 (Kèm CTA): dưới khối thông tin bung Thẻ Vé Ưu Đãi (vd <code>499 NGHÌN</code>) + Nút Hành Động (vd <code>💬 INBOX TƯ VẤN NGAY ↓</code>).",
          "Dữ liệu máy đọc: <code>auto-edit-video/resources/motion_catalog.json → brand_identity_2tier</code>. Studio gốc: <code>AI VIDEO EDIT/brand_logo_3_motion_studio.html</code> (hỗ trợ <code>?mode=cta</code>)."
        ]
      }
    ]
  },
  "skills": {
    "auto-edit-video": {
      "id": "auto-edit-video",
      "name": "Auto Edit Video V3 (Talking-Head Studio)",
      "badge": "V3.4 CORE",
      "desc": "Tự động cắt dựng video Talking-Head V3, OpenCV Mockup, B-Roll Hot-Swap, Logo & Outro 2 tầng & Remotion 60fps.",
      "path": "/Users/vietmac/.gemini/config/skills/auto-edit-video/SKILL.md",
      "size": 23576,
      "size_formatted": "23.0 KB",
      "lines_count": 177,
      "mtime": 1792649310.801881,
      "mtime_formatted": "22/10/2026 13:08",
      "headers": [
        "1. NGUYÊN TẮC CỐT LÕI & CHẾ ĐỘ MẶC ĐỊNH V3 KHÔNG HỎI NHIỀU (ZERO-FRICTION MFX V3.2 DEFAULT)",
        "2. AUTO-EDIT V3: PRO TALKING-HEAD STUDIO (QUY TRÌNH 2-CHẠM)",
        "3. THƯ VIỆN 16 KIỂU MOTION GRAPHIC CHỦ LỰC & KHO 8.902 SFX BRAIN (`v3_motion_library.py`)",
        "4. PHONG CÁCH MỞ RỘNG (V1/V2)",
        "5. BỘ CÔNG CỤ & TÀI NGUYÊN",
        "6. GỌI NHANH QUA MCP `viet-tools` & CẦU NỐI HYBRID",
        "7. CƠ CHẾ TỰ ĐỘNG ĐỒNG BỘ 0 MA SÁT LÊN `videoai.fedu.vn` (`ZERO-FRICTION AUTO-EVOLVE`)"
      ],
      "status": "ACTIVE"
    },
    "render-v3": {
      "id": "render-v3",
      "name": "Render V3 (Delta Patcher & EDL Engine)",
      "badge": "RENDER ENGINE",
      "desc": "Tự động tạo ảnh B-Roll 9:16 và kết xuất video .mp4 hoàn chỉnh từ khối EDL JSON không hỏi lại.",
      "path": "/Users/vietmac/.gemini/config/skills/render-v3/SKILL.md",
      "size": 6769,
      "size_formatted": "6.6 KB",
      "lines_count": 63,
      "mtime": 1792573717.9993098,
      "mtime_formatted": "21/10/2026 16:08",
      "headers": [
        "Quy Trình 3 Bước Tự Hành Bắt Buộc",
        "Báo Cáo Sau Khi Xuất Xong `.mp4`"
      ],
      "status": "ACTIVE"
    },
    "motion": {
      "id": "motion",
      "name": "Motion Studio 60fps (Universal Archetypes)",
      "badge": "60FPS MOTION",
      "desc": "Sản xuất Motion Graphic 60fps đa phiên bản từ 5 khuôn thiết kế gốc .TSX & 10 Archetypes.",
      "path": "/Users/vietmac/.gemini/config/skills/motion/SKILL.md",
      "size": 10737,
      "size_formatted": "10.5 KB",
      "lines_count": 127,
      "mtime": 1792649320.7499917,
      "mtime_formatted": "22/10/2026 13:08",
      "headers": [
        "🎯 1. BẢNG MANTRA & TÌNH HUỐNG KÍCH HOẠT",
        "🧠 2. BỐN TRỤ CỘT TƯ DUY ĐẦU RA TỐT NHẤT (ĐÚC KẾT TỪ MOTION 01 $\\rightarrow$ 05)",
        "🏛️ 3. NĂM KHUÔN THIẾT KẾ GỐC (`.TSX` CÓ BẢNG BIẾN `TWEAKS`) — TÁI SỬ DỤNG TRONG 3 GIÂY",
        "⚙️ 4. QUY TRÌNH THỰC THI 6 BƯỚC CHUẨN KHI NHẬN 1 VIDEO NÓI MỚI",
        "🔄 7. CƠ CHẾ TỰ ĐỘNG ĐỒNG BỘ 0 MA SÁT LÊN `videoai.fedu.vn` (`ZERO-FRICTION AUTO-EVOLVE`)"
      ],
      "status": "ACTIVE"
    },
    "fedu-media-pipeline": {
      "id": "fedu-media-pipeline",
      "name": "FEDU Media Pipeline (Tổng Thể)",
      "badge": "PIPELINE ORCHESTRATOR",
      "desc": "Dây chuyền tổng thể sản xuất video đa tầng FEDU từ kịch bản, ảnh nhân bản đến Remotion 60fps.",
      "path": "/Users/vietmac/.gemini/config/plugins/fedu-media-studio/skills/fedu-media-pipeline/SKILL.md",
      "size": 2863,
      "size_formatted": "2.8 KB",
      "lines_count": 47,
      "mtime": 1792459300.6442873,
      "mtime_formatted": "20/10/2026 08:21",
      "headers": [
        "1. Sơ đồ phối hợp liên hoàn",
        "2. Bảng giao việc",
        "3. Thứ tự bắt buộc",
        "4. Cầu nối Hybrid Edit & Motion",
        "5. Phối hợp CLAUDE2 viết code `.TSX`"
      ],
      "status": "ACTIVE"
    },
    "spa-edit": {
      "id": "spa-edit",
      "name": "Kỹ năng Edit Video cho Spa (Spa-Edit V7.2)",
      "badge": "SPA NICHE PACK",
      "desc": "Gói đóng gói chuyên biệt cho chủ đề Spa/Thẩm mỹ (Mantra: EDIT SPA, 3 tầng JSON, mỗi cảnh trám dùng 1 lần, tiết kiệm 95% token cho học viên).",
      "path": "/Users/vietmac/.gemini/config/skills/spa-edit/SKILL.md",
      "size": 3261,
      "size_formatted": "3.2 KB",
      "lines_count": 50,
      "mtime": 1792654734.9885042,
      "mtime_formatted": "22/10/2026 14:38",
      "headers": [
        "🚀 1. ĐẦU VÀO CẦN GÌ (`INPUTS`)?",
        "⚡ 2. BA LỆNH CHẠY TẤT ĐỊNH (`1-TURN CLI`)"
      ],
      "status": "ACTIVE"
    }
  },
  "styles": [
    {
      "id": 1,
      "set": "set1",
      "name": "01. Bật Ý Tưởng",
      "l1": "Bật Ý Tưởng",
      "l2": "Xây kênh đa nền tảng",
      "f1": "'GT-Sectra', serif",
      "f2": "'SVN-Aeonik', sans-serif",
      "c1": "#00FF66",
      "c2": "#FFFFFF",
      "s1": 54,
      "s2": 20,
      "ov": -6,
      "glow": "0, 255, 102",
      "f1Weight": "700",
      "f1Style": "italic",
      "profile": "lifestyle",
      "package_name": "Đời Sống & Vlog Hằng Ngày"
    },
    {
      "id": 2,
      "set": "set1",
      "name": "02. TRIỆU VIEW",
      "l1": "TRIỆU VIEW",
      "l2": "",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'SVN-Aeonik', sans-serif",
      "c1": "#FFFFFF",
      "c2": "",
      "s1": 58,
      "s2": 0,
      "ov": 0,
      "glow": "255, 236, 168",
      "f1Weight": "400",
      "profile": "hoc_vien_youtube",
      "package_name": "Học Viên & Khóa Học YouTube",
      "f2Weight": "500"
    },
    {
      "id": 3,
      "set": "set1",
      "name": "03. Bí Quyết Vàng",
      "l1": "Bí quyết vàng",
      "l2": "Giữ chân người xem",
      "f1": "'SVN-Aeonik', sans-serif",
      "f2": "'SVN-Flatline', serif",
      "c1": "#FF7A00",
      "c2": "#FFE600",
      "s1": 22,
      "s2": 44,
      "ov": -2,
      "glow": "255, 230, 0",
      "f1Weight": "700",
      "f2Weight": "700",
      "f2Style": "italic",
      "profile": "lifestyle",
      "package_name": "Đời Sống & Vlog Hằng Ngày"
    },
    {
      "id": 4,
      "set": "set1",
      "name": "04. ĐỊNH VỊ Thương Hiệu",
      "l1": "ĐỊNH VỊ",
      "l2": "Thương hiệu cá nhân",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'GT-Sectra', serif",
      "c1": "#FFFFFF",
      "c2": "#FF7A00",
      "s1": 50,
      "s2": 36,
      "ov": -18,
      "glow": "255, 255, 240",
      "f1Weight": "900",
      "f2Weight": "700",
      "f2Style": "italic",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 5,
      "set": "set1",
      "name": "05. Khách Hàng Tự Tìm Đến",
      "l1": "Khách hàng",
      "l2": "TỰ TÌM ĐẾN",
      "f1": "'SVN-FreightDisplay', serif",
      "f2": "'SVN-Integral', sans-serif",
      "c1": "#FFFFFF",
      "c2": "#FF2E2E",
      "s1": 34,
      "s2": 44,
      "ov": -10,
      "glow": "255, 46, 46",
      "f1Style": "italic",
      "f2Weight": "900",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 6,
      "set": "set1",
      "name": "06. Bứt Phá 3s Đầu",
      "l1": "Bứt Phá",
      "l2": "Ngay từ 3s đầu tiên",
      "f1": "'GT-Sectra', serif",
      "f2": "'SVN-Acta', serif",
      "c1": "#00E5FF",
      "c2": "#FFFFFF",
      "s1": 56,
      "s2": 22,
      "ov": -10,
      "glow": "0, 229, 255",
      "f1Weight": "700",
      "f1Style": "italic",
      "f2Style": "italic",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 7,
      "set": "set1",
      "name": "07. Làm Chủ Ống Kính",
      "l1": "Làm chủ",
      "l2": "Ống kính máy quay",
      "f1": "'SVN-FreightDisplay', serif",
      "f2": "'SVN-FreightDisplay', serif",
      "c1": "#FFFFFF",
      "c2": "#00E5FF",
      "s1": 44,
      "s2": 48,
      "ov": -16,
      "glow": "0, 229, 255",
      "f1Style": "italic",
      "f2Weight": "900",
      "f2Style": "italic",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 8,
      "set": "set1",
      "name": "08. Đừng Làm Mò (Gạch)",
      "l1": "Đừng làm mò",
      "l2": "",
      "f1": "'SVN-Aeonik', sans-serif",
      "f2": "",
      "c1": "#FF2E2E",
      "c2": "",
      "s1": 42,
      "s2": 0,
      "ov": 0,
      "glow": "255, 46, 46",
      "isStrike": true,
      "f1Weight": "700",
      "profile": "case_study",
      "package_name": "Case Study & Chuyển Đổi"
    },
    {
      "id": 9,
      "set": "set1",
      "name": "09. TÂM ĐIỂM (Vòng Tròn)",
      "l1": "TÂM ĐIỂM",
      "l2": "Thu hút mọi ánh nhìn",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'GT-Sectra', serif",
      "c1": "#FFFFFF",
      "c2": "#FFFFFF",
      "s1": 44,
      "s2": 24,
      "ov": 2,
      "glow": "255, 255, 255",
      "isCircle": true,
      "f1Weight": "900",
      "f2Style": "italic",
      "profile": "case_study",
      "package_name": "Case Study & Chuyển Đổi"
    },
    {
      "id": 10,
      "set": "set2",
      "name": "10. KỊCH BẢN ĐỈNH",
      "l1": "KỊCH BẢN ĐỈNH",
      "l2": "Không cần thuộc lòng",
      "f1": "'SVN-FreightDisplay', serif",
      "f2": "'GT-Sectra', serif",
      "c1": "#FFFFFF",
      "c2": "#FFFFFF",
      "s1": 44,
      "s2": 28,
      "ov": -6,
      "glow": "255, 255, 255",
      "f1Style": "italic",
      "f2Style": "italic",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 11,
      "set": "set2",
      "name": "11. ĐỘC BẢN",
      "l1": "ĐỘC BẢN",
      "l2": "",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "",
      "c1": "#FFF8E7",
      "c2": "",
      "s1": 54,
      "s2": 0,
      "ov": 0,
      "glow": "255, 240, 200",
      "f1Weight": "900",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 12,
      "set": "set2",
      "name": "12. Tự Tin Chia Sẻ",
      "l1": "Tự tin chia sẻ",
      "l2": "Chạm đến cảm xúc",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'SVN-Aeonik', sans-serif",
      "c1": "#FFFFFF",
      "c2": "#FFECA8",
      "s1": 48,
      "s2": 40,
      "ov": -16,
      "glow": "255, 236, 168",
      "profile": "hoc_vien_youtube",
      "package_name": "Học Viên & Khóa Học YouTube",
      "f1Weight": "400",
      "f2Weight": "500"
    },
    {
      "id": 13,
      "set": "set2",
      "name": "13. QUY TRÌNH 3 BƯỚC (3 Tầng)",
      "l1": "QUY TRÌNH",
      "l2": "TỪ CON SỐ 0",
      "mid": "CHUYỂN ĐỔI",
      "f1": "'GT-America', sans-serif",
      "f2": "'SVN-Aeonik', sans-serif",
      "fmid": "'SVN-Integral', sans-serif",
      "c1": "#00E5FF",
      "c2": "#00E5FF",
      "s1": 22,
      "s2": 18,
      "smid": 46,
      "ov": 2,
      "glow": "0, 229, 255",
      "f1Weight": "700",
      "fmidWeight": "900",
      "profile": "case_study",
      "package_name": "Case Study & Chuyển Đổi"
    },
    {
      "id": 14,
      "set": "set2",
      "name": "14. 100K FOLLOW (Hero Size)",
      "l1": "100K FOLLOW",
      "l2": "",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'SVN-Aeonik', sans-serif",
      "c1": "#FFECA8",
      "c2": "",
      "s1": 58,
      "s2": 0,
      "ov": 0,
      "glow": "255, 236, 168",
      "f1Weight": "400",
      "profile": "hoc_vien_youtube",
      "package_name": "Học Viên & Khóa Học YouTube",
      "f2Weight": "500"
    },
    {
      "id": 15,
      "set": "set2",
      "name": "15. Góc Nhìn CHUYÊN GIA",
      "l1": "Góc nhìn",
      "l2": "CHUYÊN GIA",
      "f1": "'GT-Sectra', serif",
      "f2": "'SVN-Integral', sans-serif",
      "c1": "#FFFFFF",
      "c2": "#FF1E1E",
      "s1": 44,
      "s2": 44,
      "ov": -14,
      "glow": "255, 30, 30",
      "f1Style": "italic",
      "f2Weight": "900",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 16,
      "set": "set2",
      "name": "16. NÚT: XEM HƯỚNG DẪN",
      "l1": "XEM HƯỚNG DẪN NGAY",
      "l2": "",
      "f1": "'GT-America', sans-serif",
      "f2": "",
      "c1": "#FFFFFF",
      "c2": "",
      "s1": 17,
      "s2": 0,
      "ov": 0,
      "glow": "0, 229, 255",
      "isPill": true,
      "f1Weight": "800",
      "profile": "case_study",
      "package_name": "Case Study & Chuyển Đổi"
    },
    {
      "id": 17,
      "set": "set2",
      "name": "17. THỰC CHIẾN Có Kết Quả",
      "l1": "THỰC CHIẾN",
      "l2": "Tạo ra kết quả",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'GT-Sectra', serif",
      "c1": "#FFC400",
      "c2": "#FFFFFF",
      "s1": 50,
      "s2": 42,
      "ov": -20,
      "glow": "255, 196, 0",
      "f1Weight": "900",
      "f2Style": "italic",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 18,
      "set": "set3",
      "name": "18. ĐÒN BẨY Thu Nhập",
      "l1": "ĐÒN BẨY",
      "l2": "Thu nhập thụ động",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'SVN-Flatline', serif",
      "c1": "#FFE600",
      "c2": "#FF3366",
      "s1": 52,
      "s2": 38,
      "ov": -18,
      "glow": "255, 230, 0",
      "f1Weight": "900",
      "f2Style": "italic",
      "profile": "case_study",
      "package_name": "Case Study & Chuyển Đổi"
    },
    {
      "id": 19,
      "set": "set3",
      "name": "19. 30 NGÀY Lột Xác",
      "l1": "30 NGÀY",
      "l2": "Lột xác toàn diện",
      "f1": "'SVN-FreightDisplay', serif",
      "f2": "'GT-America', sans-serif",
      "c1": "#FFECA8",
      "c2": "#FFFFFF",
      "s1": 48,
      "s2": 18,
      "ov": -2,
      "glow": "255, 236, 168",
      "f1Style": "italic",
      "f2Weight": "700",
      "profile": "lifestyle",
      "package_name": "Đời Sống & Vlog Hằng Ngày"
    },
    {
      "id": 20,
      "set": "set3",
      "name": "20. TỐI ƯU HÓA Thời Gian",
      "l1": "TỐI ƯU HÓA",
      "l2": "Thời gian & công sức",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'GT-Sectra', serif",
      "c1": "#FFE600",
      "c2": "#FFFFFF",
      "s1": 46,
      "s2": 36,
      "ov": -16,
      "glow": "255, 230, 0",
      "f1Weight": "900",
      "f2Style": "italic",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 21,
      "set": "set3",
      "name": "21. NĂNG LƯỢNG Tích Cực",
      "l1": "NĂNG LƯỢNG",
      "l2": "Lan tỏa giá trị tích cực",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'SVN-FreightDisplay', serif",
      "c1": "#00B4D8",
      "c2": "#FFFFFF",
      "s1": 46,
      "s2": 24,
      "ov": -6,
      "glow": "0, 180, 216",
      "f1Weight": "900",
      "f2Style": "italic",
      "profile": "lifestyle",
      "package_name": "Đời Sống & Vlog Hằng Ngày"
    },
    {
      "id": 22,
      "set": "set3",
      "name": "22. All in one Video Ngắn",
      "l1": "All in one",
      "l2": "Công thức video ngắn",
      "f1": "'GT-Sectra', serif",
      "f2": "'GT-America', sans-serif",
      "c1": "#00E5FF",
      "c2": "#FFFFFF",
      "s1": 48,
      "s2": 28,
      "ov": -10,
      "glow": "0, 229, 255",
      "f1Style": "italic",
      "f2Weight": "700",
      "profile": "case_study",
      "package_name": "Case Study & Chuyển Đổi"
    },
    {
      "id": 23,
      "set": "set3",
      "name": "23. VỊ THẾ Dẫn Đầu",
      "l1": "Nâng tầm",
      "l2": "VỊ THẾ DẪN ĐẦU NGÀNH",
      "f1": "'SVN-Flatline', serif",
      "f2": "'GT-America', sans-serif",
      "c1": "#FFECA8",
      "c2": "#FFECA8",
      "s1": 54,
      "s2": 16,
      "ov": -14,
      "glow": "255, 236, 168",
      "f1Style": "italic",
      "f2Weight": "800",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 24,
      "set": "set3",
      "name": "24. NỘI DUNG CHẤT",
      "l1": "NỘI DUNG CHẤT",
      "l2": "Tạo nên niềm tin",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'SVN-Aeonik', sans-serif",
      "c1": "#FFFFFF",
      "c2": "#FFDE59",
      "s1": 38,
      "s2": 34,
      "ov": -12,
      "glow": "255, 222, 89",
      "f1Weight": "400",
      "profile": "hoc_vien_youtube",
      "package_name": "Học Viên & Khóa Học YouTube",
      "f2Weight": "500"
    },
    {
      "id": 25,
      "set": "set3",
      "name": "25. 4 Trụ Cột Sự Nghiệp",
      "l1": "4 Trụ cột",
      "l2": "Xây dựng sự nghiệp số",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'SVN-FreightDisplay', serif",
      "c1": "#E2E8F0",
      "c2": "#FFFFFF",
      "s1": 52,
      "s2": 28,
      "ov": -8,
      "glow": "226, 232, 240",
      "f1Weight": "900",
      "f2Style": "italic",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 26,
      "set": "set3",
      "name": "26. Tự Do Tài Chính",
      "l1": "Tự Do Tài Chính",
      "l2": "Nhờ sáng tạo nội dung",
      "f1": "'GT-Sectra', serif",
      "f2": "'SVN-Aeonik', sans-serif",
      "c1": "#00E5FF",
      "c2": "#FFFFFF",
      "s1": 48,
      "s2": 18,
      "ov": -4,
      "glow": "0, 229, 255",
      "f1Style": "italic",
      "f2Weight": "700",
      "profile": "case_study",
      "package_name": "Case Study & Chuyển Đổi"
    },
    {
      "id": 27,
      "set": "set4",
      "name": "27. DÁM BẮT ĐẦU",
      "l1": "DÁM BẮT ĐẦU",
      "l2": "Đừng chờ đợi hoàn hảo",
      "f1": "'SVN-Aeonik', sans-serif",
      "f2": "'GT-America', sans-serif",
      "c1": "#FFE600",
      "c2": "#FFFFFF",
      "s1": 46,
      "s2": 20,
      "ov": 0,
      "glow": "255, 230, 0",
      "f1Weight": "900",
      "f2Weight": "500",
      "profile": "lifestyle",
      "package_name": "Đời Sống & Vlog Hằng Ngày"
    },
    {
      "id": 28,
      "set": "set4",
      "name": "28. DẤU ẤN Riêng Biệt",
      "l1": "DẤU ẤN",
      "l2": "Không thể bị sao chép",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'SVN-FreightDisplay', serif",
      "c1": "#FFD700",
      "c2": "#FFFFFF",
      "s1": 56,
      "s2": 32,
      "ov": -18,
      "glow": "255, 215, 0",
      "f1Weight": "900",
      "f2Style": "italic",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 29,
      "set": "set4",
      "name": "29. Truyền Cảm Hứng",
      "l1": "Truyền cảm hứng",
      "l2": "CHO HÀNG TRIỆU NGƯỜI",
      "f1": "'SVN-Flatline', serif",
      "f2": "'SVN-Integral', sans-serif",
      "c1": "#FF3366",
      "c2": "#FFE600",
      "s1": 42,
      "s2": 40,
      "ov": -16,
      "glow": "255, 230, 0",
      "f1Style": "italic",
      "f2Weight": "900",
      "profile": "lifestyle",
      "package_name": "Đời Sống & Vlog Hằng Ngày"
    },
    {
      "id": 30,
      "set": "set4",
      "name": "30. Tỏa Sáng ✦ (Ngôi Sao)",
      "l1": "Tỏa sáng +",
      "l2": "Là phiên bản tốt nhất",
      "f1": "'GT-Sectra', serif",
      "f2": "'SVN-FreightDisplay', serif",
      "c1": "#FFFFFF",
      "c2": "#FFFFFF",
      "s1": 48,
      "s2": 34,
      "ov": -10,
      "glow": "255, 255, 255",
      "isStar": true,
      "f1Style": "italic",
      "f2Style": "italic",
      "profile": "lifestyle",
      "package_name": "Đời Sống & Vlog Hằng Ngày"
    },
    {
      "id": 31,
      "set": "set4",
      "name": "31. HÀNH ĐỘNG NGAY (3D)",
      "l1": "HÀNH ĐỘNG NGAY",
      "l2": "",
      "f1": "'SVN-Integral', sans-serif",
      "f2": "'SVN-Aeonik', sans-serif",
      "c1": "#FFFFFF",
      "c2": "",
      "s1": 46,
      "s2": 0,
      "ov": 0,
      "glow": "255, 236, 168",
      "f1Weight": "400",
      "profile": "hoc_vien_youtube",
      "package_name": "Học Viên & Khóa Học YouTube",
      "f2Weight": "500"
    },
    {
      "id": 32,
      "set": "set4",
      "name": "32. TẬP TRUNG Bứt Phá",
      "l1": "TẬP TRUNG",
      "l2": "Tạo bước nhảy vọt",
      "f1": "'SVN-FreightDisplay', serif",
      "f2": "'GT-Sectra', serif",
      "c1": "#FFFFFF",
      "c2": "#FFECA8",
      "s1": 50,
      "s2": 42,
      "ov": -18,
      "glow": "255, 236, 168",
      "f1Weight": "900",
      "f2Style": "italic",
      "profile": "case_study",
      "package_name": "Case Study & Chuyển Đổi"
    },
    {
      "id": 33,
      "set": "set4",
      "name": "33. VƯỢT MỌI GIỚI HẠN",
      "l1": "BỨT PHÁ",
      "l2": "Vượt mọi giới hạn",
      "f1": "'SVN-FreightDisplay', serif",
      "f2": "'GT-Sectra', serif",
      "c1": "#00E5FF",
      "c2": "#00FF66",
      "s1": 46,
      "s2": 48,
      "ov": -14,
      "glow": "0, 229, 255",
      "f1Style": "italic",
      "f2Weight": "700",
      "profile": "editorial_pro",
      "package_name": "Editorial Chuyên Gia"
    },
    {
      "id": 34,
      "set": "set4",
      "name": "34. Bản Lĩnh Tương Lai",
      "l1": "Bản Lĩnh",
      "l2": "Làm chủ tương lai",
      "f1": "'SVN-Flatline', serif",
      "f2": "'GT-America', sans-serif",
      "c1": "#FFAA00",
      "c2": "#FFECA8",
      "s1": 52,
      "s2": 24,
      "ov": -4,
      "glow": "255, 170, 0",
      "f1Style": "italic",
      "f2Weight": "700",
      "profile": "case_study",
      "package_name": "Case Study & Chuyển Đổi"
    },
    {
      "id": 35,
      "set": "set4",
      "name": "35. BÀI HỌC ĐẮT GIÁ",
      "l1": "BÀI HỌC",
      "l2": "ĐẮT GIÁ NHẤT",
      "f1": "'GT-Sectra', serif",
      "f2": "'SVN-Integral', sans-serif",
      "c1": "#FF3333",
      "c2": "#FFECA8",
      "s1": 38,
      "s2": 44,
      "ov": -10,
      "glow": "255, 50, 50",
      "f1Weight": "700",
      "f1Style": "italic",
      "f2Weight": "900",
      "profile": "case_study",
      "package_name": "Case Study & Chuyển Đổi"
    }
  ],
  "motions": {
    "version": "3.2-pro-motion-alpha-sfx",
    "title": "Thư Viện 16 Kiểu Motion Graphic Chủ Lực V3 (CapCut ProRes 4444 Alpha + 8.902 SFX Brain)",
    "sfx_brain": {
      "db_path": "/Users/vietmac/.gemini/sfx_brain_cache/sfx_index.db",
      "script_path": "/Users/vietmac/.gemini/sfx_brain_cache/scripts/sfx.py",
      "total_indexed_files": 8902,
      "categories": [
        "01 Whoosh - Vút gió",
        "02 Impact - Va đập",
        "03 Riser & Drop - Dâng và Rơi",
        "04 Drone & Tension - Nền căng thẳng",
        "05 Môi trường - Ambience",
        "06 Foley - Tiếng động chi tiết",
        "07 Giọng & Sinh vật - Voice & Creature",
        "08 UI & Click - Giao diện",
        "09 Glitch & Sci-Fi - Điện tử",
        "10 Phương tiện - Vehicle",
        "11 Hành động & Fantasy - Action",
        "12 Giai điệu & Nhạc - Music",
        "13 Combo dựng sẵn - Moment"
      ]
    },
    "sfx_presets": {
      "whoosh_soft": {
        "file": "whoosh_soft.wav",
        "source_raw": "WHOOSH AIR Arrow Flyby 04 - vut khi 0.6s SS4658.wav",
        "drive_code": "SS4658",
        "category": "01 Whoosh - Vút gió",
        "duration": 0.49,
        "description": "Tiếng vút khí nhẹ sắc nét (Arrow Flyby SS4658) khi thẻ kính mờ hoặc tiêu đề trượt vào"
      },
      "whoosh_fast": {
        "file": "whoosh_fast.wav",
        "source_raw": "Whoosh Swoosh Movement Liquidy Pass Short Quick - vut ngan 2.1s FK1085.wav",
        "drive_code": "FK1085",
        "category": "01 Whoosh - Vút gió",
        "duration": 1.15,
        "description": "Tiếng vút Swoosh mượt hiện đại (FK1085) cho chuyển động cắt ngang hoặc lật thẻ"
      },
      "whoosh_deep": {
        "file": "whoosh_deep.wav",
        "source_raw": "WHOOSH DARK Whoosh Soft - vut toi nhe 2.2s SS4798.wav",
        "drive_code": "SS4798",
        "category": "01 Whoosh - Vút gió",
        "duration": 1.5,
        "description": "Tiếng Whoosh trầm điện ảnh (SS4798) cho chuyển cảnh B-Roll toàn màn hình"
      },
      "sub_bass_impact": {
        "file": "sub_bass_impact.wav",
        "source_raw": "IMPACT BASS Sub Kick Clean Transient 01 - va dap tram 1.1s SS4374.wav",
        "drive_code": "SS4374",
        "category": "02 Impact - Va đập",
        "duration": 0.95,
        "description": "Tiếng nổ trầm Sub-Bass Kick sạch uy lực (SS4374) mở màn Chapter hoặc chốt số liệu lớn"
      },
      "impact_deep": {
        "file": "impact_deep.wav",
        "source_raw": "IMPACT BASS Drop Short 01 - va dap tram roi 3.3s SS4365.wav",
        "drive_code": "SS4365",
        "category": "02 Impact - Va đập",
        "duration": 1.8,
        "description": "Tiếng Bass Drop chuyển chương trầm sâu (SS4365) cho công thức 3 tầng cốt lõi"
      },
      "impact_punch": {
        "file": "impact_punch.wav",
        "source_raw": "Distorted Impact Whoosh Deep Impacts - va dap vut sau 2.4s OC6833.wav",
        "drive_code": "OC6833",
        "category": "02 Impact - Va đập",
        "duration": 1.35,
        "description": "Tiếng va đập vút sâu đanh gọn (OC6833) khi gạch bỏ sai lầm hoặc so sánh đối lập"
      },
      "laser_strike": {
        "file": "laser_strike.wav",
        "source_raw": "Hard Hit Hard Impact High Whoosh Epic Hits Vol 1 - dap va dap vut 1.9s OC7015.wav",
        "drive_code": "OC7015",
        "category": "02 Impact - Va đập",
        "duration": 1.25,
        "description": "Tiếng Hard Impact High Whoosh (OC7015) quẹt ngang gạch bỏ tư duy sai lầm"
      },
      "riser_short": {
        "file": "riser_short.wav",
        "source_raw": "Riser Deep Airy Ring Out Short - dang sau nhe 2.0s FK1055.wav",
        "drive_code": "FK1055",
        "category": "03 Riser & Drop - Dâng và Rơi",
        "duration": 1.55,
        "description": "Tiếng Riser dâng nhẹ thoáng đãng (FK1055) lấy đà cho con số nhảy Counter"
      },
      "whoosh_riser": {
        "file": "whoosh_riser.wav",
        "source_raw": "Riser Projectile Front Whoosh - dang vut 2.2s FK1060.wav",
        "drive_code": "FK1060",
        "category": "03 Riser & Drop - Dâng và Rơi",
        "duration": 1.65,
        "description": "Tiếng Riser vút cao trào (FK1060) dẫn người xem vào chương mới hoặc lộ trình Bézier"
      },
      "glassy_ping": {
        "file": "glassy_ping.wav",
        "source_raw": "Ping 05 - Thong bao 1.0s SE5484.wav",
        "drive_code": "SE5484",
        "category": "08 UI & Click - Giao diện",
        "duration": 0.95,
        "description": "Tiếng chuông pha lê trong trẻo (SE5484) khi khoanh tròn từ khóa hoặc hoàn tất bước"
      },
      "ui_pop": {
        "file": "ui_pop.wav",
        "source_raw": "Ping 04 - Thong bao 1.0s SE5488.wav",
        "drive_code": "SE5488",
        "category": "08 UI & Click - Giao diện",
        "duration": 0.75,
        "description": "Tiếng Pop thông báo nảy nhẹ (SE5488) khi Badge Icon hoặc thẻ bước bật lên"
      },
      "ui_click": {
        "file": "ui_click.wav",
        "source_raw": "Clicks Kinetic Ramp Up - Click & Snap 2.2s FK1043.wav",
        "drive_code": "FK1043",
        "category": "08 UI & Click - Giao diện",
        "duration": 0.85,
        "description": "Tiếng Kinetic Click cơ học sắc nét (FK1043) khi liệt kê từng bước hoặc đóng khung"
      },
      "camera_shutter": {
        "file": "camera_shutter.wav",
        "source_raw": "01 - May anh 0.5s SE5219.wav",
        "drive_code": "SE5219",
        "category": "08 UI & Click - Giao diện",
        "duration": 0.51,
        "description": "Tiếng màn trập máy ảnh thật (SE5219) cho khung Polaroid, iPhone hoặc cảnh trám B-Roll"
      },
      "page_flip": {
        "file": "page_flip.wav",
        "source_raw": "19.2 Page Flip 2 - Do vat & Bep 4.4s EF0505.wav",
        "drive_code": "EF0505",
        "category": "06 Foley - Tiếng động chi tiết",
        "duration": 1.1,
        "description": "Tiếng lật trang giấy thật (EF0505) cho bút dạ quang vàng và phong cách Documentary"
      },
      "digital_glitch": {
        "file": "digital_glitch.wav",
        "source_raw": "DIGITAL ANALOG 2 - Digital & Analog 0.8s LB4922.wav",
        "drive_code": "LB4922",
        "category": "09 Glitch & Sci-Fi - Điện tử",
        "duration": 0.72,
        "description": "Tiếng xung điện tử Digital Analog (LB4922) cho hiệu ứng AI, Hologram và dữ liệu số"
      },
      "combo_transition": {
        "file": "combo_transition.wav",
        "source_raw": "TRANSITION 6 - Chuyen canh tron goi 1.0s LB4942.wav",
        "drive_code": "LB4942",
        "category": "13 Combo dựng sẵn - Moment",
        "duration": 0.72,
        "description": "Tiếng chuyển cảnh trọn gói (LB4942) đã mix sẵn Whoosh + Hit + Tail điện ảnh"
      }
    },
    "groups": [
      {
        "code": "#T",
        "name": "Nhóm A — #T Kinetic Text + Icon Overlay",
        "description": "Hiển thị khi người nói đang nói, tự động đặt ở vùng an toàn (Top-Zone hoặc Lower-Third dưới cằm y_chin) không che mặt.",
        "styles": [
          "MG-T01",
          "MG-T02",
          "MG-T03",
          "MG-T04",
          "MG-T05",
          "MG-T06"
        ]
      },
      {
        "code": "#B",
        "name": "Nhóm B — #B Black Cards, Chapter Transitions & Roadmaps",
        "description": "Màn hình ngắt đoạn, tóm tắt chương hoặc lộ trình chuyển cảnh (Split & Ripple bảo toàn 100% lời nói).",
        "styles": [
          "MG-B01",
          "MG-B02",
          "MG-B03",
          "MG-B04"
        ]
      },
      {
        "code": "#V",
        "name": "Nhóm C — #V Visual B-Roll Cards & Graphic Overlays",
        "description": "Cảnh trám đồ họa, thẻ nổi 3D PiP, so sánh Trước/Sau, biểu đồ động và khung ảnh minh họa đè lên hình khi giọng nói gốc vẫn chạy xuyên suốt.",
        "styles": [
          "MG-V01",
          "MG-V02",
          "MG-V03",
          "MG-V04",
          "MG-V05",
          "MG-V06"
        ]
      }
    ],
    "archetypes": [
      {
        "id": "MG-T01",
        "group": "#T",
        "name": "Glass Pill & Neon Badge",
        "vi_name": "Hộp Kính Mờ & Huy Hiệu Phát Sáng",
        "text_tiers": {
          "count": 2,
          "tier1": {
            "font": "FDAeonikExtended-Black.otf",
            "fallback": "SVN-IntegralCF-Bold.ttf",
            "color": "#FFFFFF",
            "role": "Đại tự khóa chính"
          },
          "tier2": {
            "font": "FDActaBoldItalic.ttf",
            "fallback": "SVN-AEONIK-BOLD.TTF",
            "color": "#FFECA8",
            "role": "Phụ đề bổ nghĩa cảm xúc"
          }
        },
        "icon_badge": {
          "position": "top-left-or-right-pill",
          "style": "Neon Glowing Pill + Vector Emblem",
          "default_badge": "⚡ AI STUDIO",
          "default_icon": "⚡"
        },
        "motion_formula": {
          "easing": "cubic-bezier(0.16, 1, 0.3, 1)",
          "spring": "stiffness=220, damping=18",
          "stagger_sec": 0.12,
          "description": "Hộp kính trượt nhẹ từ dưới lên (+28px -> 0px), Badge nảy Spring Pop ở frame thứ 4, dòng 2 fade-in lệch nhịp 0.12s."
        },
        "palette": {
          "glass_bg": "rgba(15, 23, 42, 0.84)",
          "border": "#FFECA8",
          "accent": "#38BDF8",
          "tier1": "#FFFFFF",
          "tier2": "#FFECA8"
        },
        "when_to_use": "Dùng cho các câu mở đầu (Hook), định nghĩa khái niệm cốt lõi hoặc nhấn mạnh luận điểm chính khi người nói đang xuất hiện trên hình.",
        "content_guide": "Dòng 1: 3-5 từ khóa mạnh viết hoa. Dòng 2: 5-8 từ giải thích lợi ích/cảm xúc.",
        "sample_content": {
          "badge": "⚡ AI STUDIO V3",
          "icon": "⚡",
          "line1": "TỰ ĐỘNG HÓA 100%",
          "line2": "Giữ trọn cảm xúc thật của người nói"
        },
        "default_sfx": [
          "whoosh_soft",
          "ui_pop"
        ],
        "sfx_cues": [
          {
            "sfx": "whoosh_soft",
            "offset": 0.0,
            "volume": 0.9
          },
          {
            "sfx": "ui_pop",
            "offset": 0.16,
            "volume": 0.85
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-T02",
        "group": "#T",
        "name": "Kinetic Strike & Alert",
        "vi_name": "Gạch Bỏ Sai Lầm & Cảnh Báo Đỏ",
        "text_tiers": {
          "count": 2,
          "tier1": {
            "font": "SVN-IntegralCF-Bold.ttf",
            "color": "#FCA5A5",
            "role": "Sai lầm bị thanh Laser đỏ gạch ngang"
          },
          "tier2": {
            "font": "SVN-AEONIK-BOLD.TTF",
            "color": "#34D399",
            "role": "Giải pháp đúng đắn màu xanh ngọc / vàng"
          }
        },
        "icon_badge": {
          "position": "left-alert-shield",
          "style": "Red Warning Triangle / Prohibition Sign",
          "default_badge": "⚠️ SAI LẦM PHỔ BIẾN",
          "default_icon": "⚠️"
        },
        "motion_formula": {
          "easing": "cubic-bezier(0.25, 1, 0.5, 1)",
          "spring": "shake_x=6px at t=0.25s",
          "stagger_sec": 0.22,
          "description": "Dòng 1 hiện ra -> Thanh Laser Đỏ (#FF2E2E) quẹt ngang từ trái sang phải trong 0.18s kèm rung nhẹ -> Dòng 2 giải pháp bật sáng bên dưới."
        },
        "palette": {
          "glass_bg": "rgba(24, 12, 20, 0.88)",
          "border": "#FF2E2E",
          "accent": "#FF2E2E",
          "tier1": "#FECACA",
          "tier2": "#4ADE80"
        },
        "when_to_use": "Dùng khi bóc tách lỗi sai, đập tan ngộ nhận của khán giả ('Đừng làm cách cũ nữa, hãy làm cách này').",
        "content_guide": "Dòng 1: Thói quen sai cần gạch bỏ. Dòng 2: Hướng đi mới hiệu quả gấp bội.",
        "sample_content": {
          "badge": "🚫 CẢNH BÁO TƯ DUY",
          "icon": "⚠️",
          "line1": "DỰNG THỦ CÔNG 4 TIẾNG",
          "line2": "✓ Chuyển sang quy trình AI 2-Chạm"
        },
        "default_sfx": [
          "whoosh_fast",
          "laser_strike",
          "impact_punch"
        ],
        "sfx_cues": [
          {
            "sfx": "whoosh_fast",
            "offset": 0.0,
            "volume": 0.85
          },
          {
            "sfx": "laser_strike",
            "offset": 0.25,
            "volume": 0.95
          },
          {
            "sfx": "impact_punch",
            "offset": 0.42,
            "volume": 0.9
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-T03",
        "group": "#T",
        "name": "Circle Focus & Star Sparkle",
        "vi_name": "Vòng Tròn Tâm Điểm & Sao Lấp Lánh",
        "text_tiers": {
          "count": 2,
          "tier1": {
            "font": "FDAeonikExtended-Black.otf",
            "color": "#FFFFFF",
            "role": "Từ khóa tâm điểm được vẽ vòng tròn Neon bao quanh"
          },
          "tier2": {
            "font": "FDActaMediumItalic.ttf",
            "color": "#FFECA8",
            "role": "Dòng giải nghĩa tinh tế"
          }
        },
        "icon_badge": {
          "position": "top-right-sparkle",
          "style": "Rotating 4-Point Star ✦ + Target Badge 🎯",
          "default_badge": "🎯 TÂM ĐIỂM CỐT LÕI",
          "default_icon": "🎯"
        },
        "motion_formula": {
          "easing": "easeOutQuart",
          "spring": "circle_draw_angle: 0 -> 360deg",
          "stagger_sec": 0.15,
          "description": "Chữ xuất hiện -> Nét vẽ vòng elip Neon vàng/cyan tự động khoanh tròn quanh từ khóa đinh (0->360 độ) + Ngôi sao ✦ xoay lấp lánh góc phải."
        },
        "palette": {
          "glass_bg": "rgba(15, 23, 42, 0.82)",
          "border": "#38BDF8",
          "accent": "#FFE600",
          "tier1": "#FFFFFF",
          "tier2": "#FFECA8"
        },
        "when_to_use": "Dùng khi muốn ghim đúng 1 từ khóa vàng (Golden Keyword) vào não người xem ngay lúc người nói nhấn giọng.",
        "content_guide": "Dòng 1: Cụm từ khóa 2-4 chữ cần khoanh tròn. Dòng 2: Ý nghĩa thực chiến của từ khóa đó.",
        "sample_content": {
          "badge": "🎯 TỪ KHÓA VÀNG",
          "icon": "🎯",
          "line1": "ĐIỂM CHẠM CẢM XÚC",
          "line2": "Giữ chân khán giả ở 3 giây đầu tiên"
        },
        "default_sfx": [
          "whoosh_soft",
          "glassy_ping"
        ],
        "sfx_cues": [
          {
            "sfx": "whoosh_soft",
            "offset": 0.0,
            "volume": 0.85
          },
          {
            "sfx": "glassy_ping",
            "offset": 0.28,
            "volume": 0.95
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-T04",
        "group": "#T",
        "name": "3-Tier Formula Stack",
        "vi_name": "Tháp Công Thức 3 Tầng Chồng Lớp",
        "text_tiers": {
          "count": 3,
          "tier1": {
            "font": "SVN-AEONIK-BOLD.TTF",
            "color": "#00E5FF",
            "role": "Tầng 1: Eyebrow nhỏ Cyan định danh công thức"
          },
          "tier2": {
            "font": "SVN-IntegralCF-Heavy.ttf",
            "color": "#FFFFFF",
            "role": "Tầng 2: Đại tự cực lớn Trắng ở tâm"
          },
          "tier3": {
            "font": "FDActaBoldItalic.ttf",
            "color": "#FFECA8",
            "role": "Tầng 3: Phụ đề nghiêng Vàng đúc kết"
          }
        },
        "icon_badge": {
          "position": "left-formula-orb",
          "style": "Cyan Lightning Orb ⚡",
          "default_badge": "⚡ CÔNG THỨC ĐỘC QUYỀN",
          "default_icon": "⚡"
        },
        "motion_formula": {
          "easing": "cubic-bezier(0.34, 1.56, 0.64, 1)",
          "spring": "scale 0.85 -> 1.0",
          "stagger_sec": 0.1,
          "description": "Ba tầng chữ bung ra theo chuỗi Stagger 0.10s từ trên xuống dưới kèm viền sáng Cyan chạy dọc hai bên."
        },
        "palette": {
          "glass_bg": "rgba(10, 18, 34, 0.88)",
          "border": "#00E5FF",
          "accent": "#00E5FF",
          "tier1": "#00E5FF",
          "tier2": "#FFFFFF",
          "tier3": "#FFECA8"
        },
        "when_to_use": "Dùng khi chia sẻ công thức 3 vế, quy tắc vàng hoặc đúc kết phương pháp luận của chuyên gia.",
        "content_guide": "Tầng 1: Tên quy tắc. Tầng 2: Công thức cốt lõi. Tầng 3: Kết quả đạt được.",
        "sample_content": {
          "badge": "⚡ QUY TẮC 3 GIÂY",
          "icon": "⚡",
          "line1": "HOOK • THẤU CẢM • GIẢI PHÁP",
          "line2": "Biến người xem lạ thành học viên trung thành"
        },
        "default_sfx": [
          "riser_short",
          "impact_deep",
          "ui_click"
        ],
        "sfx_cues": [
          {
            "sfx": "riser_short",
            "offset": 0.0,
            "volume": 0.8
          },
          {
            "sfx": "impact_deep",
            "offset": 0.22,
            "volume": 0.9
          },
          {
            "sfx": "ui_click",
            "offset": 0.38,
            "volume": 0.8
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-T05",
        "group": "#T",
        "name": "Neon Highlighter Callout",
        "vi_name": "Bút Dạ Quang Quẹt Nền Tương Phản Cao",
        "text_tiers": {
          "count": 2,
          "tier1": {
            "font": "FDAeonikExtended-Black.otf",
            "color": "#090D16",
            "role": "Chữ đen đậm nằm trên dải dạ quang Vàng #FFE600 / Cyan #00E5FF"
          },
          "tier2": {
            "font": "SVN-AEONIK-BOLD.TTF",
            "color": "#FFFFFF",
            "role": "Phụ đề trắng sắc nét trên nền kính tối bên dưới"
          }
        },
        "icon_badge": {
          "position": "left-spring-badge",
          "style": "Spring Pop Sticker Badge",
          "default_badge": "✨ HIGHLIGHT",
          "default_icon": "✨"
        },
        "motion_formula": {
          "easing": "cubic-bezier(0.22, 1, 0.36, 1)",
          "spring": "highlight_wipe_width: 0% -> 100%",
          "stagger_sec": 0.14,
          "description": "Dải băng dạ quang Vàng #FFE600 quẹt ngang từ trái sang phải (Wipe 0->100%) làm nổi bật chữ đen tương phản cực mạnh, Icon bên trái nảy Spring Pop."
        },
        "palette": {
          "glass_bg": "rgba(15, 23, 42, 0.86)",
          "border": "#FFE600",
          "accent": "#FFE600",
          "tier1": "#090D16",
          "tier2": "#FFFFFF"
        },
        "when_to_use": "Dùng khi cần đánh dấu câu nói đắt giá nhất (Punchline) như đang tô bút dạ quang vào sách.",
        "content_guide": "Dòng 1: Cụm từ đắt giá (nền vàng chữ đen). Dòng 2: Lời bình mở rộng.",
        "sample_content": {
          "badge": "✨ ĐIỂM ĐẮT GIÁ",
          "icon": "✨",
          "line1": "NỘI DUNG THẬT LÀ VUA",
          "line2": "Kỹ xảo chỉ phục vụ cho thông điệp cốt lõi"
        },
        "default_sfx": [
          "page_flip",
          "ui_pop"
        ],
        "sfx_cues": [
          {
            "sfx": "page_flip",
            "offset": 0.0,
            "volume": 0.95
          },
          {
            "sfx": "ui_pop",
            "offset": 0.22,
            "volume": 0.85
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-T06",
        "group": "#T",
        "name": "Editorial Accent Quote",
        "vi_name": "Trích Dẫn Báo Chí Kallaway Sang Trọng",
        "text_tiers": {
          "count": 2,
          "tier1": {
            "font": "GT-Sectra-LCGV-Display-Bold.otf",
            "fallback": "FDActaBold.ttf",
            "color": "#FFFFFF",
            "role": "Chữ Editorial Serif/Sans sang trọng căn trái"
          },
          "tier2": {
            "font": "FDActaMediumItalic.ttf",
            "color": "#FFECA8",
            "role": "Ghi chú Insight nghiêng tinh tế"
          }
        },
        "icon_badge": {
          "position": "left-accent-pillar",
          "style": "4px Neon Vertical Accent Line + Insight Bulb 💡",
          "default_badge": "💡 INSIGHT CHUYÊN GIA",
          "default_icon": "💡"
        },
        "motion_formula": {
          "easing": "cubic-bezier(0.19, 1, 0.22, 1)",
          "spring": "bar_grow_y: 0 -> 100%",
          "stagger_sec": 0.16,
          "description": "Thanh dọc Neon Accent Line (6px) mọc từ tâm ra hai đầu -> Chữ căn trái trượt từ thanh dọc ra như tạp chí Bloomberg / Kallaway."
        },
        "palette": {
          "glass_bg": "rgba(12, 17, 29, 0.84)",
          "border": "#38BDF8",
          "accent": "#FFECA8",
          "tier1": "#FFFFFF",
          "tier2": "#FFECA8"
        },
        "when_to_use": "Dùng cho các đoạn chia sẻ góc nhìn sâu sắc, triết lý làm nghề, hoặc trích dẫn bài học thực tế.",
        "content_guide": "Dòng 1: Nhận định sắc bén. Dòng 2: Bài học đúc kết.",
        "sample_content": {
          "badge": "💡 GÓC NHÌN THỰC CHIẾN",
          "icon": "💡",
          "line1": "ĐỪNG BÁN KỸ THUẬT KHÔ KHAN",
          "line2": "Hãy bán kết quả và sự chuyển hóa thực sự"
        },
        "default_sfx": [
          "whoosh_soft",
          "camera_shutter"
        ],
        "sfx_cues": [
          {
            "sfx": "whoosh_soft",
            "offset": 0.0,
            "volume": 0.85
          },
          {
            "sfx": "camera_shutter",
            "offset": 0.2,
            "volume": 0.85
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-B01",
        "group": "#B",
        "name": "Master Chapter Summary Card",
        "vi_name": "Màn Hình Ngắt Chương & Tóm Tắt 3 Ý",
        "text_tiers": {
          "count": 3,
          "tier1": {
            "font": "SVN-AEONIK-BOLD.TTF",
            "color": "#FFECA8",
            "role": "Badge Chương: GIAI ĐOẠN 01"
          },
          "tier2": {
            "font": "FDAeonikExtended-Black.otf",
            "color": "#FFFFFF",
            "role": "Tiêu đề Chương cực lớn"
          },
          "tier3": {
            "font": "FDActaMediumItalic.ttf",
            "color": "#CBD5E1",
            "role": "Phụ đề nghiêng + 3 gạch đầu dòng tóm tắt (•)"
          }
        },
        "icon_badge": {
          "position": "top-center-emblem",
          "style": "Chapter Pin Emblem 📌 + Expanding Neon Divider",
          "default_badge": "📌 GIAI ĐOẠN 01",
          "default_icon": "📌"
        },
        "motion_formula": {
          "easing": "cubic-bezier(0.16, 1, 0.3, 1)",
          "spring": "divider_expand: 0 -> 360px",
          "stagger_sec": 0.15,
          "description": "Badge chương bật sáng -> Tiêu đề bung nét -> Thanh Accent Neon giãn ngang từ tâm -> 3 ý tóm tắt (•) hiện lên lần lượt."
        },
        "palette": {
          "glass_bg": "rgba(11, 17, 30, 0.92)",
          "border": "#FFECA8",
          "accent": "#38BDF8",
          "tier1": "#FFECA8",
          "tier2": "#FFFFFF",
          "tier3": "#E2E8F0"
        },
        "when_to_use": "Dùng để ngắt nhịp giữa các phần lớn trong video (Split & Ripple +2.2s), giúp người xem nắm trọn cấu trúc bài giảng.",
        "content_guide": "Tier 1: Số thứ tự chương. Tier 2: Tên chương. Tier 3: Tóm tắt 2-3 ý cốt lõi.",
        "sample_content": {
          "badge": "📌 GIAI ĐOẠN 01 • CỐT LÕI",
          "icon": "📌",
          "line1": "CHUẨN HÓA KỊCH BẢN KHUNG",
          "line2": "• Giữ 100% lời nói  • Né mặt OpenCV  • SFX Kép"
        },
        "default_sfx": [
          "sub_bass_impact",
          "whoosh_riser",
          "glassy_ping"
        ],
        "sfx_cues": [
          {
            "sfx": "sub_bass_impact",
            "offset": 0.0,
            "volume": 0.95
          },
          {
            "sfx": "whoosh_riser",
            "offset": 0.15,
            "volume": 0.85
          },
          {
            "sfx": "glassy_ping",
            "offset": 0.55,
            "volume": 0.8
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-B02",
        "group": "#B",
        "name": "Vertical Linear Spine Roadmap V2",
        "vi_name": "Bản Đồ Lộ Trình 4 Chặng Trục Dọc Thẳng Đứng (Swiss Dark)",
        "text_tiers": {
          "count": 2,
          "tier1": {
            "font": "FDAeonikExtended-Bold.otf",
            "color": "#FFFFFF",
            "role": "Tiêu đề lộ trình trên đỉnh"
          },
          "tier2": {
            "font": "SVN-AEONIK-BOLD.TTF",
            "color": "#FFECA8",
            "role": "4 chặng lộ trình xếp dọc trên trục thẳng đứng X=158"
          }
        },
        "icon_badge": {
          "position": "bezier-nodes",
          "style": "Vertical Linear Spine + 4 Numbered Nodes (01..04)",
          "default_badge": "🗺️ LỘ TRÌNH 4 BƯỚC",
          "default_icon": "✓"
        },
        "motion_formula": {
          "easing": "easeInOutCubic",
          "spring": "Vertical Beam scaleY(0->1) + 4 Horizontal Cards stagger 0.14s",
          "stagger_sec": 0.2,
          "description": "Trục thẳng đứng duy nhất bên trái (X=158), thanh tiến độ vàng #FACC15 chạy dọc từ Node 01 xuống 04, 4 thẻ ngang Swiss Dark trượt vào lệch nhịp 0.14s, 0 sóng radar thừa."
        },
        "palette": {
          "glass_bg": "rgba(11, 17, 30, 0.90)",
          "border": "#38BDF8",
          "accent": "#00E5FF",
          "tier1": "#FFFFFF",
          "tier2": "#FFECA8"
        },
        "when_to_use": "Dùng khi dẫn dắt người xem đi từ Bước 1 sang Bước 2, 3, 4 trong một chuỗi hướng dẫn hoặc hành trình chuyển hóa.",
        "content_guide": "Dòng 1: Tên lộ trình. Dòng 2: 4 trạm ngắn gọn (cách nhau bởi dấu • hoặc >).",
        "sample_content": {
          "badge": "🗺️ BẢN ĐỒ HẬU KỲ AI",
          "icon": "✓",
          "line1": "Lộ trình 4 chặng bảo vệ răng thật",
          "line2": "01. Cái bẫy thói quen ➔ 02. Bùng phát biến chứng ➔ 03. Tầm soát dấu hiệu sớm ➔ 04. Điều trị bảo tồn"
        },
        "default_sfx": [
          "whoosh_riser",
          "sub_bass_impact",
          "glassy_ping"
        ],
        "sfx_cues": [
          {
            "sfx": "whoosh_riser",
            "offset": 0.0,
            "volume": 0.9
          },
          {
            "sfx": "sub_bass_impact",
            "offset": 0.25,
            "volume": 0.85
          },
          {
            "sfx": "glassy_ping",
            "offset": 0.65,
            "volume": 0.9
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-B03",
        "group": "#B",
        "name": "3-Step Staggered Cards",
        "vi_name": "Ba Thẻ Quy Trình Trượt Lệch Nhịp",
        "text_tiers": {
          "count": 2,
          "tier1": {
            "font": "FDAeonikExtended-Black.otf",
            "color": "#FFFFFF",
            "role": "Tiêu đề Checklist & Nhãn BƯỚC 01 / 02 / 03"
          },
          "tier2": {
            "font": "SVN-AEONIK-MEDIUM.TTF",
            "color": "#FFECA8",
            "role": "Nội dung hành động cụ thể của từng thẻ"
          }
        },
        "icon_badge": {
          "position": "each-card-left",
          "style": "3 Distinct Step Badges (01 ⚡, 02 🎯, 03 🚀)",
          "default_badge": "📋 CHECKLIST 3 BƯỚC",
          "default_icon": "⚡"
        },
        "motion_formula": {
          "easing": "cubic-bezier(0.22, 1, 0.36, 1)",
          "spring": "stagger_cards: 0.18s per card",
          "stagger_sec": 0.18,
          "description": "3 thẻ bước (BƯỚC 1, BƯỚC 2, BƯỚC 3) kèm Icon riêng từng bước trượt lên lệch nhịp (stagger 0.18s) khớp với 3 tiếng Click/Pop liên tiếp."
        },
        "palette": {
          "glass_bg": "rgba(15, 23, 42, 0.90)",
          "border": "#38BDF8",
          "accent": "#FFECA8",
          "tier1": "#FFFFFF",
          "tier2": "#FFECA8"
        },
        "when_to_use": "Dùng để tóm tắt nhanh 3 bước hành động, 3 tiêu chí kiểm tra (Checklist) hoặc 3 trụ cột chính.",
        "content_guide": "Dòng 1: Tiêu đề chung. Dòng 2: 3 bước ngắn gọn phân tách bởi dấu chấm phẩy hoặc gạch đứng.",
        "sample_content": {
          "badge": "📋 QUY TRÌNH 3 CHẠM",
          "icon": "⚡",
          "line1": "3 BƯỚC NHÂN BẢN VIDEO CHUYÊN GIA",
          "line2": "Phân tích Vision • Duyệt Mockup • Xuất Alpha CapCut"
        },
        "default_sfx": [
          "ui_click",
          "ui_pop",
          "sub_bass_impact"
        ],
        "sfx_cues": [
          {
            "sfx": "sub_bass_impact",
            "offset": 0.0,
            "volume": 0.8
          },
          {
            "sfx": "ui_click",
            "offset": 0.12,
            "volume": 0.9
          },
          {
            "sfx": "ui_pop",
            "offset": 0.3,
            "volume": 0.9
          },
          {
            "sfx": "ui_click",
            "offset": 0.48,
            "volume": 0.95
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-B04",
        "group": "#B",
        "name": "Big Metric Counter Impact",
        "vi_name": "Con Số Khổng Lồ Nhảy Số Động",
        "text_tiers": {
          "count": 3,
          "tier1": {
            "font": "SVN-IntegralCF-Heavy.ttf",
            "color": "#10B981",
            "role": "Con số khổng lồ nhảy động (0 -> 100K, 95%, 10X, 15 PHÚT)"
          },
          "tier2": {
            "font": "FDAeonikExtended-Bold.otf",
            "color": "#FFFFFF",
            "role": "Tiêu đề khẳng định kết quả"
          },
          "tier3": {
            "font": "FDActaMediumItalic.ttf",
            "color": "#FFECA8",
            "role": "Dòng chú thích bằng chứng thực tế"
          }
        },
        "icon_badge": {
          "position": "top-right-metric",
          "style": "Glowing Growth Arrow 📈 (#10B981 / #FFD700)",
          "default_badge": "📈 ĐỘT PHÁ HIỆU SUẤT",
          "default_icon": "📈"
        },
        "motion_formula": {
          "easing": "easeOutExpo",
          "spring": "counter_roll: 0 -> target_value in 0.55s",
          "stagger_sec": 0.12,
          "description": "Con số trung tâm nhảy tăng tốc từ 0 lên giá trị đích (VD: 0% -> 95% hoặc 0X -> 10X) kèm vòng hào quang xanh lục #10B981 & mũi tên tăng trưởng."
        },
        "palette": {
          "glass_bg": "rgba(10, 22, 28, 0.92)",
          "border": "#10B981",
          "accent": "#FFD700",
          "tier1": "#10B981",
          "tier2": "#FFFFFF",
          "tier3": "#FFECA8"
        },
        "when_to_use": "Dùng khi tung ra con số thống kê gây choáng ngợp: tiết kiệm 95% thời gian, tăng 3X chuyển đổi, kho 8.902 âm thanh.",
        "content_guide": "Dòng 1: Chứa con số lớn (VD: '95% THỜI GIAN' hoặc '8.902 SFX'). Dòng 2: Ý nghĩa thực tế của con số.",
        "sample_content": {
          "badge": "📈 KẾT QUẢ ĐO LƯỜNG",
          "icon": "📈",
          "line1": "95% THỜI GIAN HẬU KỲ",
          "line2": "Được cắt giảm nhờ Engine Motion ProRes 4444 tự động"
        },
        "default_sfx": [
          "riser_short",
          "sub_bass_impact",
          "glassy_ping"
        ],
        "sfx_cues": [
          {
            "sfx": "riser_short",
            "offset": 0.0,
            "volume": 0.85
          },
          {
            "sfx": "sub_bass_impact",
            "offset": 0.35,
            "volume": 0.95
          },
          {
            "sfx": "glassy_ping",
            "offset": 0.52,
            "volume": 0.9
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-V01",
        "group": "#V",
        "name": "3D Floating Glass Card (PiP)",
        "vi_name": "Thẻ Kính Nổi 3D Góc Màn Hình (Picture-in-Picture)",
        "text_tiers": {
          "count": 2,
          "tier1": {
            "font": "FDAeonikExtended-Bold.otf",
            "color": "#FFFFFF",
            "role": "Tiêu đề minh họa bên dưới khung đồ họa"
          },
          "tier2": {
            "font": "SVN-AEONIK-MEDIUM.TTF",
            "color": "#FFECA8",
            "role": "Chú thích chi tiết 2 dòng"
          }
        },
        "icon_badge": {
          "position": "card-header-left",
          "style": "Glowing Cyan Pill ⚡ AI SYSTEM",
          "default_badge": "⚡ AI SYSTEM PIP",
          "default_icon": "⚡"
        },
        "motion_formula": {
          "easing": "cubic-bezier(0.16, 1, 0.3, 1)",
          "spring": "float_y: sin(t)*8px + perspective_tilt",
          "stagger_sec": 0.14,
          "description": "Thẻ nổi 3D hiện ra ở nửa trên hoặc góc phải màn hình với bóng đổ sâu, khung kính mờ viền phát sáng, nhấp nhô nhẹ (Floating) không che mặt người nói."
        },
        "palette": {
          "glass_bg": "rgba(15, 23, 42, 0.88)",
          "border": "#38BDF8",
          "accent": "#FFECA8",
          "tier1": "#FFFFFF",
          "tier2": "#FFECA8"
        },
        "when_to_use": "Dùng khi muốn show bằng chứng hình ảnh, sơ đồ hệ thống hoặc giao diện phần mềm ngay cạnh người nói (PiP).",
        "content_guide": "Dòng 1: Tên sơ đồ/bằng chứng. Dòng 2: Điểm cần chú ý trong hình.",
        "sample_content": {
          "badge": "⚡ AI SYSTEM PIP",
          "icon": "⚡",
          "line1": "KIẾN TRÚC PIPELINE V3",
          "line2": "Xử lý song song Vision + Audio + ProRes Alpha"
        },
        "default_sfx": [
          "whoosh_soft",
          "ui_pop"
        ],
        "sfx_cues": [
          {
            "sfx": "whoosh_soft",
            "offset": 0.0,
            "volume": 0.85
          },
          {
            "sfx": "ui_pop",
            "offset": 0.18,
            "volume": 0.85
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-V02",
        "group": "#V",
        "name": "Before / After Split Comparison",
        "vi_name": "Thẻ Đấu Đối Lập: Cách Cũ vs Cách Mới",
        "text_tiers": {
          "count": 2,
          "tier1": {
            "font": "SVN-IntegralCF-Bold.ttf",
            "color": "#FCA5A5",
            "role": "Thẻ Trái/Trên: ❌ CÁCH CŨ (Viền đỏ, gạch chéo)"
          },
          "tier2": {
            "font": "SVN-IntegralCF-Bold.ttf",
            "color": "#6EE7B7",
            "role": "Thẻ Phải/Dưới: ✅ CÁCH MỚI (Viền xanh ngọc phát sáng)"
          }
        },
        "icon_badge": {
          "position": "dual-split-headers",
          "style": "❌ BEFORE (Red #EF4444) vs ✅ AFTER (Emerald #10B981)",
          "default_badge": "⚖️ SO SÁNH TRỰC DIỆN",
          "default_icon": "✅"
        },
        "motion_formula": {
          "easing": "cubic-bezier(0.25, 1, 0.5, 1)",
          "spring": "left_card_in: 0.0s, right_card_in: 0.22s",
          "stagger_sec": 0.22,
          "description": "Thẻ ❌ CÁCH CŨ trượt vào trước kèm tiếng Punch -> 0.22s sau thẻ ✅ CÁCH MỚI bật sáng với viền xanh ngọc lục bảo và tiếng chuông Ping."
        },
        "palette": {
          "glass_bg": "rgba(15, 23, 42, 0.90)",
          "border": "#10B981",
          "accent": "#EF4444",
          "tier1": "#FCA5A5",
          "tier2": "#6EE7B7"
        },
        "when_to_use": "Dùng khi so sánh Trước/Sau, Cách làm thủ công vs Tự động hóa, Tư duy nghiệp dư vs Chuyên gia.",
        "content_guide": "Dòng 1: Cách cũ tốn kém/mất thời gian. Dòng 2: Cách mới nhanh gọn/hiệu quả.",
        "sample_content": {
          "badge": "⚖️ ĐỐI CHIẾU HIỆU QUẢ",
          "icon": "✅",
          "line1": "❌ CÁCH CŨ: Mất 4 giờ mò mẫm keyframe",
          "line2": "✅ CÁCH MỚI: 5 phút xuất gói Alpha kéo vào CapCut"
        },
        "default_sfx": [
          "whoosh_fast",
          "impact_punch",
          "glassy_ping"
        ],
        "sfx_cues": [
          {
            "sfx": "whoosh_fast",
            "offset": 0.0,
            "volume": 0.85
          },
          {
            "sfx": "impact_punch",
            "offset": 0.16,
            "volume": 0.9
          },
          {
            "sfx": "glassy_ping",
            "offset": 0.38,
            "volume": 0.95
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-V03",
        "group": "#V",
        "name": "Live Growth / Drop Chart Card",
        "vi_name": "Biểu Đồ Đường & Cột Tăng Trưởng Động",
        "text_tiers": {
          "count": 2,
          "tier1": {
            "font": "FDAeonikExtended-Black.otf",
            "color": "#FFFFFF",
            "role": "Tiêu đề chỉ số & Con số % góc phải"
          },
          "tier2": {
            "font": "FDActaMediumItalic.ttf",
            "color": "#FFECA8",
            "role": "Chú thích xu hướng bên dưới biểu đồ"
          }
        },
        "icon_badge": {
          "position": "top-right-metric-pill",
          "style": "Live Chart + Emerald Trend Badge (+320% 📈)",
          "default_badge": "📈 +320% TĂNG TRƯỞNG",
          "default_icon": "📈"
        },
        "motion_formula": {
          "easing": "easeOutCubic",
          "spring": "bars_and_line_grow: 0 -> 100% by frame",
          "stagger_sec": 0.08,
          "description": "Các cột Bar Chart mọc dần lên theo frame đồng thời đường Line Chart xanh #10B981 (hoặc đỏ #EF4444) tự vẽ từ trái sang phải kèm điểm sáng ở đỉnh."
        },
        "palette": {
          "glass_bg": "rgba(11, 19, 32, 0.90)",
          "border": "#10B981",
          "accent": "#38BDF8",
          "tier1": "#FFFFFF",
          "tier2": "#FFECA8"
        },
        "when_to_use": "Dùng khi nói về tốc độ tăng trưởng doanh thu, tỷ lệ giữ chân người xem (Retention), hoặc sự sụt giảm chi phí.",
        "content_guide": "Dòng 1: Tên biểu đồ tăng trưởng. Dòng 2: Giải thích nguyên nhân bứt phá.",
        "sample_content": {
          "badge": "📈 RETENTION +320%",
          "icon": "📈",
          "line1": "TỶ LỆ GIỮ CHÂN KHÁN GIẢ",
          "line2": "Tăng vọt khi chèn Motion Graphic đúng nhịp mỗi 4 giây"
        },
        "default_sfx": [
          "riser_short",
          "glassy_ping"
        ],
        "sfx_cues": [
          {
            "sfx": "riser_short",
            "offset": 0.0,
            "volume": 0.85
          },
          {
            "sfx": "glassy_ping",
            "offset": 0.45,
            "volume": 0.95
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-V04",
        "group": "#V",
        "name": "Titanium Phone / Polaroid Frame",
        "vi_name": "Khung iPhone Titanium & Ảnh Polaroid Nghiêng",
        "text_tiers": {
          "count": 2,
          "tier1": {
            "font": "FDAeonikExtended-Bold.otf",
            "color": "#FFFFFF",
            "role": "Tiêu đề trên nhãn Polaroid / Dynamic Island"
          },
          "tier2": {
            "font": "FDActaBoldItalic.ttf",
            "color": "#FFECA8",
            "role": "Chữ viết tay / Phụ đề nghiêng ở đáy khung"
          }
        },
        "icon_badge": {
          "position": "top-pin-sticker",
          "style": "Titanium Bezel + Dynamic Island + Sticker Pin 📸",
          "default_badge": "📸 BẰNG CHỨNG THỰC TẾ",
          "default_icon": "📸"
        },
        "motion_formula": {
          "easing": "cubic-bezier(0.34, 1.56, 0.64, 1)",
          "spring": "rotate: -3.5deg -> 0deg, scale: 0.92 -> 1.0",
          "stagger_sec": 0.15,
          "description": "Khung iPhone Titanium / Polaroid xoay nhẹ từ góc nghiêng -3.5 độ về cân bằng kèm chớp trắng nhẹ như chụp ảnh (Camera Flash)."
        },
        "palette": {
          "glass_bg": "rgba(18, 24, 38, 0.92)",
          "border": "#CBD5E1",
          "accent": "#FFECA8",
          "tier1": "#FFFFFF",
          "tier2": "#FFECA8"
        },
        "when_to_use": "Dùng khi khoe feedback học viên, ảnh chụp màn hình điện thoại, kết quả thực tế hoặc kỷ niệm đời thực.",
        "content_guide": "Dòng 1: Tên case study / bằng chứng. Dòng 2: Lời trích dẫn hoặc kết quả cụ thể.",
        "sample_content": {
          "badge": "📸 CASE STUDY THẬT",
          "icon": "📸",
          "line1": "GIAO DIỆN CHẠM 2 TRÊN MOBILE",
          "line2": "Duyệt kịch bản và sửa chữ ngay trên điện thoại"
        },
        "default_sfx": [
          "camera_shutter",
          "page_flip"
        ],
        "sfx_cues": [
          {
            "sfx": "camera_shutter",
            "offset": 0.0,
            "volume": 0.95
          },
          {
            "sfx": "page_flip",
            "offset": 0.22,
            "volume": 0.85
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-V05",
        "group": "#V",
        "name": "Fullscreen Cinematic B-Roll + Glass Caption",
        "vi_name": "Cảnh Trám Toàn Màn Hình & Thanh Phụ Đề Kính Mờ",
        "text_tiers": {
          "count": 2,
          "tier1": {
            "font": "FDAeonikExtended-Black.otf",
            "color": "#FFFFFF",
            "role": "Tiêu đề lớn trong thanh Glass Caption ở góc dưới"
          },
          "tier2": {
            "font": "SVN-AEONIK-MEDIUM.TTF",
            "color": "#FFECA8",
            "role": "Dòng giải trình bối cảnh / phụ đề B-Roll"
          }
        },
        "icon_badge": {
          "position": "bottom-left-caption-bar",
          "style": "Cinematic Letterbox + Lower-Third Glass Bar 🎬",
          "default_badge": "🎬 CINEMATIC B-ROLL",
          "default_icon": "🎬"
        },
        "motion_formula": {
          "easing": "linear_zoom + cubic_caption",
          "spring": "5 B-Roll presets: ken-burns-3d, slow-zoom-vignette, pan-focus-pull, split-comparison, light-leak-reveal",
          "stagger_sec": 0.15,
          "description": "Kết hợp 5 preset chuyển động ảnh toàn màn hình (hoặc khung Cinema khi xuất Alpha) + Thanh Caption kính mờ 2 tầng chữ kèm Icon trượt lên ở góc dưới."
        },
        "palette": {
          "glass_bg": "rgba(10, 15, 28, 0.86)",
          "border": "#FFECA8",
          "accent": "#38BDF8",
          "tier1": "#FFFFFF",
          "tier2": "#FFECA8"
        },
        "when_to_use": "Dùng để trám hình ảnh minh họa toàn màn hình xóa sự đơn điệu của khung hình talking-head mà vẫn giữ 100% giọng nói gốc.",
        "content_guide": "Dòng 1: Chủ đề cảnh trám. Dòng 2: Thông điệp bổ trợ cho lời đang nói.",
        "sample_content": {
          "badge": "🎬 KEN-BURNS 3D",
          "icon": "🎬",
          "line1": "KHÔNG GIAN LÀM VIỆC TỐI GIẢN",
          "line2": "Giữ nguyên 100% giọng nói gốc chạy xuyên suốt"
        },
        "default_sfx": [
          "whoosh_fast",
          "camera_shutter"
        ],
        "sfx_cues": [
          {
            "sfx": "whoosh_fast",
            "offset": 0.0,
            "volume": 0.85
          },
          {
            "sfx": "camera_shutter",
            "offset": 0.25,
            "volume": 0.8
          }
        ],
        "capcut_alpha_ready": true
      },
      {
        "id": "MG-V06",
        "group": "#V",
        "name": "Documentary Collage & Highlighter",
        "vi_name": "Phong Cách Tài Liệu Cắt Lớp & Dải Dạ Quang",
        "text_tiers": {
          "count": 3,
          "tier1": {
            "font": "SVN-AEONIK-BLACK.TTF",
            "color": "#38BDF8",
            "role": "Số thứ tự hồ sơ [01] / ARCHIVE TAG"
          },
          "tier2": {
            "font": "GT-Sectra-LCGV-Display-Bold.otf",
            "color": "#090D16",
            "role": "Từ khóa chính trên dải băng dạ quang vàng #FFE600"
          },
          "tier3": {
            "font": "FDActaMediumItalic.ttf",
            "color": "#F8FAFC",
            "role": "Chú thích tài liệu kèm hạt Film Grain"
          }
        },
        "icon_badge": {
          "position": "top-left-index-stamp",
          "style": "Archive Index [01] + Paper Collage Cutout + Yellow Highlighter Strip",
          "default_badge": "[01] HỒ SƠ THỰC CHIẾN",
          "default_icon": "🗂️"
        },
        "motion_formula": {
          "easing": "steps(12) + cubic-bezier(0.22, 1, 0.36, 1)",
          "spring": "collage_drop + highlighter_swipe",
          "stagger_sec": 0.16,
          "description": "Khung ảnh cắt lớp viền sáng đáp xuống -> Dải băng dạ quang vàng quẹt ngang từ khóa -> Nhãn số thứ tự [01] đóng dấu góc trái kèm hạt film grain."
        },
        "palette": {
          "glass_bg": "rgba(15, 20, 30, 0.90)",
          "border": "#F8FAFC",
          "accent": "#FFE600",
          "tier1": "#38BDF8",
          "tier2": "#090D16",
          "tier3": "#F8FAFC"
        },
        "when_to_use": "Dùng cho các đoạn kể chuyện (Storytelling), phân tích hồ sơ nhân vật, lịch sử vấn đề theo phong cách Vox / Johnny Harris.",
        "content_guide": "Dòng 1: Từ khóa trên dải băng vàng. Dòng 2: Trích dẫn tài liệu / dữ kiện thực tế.",
        "sample_content": {
          "badge": "[01] TÀI LIỆU GỐC",
          "icon": "🗂️",
          "line1": "BƯỚC NGOẶT TỰ ĐỘNG HÓA",
          "line2": "Khi AI thay thế 80% thao tác cắt ghép lặp đi lặp lại"
        },
        "default_sfx": [
          "page_flip",
          "camera_shutter",
          "ui_click"
        ],
        "sfx_cues": [
          {
            "sfx": "page_flip",
            "offset": 0.0,
            "volume": 0.95
          },
          {
            "sfx": "camera_shutter",
            "offset": 0.2,
            "volume": 0.85
          },
          {
            "sfx": "ui_click",
            "offset": 0.4,
            "volume": 0.85
          }
        ],
        "capcut_alpha_ready": true
      }
    ],
    "brand_identity_2tier": {
      "version": "1.0-24a7e7f9",
      "source_thread": "24a7e7f9-83aa-4775-abe7-88287b50b1b9",
      "studio_file": "brand_logo_3_motion_studio.html",
      "studio_web_slug": "studios/studio-brand-logo-outro.html",
      "in_clip_tier": {
        "zone": "Headroom Y=58..166px (canvas 1080x1920), eye_lock_line Y=650px",
        "rule": "Nằm gọn phía trên đỉnh tóc chủ thể, cách xa đường khóa mắt Y=650px, không bao giờ che mặt hay cạnh tranh với phụ đề.",
        "archetypes": [
          {
            "id": "BRAND-01",
            "name": "Obsidian Verified Pill",
            "vi_name": "Viên thuốc kính tối kẻ chỉ + ấn xác thực ✓ + shimmer",
            "paired_outro": "OUTRO-01",
            "paired_subtitle": "5B",
            "description": "Viên thuốc kính tối kẻ chỉ mảnh, ấn xác thực ✓ và vệt sáng shimmer chạy ngang định kỳ."
          },
          {
            "id": "BRAND-02",
            "name": "Editorial Paper Crest",
            "vi_name": "Ấn chương tạp chí giấy kem #F5F2EB + đường kẻ laser vàng",
            "paired_outro": "OUTRO-02",
            "paired_cta": "CTA-01",
            "description": "Ấn chương tạp chí nền giấy kem #F5F2EB tương phản cao, đường kẻ laser vàng chạy mở."
          },
          {
            "id": "BRAND-03",
            "name": "3D Prism Flipper",
            "vi_name": "Trụ guồng quay 3D tự lật 3 mặt mỗi 2.2s",
            "paired_outro": "OUTRO-03",
            "cycle_interval_sec": 2.2,
            "faces": [
              "Tên Brand",
              "Chuyên Môn",
              "@Handle"
            ],
            "description": "Trụ guồng quay 3D tự lật 3 mặt mỗi 2.2s: Tên Brand ➔ Chuyên Môn ➔ @Handle."
          }
        ]
      },
      "outro_black_screen_tier": {
        "background": "#050507",
        "duration_sec_range": [
          2.8,
          3.5
        ],
        "placement": "Ngay sau câu nói cuối cùng của clip",
        "modes": {
          "mode_1_pure_brand": {
            "id": "pure",
            "label": "Mode 1 (Pure Brand — Chỉ Logo To + Thông tin thương hiệu)",
            "query_param": "",
            "preview_image": "assets/brand_outro/brand_outro_mode1_pure.jpg",
            "description": "Chỉ hiển thị Logo To + Tên thương hiệu + Khối thông tin định vị/chuyên khoa/kênh trên nền đen #050507."
          },
          "mode_2_brand_cta": {
            "id": "cta",
            "label": "Mode 2 (Brand + CTA — Logo To + Thông tin thương hiệu + Thẻ Vé Ưu Đãi & Nút Bấm Hành Động)",
            "query_param": "mode=cta",
            "preview_image": "assets/brand_outro/brand_outro_mode2_cta.jpg",
            "description": "Hiển thị Logo To + Thông tin thương hiệu kết hợp Thẻ Vé Ưu Đãi (VD: 499 NGHÌN) & Nút Bấm Hành Động (VD: 💬 INBOX TƯ VẤN NGAY ↓) trên nền đen #050507."
          }
        },
        "archetypes": [
          {
            "id": "OUTRO-01",
            "name": "Gold Halo Monolith",
            "recommended": true,
            "sync_with": [
              "BRAND-01",
              "Subtitle 5B"
            ],
            "logo_size_px": 72,
            "description": "Quầng sáng vàng đồng nở nhẹ, vòng tròn Logo lớn 72px có 2 quỹ đạo xoay ngược chiều + huy hiệu ✓ OFFICIAL, Tên thương hiệu lớn + thẻ kính thông tin 3 dòng (Chuyên khoa • Hotline • @Handle)."
          },
          {
            "id": "OUTRO-02",
            "name": "Royal Laser Frame",
            "recommended": false,
            "sync_with": [
              "BRAND-02",
              "CTA-01"
            ],
            "description": "Khung tia laser vàng đồng khóa 4 góc, ấn chương vuông lớn đóng dấu xuống tâm + 2 cánh tia đối xứng, bảng hồ sơ trên nền giấy kem #F5F2EB tương phản mạnh với nền đen."
          },
          {
            "id": "OUTRO-03",
            "name": "3D Bento Identity Stack",
            "recommended": false,
            "sync_with": [
              "BRAND-03"
            ],
            "description": "3 khối Bento 3D lật mở liên hoàn theo trục rotateX: Khối Hero (Logo + Tên + Định vị) ➔ Lưới 2 cột (Dịch vụ mũi nhọn • Hotline) ➔ Thanh kênh @handle + nút + THEO DÕI KÊNH (hoặc khối CTA)."
          }
        ]
      }
    }
  },
  "profiles": {
    "profiles": {
      "white_text_kallaway": {
        "profile_id": "white_text_kallaway",
        "display_name": "White Text (Kallaway Style)",
        "description": "Phong cách chữ trắng tối giản, bóng đổ mềm mịn, chuyên nghiệp",
        "typography": {
          "title": {
            "font_family": "FD Integral",
            "font_weight": "700",
            "color": "#FFFFFF",
            "font_size_16_9": 48,
            "font_size_9_16": 46,
            "line_height": 1.15,
            "text_transform": "uppercase",
            "letter_spacing": "0em"
          },
          "subtitle": {
            "font_family": "FD Aeonik",
            "font_weight": "500",
            "color": "#FFFFFF",
            "accent_color": "#FFFFFF",
            "color_secondary": "#FFFFFF",
            "font_size_16_9": 36,
            "font_size_9_16": 34,
            "line_height": 1.25,
            "letter_spacing": "0em"
          },
          "drop_shadow": "0 4px 20px rgba(0, 0, 0, 0.4)",
          "box_style": {
            "enabled": false,
            "bg_color": "transparent",
            "border": "none",
            "border_radius": 0,
            "backdrop_blur": "0px",
            "padding": "0"
          }
        },
        "motion": {
          "allowed_types": [
            "blur_pop",
            "fade_in"
          ],
          "default": "blur_pop",
          "duration_frames": 8,
          "spring_config": {
            "damping": 14,
            "stiffness": 120,
            "mass": 0.5
          },
          "banned_effects": [
            "bounce",
            "elastic_whip",
            "shake",
            "glitch",
            "zoom_explosion"
          ]
        },
        "safe_zone": {
          "16:9": {
            "width": 1920,
            "height": 1080,
            "bottom_margin_px": 180,
            "bottom_margin_percent": 16.7,
            "horizontal_padding_px": 160,
            "max_width_px": 1500
          },
          "9:16": {
            "width": 1080,
            "height": 1920,
            "bottom_margin_px": 480,
            "bottom_margin_percent": 25.0,
            "horizontal_padding_px": 90,
            "max_width_px": 880
          }
        },
        "styles_subset": [
          1,
          2,
          3
        ],
        "presets_subset": [
          "IMG-01",
          "IMG-02"
        ]
      },
      "hoc_vien_youtube": {
        "profile_id": "hoc_vien_youtube",
        "display_name": "Học Viên & Khóa Học YouTube",
        "description": "Bài giảng, tutorial, review bài tập, video đào tạo chuẩn 16:9 & Shorts 9:16",
        "typography": {
          "title": {
            "font_family": "SVN-Integral",
            "font_weight": "400",
            "color": "#FFFFFF",
            "font_size_16_9": 48,
            "font_size_9_16": 46,
            "line_height": 1.15,
            "text_transform": "uppercase",
            "letter_spacing": "-0.01em"
          },
          "subtitle": {
            "font_family": "SVN-Aeonik",
            "font_weight": "500",
            "fallback_weight": "400",
            "color": "#FFECA8",
            "accent_color": "#FFDE59",
            "color_secondary": "#FFFFFF",
            "font_size_16_9": 36,
            "font_size_9_16": 34,
            "line_height": 1.25,
            "letter_spacing": "0em"
          },
          "drop_shadow": "0 2px 8px rgba(0, 0, 0, 0.85), 0 4px 16px rgba(0, 0, 0, 0.6)",
          "box_style": {
            "enabled": true,
            "bg_color": "rgba(10, 14, 22, 0.72)",
            "border": "1px solid rgba(255, 255, 255, 0.12)",
            "border_radius": 24,
            "backdrop_blur": "12px",
            "padding": "12px 28px"
          }
        },
        "motion": {
          "allowed_types": [
            "fade_in",
            "blur_pop"
          ],
          "default": "blur_pop",
          "duration_frames": 8,
          "spring_config": {
            "damping": 14,
            "stiffness": 120,
            "mass": 0.5
          },
          "banned_effects": [
            "bounce",
            "elastic_whip",
            "shake",
            "glitch",
            "zoom_explosion"
          ]
        },
        "safe_zone": {
          "16:9": {
            "width": 1920,
            "height": 1080,
            "bottom_margin_px": 180,
            "bottom_margin_percent": 16.7,
            "horizontal_padding_px": 160,
            "max_width_px": 1500
          },
          "9:16": {
            "width": 1080,
            "height": 1920,
            "bottom_margin_px": 480,
            "bottom_margin_percent": 25.0,
            "horizontal_padding_px": 90,
            "max_width_px": 880
          }
        },
        "styles_subset": [
          2,
          12,
          14,
          24,
          31
        ],
        "presets_subset": [
          "IMG-05",
          "IMG-07",
          "IMG-06"
        ]
      },
      "editorial_pro": {
        "profile_id": "editorial_pro",
        "display_name": "Editorial Chuyên Gia",
        "description": "Chia sẻ tri thức, podcast, góc nhìn lãnh đạo, phân tích thị trường",
        "typography": {
          "title": {
            "font_family": "SVN-Integral",
            "font_weight": "400",
            "secondary_font": "GT-Sectra",
            "color": "#FFFFFF",
            "font_size_16_9": 50,
            "font_size_9_16": 48,
            "line_height": 1.15,
            "text_transform": "uppercase",
            "letter_spacing": "-0.01em"
          },
          "subtitle": {
            "font_family": "SVN-Aeonik",
            "font_weight": "400",
            "italic_font": "SVN-FreightDisplay",
            "color": "#FFFFFF",
            "accent_color": "#FFD700",
            "color_secondary": "#00E5FF",
            "font_size_16_9": 36,
            "font_size_9_16": 34,
            "line_height": 1.25,
            "letter_spacing": "0em"
          },
          "drop_shadow": "0 4px 14px rgba(0, 0, 0, 0.85)",
          "box_style": {
            "enabled": true,
            "bg_color": "rgba(15, 23, 42, 0.8)",
            "border": "1px solid rgba(255, 255, 255, 0.15)",
            "border_radius": 20,
            "backdrop_blur": "16px",
            "padding": "14px 30px"
          }
        },
        "motion": {
          "allowed_types": [
            "blur_pop",
            "float_drift",
            "fade_in"
          ],
          "default": "blur_pop",
          "duration_frames": 10,
          "spring_config": {
            "damping": 16,
            "stiffness": 100,
            "mass": 0.6
          },
          "banned_effects": [
            "bounce",
            "zoom_explosion",
            "shake"
          ]
        },
        "safe_zone": {
          "16:9": {
            "width": 1920,
            "height": 1080,
            "bottom_margin_px": 180,
            "bottom_margin_percent": 16.7,
            "horizontal_padding_px": 160,
            "max_width_px": 1500
          },
          "9:16": {
            "width": 1080,
            "height": 1920,
            "bottom_margin_px": 460,
            "bottom_margin_percent": 24.0,
            "horizontal_padding_px": 90,
            "max_width_px": 900
          }
        },
        "styles_subset": [
          4,
          11,
          15,
          17,
          20,
          23,
          25,
          28
        ],
        "presets_subset": [
          "IMG-01",
          "IMG-02",
          "IMG-06",
          "IMG-08"
        ]
      },
      "lifestyle": {
        "profile_id": "lifestyle",
        "display_name": "Đời Sống & Vlog Hằng Ngày",
        "description": "Kỷ niệm thường nhật, gia đình, du lịch, thể thao, khoảnh khắc vui tươi",
        "typography": {
          "title": {
            "font_family": "SVN-Aeonik",
            "font_weight": "700",
            "color": "#FFFFFF",
            "font_size_16_9": 46,
            "font_size_9_16": 44,
            "line_height": 1.2,
            "text_transform": "none",
            "letter_spacing": "0em"
          },
          "subtitle": {
            "font_family": "SVN-Aeonik",
            "font_weight": "500",
            "color": "#1A1A24",
            "accent_color": "#FFDE59",
            "color_secondary": "#FF6B8B",
            "font_size_16_9": 34,
            "font_size_9_16": 32,
            "line_height": 1.25,
            "letter_spacing": "0em"
          },
          "drop_shadow": "0 2px 8px rgba(0, 0, 0, 0.4)",
          "box_style": {
            "enabled": true,
            "bg_color": "rgba(255, 222, 89, 0.95)",
            "border": "none",
            "border_radius": 28,
            "backdrop_blur": "8px",
            "padding": "10px 24px"
          }
        },
        "motion": {
          "allowed_types": [
            "pop",
            "bounce",
            "fade_in",
            "slide_up"
          ],
          "default": "pop",
          "duration_frames": 10,
          "spring_config": {
            "damping": 12,
            "stiffness": 140,
            "mass": 0.5
          },
          "banned_effects": [
            "glitch",
            "zoom_explosion"
          ]
        },
        "safe_zone": {
          "16:9": {
            "width": 1920,
            "height": 1080,
            "bottom_margin_px": 170,
            "bottom_margin_percent": 15.7,
            "horizontal_padding_px": 150,
            "max_width_px": 1480
          },
          "9:16": {
            "width": 1080,
            "height": 1920,
            "bottom_margin_px": 450,
            "bottom_margin_percent": 23.4,
            "horizontal_padding_px": 90,
            "max_width_px": 880
          }
        },
        "styles_subset": [
          1,
          3,
          19,
          21,
          27,
          30
        ],
        "presets_subset": [
          "IMG-04",
          "IMG-03",
          "IMG-01"
        ]
      },
      "case_study": {
        "profile_id": "case_study",
        "display_name": "Case Study & Chuyển Đổi",
        "description": "Báo cáo thành tích học viên, số liệu tăng trưởng, câu chuyện thành công",
        "typography": {
          "title": {
            "font_family": "SVN-Integral",
            "font_weight": "400",
            "number_font": "GT-America",
            "color": "#FFFFFF",
            "font_size_16_9": 48,
            "font_size_9_16": 46,
            "line_height": 1.15,
            "text_transform": "uppercase",
            "letter_spacing": "-0.01em"
          },
          "subtitle": {
            "font_family": "SVN-Aeonik",
            "font_weight": "400",
            "color": "#FFFFFF",
            "accent_color": "#00FF66",
            "color_secondary": "#FFD700",
            "font_size_16_9": 36,
            "font_size_9_16": 34,
            "line_height": 1.25,
            "letter_spacing": "0em"
          },
          "drop_shadow": "0 2px 10px rgba(0, 0, 0, 0.85)",
          "box_style": {
            "enabled": true,
            "bg_color": "rgba(10, 20, 16, 0.8)",
            "border": "1px solid rgba(0, 255, 102, 0.25)",
            "border_radius": 22,
            "backdrop_blur": "12px",
            "padding": "12px 28px"
          }
        },
        "motion": {
          "allowed_types": [
            "blur_pop",
            "slide_up",
            "fade_in"
          ],
          "default": "slide_up",
          "duration_frames": 8,
          "spring_config": {
            "damping": 14,
            "stiffness": 130,
            "mass": 0.5
          },
          "banned_effects": [
            "bounce",
            "elastic_whip",
            "shake",
            "glitch",
            "zoom_explosion"
          ]
        },
        "safe_zone": {
          "16:9": {
            "width": 1920,
            "height": 1080,
            "bottom_margin_px": 180,
            "bottom_margin_percent": 16.7,
            "horizontal_padding_px": 160,
            "max_width_px": 1500
          },
          "9:16": {
            "width": 1080,
            "height": 1920,
            "bottom_margin_px": 480,
            "bottom_margin_percent": 25.0,
            "horizontal_padding_px": 90,
            "max_width_px": 880
          }
        },
        "styles_subset": [
          9,
          13,
          16,
          22,
          32,
          35
        ],
        "presets_subset": [
          "IMG-07",
          "IMG-03",
          "IMG-05",
          "IMG-08"
        ]
      }
    }
  },
  "presets": [
    {
      "id": "IMG-01",
      "name": "Thẻ Nổi 3D",
      "icon": "✨",
      "defaultPos": "tr",
      "defaultPosY": 85,
      "defaultScale": 100,
      "defaultMotion": 1,
      "width": 155,
      "height": 155,
      "badge": "⚡ AI AUTOMATION",
      "prompt": "High-end futuristic gold glowing AI microchip floating on dark minimalist desk, cinematic lighting, 8k --ar 1:1",
      "imgSrc": "./assets/ai_leverage_core_1786841955183.jpg",
      "compatible_profiles": [
        "editorial_pro",
        "lifestyle"
      ]
    },
    {
      "id": "IMG-02",
      "name": "Nửa Màn Trên",
      "icon": "🎬",
      "defaultPos": "top",
      "defaultPosY": 0,
      "defaultScale": 100,
      "defaultMotion": 2,
      "width": 350,
      "height": 298,
      "badge": "B-ROLL",
      "prompt": "Cinematic moody workstation with multiple monitors, ambient warm lighting, professional creator studio --ar 16:9",
      "imgSrc": "./assets/chill_creator_desk_1786841919746.jpg",
      "compatible_profiles": [
        "editorial_pro"
      ]
    },
    {
      "id": "IMG-03",
      "name": "Toàn Màn 9:16",
      "icon": "📱",
      "defaultPos": "center",
      "defaultPosY": 0,
      "defaultScale": 100,
      "defaultMotion": 3,
      "width": 350,
      "height": 622,
      "badge": "J-CUT HERO",
      "prompt": "Viral growth dashboard on luxury dark titanium phone mockup, neon golden metrics exploding --ar 9:16",
      "imgSrc": "./assets/viral_creator_card_1786841900103.jpg",
      "compatible_profiles": [
        "lifestyle",
        "case_study"
      ]
    },
    {
      "id": "IMG-04",
      "name": "Ghim Polaroid",
      "icon": "📌",
      "defaultPos": "tr",
      "defaultPosY": 90,
      "defaultScale": 100,
      "defaultMotion": 4,
      "width": 150,
      "height": 180,
      "badge": "LIFESTYLE",
      "prompt": "Vintage gold studio microphone close-up, warm film grain, nostalgic bokeh aesthetic --ar 1:1",
      "imgSrc": "./assets/studio_mic_gold_1786841885528.jpg",
      "compatible_profiles": [
        "lifestyle"
      ]
    },
    {
      "id": "IMG-05",
      "name": "Khung iPhone",
      "icon": "📲",
      "defaultPos": "tr",
      "defaultPosY": 80,
      "defaultScale": 100,
      "defaultMotion": 1,
      "width": 145,
      "height": 195,
      "badge": "APP WORKFLOW",
      "prompt": "Modern video editing timeline software on sleek black smartphone screen, 8k UI details --ar 4:5",
      "imgSrc": "./assets/ai_timeline_edit_1786841970084.jpg",
      "compatible_profiles": [
        "hoc_vien_youtube",
        "case_study"
      ]
    },
    {
      "id": "IMG-06",
      "name": "Điện Ảnh 16:9",
      "icon": "🎥",
      "defaultPos": "tr",
      "defaultPosY": 95,
      "defaultScale": 100,
      "defaultMotion": 2,
      "width": 190,
      "height": 107,
      "badge": "CINEMA 4K",
      "prompt": "Ultra wide cinematic shot of high-tech studio editing bay, dramatic anamorphic flare --ar 16:9",
      "imgSrc": "./assets/chill_creator_desk_1786841919746.jpg",
      "compatible_profiles": [
        "hoc_vien_youtube",
        "editorial_pro"
      ]
    },
    {
      "id": "IMG-07",
      "name": "So Sánh Kép",
      "icon": "⚖️",
      "defaultPos": "center",
      "defaultPosY": 160,
      "defaultScale": 100,
      "defaultMotion": 2,
      "width": 220,
      "height": 145,
      "badge": "BEFORE / AFTER",
      "prompt": "Comparison of messy manual video editing vs ultra-clean automated AI pipeline workflow --ar 4:5",
      "imgSrc": "./assets/ai_timeline_edit_1786841970084.jpg",
      "compatible_profiles": [
        "hoc_vien_youtube",
        "case_study"
      ]
    },
    {
      "id": "IMG-08",
      "name": "Ảnh Tròn Stamp",
      "icon": "🎖️",
      "defaultPos": "tr",
      "defaultPosY": 90,
      "defaultScale": 100,
      "defaultMotion": 1,
      "width": 135,
      "height": 135,
      "badge": "VERIFIED",
      "prompt": "Glowing golden circular badge with AI neural network hologram core inside, 3d medal --ar 1:1",
      "imgSrc": "./assets/ai_leverage_core_1786841955183.jpg",
      "compatible_profiles": [
        "editorial_pro",
        "case_study"
      ]
    }
  ],
  "compositions": [
    {
      "name": "AutoEditVideo.tsx",
      "kind": "composition",
      "size": 7718,
      "size_formatted": "7.5 KB",
      "lines": 205,
      "mtime": 1790181608.0,
      "mtime_formatted": "23/09/2026 23:40",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "EventVideo.tsx",
      "kind": "composition",
      "size": 6358,
      "size_formatted": "6.2 KB",
      "lines": 216,
      "mtime": 1787048091.0,
      "mtime_formatted": "18/08/2026 17:14",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "LifestyleVideo.tsx",
      "kind": "composition",
      "size": 3361,
      "size_formatted": "3.3 KB",
      "lines": 98,
      "mtime": 1787037879.0,
      "mtime_formatted": "18/08/2026 14:24",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "LiveTalkVideo.tsx",
      "kind": "composition",
      "size": 1755,
      "size_formatted": "1.7 KB",
      "lines": 38,
      "mtime": 1787047159.0,
      "mtime_formatted": "18/08/2026 16:59",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "MattLouiSaaSDemo.tsx",
      "kind": "composition",
      "size": 62784,
      "size_formatted": "61.3 KB",
      "lines": 1906,
      "mtime": 1792255638.8334692,
      "mtime_formatted": "17/10/2026 23:47",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "NatureVideo.tsx",
      "kind": "composition",
      "size": 2846,
      "size_formatted": "2.8 KB",
      "lines": 48,
      "mtime": 1787047159.0,
      "mtime_formatted": "18/08/2026 16:59",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "PinterestMotionClone.tsx",
      "kind": "composition",
      "size": 56720,
      "size_formatted": "55.4 KB",
      "lines": 1846,
      "mtime": 1792257024.6956942,
      "mtime_formatted": "18/10/2026 00:10",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "PinterestViet9x16.tsx",
      "kind": "composition",
      "size": 85569,
      "size_formatted": "83.6 KB",
      "lines": 2700,
      "mtime": 1792336060.930044,
      "mtime_formatted": "18/10/2026 22:07",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "VietBrandPinterestGold.tsx",
      "kind": "composition",
      "size": 60279,
      "size_formatted": "58.9 KB",
      "lines": 1943,
      "mtime": 1792277438.5005329,
      "mtime_formatted": "18/10/2026 05:50",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "VietClaudeMotionRiso10s.tsx",
      "kind": "composition",
      "size": 27510,
      "size_formatted": "26.9 KB",
      "lines": 847,
      "mtime": 1792336208.1104136,
      "mtime_formatted": "18/10/2026 22:10",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "VietCleanV3_10s.tsx",
      "kind": "composition",
      "size": 52326,
      "size_formatted": "51.1 KB",
      "lines": 1416,
      "mtime": 1792339304.3798175,
      "mtime_formatted": "18/10/2026 23:01",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "VietContinuity10s.tsx",
      "kind": "composition",
      "size": 80231,
      "size_formatted": "78.4 KB",
      "lines": 2119,
      "mtime": 1792310964.923237,
      "mtime_formatted": "18/10/2026 15:09",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "VietMasterClassPower10s.tsx",
      "kind": "composition",
      "size": 38232,
      "size_formatted": "37.3 KB",
      "lines": 1061,
      "mtime": 1792421279.6582208,
      "mtime_formatted": "19/10/2026 21:47",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "VietScientificAtlas.tsx",
      "kind": "composition",
      "size": 21924,
      "size_formatted": "21.4 KB",
      "lines": 584,
      "mtime": 1792578351.8349109,
      "mtime_formatted": "21/10/2026 17:25",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "VietSemanticEra27s.tsx",
      "kind": "composition",
      "size": 98502,
      "size_formatted": "96.2 KB",
      "lines": 3058,
      "mtime": 1792306909.2777445,
      "mtime_formatted": "18/10/2026 14:01",
      "desc": "Remotion Composition React Component 60fps"
    },
    {
      "name": "VietUniversalCTA.tsx",
      "kind": "composition",
      "size": 14482,
      "size_formatted": "14.1 KB",
      "lines": 431,
      "mtime": 1792640862.648815,
      "mtime_formatted": "22/10/2026 10:47",
      "desc": "Remotion Composition React Component 60fps"
    }
  ],
  "components": [
    {
      "name": "BRollScene.tsx",
      "kind": "component",
      "size": 1079,
      "size_formatted": "1.1 KB",
      "lines": 43,
      "mtime": 1786983804.0,
      "mtime_formatted": "17/08/2026 23:23",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "BrandTag.tsx",
      "kind": "component",
      "size": 2045,
      "size_formatted": "2.0 KB",
      "lines": 83,
      "mtime": 1787446224.0,
      "mtime_formatted": "23/08/2026 07:50",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "CardBRoll.tsx",
      "kind": "component",
      "size": 1852,
      "size_formatted": "1.8 KB",
      "lines": 72,
      "mtime": 1790181552.0,
      "mtime_formatted": "23/09/2026 23:39",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "CircularPiP.tsx",
      "kind": "component",
      "size": 7770,
      "size_formatted": "7.6 KB",
      "lines": 261,
      "mtime": 1788871725.0,
      "mtime_formatted": "08/09/2026 19:48",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "ConfettiOverlay.tsx",
      "kind": "component",
      "size": 2662,
      "size_formatted": "2.6 KB",
      "lines": 92,
      "mtime": 1787446228.0,
      "mtime_formatted": "23/08/2026 07:50",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "FloatingEmojis.tsx",
      "kind": "component",
      "size": 2441,
      "size_formatted": "2.4 KB",
      "lines": 87,
      "mtime": 1787027563.0,
      "mtime_formatted": "18/08/2026 11:32",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "FreezeFrame.tsx",
      "kind": "component",
      "size": 852,
      "size_formatted": "852.0 B",
      "lines": 29,
      "mtime": 1787047136.0,
      "mtime_formatted": "18/08/2026 16:58",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "FullscreenTextCard.tsx",
      "kind": "component",
      "size": 4898,
      "size_formatted": "4.8 KB",
      "lines": 167,
      "mtime": 1787446220.0,
      "mtime_formatted": "23/08/2026 07:50",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "HocVienSubtitles.tsx",
      "kind": "component",
      "size": 3880,
      "size_formatted": "3.8 KB",
      "lines": 132,
      "mtime": 1788508674.0,
      "mtime_formatted": "04/09/2026 14:57",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "ImageOverlay.tsx",
      "kind": "component",
      "size": 5405,
      "size_formatted": "5.3 KB",
      "lines": 138,
      "mtime": 1786983800.0,
      "mtime_formatted": "17/08/2026 23:23",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "KenBurnsEffect.tsx",
      "kind": "component",
      "size": 1284,
      "size_formatted": "1.3 KB",
      "lines": 32,
      "mtime": 1787047123.0,
      "mtime_formatted": "18/08/2026 16:58",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "KineticText.tsx",
      "kind": "component",
      "size": 9925,
      "size_formatted": "9.7 KB",
      "lines": 260,
      "mtime": 1786983806.0,
      "mtime_formatted": "17/08/2026 23:23",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "LifestyleBrandTag.tsx",
      "kind": "component",
      "size": 2289,
      "size_formatted": "2.2 KB",
      "lines": 91,
      "mtime": 1787027572.0,
      "mtime_formatted": "18/08/2026 11:32",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "LifestyleSubtitles.tsx",
      "kind": "component",
      "size": 3846,
      "size_formatted": "3.8 KB",
      "lines": 135,
      "mtime": 1787027568.0,
      "mtime_formatted": "18/08/2026 11:32",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "ParallaxText.tsx",
      "kind": "component",
      "size": 1333,
      "size_formatted": "1.3 KB",
      "lines": 45,
      "mtime": 1787047127.0,
      "mtime_formatted": "18/08/2026 16:58",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "PullQuoteCard.tsx",
      "kind": "component",
      "size": 2002,
      "size_formatted": "2.0 KB",
      "lines": 74,
      "mtime": 1787047145.0,
      "mtime_formatted": "18/08/2026 16:59",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "PunchZoom.tsx",
      "kind": "component",
      "size": 2169,
      "size_formatted": "2.1 KB",
      "lines": 62,
      "mtime": 1787037850.0,
      "mtime_formatted": "18/08/2026 14:24",
      "desc": "Find the currently active scene"
    },
    {
      "name": "SceneTransition.tsx",
      "kind": "component",
      "size": 824,
      "size_formatted": "824.0 B",
      "lines": 31,
      "mtime": 1786983806.0,
      "mtime_formatted": "17/08/2026 23:23",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "SpeakerColorSub.tsx",
      "kind": "component",
      "size": 1722,
      "size_formatted": "1.7 KB",
      "lines": 61,
      "mtime": 1787047150.0,
      "mtime_formatted": "18/08/2026 16:59",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "SpeedRamp.tsx",
      "kind": "component",
      "size": 333,
      "size_formatted": "333.0 B",
      "lines": 16,
      "mtime": 1787047132.0,
      "mtime_formatted": "18/08/2026 16:58",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "SurpriseEffect.tsx",
      "kind": "component",
      "size": 3635,
      "size_formatted": "3.5 KB",
      "lines": 93,
      "mtime": 1787047155.0,
      "mtime_formatted": "18/08/2026 16:59",
      "desc": "Remotion Component React Component 60fps"
    },
    {
      "name": "TypewriterText.tsx",
      "kind": "component",
      "size": 1033,
      "size_formatted": "1.0 KB",
      "lines": 35,
      "mtime": 1787047125.0,
      "mtime_formatted": "18/08/2026 16:58",
      "desc": "Remotion Component React Component 60fps"
    }
  ],
  "scripts": [
    {
      "name": "auto_edit_pipeline.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 13918,
      "size_formatted": "13.6 KB",
      "lines": 324,
      "mtime": 1786925077.0,
      "mtime_formatted": "17/08/2026 07:04",
      "desc": "AUTO EDIT VIDEO PIPELINE - CREATOR EDITORIAL EDITION"
    },
    {
      "name": "auto_lifestyle_pipeline.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 15192,
      "size_formatted": "14.8 KB",
      "lines": 377,
      "mtime": 1788508550.0,
      "mtime_formatted": "04/09/2026 14:55",
      "desc": "AUTO LIFESTYLE VIDEO EDITING PIPELINE (DAILY LIFE & FUN MOMENTS)"
    },
    {
      "name": "auto_transcribe_and_edit.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 17138,
      "size_formatted": "16.7 KB",
      "lines": 434,
      "mtime": 1790205422.0,
      "mtime_formatted": "24/09/2026 06:17",
      "desc": "AUTO TRANSCRIBE & EDIT VIDEO (MULTI-STYLE AUTO-PILOT PIPELINE)"
    },
    {
      "name": "beat_sheet.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 35076,
      "size_formatted": "34.3 KB",
      "lines": 850,
      "mtime": 1790181638.0,
      "mtime_formatted": "23/09/2026 23:40",
      "desc": "scripts/beat_sheet.py — Module Quản Lý Quy Trình Biên Tập 2 Pha (Milestone 3 / R3):"
    },
    {
      "name": "build_motion_showcase.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 182550,
      "size_formatted": "178.3 KB",
      "lines": 4902,
      "mtime": 1792466746.620185,
      "mtime_formatted": "20/10/2026 10:25",
      "desc": "build_motion_showcase.py"
    },
    {
      "name": "generate_studio.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 13422,
      "size_formatted": "13.1 KB",
      "lines": 316,
      "mtime": 1790181502.0,
      "mtime_formatted": "23/09/2026 23:38",
      "desc": "Parse a standard SRT file and return a list of dictionaries."
    },
    {
      "name": "mfx_v3_renderer.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 26920,
      "size_formatted": "26.3 KB",
      "lines": 652,
      "mtime": 1792252768.5798302,
      "mtime_formatted": "17/10/2026 22:59",
      "desc": "Render video hoàn chỉnh qcVD1_final.mp4 (5.04s, 1080x1920 @ 24fps):"
    },
    {
      "name": "mfx_v3_universal_engine.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 64862,
      "size_formatted": "63.3 KB",
      "lines": 1618,
      "mtime": 1792564981.4453545,
      "mtime_formatted": "21/10/2026 13:43",
      "desc": "mfx_v3_universal_engine.py — Động Cơ Kết Xuất Video MFX V3.2 (2-Pass Low-RAM Streaming)"
    },
    {
      "name": "profiles.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 17751,
      "size_formatted": "17.3 KB",
      "lines": 481,
      "mtime": 1790181780.0,
      "mtime_formatted": "23/09/2026 23:43",
      "desc": "scripts/profiles.py - Module Quản Lý Cấu Hình Profile & Typography Lock"
    },
    {
      "name": "render_with_remotion.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 8681,
      "size_formatted": "8.5 KB",
      "lines": 237,
      "mtime": 1788509881.0,
      "mtime_formatted": "04/09/2026 15:18",
      "desc": "render_with_remotion.py — Bridge script that takes JSON config from Studio HTML"
    },
    {
      "name": "scientific_atlas_builder.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 13435,
      "size_formatted": "13.1 KB",
      "lines": 311,
      "mtime": 1792563279.9291606,
      "mtime_formatted": "21/10/2026 13:14",
      "desc": "Scientific Atlas Style V2 — 3 cảnh trám khoa học cho thamtho_goc.mp4."
    },
    {
      "name": "semantic_phrasing.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 44245,
      "size_formatted": "43.2 KB",
      "lines": 867,
      "mtime": 1788509820.0,
      "mtime_formatted": "04/09/2026 15:17",
      "desc": "Semantic Phrasing Guard (Bộ Bảo Vệ Ngắt Cụm Từ Ngữ Nghĩa Tiếng Việt)"
    },
    {
      "name": "v3_motion_library.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 88820,
      "size_formatted": "86.7 KB",
      "lines": 1983,
      "mtime": 1792559252.5198178,
      "mtime_formatted": "21/10/2026 12:07",
      "desc": "scripts/v3_motion_library.py — Engine Thư Viện 16 Kiểu Motion Graphic Chủ Lực V3,"
    },
    {
      "name": "v3_pro_director.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 70193,
      "size_formatted": "68.5 KB",
      "lines": 1580,
      "mtime": 1792213699.0044365,
      "mtime_formatted": "17/10/2026 12:08",
      "desc": "scripts/v3_pro_director.py — Module Đạo Diễn AI V3, Delta Patcher & Batch Pipeline"
    },
    {
      "name": "v3_vision_mockup.py",
      "skill_id": "auto-edit-video",
      "skill_name": "Auto Edit Video V3 (Talking-Head Studio)",
      "size": 44873,
      "size_formatted": "43.8 KB",
      "lines": 1066,
      "mtime": 1792207056.3666263,
      "mtime_formatted": "17/10/2026 10:17",
      "desc": "scripts/v3_vision_mockup.py — Module OpenCV Vision Analyzer & Frame Mockup Engine (Auto-Edit V3)"
    },
    {
      "name": "atlas_2d_helper.py",
      "skill_id": "render-v3",
      "skill_name": "Render V3 (Delta Patcher & EDL Engine)",
      "size": 13110,
      "size_formatted": "12.8 KB",
      "lines": 308,
      "mtime": 1792564359.1417499,
      "mtime_formatted": "21/10/2026 13:32",
      "desc": "atlas_2d_helper.py — Bộ Dựng Bản Vẽ Khoa Học 2D (Scientific Atlas Style V2)"
    },
    {
      "name": "edl_bootstrap.py",
      "skill_id": "render-v3",
      "skill_name": "Render V3 (Delta Patcher & EDL Engine)",
      "size": 10796,
      "size_formatted": "10.5 KB",
      "lines": 277,
      "mtime": 1792564359.1456294,
      "mtime_formatted": "21/10/2026 13:32",
      "desc": "edl_bootstrap.py — Khởi Tạo Nhanh EDL JSON & Contact Sheet Cho Luồng Trực Tiếp Antigravity"
    },
    {
      "name": "mfx_v3_universal_engine.py",
      "skill_id": "render-v3",
      "skill_name": "Render V3 (Delta Patcher & EDL Engine)",
      "size": 65640,
      "size_formatted": "64.1 KB",
      "lines": 1597,
      "mtime": 1792573554.1729004,
      "mtime_formatted": "21/10/2026 16:05",
      "desc": "mfx_v3_universal_engine.py — Động Cơ Kết Xuất Video MFX V3.2 (2-Pass Low-RAM Streaming)"
    },
    {
      "name": "qa_lint.py",
      "skill_id": "render-v3",
      "skill_name": "Render V3 (Delta Patcher & EDL Engine)",
      "size": 12694,
      "size_formatted": "12.4 KB",
      "lines": 228,
      "mtime": 1792573612.5904448,
      "mtime_formatted": "21/10/2026 16:06",
      "desc": "qa_lint.py — Deterministic Post-Plan & Pre-Render Verifier (MFX V4.0 — CLAUDE2 Council Edition)"
    },
    {
      "name": "spine_map_mgb02.py",
      "skill_id": "render-v3",
      "skill_name": "Render V3 (Delta Patcher & EDL Engine)",
      "size": 8145,
      "size_formatted": "8.0 KB",
      "lines": 200,
      "mtime": 1792564359.143949,
      "mtime_formatted": "21/10/2026 13:32",
      "desc": "spine_map_mgb02.py — Bộ Dựng Vertical Linear Spine Map (MG-B02 V2)"
    },
    {
      "name": "compose_voicesafe_sfx.py",
      "skill_id": "motion",
      "skill_name": "Motion Studio 60fps (Universal Archetypes)",
      "size": 9265,
      "size_formatted": "9.0 KB",
      "lines": 223,
      "mtime": 1792420389.9319584,
      "mtime_formatted": "19/10/2026 21:33",
      "desc": "Bước 3 — Tổng hợp SFX 4 Lớp Voice-Safe (compose_voicesafe_sfx.py)"
    },
    {
      "name": "extract_beat_timeline.py",
      "skill_id": "motion",
      "skill_name": "Motion Studio 60fps (Universal Archetypes)",
      "size": 22659,
      "size_formatted": "22.1 KB",
      "lines": 564,
      "mtime": 1792420389.93253,
      "mtime_formatted": "19/10/2026 21:33",
      "desc": "Bước 1 — Bóc tách Thoại & Sóng âm (extract_beat_timeline.py)"
    },
    {
      "name": "scaffold_motion_project.py",
      "skill_id": "motion",
      "skill_name": "Motion Studio 60fps (Universal Archetypes)",
      "size": 7465,
      "size_formatted": "7.3 KB",
      "lines": 163,
      "mtime": 1792458344.8328738,
      "mtime_formatted": "20/10/2026 08:05",
      "desc": "scaffold_motion_project.py — Trình khởi tạo tự động dự án Motion Graphic 60fps từ Video Nói + SRT."
    },
    {
      "name": "verify_motion_deliverable.py",
      "skill_id": "motion",
      "skill_name": "Motion Studio 60fps (Universal Archetypes)",
      "size": 15089,
      "size_formatted": "14.7 KB",
      "lines": 369,
      "mtime": 1792420389.9314952,
      "mtime_formatted": "19/10/2026 21:33",
      "desc": "Bước 5 — Kiểm định Tất Định Sản Phẩm Motion Graphic (verify_motion_deliverable.py)"
    },
    {
      "name": "spa_edit_cli.py",
      "skill_id": "spa-edit",
      "skill_name": "Kỹ năng Edit Video cho Spa (Spa-Edit V7.2)",
      "size": 3953,
      "size_formatted": "3.9 KB",
      "lines": 83,
      "mtime": 1792654773.6891718,
      "mtime_formatted": "22/10/2026 14:39",
      "desc": "SPA EDIT CLI V7.2 — ONE-COMMAND DETERMINISTIC PACKAGING ENGINE FOR SPA / CLINIC VIDEOS"
    },
    {
      "name": "verify_6gates.py",
      "skill_id": "spa-edit",
      "skill_name": "Kỹ năng Edit Video cho Spa (Spa-Edit V7.2)",
      "size": 1657,
      "size_formatted": "1.6 KB",
      "lines": 28,
      "mtime": 1792654778.1337001,
      "mtime_formatted": "22/10/2026 14:39",
      "desc": "6-GATE DETERMINISTIC VERIFIER FOR SPA-EDIT SKILL"
    }
  ],
  "history": [
    {
      "name": "scripts/verify_6gates.py",
      "type": "Python Script",
      "skill": "Kỹ năng Edit Video cho Spa (Spa-Edit V7.2)",
      "mtime": 1792654778.1337001,
      "mtime_formatted": "22/10/2026 14:39",
      "detail": "6-GATE DETERMINISTIC VERIFIER FOR SPA-EDIT SKILL"
    },
    {
      "name": "scripts/spa_edit_cli.py",
      "type": "Python Script",
      "skill": "Kỹ năng Edit Video cho Spa (Spa-Edit V7.2)",
      "mtime": 1792654773.6891718,
      "mtime_formatted": "22/10/2026 14:39",
      "detail": "SPA EDIT CLI V7.2 — ONE-COMMAND DETERMINISTIC PACKAGING ENGINE FOR SPA / CLINIC VIDEOS"
    },
    {
      "name": "spa-edit/SKILL.md",
      "type": "Markdown Spec",
      "skill": "Kỹ năng Edit Video cho Spa (Spa-Edit V7.2)",
      "mtime": 1792654734.9885042,
      "mtime_formatted": "22/10/2026 14:38",
      "detail": "50 dòng • 2 mục chính"
    },
    {
      "name": "motion_catalog.json",
      "type": "Database JSON",
      "skill": "Motion Catalog + Brand 2-Tier",
      "mtime": 1792649346.247142,
      "mtime_formatted": "22/10/2026 13:09",
      "detail": "16 archetypes + BRAND/OUTRO 01-03"
    },
    {
      "name": "motion/SKILL.md",
      "type": "Markdown Spec",
      "skill": "Motion Studio 60fps (Universal Archetypes)",
      "mtime": 1792649320.7499917,
      "mtime_formatted": "22/10/2026 13:08",
      "detail": "127 dòng • 5 mục chính"
    },
    {
      "name": "auto-edit-video/SKILL.md",
      "type": "Markdown Spec",
      "skill": "Auto Edit Video V3 (Talking-Head Studio)",
      "mtime": 1792649310.801881,
      "mtime_formatted": "22/10/2026 13:08",
      "detail": "177 dòng • 7 mục chính"
    },
    {
      "name": "evolution_log.json",
      "type": "Evolution Registry",
      "skill": "Auto-Evolve Hub",
      "mtime": 1792649080.1915762,
      "mtime_formatted": "22/10/2026 13:04",
      "detail": "1 quy chuẩn • 6 studios"
    },
    {
      "name": "compositions/VietUniversalCTA.tsx",
      "type": "Remotion .TSX",
      "skill": "Remotion Studio 60fps",
      "mtime": 1792640862.648815,
      "mtime_formatted": "22/10/2026 10:47",
      "detail": "431 dòng • Composition"
    },
    {
      "name": "compositions/VietScientificAtlas.tsx",
      "type": "Remotion .TSX",
      "skill": "Remotion Studio 60fps",
      "mtime": 1792578351.8349109,
      "mtime_formatted": "21/10/2026 17:25",
      "detail": "584 dòng • Composition"
    },
    {
      "name": "render-v3/SKILL.md",
      "type": "Markdown Spec",
      "skill": "Render V3 (Delta Patcher & EDL Engine)",
      "mtime": 1792573717.9993098,
      "mtime_formatted": "21/10/2026 16:08",
      "detail": "63 dòng • 2 mục chính"
    },
    {
      "name": "scripts/qa_lint.py",
      "type": "Python Script",
      "skill": "Render V3 (Delta Patcher & EDL Engine)",
      "mtime": 1792573612.5904448,
      "mtime_formatted": "21/10/2026 16:06",
      "detail": "qa_lint.py — Deterministic Post-Plan & Pre-Render Verifier (MFX V4.0 — CLAUDE2 Council Edition)"
    },
    {
      "name": "scripts/mfx_v3_universal_engine.py",
      "type": "Python Script",
      "skill": "Render V3 (Delta Patcher & EDL Engine)",
      "mtime": 1792573554.1729004,
      "mtime_formatted": "21/10/2026 16:05",
      "detail": "mfx_v3_universal_engine.py — Động Cơ Kết Xuất Video MFX V3.2 (2-Pass Low-RAM Streaming)"
    },
    {
      "name": "scripts/mfx_v3_universal_engine.py",
      "type": "Python Script",
      "skill": "Auto Edit Video V3 (Talking-Head Studio)",
      "mtime": 1792564981.4453545,
      "mtime_formatted": "21/10/2026 13:43",
      "detail": "mfx_v3_universal_engine.py — Động Cơ Kết Xuất Video MFX V3.2 (2-Pass Low-RAM Streaming)"
    },
    {
      "name": "scripts/edl_bootstrap.py",
      "type": "Python Script",
      "skill": "Render V3 (Delta Patcher & EDL Engine)",
      "mtime": 1792564359.1456294,
      "mtime_formatted": "21/10/2026 13:32",
      "detail": "edl_bootstrap.py — Khởi Tạo Nhanh EDL JSON & Contact Sheet Cho Luồng Trực Tiếp Antigravity"
    },
    {
      "name": "scripts/spine_map_mgb02.py",
      "type": "Python Script",
      "skill": "Render V3 (Delta Patcher & EDL Engine)",
      "mtime": 1792564359.143949,
      "mtime_formatted": "21/10/2026 13:32",
      "detail": "spine_map_mgb02.py — Bộ Dựng Vertical Linear Spine Map (MG-B02 V2)"
    },
    {
      "name": "scripts/atlas_2d_helper.py",
      "type": "Python Script",
      "skill": "Render V3 (Delta Patcher & EDL Engine)",
      "mtime": 1792564359.1417499,
      "mtime_formatted": "21/10/2026 13:32",
      "detail": "atlas_2d_helper.py — Bộ Dựng Bản Vẽ Khoa Học 2D (Scientific Atlas Style V2)"
    },
    {
      "name": "scripts/scientific_atlas_builder.py",
      "type": "Python Script",
      "skill": "Auto Edit Video V3 (Talking-Head Studio)",
      "mtime": 1792563279.9291606,
      "mtime_formatted": "21/10/2026 13:14",
      "detail": "Scientific Atlas Style V2 — 3 cảnh trám khoa học cho thamtho_goc.mp4."
    },
    {
      "name": "scripts/v3_motion_library.py",
      "type": "Python Script",
      "skill": "Auto Edit Video V3 (Talking-Head Studio)",
      "mtime": 1792559252.5198178,
      "mtime_formatted": "21/10/2026 12:07",
      "detail": "scripts/v3_motion_library.py — Engine Thư Viện 16 Kiểu Motion Graphic Chủ Lực V3,"
    },
    {
      "name": "scripts/build_motion_showcase.py",
      "type": "Python Script",
      "skill": "Auto Edit Video V3 (Talking-Head Studio)",
      "mtime": 1792466746.620185,
      "mtime_formatted": "20/10/2026 10:25",
      "detail": "build_motion_showcase.py"
    },
    {
      "name": "fedu-media-pipeline/SKILL.md",
      "type": "Markdown Spec",
      "skill": "FEDU Media Pipeline (Tổng Thể)",
      "mtime": 1792459300.6442873,
      "mtime_formatted": "20/10/2026 08:21",
      "detail": "47 dòng • 5 mục chính"
    },
    {
      "name": "scripts/scaffold_motion_project.py",
      "type": "Python Script",
      "skill": "Motion Studio 60fps (Universal Archetypes)",
      "mtime": 1792458344.8328738,
      "mtime_formatted": "20/10/2026 08:05",
      "detail": "scaffold_motion_project.py — Trình khởi tạo tự động dự án Motion Graphic 60fps từ Video Nói + SRT."
    },
    {
      "name": "compositions/VietMasterClassPower10s.tsx",
      "type": "Remotion .TSX",
      "skill": "Remotion Studio 60fps",
      "mtime": 1792421279.6582208,
      "mtime_formatted": "19/10/2026 21:47",
      "detail": "1061 dòng • Composition"
    },
    {
      "name": "scripts/extract_beat_timeline.py",
      "type": "Python Script",
      "skill": "Motion Studio 60fps (Universal Archetypes)",
      "mtime": 1792420389.93253,
      "mtime_formatted": "19/10/2026 21:33",
      "detail": "Bước 1 — Bóc tách Thoại & Sóng âm (extract_beat_timeline.py)"
    },
    {
      "name": "scripts/compose_voicesafe_sfx.py",
      "type": "Python Script",
      "skill": "Motion Studio 60fps (Universal Archetypes)",
      "mtime": 1792420389.9319584,
      "mtime_formatted": "19/10/2026 21:33",
      "detail": "Bước 3 — Tổng hợp SFX 4 Lớp Voice-Safe (compose_voicesafe_sfx.py)"
    },
    {
      "name": "scripts/verify_motion_deliverable.py",
      "type": "Python Script",
      "skill": "Motion Studio 60fps (Universal Archetypes)",
      "mtime": 1792420389.9314952,
      "mtime_formatted": "19/10/2026 21:33",
      "detail": "Bước 5 — Kiểm định Tất Định Sản Phẩm Motion Graphic (verify_motion_deliverable.py)"
    },
    {
      "name": "compositions/VietCleanV3_10s.tsx",
      "type": "Remotion .TSX",
      "skill": "Remotion Studio 60fps",
      "mtime": 1792339304.3798175,
      "mtime_formatted": "18/10/2026 23:01",
      "detail": "1416 dòng • Composition"
    },
    {
      "name": "compositions/VietClaudeMotionRiso10s.tsx",
      "type": "Remotion .TSX",
      "skill": "Remotion Studio 60fps",
      "mtime": 1792336208.1104136,
      "mtime_formatted": "18/10/2026 22:10",
      "detail": "847 dòng • Composition"
    },
    {
      "name": "compositions/PinterestViet9x16.tsx",
      "type": "Remotion .TSX",
      "skill": "Remotion Studio 60fps",
      "mtime": 1792336060.930044,
      "mtime_formatted": "18/10/2026 22:07",
      "detail": "2700 dòng • Composition"
    },
    {
      "name": "compositions/VietContinuity10s.tsx",
      "type": "Remotion .TSX",
      "skill": "Remotion Studio 60fps",
      "mtime": 1792310964.923237,
      "mtime_formatted": "18/10/2026 15:09",
      "detail": "2119 dòng • Composition"
    },
    {
      "name": "compositions/VietSemanticEra27s.tsx",
      "type": "Remotion .TSX",
      "skill": "Remotion Studio 60fps",
      "mtime": 1792306909.2777445,
      "mtime_formatted": "18/10/2026 14:01",
      "detail": "3058 dòng • Composition"
    }
  ]
};

// =========================================================================
// 1. RENDER 35 KIỂU CHỮ XÂY KÊNH (#live-35-styles-table)
// =========================================================================
window.renderStylesGrid = function(containerId, profileFilter = 'all') {
  const container = document.getElementById(containerId);
  if (!container || !window.SKILL_LIVE_DATA) return;
  
  const styles = window.SKILL_LIVE_DATA.styles || [];
  const filtered = (profileFilter === 'all') 
    ? styles 
    : styles.filter(s => s.profile === profileFilter || s.set === profileFilter);
    
  let html = `
    <div style="margin-bottom:14px; display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
      <span style="font:600 12.5px var(--sans); color:var(--mute);">Lọc theo nhóm:</span>
      <button type="button" onclick="window.renderStylesGrid('${containerId}', 'all')" style="font:600 12px var(--sans); padding:4px 10px; border-radius:6px; border:1px solid #cbd5e1; background:${profileFilter === 'all' ? '#0f172a' : '#fff'}; color:${profileFilter === 'all' ? '#fff' : '#0f172a'}; cursor:pointer;">Tất cả (35)</button>
      <button type="button" onclick="window.renderStylesGrid('${containerId}', 'editorial_pro')" style="font:600 12px var(--sans); padding:4px 10px; border-radius:6px; border:1px solid #cbd5e1; background:${profileFilter === 'editorial_pro' ? '#0f172a' : '#fff'}; color:${profileFilter === 'editorial_pro' ? '#fff' : '#0f172a'}; cursor:pointer;">Chuyên gia</button>
      <button type="button" onclick="window.renderStylesGrid('${containerId}', 'lifestyle')" style="font:600 12px var(--sans); padding:4px 10px; border-radius:6px; border:1px solid #cbd5e1; background:${profileFilter === 'lifestyle' ? '#0f172a' : '#fff'}; color:${profileFilter === 'lifestyle' ? '#fff' : '#0f172a'}; cursor:pointer;">Đời sống</button>
      <button type="button" onclick="window.renderStylesGrid('${containerId}', 'hoc_vien_youtube')" style="font:600 12px var(--sans); padding:4px 10px; border-radius:6px; border:1px solid #cbd5e1; background:${profileFilter === 'hoc_vien_youtube' ? '#0f172a' : '#fff'}; color:${profileFilter === 'hoc_vien_youtube' ? '#fff' : '#0f172a'}; cursor:pointer;">Học viên</button>
      <button type="button" onclick="window.renderStylesGrid('${containerId}', 'case_study')" style="font:600 12px var(--sans); padding:4px 10px; border-radius:6px; border:1px solid #cbd5e1; background:${profileFilter === 'case_study' ? '#0f172a' : '#fff'}; color:${profileFilter === 'case_study' ? '#fff' : '#0f172a'}; cursor:pointer;">Case Study</button>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:14px;">
  `;
  
  filtered.forEach(s => {
    const borderLeftColor = s.c1 || '#0f172a';
    html += `
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-left:4px solid ${borderLeftColor}; border-radius:10px; padding:12px 14px; box-shadow:0 1px 3px rgba(15,23,42,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font:700 11px var(--mono); color:#b45309; background:#fef3c7; padding:2px 7px; border-radius:4px;">#${String(s.id).padStart(2, '0')}</span>
          <span style="font:600 11.5px var(--sans); color:var(--mute);">${s.package_name || s.set}</span>
        </div>
        <div style="background:#0f172a; border-radius:8px; padding:10px 12px; margin-bottom:8px; text-align:center;">
          <div style="font:700 17px/1.2 var(--sans); color:${s.c1 || '#fff'};">${s.l1 || s.name}</div>
          <div style="font:500 12.5px/1.3 var(--serif); color:${s.c2 || '#cbd5e1'}; margin-top:2px;">${s.l2 || ''}</div>
        </div>
        <div style="font:400 11.5px var(--mono); color:var(--mute); line-height:1.45;">
          <div>Font 1: <strong style="color:var(--ink2);">${s.f1 || 'FDAeonik'}</strong></div>
          <div>Font 2: <strong style="color:var(--ink2);">${s.f2 || 'SVN-Acta'}</strong></div>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  container.innerHTML = html;
};

// =========================================================================
// 2. RENDER 16 MOTION ARCHETYPES (#live-16-motions-grid)
// =========================================================================
window.renderMotionsGrid = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container || !window.SKILL_LIVE_DATA) return;
  
  const archetypes = window.SKILL_LIVE_DATA.motions.archetypes || [];
  let html = '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:14px;">';
  
  archetypes.forEach(m => {
    const sfxText = Array.isArray(m.default_sfx) ? m.default_sfx.join(', ') : (m.recommended_sfx || 'whoosh_soft');
    const descText = m.when_to_use || m.description || (m.motion_formula && m.motion_formula.description) || '';
    html += `
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:14px; box-shadow:0 1px 3px rgba(15,23,42,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font:700 12px var(--mono); color:#1d4ed8; background:#eff6ff; padding:2px 8px; border-radius:4px;">${m.id}</span>
          <span style="font:600 11.5px var(--mono); color:#15803d; background:#f0fdf4; padding:2px 7px; border-radius:4px;">${m.group || '60fps'}</span>
        </div>
        <h4 style="font:700 15px var(--sans); color:var(--ink); margin:0 0 4px;">${m.vi_name || m.name}</h4>
        <div style="font:500 11.5px var(--mono); color:var(--mute); margin-bottom:6px;">${m.name}</div>
        <p style="font:400 13px/1.45 var(--sans); color:var(--ink2); margin:0 0 10px;">${descText}</p>
        <div style="font:500 11.5px var(--mono); color:var(--mute); background:#f8fafc; border:1px solid #e2e8f0; padding:4px 8px; border-radius:6px;">
          🔊 SFX: <strong style="color:#0f172a;">${sfxText}</strong>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  container.innerHTML = html;
};

// =========================================================================
// 3. RENDER 5 PROFILES XÂY KÊNH (#live-5-profiles-grid)
// =========================================================================
window.renderProfilesGrid = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container || !window.SKILL_LIVE_DATA) return;
  
  const profiles = window.SKILL_LIVE_DATA.profiles.profiles || {};
  let html = '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(290px, 1fr)); gap:16px;">';
  
  Object.values(profiles).forEach(p => {
    html += `
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; box-shadow:0 1px 3px rgba(15,23,42,0.04);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font:700 11px var(--mono); color:#7e22ce; background:#faf5ff; border:1px solid #e9d5ff; padding:2px 8px; border-radius:4px;">${p.profile_id}</span>
        </div>
        <h3 style="font:700 16px/1.3 var(--sans); color:var(--ink); margin:0 0 6px;">${p.display_name}</h3>
        <p style="font:400 13.5px/1.5 var(--sans); color:var(--ink2); margin:0 0 12px;">${p.description}</p>
        <div style="border-top:1px solid #f1f5f9; padding-top:10px; font:400 12px var(--sans); color:var(--mute); line-height:1.55;">
          <div>🎨 <strong>Chữ chính:</strong> ${p.typography?.title?.font_family || 'FD Integral'} (${p.typography?.title?.color || '#FFFFFF'})</div>
          <div>🎬 <strong>Tần suất B-Roll:</strong> ${p.broll_frequency || 'Mỗi 3-4s'}</div>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  container.innerHTML = html;
};

// =========================================================================
// 4. TỰ ĐỘNG ĐIỀN DỮ LIỆU KHI TẢI TRANG (AUTO POPULATE)
// =========================================================================
function autoPopulateSkillContainers() {
  if (document.getElementById('live-5-profiles-grid')) {
    window.renderProfilesGrid('live-5-profiles-grid');
  }
  if (document.getElementById('live-profiles-grid')) {
    window.renderProfilesGrid('live-profiles-grid');
  }
  if (document.getElementById('live-35-styles-table')) {
    window.renderStylesGrid('live-35-styles-table', 'all');
  }
  if (document.getElementById('live-16-motions-grid')) {
    window.renderMotionsGrid('live-16-motions-grid');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoPopulateSkillContainers);
} else {
  autoPopulateSkillContainers();
}
window.addEventListener('load', autoPopulateSkillContainers);
