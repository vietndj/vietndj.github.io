/**
 * skill_live_data.js - DỮ LIỆU SỐNG TỰ ĐỘNG ĐỒNG BỘ CHO VIDEOAI.FEDU.VN
 * Sinh tự động bởi sync_videoai.py vào lúc: 24/10/2026 15:12:58
 * Chuẩn màu sắc sáng giấy ấm (#FDFCF9), tích hợp với hub.js và style.css của kenh.fedu.vn
 */

window.SKILL_LIVE_DATA = {
  "last_synced_formatted": "24/10/2026 15:12:58",
  "last_synced_iso": "2026-10-24T15:12:58.588847",
  "summary": {
    "styles_count": 35,
    "motions_count": 16,
    "sfx_presets_count": 16,
    "profiles_count": 5,
    "presets_count": 8,
    "compositions_count": 18,
    "components_count": 22,
    "scripts_count": 55,
    "skills_count": 7,
    "studios_count": 14,
    "evolution_entries_count": 10
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
        "source": "studio_ai_hook_display_transition.html",
        "slug": "studio-ai-hook-display-transition.html",
        "order": -6,
        "icon": "🖥️",
        "title": "Studio AI Hook DISPLAY TRANSITION: Dolly-In 2.5D Xuyên Màn Hình Studio Display 9:16 (2.00s)",
        "badge": "AI Hook Preset: display-transition • Kling #19 (TOP 2) • PASS 6/6 Gates",
        "badge_class": "motion",
        "desc": "Đối chiếu trực tiếp ① Video Mẫu Tham Chiếu Kling #19 (19_display_transition_4e204c1b.mp4 — TOP 2 toàn bảng) và ② Video Kết Quả Master trên footageai1.mp4 (footageai1_display_transition_web.mp4 — Toàn cảnh bàn làm việc Luxury Studio phát live 4K F00..F20, 2.5D Homography Dolly-In xuyên màn hình F21..F47 và khóa Passthrough 100% F48+, SSIM-Y 0.9967, Zero Bezel Ghosting)."
      },
      {
        "source": "studio_ai_hook_intermission.html",
        "slug": "studio-ai-hook-intermission.html",
        "order": -5,
        "icon": "🎭",
        "title": "Studio AI Hook INTERMISSION: Rèm Nhung Đỏ Sân Khấu 2.5D Mở Cảnh Nhảy Đáp Đất (2.00s)",
        "badge": "AI Hook Preset: intermission • Kling #52 Stage Curtain • PASS 6/6 Gates",
        "badge_class": "editorial",
        "desc": "Đối chiếu trực tiếp ① Video Mẫu Tham Chiếu Kling #52 (52_intermission_356a82dc.mp4) và ② Video Kết Quả Master trên footageai3.mp4 (footageai3_intermission_web.mp4 — Rèm nhung đỏ đóng kín che pha cúi lấy đà F00..F32, kéo toạc F33..F47 đúng đỉnh nhảy F36 và khóa Passthrough 100% F48+, SSIM-Y 0.9983, PSNR 53.13 dB)."
      },
      {
        "source": "studio_katana_batch4_archive.html",
        "slug": "studio-katana-batch4-archive.html",
        "order": -4,
        "icon": "🗂️",
        "title": "[LƯU TRỮ — CHƯA VÀO SKILL] Katana Tier 1 Batch 4: #05 Pink HUD, #01 Pantone (fa3) & #19 Pop Cutout",
        "badge": "⚠️ CHƯA CHO VÀO SKILL • Backup KHOAI: 01dd4bdf & fda99ac3",
        "badge_class": "case",
        "desc": "Bản thử nghiệm lưu trữ (chưa đưa vào skill ai-hook theo đánh giá của anh Việt): 3 hiệu ứng Batch 4 trên bộ AItest2 (#05 Pink Protocol HUD fa2, #01 Color Palette fa3, #19 Pop Cutout fa1 — PASS 6/6 Gates, G0 SSIM 0.9944–0.9964). Đã backup luồng gốc lên khoai.fedu.vn/c/01dd4bdf để sau này cần thì tìm lại và đóng gói sau."
      },
      {
        "source": "studio_ai_hook_jib_down.html",
        "slug": "studio-ai-hook-jib-down.html",
        "order": -3,
        "icon": "🏗️",
        "title": "Studio AI Hook JIB-DOWN: Hạ Cần Cẩu Máy Quay 3D Parallax Từ Vòm Cây Xuống Ngang Mắt (2.30s)",
        "badge": "AI Hook Preset: jib-down • 3D Veo Parallax + Vertical-Jib Verifier",
        "badge_class": "motion",
        "desc": "Đối chiếu trực tiếp 2 Case Study thực chiến của preset jib-down (2.30s): ① Công viên tán cây xanh (viet2210_jib_down_master.mp4 — SSIM 0.9923) và ② Khu hồ bơi, hàng cọ & tòa tháp chung cư 3D Parallax (footageai1_jib_down_web.mp4 — SSIM 0.9846, vp 0.91–0.94, sc 0.99–1.00, PASS 10/10 Gates)."
      },
      {
        "source": "studio_ai_hook_sticker_transition.html",
        "slug": "studio-ai-hook-sticker-transition.html",
        "order": -2,
        "icon": "🏷️",
        "title": "Studio AI Hook STICKER TRANSITION: Bóc Sticker 3D & Phóng Match-Cut (2.15s)",
        "badge": "AI Hook Preset: sticker-transition • Higgsfield Transitions #06",
        "badge_class": "motion",
        "desc": "Đối chiếu trực tiếp ① Video Mẫu Gốc Higgsfield Transitions (06_Sticker_Match_Cut.mp4) và ② Video Kết Quả Master của anh Việt (viet2210_sticker_transition_master.mp4 — SSIM 0.9983, ΔE00 0.043, 0% Halo, PASS 5/5 Gates)."
      },
      {
        "source": "studio_ai_hook_pantone1.html",
        "slug": "studio-ai-hook-pantone1.html",
        "order": -1,
        "icon": "🎨",
        "title": "Studio AI Hook PANTONE 1: Vòng Quạt Màu Pantone & 3 Thẻ Màu Nghiêng (2.40s)",
        "badge": "AI Hook Preset: pantone1 • Ref #326c512a",
        "badge_class": "editorial",
        "desc": "Đối chiếu trực tiếp Video Mẫu Gốc Higgsfield Katana (#326c512a) và Video Kết Quả Master của anh Việt (viet2210_katana_palette_master.mp4 — SSIM 0.9977, ΔE00 0.459, 0% Halo, PASS 5/5 Gates)."
      },
      {
        "source": "suiplay_launch_motion_studio.html",
        "slug": "studio-suiplay-launch.html",
        "order": 0,
        "icon": "🚀",
        "title": "Studio Khuôn Số 6: Trailer Kinetic & 3D Portal 60fps (16:9 & 9:16)",
        "badge": "Khuôn .TSX Số 6 • 16:9 & 9:16 • 60fps",
        "badge_class": "motion",
        "desc": "Đúc từ mẫu Pinterest SuiPlay 0X1 (20.03s / 1.202 frames @ 60fps): Giữ nguyên nhạc gốc, khớp 10 điểm chữ Tiếng Việt (Định nghĩa lại → Edit Video với AI → offline.fedu.vn), Khung Thiết Bị 3D 14 lớp Zoom-Through và 16 cảnh video thực tế cắt theo nhịp trống."
      },
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
      },
      {
        "source": "before_after_10_styles_studio.html",
        "slug": "studio-before-after-10-styles-studio.html",
        "order": 7,
        "icon": "🎛️",
        "title": "Before/After Video Studio v2.2 — 10 Kiểu Nền × 35 Kiểu Chữ × Mô Tả Nội Dung Video",
        "badge": "Auto-Detected Studio",
        "badge_class": "motion",
        "desc": "Phòng Studio tương tác tự động phát hiện từ before_after_10_styles_studio.html."
      }
    ],
    "entries": [
      {
        "id": "ai-hook-display-transition-kling19",
        "date": "2026-10-24",
        "title": "AI Hook Preset 'display-transition': Dolly-In 2.5D Xuyên Màn Hình Studio Display 9:16 2.00s & Hệ Thống Zero-Collision Registry v3.0 (Kỹ năng ai-hook)",
        "step_target": [
          "dinh-dang",
          "buoc-1",
          "buoc-4"
        ],
        "source_thread": "a1455f3c-0e7d-4f0c-bb7b-2ac992834a1f",
        "studio_file": "studio_ai_hook_display_transition.html",
        "what_title": "Toàn cảnh bàn làm việc Luxury Studio phát live 4K (F00..F20) → 2.5D Homography Dolly-In xuyên màn hình (F21..F47) → Khóa Passthrough 100% F48+ & Nâng cấp Zero-Collision Registry v3.0",
        "what": "Chế độ Hook mới <strong><code>display-transition</code></strong> (aliases: <code>kling-19</code>, <code>studio-display</code>, <code>xuyen-man-hinh</code> &mdash; <code>2.00s</code> @ 24fps) trong kỹ năng <strong><code>ai-hook</code></strong>: Mở màn từ bàn làm việc Luxury Executive Studio hiện đại có chiếc màn hình dọc <strong>Apple Studio Display 9:16</strong> đang phát trực tiếp (<code>live feed</code>) video 4K gốc (<code>F_src = 65 + F_out</code>) kèm phản xạ kính và ánh sáng màn hình hắt xuống mặt bàn gỗ óc chó ở <code>F00..F20</code>; thực hiện cú <strong>2.5D Homography Dolly-In xuyên qua viền màn hình</strong> theo đường cong <code>easeInOutCubic</code> từ <code>F21..F47</code> (warp trực tiếp từ layer 4K gốc <code>2160x3840</code>, không thu nhỏ rồi phóng to lại!) và từ <code>F48 (2.000s)</code> trở đi <strong>Passthrough 100% frame gốc</strong> (<code>min SSIM-Y = 0.9956 &ge; 0.995</code>, <code>mean SSIM-Y = 0.9967</code>) ngay trước khi anh Việt mở miệng nói tại <code>F57 (2.375s)</code>. Đồng thời nâng cấp toàn bộ kỹ năng <code>ai-hook</code> lên <strong>Zero-Collision Modular Registry v3.0 (<code>hooks.d/*.json</code> + <code>register_hook.py</code> khóa nguyên tử <code>fcntl.flock</code>)</strong> để các luồng cập nhật song song không bao giờ ghi đè lên nhau.",
        "why_title": "Vì sao phải Warp Homography trực tiếp từ 4K gốc và dùng Zero-Collision Registry hooks.d/?",
        "why": "1) Nếu thu nhỏ video vào chiếc màn hình nhỏ trên bàn làm việc rồi phóng to tấm ảnh tổng hợp đó lên, nội dung bên trong màn hình sẽ bị vỡ nét nặng và viền màn hình khi qua Radial Blur sẽ để lại bóng ma đồng tâm. Khi <strong>warp trực tiếp từ layer 4K gốc bằng ma trận Homography 4 đỉnh</strong> và chỉ áp dụng <code>Peripheral Radial Blur</code> lên không gian phòng xung quanh trước khi ghép màn hình, hình ảnh nét căng 100% từ giây đầu đến lúc khóa <code>F48</code>. <br>2) Khi cập nhật liên tục nhiều Hook mới từ các luồng song song, việc sửa chung <code>hooks_registry.json</code> và <code>ai_hook_engine.py</code> từng làm đè mất 4 Hook. Chuyển sang kiến trúc <strong><code>hooks.d/&lt;id&gt;.json</code> + <code>register_hook.py</code> (khóa <code>fcntl.flock</code> + Monotonic Guard + Orphan Engine Detector)</strong> chấm dứt vĩnh viễn lỗi đè file.",
        "how_title": "Gọi tự nhiên DISPLAY TRANSITION / XUYÊN MÀN HÌNH hoặc chạy CLI 1 chạm",
        "how_intro": "Gọi trực tiếp bằng câu tự nhiên ('DISPLAY TRANSITION : <video>', 'XUYÊN MÀN HÌNH : <video>') hoặc chạy lệnh CLI của ai-hook:",
        "how_cmd": "python3 ~/.gemini/config/skills/ai-hook/scripts/ai_hook_engine.py --video \"/Users/vietmac/Documents/AItest2/footageai1.mp4\" --preset display-transition",
        "local_videos_title": "🎬 Đối Chiếu Trực Tiếp: ① Video Mẫu Tham Chiếu Kling #19 (19_display_transition_4e204c1b.mp4) &rarr; ② Video Kết Quả Master (footageai1_display_transition_web.mp4)",
        "local_videos_badge": "2.5D Studio Display Portal • 1080×1920 @ 24fps • PASS 6/6 CLAUDE2 Gates (SSIM-Y 0.9967)",
        "local_videos": [
          {
            "src": "studios/19_display_transition_4e204c1b.mp4",
            "fallback_url": "studios/19_display_transition_4e204c1b.mp4",
            "badge": "① VIDEO MẪU GỐC KLING #19 (19_DISPLAY_TRANSITION_4E204C1B.MP4)",
            "title": "Mẫu tham chiếu Higgsfield Kling R02 #19 Display Transition (TOP 2)",
            "desc": "Cơ chế gốc: Toàn cảnh bàn làm việc hiện đại với chiếc màn hình đang phát trực tiếp nội dung video, sau đó camera đẩy xuyên qua viền màn hình vào thẳng cảnh thật."
          },
          {
            "src": "studios/footageai1_display_transition_web.mp4",
            "fallback_url": "studios/footageai1_display_transition_web.mp4",
            "badge": "② VIDEO KẾT QUẢ MASTER (FOOTAGEAI1_DISPLAY_TRANSITION • PASS 6/6 GATES)",
            "title": "Master: r02_display_transition_master.mp4 (Studio Desk Live 4K F00..F20 → Homography Dolly-In F21..F47 → Khóa F48+)",
            "desc": "Toàn cảnh bàn làm việc Luxury Studio phát live 4K trên màn hình Apple Studio Display 9:16 (F00..F20), warp trực tiếp từ layer 4K gốc bằng Homography 4 đỉnh (F21..F47, 0% Bezel Ghosting) và khóa Passthrough 100% từ F48 (min SSIM-Y = 0.9956, mean = 0.9967) kèm Glass Portal Whoosh + 52Hz Screen Lock Thud."
          }
        ],
        "items": [
          {
            "tier": "1. Ba Pha Hình Học 2.5D Homography Direct-4K (display_transition_engine.py)",
            "code": "PHA 1 (F00..F20)",
            "name": "Luxury Studio Desk Live 4K Feed (F_src 65..85) Kèm Glass Glare & Desk Spill",
            "desc": "Cắt bỏ 65 frames chuẩn bị đầu tiên (F_src=65 làm F_out=0). Bàn làm việc gỗ óc chó hiện đại đặt màn hình dọc Apple Studio Display 9:16 phát trực tiếp frame 4K kèm ánh sáng màn hình hắt xuống mặt bàn."
          },
          {
            "tier": "1. Ba Pha Hình Học 2.5D Homography Direct-4K (display_transition_engine.py)",
            "code": "PHA 2 (F21..F47)",
            "name": "Direct-4K 4-Corner Homography Dolly-In & Peripheral Radial Blur (Zero Bezel Ghosting)",
            "desc": "4 đỉnh màn hình mở rộng theo hàm easeInOutCubic khớp khít 1080x1920 tại F47; warp trực tiếp từ frame 4K (2160x3840) bằng cv2.getPerspectiveTransform; làm nhòe hướng tâm 14 bước chỉ trên nền phòng trước khi ghép màn hình."
          },
          {
            "tier": "1. Ba Pha Hình Học 2.5D Homography Direct-4K (display_transition_engine.py)",
            "code": "PHA 3 (F48+)",
            "name": "100% Pixel Passthrough Lock Tại F48 (2.000s) Trước Khi Mở Lời Tại F57 (2.375s)",
            "desc": "Từ F48 (F_src=113) trở đi passthrough 100% frame gốc với ma trận màu BT.709 chuẩn xác (Lossless SSIM-Y = 1.0, Delivered MP4 min SSIM-Y = 0.9956 >= 0.995, mean = 0.9967)."
          },
          {
            "tier": "2. Kiến Trúc Zero-Collision Modular Registry v3.0 Cho Kỹ Năng ai-hook (Hội Ý CLAUDE2)",
            "code": "HOOKS.D + FLOCK",
            "name": "15 Files hooks.d/<id>.json Độc Lập + register_hook.py (Monotonic Guard & Orphan Detector)",
            "desc": "Chấm dứt lỗi nhiều luồng song song ghi đè hooks_registry.json & ai_hook_engine.py: Mỗi hook là 1 file riêng trong hooks.d/, biên dịch dưới khóa fcntl.flock, chặn tự động nếu thiếu bất kỳ hook cũ nào và khôi phục đủ 15/15 hooks."
          }
        ],
        "asset_dir": "display_transition_kling19",
        "showcase_title": "🖼️ Bảng Kiểm Định 12 Keyframes R02 #19 Display Transition (F00 → F57)",
        "showcase_badge": "Chuẩn A1455F3C • Hội Ý CLAUDE2 • VERDICT: PASS 6/6 GATES",
        "preview_images": [
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/qa_footageai1_display_transition_sheet.jpg",
            "caption": "Contact Sheet 12 Keyframes (qa_footageai1_display_transition_sheet.jpg): Bàn làm việc Luxury Studio phát live 4K F00..F20 → 2.5D Homography Dolly-In F21..F47 (0% Bezel Ghosting) → Khóa Passthrough 100% tại F48 (SSIM-Y 0.9967)",
            "web_src": "assets/display_transition_kling19/qa_footageai1_display_transition_sheet.jpg"
          }
        ],
        "tech_specs": [
          "Engine lõi: ~/.gemini/config/skills/ai-hook/scripts/display_transition_engine.py (khai báo tại ~/.gemini/config/skills/ai-hook/hooks.d/display-transition.json).",
          "Quản lý Registry nguyên tử v3.0: ~/.gemini/config/skills/ai-hook/scripts/hookreg.py & ~/.gemini/config/skills/ai-hook/scripts/register_hook.py (rebuild / audit --strict / upsert-videoai).",
          "Âm thanh Studio: ~/.gemini/config/skills/ai-hook/assets/sfx_display_transition_2s.wav (Studio Ambient Hum -> 2.5D Glass Portal Dolly Whoosh @ 0.85s–1.95s -> 52Hz Screen Lock Thud @ 1.98s).",
          "Sản phẩm Master chuẩn: /Users/vietmac/Documents/CODE/AI VIDEO EDIT/higgsfield_kling/tier1_outputs/r02_display_transition/r02_display_transition_master.mp4 (Bản Web: /Users/vietmac/Documents/CODE/AI VIDEO EDIT/footageai1_display_transition_web.mp4)."
        ]
      },
      {
        "id": "ai-hook-intermission-stage-curtain",
        "date": "2026-10-24",
        "title": "AI Hook Preset 'intermission': Rèm Nhung Đỏ Sân Khấu 2.5D Mở Cảnh Nhảy Đáp Đất 2.00s (Kỹ năng ai-hook)",
        "step_target": [
          "dinh-dang",
          "buoc-1",
          "buoc-4"
        ],
        "source_thread": "9bd800ab-c268-4264-937e-6365641a0025",
        "studio_file": "studio_ai_hook_intermission.html",
        "what_title": "Rèm nhung đỏ sân khấu 2.5D đóng kín che pha cúi lấy đà (F00..F32), kéo toạc ở đỉnh nhảy trên không (F36) và khóa Passthrough 100% từ lúc chạm đất (F48+)",
        "what": "Chế độ Hook mới <strong><code>intermission</code></strong> (aliases: <code>stage-curtain</code>, <code>rem-nhung</code>, <code>rem-san-khau</code>, <code>kling-52</code> &mdash; <code>2.00s</code> @ 24fps) trong kỹ năng <strong><code>ai-hook</code></strong>: Đóng kín <strong>Rèm nhung đỏ sân khấu 2.5D</strong> (<code>Coverage = 100.0% &ge; 98%</code>) với nếp gấp nhung 3D chiaroscuro shading, viền tua rua vàng kim và bảng hiệu điện ảnh <code>INTERMISSION &middot; ACT I &middot; GRAND STAGE</code> ở <code>F00..F32</code> để giấu hoàn toàn lúc anh Việt cúi người lấy đà; khi anh Việt bật nhảy lên đỉnh không trung (<code>F35..F36 = 1.500s</code>) và lao xuống đáp đất, hai cánh rèm kéo toạc sang 2 bên theo hàm <strong>Critically Damped (&zeta; = 1.0) / easeOutQuart clamped</strong> (<code>F33..F47</code>, <code>Zero Overshoot = 0.0px</code>) và từ <code>F48 (2.000s)</code> trở đi <strong>Passthrough 100% pixel frame gốc</strong> (<code>SSIM-Y = 0.9983 &ge; 0.995</code>, <code>PSNR-Y = 53.13 dB</code>).",
        "why_title": "Vì sao dùng Rèm Nhung Đỏ 2.5D mở đúng đỉnh nhảy F36 cho footage có nhịp lấy đà nhảy?",
        "why": "Với các clip quay cảnh nhảy đáp đất tại chỗ (như <code>footageai3.mp4</code>), giây đầu tiên nhân vật phải cúi gập người lấy đà khiến khung hình mở đầu thiếu lực. Khi đóng kín rèm nhung đỏ sân khấu ở <code>F00..F32</code> rồi kéo toạc 2 cánh rèm đúng lúc cơ thể đang bay lơ lửng ở đỉnh <code>F36</code>, người xem chỉ nhìn thấy khoảnh khắc lao từ trên không xuống tiếp đất thẳng trục tại <code>F48</code> kèm tiếng <strong>Curtain Whoosh + 42Hz Landing Sub-Bass Thud</strong> cực kỳ uy lực, sau đó giữ nguyên 100% pixel gốc và giọng nói gốc từ <code>F68 (2.833s)</code>.",
        "how_title": "Gọi tự nhiên INTERMISSION / REM NHUNG hoặc chạy CLI 1 chạm với preset intermission",
        "how_intro": "Gọi trực tiếp bằng câu tự nhiên ('INTERMISSION : <video>', 'REM NHUNG : <video>') hoặc chạy lệnh CLI của ai-hook:",
        "how_cmd": "python3 ~/.gemini/config/skills/ai-hook/scripts/ai_hook_engine.py --video \"/Users/vietmac/Documents/AItest2/footageai3.mp4\" --preset intermission",
        "local_videos_title": "🎬 Đối Chiếu Trực Tiếp: ① Video Mẫu Tham Chiếu Kling #52 (52_intermission_356a82dc.mp4) &rarr; ② Video Kết Quả Master (footageai3_intermission_web.mp4)",
        "local_videos_badge": "Stage Velvet Curtain 2.5D • 1080×1920 @ 24fps • PASS 6/6 CLAUDE2 Gates (SSIM-Y 0.9983)",
        "local_videos": [
          {
            "src": "studios/52_intermission_356a82dc.mp4",
            "fallback_url": "studios/52_intermission_356a82dc.mp4",
            "badge": "① VIDEO MẪU GỐC KLING #52 (52_INTERMISSION_356A82DC.MP4)",
            "title": "Mẫu tham chiếu Higgsfield Kling R01 #52 Intermission",
            "desc": "Cơ chế gốc: Rèm nhung đỏ sân khấu đóng kín với chữ tiêu đề ở giữa rồi kéo mở sang hai bên để lộ ra chủ thể đang chuyển động ở trung tâm."
          },
          {
            "src": "studios/footageai3_intermission_web.mp4",
            "fallback_url": "studios/footageai3_intermission_web.mp4",
            "badge": "② VIDEO KẾT QUẢ MASTER (FOOTAGEAI3_INTERMISSION • PASS 6/6 GATES)",
            "title": "Master: footageai3_intermission_master.mp4 (Đóng rèm F00..F32 → Mở ở đỉnh nhảy F36 → Khóa F48+)",
            "desc": "Đóng kín rèm nhung đỏ 100% che pha cúi lấy đà (F00..F32), kéo toạc 2 cánh rèm Critically Damped (F33..F47, 0.0px overshoot) đúng đỉnh nhảy F36 và khóa Passthrough 100% từ F48 (SSIM-Y = 0.9983, PSNR = 53.13 dB) kèm Curtain Whoosh + 42Hz Sub-Bass Thud."
          }
        ],
        "items": [
          {
            "tier": "1. Ba Pha Vật Lý & Hình Học Của Rèm Nhung Đỏ 2.5D (intermission_curtain_engine.py)",
            "code": "PHA 1 (F00..F32)",
            "name": "Closed Velvet Curtain Hold (Coverage 100% >= 98%) Che Pha Cúi Lấy Đà",
            "desc": "Sóng vải sin-harmonic 3 tần số kết hợp Chiaroscuro 3D shading (Ambient Occlusion + Specular Velvet Sheen), tua rua vàng kim, diềm rèm hoàng gia và biển hiệu 'INTERMISSION • ACT I • GRAND STAGE'."
          },
          {
            "tier": "1. Ba Pha Vật Lý & Hình Học Của Rèm Nhung Đỏ 2.5D (intermission_curtain_engine.py)",
            "code": "PHA 2 (F33..F47)",
            "name": "Critically Damped Bilateral Pull (ζ = 1.0) Kéo Toạc Ở Đỉnh Nhảy F36",
            "desc": "Mở toạc 2 cánh rèm trong 15 frames (0.625s) theo hàm easeOutQuart clamped + dồn nếp vải (fabric bunching) + Directional Motion Blur ngang; thoát sạch khỏi khung tại F46..F47 với 0.0px overshoot."
          },
          {
            "tier": "1. Ba Pha Vật Lý & Hình Học Của Rèm Nhung Đỏ 2.5D (intermission_curtain_engine.py)",
            "code": "PHA 3 (F48+)",
            "name": "100% Pixel Passthrough Lock Từ Lúc Chạm Đất F48 & Mở Lời F68",
            "desc": "Từ F48 (2.000s) trở đi copy nguyên bản 100% pixel frame gốc (alpha = 0 tuyệt đối) và giữ chuẩn ma trận màu BT.709 Full-Range (min SSIM-Y = 0.9969, mean SSIM-Y = 0.9983, PSNR-Y = 53.13 dB)."
          },
          {
            "tier": "2. Kiểm Định 6 Cổng CLAUDE2 & Âm Thanh Sân Khấu (verify_intermission_curtain.py)",
            "code": "6 GATES G0..G5",
            "name": "G0 24fps CFR • G1 Landmarks • G2 Coverage • G3 Damping • G4 SSIM-Y • G5 Voice-Safe SFX",
            "desc": "Phối sẵn sfx_intermission_curtain_2s.wav (Stereo Curtain Whoosh + Cloth Rustle + 42Hz Landing Thud @ F48) với độ tương quan giọng nói gốc từ F68 đạt r = 0.999982."
          }
        ],
        "asset_dir": "intermission_stage_curtain",
        "showcase_title": "🖼️ Bảng Kiểm Định 12 Keyframes R01 #52 Intermission (F00 → F68)",
        "showcase_badge": "Chuẩn 9BD800AB • Hội Ý CLAUDE2 • VERDICT: PASS 6/6 GATES",
        "preview_images": [
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/qa_footageai3_intermission_sheet.jpg",
            "caption": "Contact Sheet 12 Keyframes (qa_footageai3_intermission_sheet.jpg): Đóng kín rèm nhung đỏ F00..F32 (Coverage 100%) → Kéo mở F33..F47 lộ đỉnh nhảy F36 → Chạm đất Passthrough 100% tại F48 (SSIM-Y 0.9983)",
            "web_src": "assets/intermission_stage_curtain/qa_footageai3_intermission_sheet.jpg"
          }
        ],
        "tech_specs": [
          "Engine lõi: ~/.gemini/config/skills/ai-hook/scripts/intermission_curtain_engine.py (tích hợp trong ai_hook_engine.py --preset intermission / stage-curtain / rem-nhung và hook_scanner.py).",
          "Bộ kiểm định 6 cổng CLAUDE2: ~/.gemini/config/skills/ai-hook/scripts/verify_intermission_curtain.py (PASS 6/6 cổng G0..G5).",
          "Âm thanh Studio: ~/.gemini/config/skills/ai-hook/assets/sfx_intermission_curtain_2s.wav (Stereo Curtain Whoosh + Cloth Foley + 42Hz Sub-Bass Thud @ 2.00s, Voice-Safe 100% từ F68).",
          "Sản phẩm Master chuẩn: /Users/vietmac/Documents/CODE/AI VIDEO EDIT/higgsfield_kling/tier1_outputs/r01_intermission/r01_intermission_master.mp4 (Bản Web: /Users/vietmac/Documents/CODE/AI VIDEO EDIT/footageai3_intermission_web.mp4)."
        ]
      },
      {
        "id": "katana-tier1-batch4-archive",
        "date": "2026-10-24",
        "title": "⚠️ [LƯU TRỮ THỬ NGHIỆM — CHƯA CHO VÀO SKILL] Katana Tier 1 Batch 4: #05 Pink Protocol HUD, #01 Color Palette & #19 Pop Cutout Fashion (AItest2)",
        "step_target": [
          "dinh-dang",
          "buoc-1",
          "buoc-4"
        ],
        "source_thread": "01dd4bdf-280b-40c1-98cb-888d0965a198",
        "studio_file": "studio_katana_batch4_archive.html",
        "what_title": "⚠️ Bản lưu trữ thử nghiệm Batch 4 (CHƯA ĐƯA VÀO SKILL ai-hook)",
        "what": "Bộ 3 hiệu ứng thuộc <strong>Batch 4 — Higgsfield Katana Tier 1</strong> chạy thử nghiệm trên bộ footage <code>AItest2</code>: <strong>(1) <code>b4_10_pink_protocol</code> (#05 Pink Protocol HUD — <code>fa2</code>, <code>SSIM 0.9944</code>)</strong>, <strong>(2) <code>b4_11_color_palette</code> (#01 Color Palette Pantone — <code>fa3</code>, <code>SSIM 0.9964</code>)</strong>, và <strong>(3) <code>b4_12_pop_cutout</code> (#19 Pop Cutout Fashion <code>\"WEAR THE EDGE\"</code> — <code>fa1</code>, <code>SSIM 0.9946</code>)</strong>. Cả 3 hiệu ứng đã vượt qua 6/6 cổng kỹ thuật (<code>G0..G5</code>) nhưng <strong><span style='color:#d97706;'>CHƯA ĐƯA VÀO SKILL <code>ai-hook</code></span></strong> vì anh Việt đánh giá hiệu ứng thị giác chưa thật sự ưng ý.",
        "why_title": "Lưu trữ kết quả trên videoai.fedu.vn & Backup luồng gốc trên khoai.fedu.vn để dùng khi cần",
        "why": "Theo chỉ đạo của anh Việt: <em>\"Cái này chưa ổn lắm tôi không thích cái này, tuy nhiên kết quả cũng đáng để lưu lại trên videoai.fedu.vn và ghi chú vào là chưa cho vào skill, luồng gốc backup lên khoai.fedu.vn sau này nếu cần tôi sẽ tìm đến và đóng gói sau\"</em>. Toàn bộ video thành phẩm, Contact Sheet, mã nguồn <code>katana_tier1/</code> và luồng hội thoại gốc (<a href='https://khoai.fedu.vn/c/01dd4bdf' target='_blank' rel='noopener'><strong>khoai.fedu.vn/c/01dd4bdf</strong></a> &bull; nhánh Batch 4 <a href='https://khoai.fedu.vn/c/fda99ac3' target='_blank' rel='noopener'><strong>khoai.fedu.vn/c/fda99ac3</strong></a>) được bảo toàn nguyên vẹn để tra cứu và đóng gói bất cứ lúc nào.",
        "how_title": "Truy vết luồng gốc KHOAI hoặc chạy lại script thử nghiệm cục bộ (Chưa tích hợp vào Skill)",
        "how_intro": "Mở trực tiếp luồng gốc trên KHOAI (https://khoai.fedu.vn/c/01dd4bdf) hoặc chạy script thử nghiệm riêng tại thư mục katana_tier1:",
        "how_cmd": "python3 \"/Users/vietmac/Documents/CODE/AI VIDEO EDIT/katana_tier1/run_batch_and_verify.py\" --batch 4",
        "local_videos_title": "🎬 Lưu Trữ 3 Video Thử Nghiệm Batch 4 Trên Bộ Footage AItest2 (⚠️ Ghi chú: Chưa đưa vào Skill ai-hook)",
        "local_videos_badge": "Archive Only (Not In Skill) • Backup KHOAI: /c/01dd4bdf & /c/fda99ac3",
        "local_videos": [
          {
            "src": "studios/b4_10_pink_protocol_fa2_web.mp4",
            "fallback_url": "studios/b4_10_pink_protocol_fa2_web.mp4",
            "badge": "① [ARCHIVE] #05 PINK PROTOCOL HUD (FA2 • SSIM 0.9944)",
            "title": "Thử nghiệm 10/12: b4_10_pink_protocol_fa2.mp4 (Chưa đưa vào Skill)",
            "desc": "Selective Rose Garment Isolation + Cyber Target HUD ('PINK_PROTOCOL // TARGET_LOCK') trên footageai2.mp4, khóa điểm đáp Frame #64 (2.67s, G0 SSIM 0.9944, G2 Mask IoU 0.9032)."
          },
          {
            "src": "studios/b4_11_color_palette_fa3_web.mp4",
            "fallback_url": "studios/b4_11_color_palette_fa3_web.mp4",
            "badge": "② [ARCHIVE] #01 COLOR PALETTE PANTONE (FA3 • SSIM 0.9964)",
            "title": "Thử nghiệm 11/12: b4_11_color_palette_fa3.mp4 (Bản thử trên fa3)",
            "desc": "Bản thử nghiệm Pantone Wheel & Tilted Swatch Cards trên footageai3.mp4 (ngồi xổm rồi đứng dậy bước tới), khóa điểm đáp Frame #68 (2.83s, G0 SSIM 0.9964, G1 ΔE 38.88)."
          },
          {
            "src": "studios/b4_12_pop_cutout_fa1_web.mp4",
            "fallback_url": "studios/b4_12_pop_cutout_fa1_web.mp4",
            "badge": "③ [ARCHIVE] #19 POP CUTOUT FASHION (FA1 • SSIM 0.9946)",
            "title": "Thử nghiệm 12/12: b4_12_pop_cutout_fa1.mp4 (Chưa đưa vào Skill)",
            "desc": "Bố cục Pop-Art Đỏ–Vàng–Đen kèm đại tự 'WEAR THE EDGE' sau lưng & 3-Slice Horizontal Cutout Assembly trên footageai1.mp4, khóa Frame #58 (2.42s, G0 SSIM 0.9946, G2 Mask IoU 0.9744)."
          }
        ],
        "items": [
          {
            "tier": "1. Trạng Thái Lưu Trữ & Liên Kết Luồng Gốc Trên KHOAI (Chưa Đóng Gói Vào Skill)",
            "code": "NOT IN SKILL",
            "name": "Ghi Chú Rõ: Chưa Cho Vào Skill ai-hook — Chỉ Lưu Trữ Kết Quả Tham Khảo",
            "desc": "3 hiệu ứng Batch 4 này chưa đạt độ ưng ý về thẩm mỹ của anh Việt nên KHÔNG thêm vào bảng chọn Smart AI Hook Router của skill ai-hook."
          },
          {
            "tier": "1. Trạng Thái Lưu Trữ & Liên Kết Luồng Gốc Trên KHOAI (Chưa Đóng Gói Vào Skill)",
            "code": "KHOAI 01DD4BDF",
            "name": "Luồng Gốc Đã Backup Lên khoai.fedu.vn/c/01dd4bdf & Nhánh /c/fda99ac3",
            "desc": "Toàn bộ lịch sử phân tích 98 mẫu Katana, kiến trúc CLAUDE2 và mã nguồn 12 hiệu ứng Tier 1 đã được backup lên KHOAI để sau này tìm lại và đóng gói nhanh."
          },
          {
            "tier": "2. Thông Số Kỹ Thuật 3 Hiệu Ứng Batch 4 Đã Lưu Trữ (katana_tier1/)",
            "code": "B4_10 • B4_11 • B4_12",
            "name": "#05 Pink Protocol (fa2) • #01 Color Palette (fa3) • #19 Pop Cutout (fa1)",
            "desc": "Đạt 6/6 cổng kỹ thuật G0..G5: b4_10 (F64, SSIM 0.9944), b4_11 (F68, SSIM 0.9964), b4_12 (F58, SSIM 0.9946). Mã nguồn giữ tại /Users/vietmac/Documents/CODE/AI VIDEO EDIT/katana_tier1/."
          }
        ],
        "asset_dir": "katana_batch4_archive",
        "showcase_title": "🖼️ Bảng Contact Sheet Lưu Trữ Thử Nghiệm Batch 4 (Chưa Đưa Vào Skill)",
        "showcase_badge": "⚠️ CHƯA CHO VÀO SKILL • Backup KHOAI: khoai.fedu.vn/c/01dd4bdf",
        "preview_images": [
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/qa_katana_batch4_sheet.jpg",
            "caption": "Contact Sheet Batch 4 (qa_katana_batch4_sheet.jpg): #05 Pink Protocol HUD (fa2), #01 Color Palette Pantone (fa3), #19 Pop Cutout Fashion (fa1) — Lưu trữ tham khảo, chưa đưa vào skill",
            "web_src": "assets/katana_batch4_archive/qa_katana_batch4_sheet.jpg"
          }
        ],
        "tech_specs": [
          "⚠️ TRẠNG THÁI SKILL: CHƯA ĐƯA VÀO SKILL (Archive Only) — Ghi chú theo yêu cầu của anh Việt để sau này cần thì tìm lại và đóng gói sau.",
          "🌐 Luồng gốc đã backup trên KHOAI: <a href='https://khoai.fedu.vn/c/01dd4bdf' target='_blank' rel='noopener'>https://khoai.fedu.vn/c/01dd4bdf</a> (Conversation ID: <code>01dd4bdf-280b-40c1-98cb-888d0965a198</code>).",
          "🌐 Luồng nhánh Batch 4 trên KHOAI: <a href='https://khoai.fedu.vn/c/fda99ac3' target='_blank' rel='noopener'>https://khoai.fedu.vn/c/fda99ac3</a> (Conversation ID: <code>fda99ac3-b5e5-4aa9-8fb9-3af5af2c0c8e</code>).",
          "📁 Mã nguồn thử nghiệm cục bộ: <code>/Users/vietmac/Documents/CODE/AI VIDEO EDIT/katana_tier1/render_katana_tier1.py</code>, <code>verify_katana_tier1.py</code>, <code>katana_tier1_plan.json</code>.",
          "🎬 Video gốc chất lượng cao (Lossless-grade): <code>/Users/vietmac/Documents/CODE/AI VIDEO EDIT/katana_tier1/outputs/b4_10_pink_protocol_fa2.mp4</code>, <code>b4_11_color_palette_fa3.mp4</code>, <code>b4_12_pop_cutout_fa1.mp4</code>."
        ]
      },
      {
        "id": "ai-hook-jib-down-vertical-crane",
        "date": "2026-10-24",
        "title": "AI Hook Preset 'jib-down': Hạ Cần Cẩu Máy Quay 3D Parallax Từ Vòm Cây/Tòa Tháp Xuống Ngang Mắt 2.30s (Kỹ năng ai-hook)",
        "step_target": [
          "dinh-dang",
          "buoc-1",
          "buoc-4"
        ],
        "source_thread": "90fd0890-7409-4afb-b2b6-ed81e2c382a6",
        "studio_file": "studio_ai_hook_jib_down.html",
        "what_title": "Hạ cần cẩu máy quay 3D Parallax thẳng đứng từ vòm cây/hồ bơi/tòa tháp trên cao xuống ngang mắt nói luôn",
        "what": "Chế độ Hook mới <strong><code>jib-down</code></strong> (alias: <code>crane-jib-down</code> — <code>2.30s</code> @ 24fps) trong kỹ năng <strong><code>ai-hook</code></strong>: Đặt <code>Frame_Anchor</code> làm First-Frame để Google Flow Veo 3.1 nâng máy thẳng đứng lên vòm cây/tòa tháp trên cao (<code>Jib-Up</code>), tự động cắt tại đỉnh cao nhất (<code>Auto-Trim Canopy Apex</code>), khử góc nghiêng camera roll về <code>0.0&deg;</code>, đảo ngược thời gian kèm <strong>DIS Bidirectional Flow Warp + 180&deg; Vertical Shutter Motion Blur</strong> và hội tụ êm ái về đúng khoảnh khắc mở lời nói (<code>SSIM = 0.9846 &ndash; 0.9923</code>, <code>VERDICT: PASS 0 events</code>).",
        "why_title": "Vì sao không dùng dịch ảnh phẳng 2D hoặc gắn cả Start + End Frame trên Veo?",
        "why": "Nếu dịch ảnh phẳng 2D sẽ mất hoàn toàn thị sai 3D (hồ bơi, ngọn cọ, tòa tháp phía sau) và lộ mép gương phản chiếu; còn nếu giữ nguyên cả đoạn đuôi của Veo khi máy quay tự ý dừng/hạ lùi sẽ gây nhảy giật <code>C5_POP</code> ở giây đầu. Engine <strong><code>jib_down_engine.py</code></strong> bảo toàn 100% khung hình 3D thật của Veo, tự cắt đúng đỉnh <code>cum_y</code>, xoay bù <code>+rot_cum</code> trong <code>getRotationMatrix2D</code> và dùng 3-frame Optical-Flow Morph nối thẳng vào <code>Frame_Anchor + 1</code>.",
        "how_title": "Gọi tự nhiên JIB DOWN hoặc chạy CLI 1 chạm với preset jib-down",
        "how_intro": "Gọi trực tiếp bằng câu tự nhiên hoặc chạy lệnh CLI của ai-hook:",
        "how_cmd": "python3 ~/.gemini/config/skills/ai-hook/scripts/ai_hook_engine.py --video \"/Users/vietmac/Documents/AItest2/footageai1.mp4\" --preset jib-down",
        "local_videos_title": "🎬 Đối Chiếu 2 Case Study Thực Chiến: ① Công Viên Tán Cây (viet2210.MOV) &rarr; ② Hồ Bơi, Hàng Cọ &amp; Tòa Tháp 3D (AItest2/footageai1.mp4)",
        "local_videos_badge": "3D Veo Parallax • 1080×1920 @ 24fps • PASS 10/10 Vertical-Jib Gates",
        "local_videos": [
          {
            "src": "studios/viet2210_jib_down_master.mp4",
            "fallback_url": "studios/viet2210_jib_down_master.mp4",
            "badge": "① CASE 1: CÔNG VIÊN TÁN CÂY XANH (VIET2210.MOV • SSIM 0.9923)",
            "title": "Case 1 Master: viet2210_jib_down_master.mp4 (Frame Anchor #48 @ 2.04s)",
            "desc": "Từ vòm lá cây công viên trên cao hạ thẳng đứng mượt mà xuống ngang mắt anh Việt (vp = 0.89–0.91, sc = 1.00, max |Δlog(m)| = 0.30, SSIM = 0.9923) kèm âm thanh Canopy Air Rush + Crane Whoosh + 55Hz Sub-thump."
          },
          {
            "src": "studios/footageai1_jib_down_web.mp4",
            "fallback_url": "studios/footageai1_jib_down_web.mp4",
            "badge": "② CASE 2: HỒ BƠI, HÀNG CỌ & TÒA THÁP 3D (FOOTAGEAI1.MP4 • SSIM 0.9846)",
            "title": "Case 2 Master: footageai1_jib_down_master.mp4 (Frame Anchor #124 @ 5.17s)",
            "desc": "Bảo toàn 100% phối cảnh 3D Parallax của hai tòa tháp chung cư, ngọn cọ và hồ bơi xanh; tự động cắt đỉnh Jib-Up tại #150/192 (cum_y = 790.6px), khử góc nghiêng camera roll về 0.0° và đáp êm vào nhịp bước đi nói."
          }
        ],
        "items": [
          {
            "tier": "1. Bốn Trụ Cột Kỹ Thuật Của Hạ Cần Cẩu 3D (jib_down_engine.py)",
            "code": "TRỤ CỘT 1",
            "name": "Unique Hash Anchor & Auto-Trim Canopy Apex (#150/192)",
            "desc": "Đặt tên ảnh mỏ neo duy nhất theo mã băm nội dung chống trùng trong Google Flow Asset Drawer (SSIM(f0, anchor) >= 0.65), tự động cắt tại đỉnh cao nhất của quỹ đạo nâng máy trước khi Veo dừng hoặc hạ máy lùi."
          },
          {
            "tier": "1. Bốn Trụ Cột Kỹ Thuật Của Hạ Cần Cẩu 3D (jib_down_engine.py)",
            "code": "TRỤ CỘT 2",
            "name": "Pure 3D Parallax Roll Derotation & Vertical Flow Linearization",
            "desc": "Giữ nguyên 100% khung hình 3D thật của Veo, xoay bù +rot_cum khử nghiêng đường chân trời về 0.0°, tuyến tính hóa cum_y và lấy mẫu lại theo đường cong 16% linear + 84% easeInOutCubic."
          },
          {
            "tier": "1. Bốn Trụ Cột Kỹ Thuật Của Hạ Cần Cẩu 3D (jib_down_engine.py)",
            "code": "TRỤ CỘT 3",
            "name": "DIS Bidirectional Flow Warp + 180° Shutter + 3-Frame Flow Morph",
            "desc": "Nội suy 2 chiều không bóng ma, phủ 180° Vertical Shutter Motion Blur giảm dần về 0 trong 8 frames cuối, hội tụ ECC Euclidean 12 frames + 3-frame Flow Morph nối thẳng vào Frame_Anchor + 1."
          },
          {
            "tier": "2. Chế Độ Kiểm Định --mode vertical-jib & Âm Thanh Cần Cẩu (verify_jib_down.py)",
            "code": "VERTICAL-JIB",
            "name": "Vertical Purity >= 0.72, Sign Consistency >= 0.85 & Studio Crane SFX",
            "desc": "Kiểm định nghiêm ngặt độ thuần khiết trục dọc (vp đạt 0.91–0.94), tính nhất quán chiều hạ máy (sc đạt 0.99–1.00), C8_ROLL <= 2.5°/0.5s và C10_ANCHOR SSIM >= 0.98, phối sẵn sfx_jib_down_2p3s.wav."
          }
        ],
        "asset_dir": "jib_down_hook",
        "showcase_title": "🖼️ Bảng Kiểm Định Từng Frame Hạ Cần Cẩu 3D Parallax & Contact Sheet 2 Case Study",
        "showcase_badge": "Chuẩn 90FD0890 • Nghiệm Thu CLAUDE2 • VERDICT: PASS (0 events)",
        "preview_images": [
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/qa_footageai1_jib_down_landing.jpg",
            "caption": "Chuỗi frame hạ cần cẩu 3D Parallax trên AItest2/footageai1.mp4 (0.00s → 2.33s): Từ đỉnh ngọn cọ, hai tòa tháp & hồ bơi hạ mượt xuống lối đi lát đá khớp Frame #124",
            "web_src": "assets/jib_down_hook/qa_footageai1_jib_down_landing.jpg"
          },
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/qa_footageai1_jib_down_sheet.jpg",
            "caption": "Contact Sheet tổng thể footageai1_jib_down_master.mp4 (1080x1920 @ 24fps): vp = 0.91–0.94, sc = 0.99–1.00, SSIM = 0.9846, PASS 0 events",
            "web_src": "assets/jib_down_hook/qa_footageai1_jib_down_sheet.jpg"
          },
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/qa_viet2210_jib_down_sheet.jpg",
            "caption": "Contact Sheet tổng thể viet2210_jib_down_master.mp4 (1080x1920 @ 24fps): Hạ cần cẩu từ vòm cây công viên xuống ngang mắt Frame #48 (SSIM = 0.9923, PASS 0 events)",
            "web_src": "assets/jib_down_hook/qa_viet2210_jib_down_sheet.jpg"
          }
        ],
        "tech_specs": [
          "Engine lõi: ~/.gemini/config/skills/ai-hook/scripts/jib_down_engine.py (tích hợp trong ai_hook_engine.py --preset jib-down / crane-jib-down và hook_scanner.py).",
          "Bộ kiểm định 10 cổng: ~/.gemini/config/skills/ai-hook/scripts/verify_jib_down.py --mode vertical-jib (--self-test đạt SELF_TEST: PASS).",
          "Âm thanh Studio: ~/.gemini/config/skills/ai-hook/assets/sfx_jib_down_2p3s.wav (Canopy Air Rush + Smooth Hydraulic Crane Whoosh + Soft Air Cushion 55Hz Sub-thump @ 2.22s).",
          "Hai sản phẩm Master chuẩn: /Users/vietmac/Documents/CODE/AI VIDEO EDIT/viet2210_jib_down_master.mp4 & /Users/vietmac/Documents/CODE/AI VIDEO EDIT/footageai1_jib_down_master.mp4."
        ]
      },
      {
        "id": "ai-hook-sticker-transition-3d-peel",
        "date": "2026-10-24",
        "title": "AI Hook Preset 'sticker-transition': 3D Die-Cut Sticker Peel & Match-Cut 2.15s (Từ Mẫu Higgsfield Transitions #06)",
        "step_target": [
          "dinh-dang",
          "buoc-1",
          "buoc-4"
        ],
        "source_thread": "4d4b0987-6e0b-4a8c-a6f4-70410db6eaef",
        "studio_file": "studio_ai_hook_sticker_transition.html",
        "what_title": "Biến chủ thể thành miếng Sticker cắt bế 3D dán trên trụ đô thị rồi bóc cong phóng Match-Cut vào cảnh thật",
        "what": "Chế độ Hook mới <strong><code>sticker-transition</code></strong> (alias: <code>transitions</code>, <code>sticker-match-cut</code> — <code>2.15s</code> @ 24fps) trong kỹ năng <strong><code>ai-hook</code></strong>: Tái tạo chính xác hiệu ứng <strong>3D Die-Cut Sticker Peel &amp; Match-Cut</strong> từ mẫu <code>06_Sticker_Match_Cut.mp4</code> của Higgsfield Transitions. Chủ thể xuất hiện dưới dạng miếng Sticker cắt bế có viền giấy trắng dày <code>16px</code>, vân giấy mỹ thuật và vệt bóng kính <code>Glossy Specular Sheen</code> dán nghiêng 3D trên trụ bê tông công viên, sau đó tự động uốn cong bóc tách (<code>3D Cylindrical Page-Curl Peel</code>) và phóng <code>Perspective Match-Cut</code> khóa tuyệt đối vào <code>Frame_Anchor</code> (<code>SSIM = 0.99826</code>, <code>&Delta;E00 = 0.0432</code>, <code>0% Halo</code>).",
        "why_title": "Vì sao không dùng AI sinh lại khuôn mặt ở pha Sticker Peel?",
        "why": "Nếu đẩy qua mô hình khuếch tán video thông thường, mặt nhân vật khi nghiêng 3D sẽ bị biến dạng (morphing) và để lại viền trắng rác (halo) khi ghép vào frame bắt đầu nói. Engine <strong><code>sticker_transition_engine.py</code></strong> trích xuất trực tiếp chủ thể từ <code>Frame #48</code> với khử nhiễm màu biên <code>fg_decontam</code>, tạo viền cắt bế bằng <strong>Euclidean Distance Transform <code>16px</code> + 3D Bevel</strong>, giải chiếu <strong>3D Cylindrical Page-Curl</strong> và thu gọn viền trắng về <code>0%</code> trước <code>t = 1.88s</code>, giữ 100% thần thái thật.",
        "how_title": "Gọi tự nhiên hoặc chạy CLI 1 chạm với preset sticker-transition",
        "how_intro": "Gọi trực tiếp bằng câu tự nhiên hoặc chạy lệnh CLI của ai-hook:",
        "how_cmd": "OMP_NUM_THREADS=4 python3 ~/.gemini/config/skills/ai-hook/scripts/ai_hook_engine.py --video \"/Users/vietmac/Documents/CODE/AI VIDEO EDIT/viet2210.MOV\" --preset sticker-transition",
        "local_videos_title": "🎬 Đối Chiếu Trực Tiếp: ① Video Mẫu Gốc Higgsfield (06_Sticker_Match_Cut.mp4) &rarr; ② Video Kết Quả Master (viet2210_sticker_transition_master.mp4)",
        "local_videos_badge": "Higgsfield Transitions #06 vs Master 1080×1920 • PASS 5/5 Gates",
        "local_videos": [
          {
            "src": "studios/06_Sticker_Match_Cut.mp4",
            "fallback_url": "studios/06_Sticker_Match_Cut.mp4",
            "badge": "① VIDEO MẪU GỐC (HIGGSFIELD TRANSITIONS #06)",
            "title": "Mẫu Gốc: 06_Sticker_Match_Cut.mp4 (Higgsfield Transitions)",
            "desc": "Cơ chế gốc: Chủ thể xuất hiện dưới dạng miếng Sticker cắt bế có viền giấy trắng dày (Die-Cut White Outline) dán trên trụ bê tông ngoài trời, sau đó bóc tách khỏi bề mặt phẳng và phóng Match-Cut khớp vào nhân vật thật."
          },
          {
            "src": "studios/viet2210_sticker_transition_master.mp4",
            "fallback_url": "studios/viet2210_sticker_transition_master.mp4",
            "badge": "② KẾT QUẢ MASTER: ANH VIỆT (STICKER-TRANSITION 2.15S)",
            "title": "Kết Quả Master: viet2210_sticker_transition_master.mp4 (1080×1920 @ 24fps)",
            "desc": "Pha 1 (0.00–0.90s) Sticker cắt bế viền trắng 16px + Glossy Sheen trên trụ bê tông → Pha 2 (0.90–1.65s) 3D Cylindrical Page-Curl Peel + Pop-Out Match-Cut → Pha 3 (1.65–2.15s) Radial Focus Reveal khóa Frame #48 (SSIM 0.9983, ΔE00 0.043)."
          }
        ],
        "items": [
          {
            "tier": "1. Ba Pha Biến Hình Sticker 3D & Match-Cut (sticker_transition_engine.py)",
            "code": "PHA 1 (0.0–0.9s)",
            "name": "Die-Cut Vinyl Sticker 16px & Glossy Specular Sheen Trên Trụ Đô Thị",
            "desc": "Tạo viền cắt bế trắng răng cưa mịn dày 16px (Euclidean Distance Transform + 3D Bevel + Paper Grain + Contact Shadow) kèm vệt bóng kính lướt chéo trên trụ bê tông công viên Bokeh (Disk Kernel r=16px)."
          },
          {
            "tier": "1. Ba Pha Biến Hình Sticker 3D & Match-Cut (sticker_transition_engine.py)",
            "code": "PHA 2 (0.9–1.65s)",
            "name": "3D Cylindrical Page-Curl Peel & Elastic Pop-Out Match-Cut",
            "desc": "Bóc cong miếng Sticker theo mặt trụ 3D từ góc trên-phải xuống dưới-trái kèm bóng đổ động dưới nếp uốn, đồng thời bật nảy đàn hồi và phóng Perspective Match-Cut (C2 Quintic Smoothstep) về tọa độ thật."
          },
          {
            "tier": "1. Ba Pha Biến Hình Sticker 3D & Match-Cut (sticker_transition_engine.py)",
            "code": "PHA 3 (1.65–2.15s)",
            "name": "Zero-Halo Outline Collapse & Radial Focus Reveal Khóa Frame #48",
            "desc": "Viền trắng thu gọn về 0px trước t=1.88s, hậu cảnh công viên mở nét 100% từ tâm ra biên, khóa tuyệt đối vào Frame #48 (SSIM 0.99826 >= 0.995, ΔE00 0.0432 <= 0.5) và nối thẳng sang Frame #49 (-16 LUFS)."
          },
          {
            "tier": "2. Năm Cổng Kiểm Định Tất Định & Âm Thanh 3 Lớp (verify_sticker_transition.py)",
            "code": "GATE G0–G4",
            "name": "5-Gate Deterministic Verifier & Vinyl Peel Studio SFX (48kHz)",
            "desc": "Kiểm định tự động G0 (0 C1_DUP, Face SSIM 0.9947), G1 (Outline 83.2% -> 0.0%), G2 (Trajectory jerk 2.33px <= 75px, spike 1.23x), G3 (Zero Halo MAD 1.25 <= 4.0), G4 (Anchor Lock SSIM 0.9983). Phối sẵn sfx_sticker_transition_2p15s.wav."
          }
        ],
        "asset_dir": "sticker_transition",
        "showcase_title": "🖼️ Bảng Kiểm Định 12 Frame Thực Tế & Bộ 6 Lớp Tài Nguyên 3D Die-Cut Sticker",
        "showcase_badge": "Chuẩn 4D4B0987 • Nghiệm Thu CLAUDE2 • 5/5 Gates PASS",
        "preview_images": [
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/qa_sticker_transition_sheet.jpg",
            "caption": "Contact Sheet 12 mốc thời gian (F#00 -> F#64): Từ P1:STICKER (viền trắng 16px trên trụ bê tông) -> P2:3D-PEEL -> P3:REVEAL -> ANCHOR#48 & SPEAK#49+",
            "web_src": "assets/sticker_transition/qa_sticker_transition_sheet.jpg"
          },
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/qa_sticker_assets_preview.jpg",
            "caption": "Bộ 6 lớp tài nguyên SA1: Frame #48 Anchor, Subject Mask & FG Decontam, Die-Cut 16px Outline + Bevel, Sticker RGBA + Shadow, Park Disk Bokeh r=16px & 3D Urban Pillar Plate",
            "web_src": "assets/sticker_transition/qa_sticker_assets_preview.jpg"
          },
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/work_sticker_transition/qa_verify_sticker.jpg",
            "caption": "Bảng kiểm định định lượng verify_sticker_transition.py: G1 Outline 83.2% -> 0.0%, G3 Zero Halo Tail MAD 1.254 <= 4.0, G4 Anchor Lock SSIM 0.99826",
            "web_src": "assets/sticker_transition/qa_verify_sticker.jpg"
          }
        ],
        "tech_specs": [
          "Engine thực thi: ~/.gemini/config/skills/ai-hook/scripts/sticker_transition_engine.py (tích hợp trong ai_hook_engine.py --preset sticker-transition / transitions).",
          "Verifier 5 cổng: ~/.gemini/config/skills/ai-hook/scripts/verify_sticker_transition.py (--self-test đạt 6/6 cases PASS).",
          "Âm thanh Studio 3 lớp: ~/.gemini/config/skills/ai-hook/assets/sfx_sticker_transition_2p15s.wav (0.15s–1.25s Crisp Vinyl Sticker Slap & Peel Rip -> 1.20s–1.85s Elastic Pop-Out Whoosh -> 2.05s 55Hz Match-Cut Sub Lock; Integrated -15.0 LUFS, True Peak -1.1 dBTP).",
          "Video mẫu đối chiếu: ~/.gemini/config/skills/ai-hook/assets/06_Sticker_Match_Cut.mp4 & kết quả Master: /Users/vietmac/Documents/CODE/AI VIDEO EDIT/viet2210_sticker_transition_master.mp4."
        ]
      },
      {
        "id": "ai-hook-pantone1-katana-palette",
        "date": "2026-10-24",
        "title": "AI Hook Preset 'pantone1': Editorial Pantone Color-Wheel & Tilted Swatch Cards Reveal 2.40s (Kỹ năng ai-hook)",
        "step_target": [
          "dinh-dang",
          "buoc-1",
          "buoc-4"
        ],
        "source_thread": "798f3d86-2533-45ed-ac4a-8f9fbbf1e14e",
        "studio_file": "studio_ai_hook_pantone1.html",
        "what_title": "Mở màn Tạp Chí Pantone Color-Wheel & 3 Thẻ Màu Nghiêng (Đen Trắng → Nhuộm Màu → Bung Nền Thật 0% Halo)",
        "what": "Preset thứ 5 trong kỹ năng <strong><code>ai-hook</code></strong> (mã <code>pantone1</code> / <code>katana-palette-hook</code>), tái tạo từ mẫu quốc tế <strong>Higgsfield Katana #326c512a</strong>: Trong <code>2.40s</code> đầu, chủ thể xuất hiện ở chế độ <strong>Monochrome Đen–Trắng Editorial</strong> trên nền giấy Studio <code>#F8F8F6</code> kèm chữ <code>one me.</code> và <strong>Vòng Quạt Màu Pantone xoay ở đáy</strong>; tiếp theo 2 nhịp dừng bánh xe màu bật nảy <strong>3 Thẻ Màu Pantone Nghiêng</strong> ra sau lưng (Spring Overshoot) kích hoạt sóng <strong>Radial Colorize Wave</strong> nhuộm màu thật 100%, rồi mở bung nền thật với phương trình <code>&alpha;&middot;F48 + (1-&alpha;)&middot;F48 &equiv; F48</code> đạt <strong>SSIM = 0.9977, &Delta;E00 = 0.459, 0% Halo</strong>.",
        "why_title": "Giữ chân 3 giây đầu bằng tương phản Vô Sắc → Hữu Sắc mà không biến dạng gương mặt AI",
        "why": "Thay vì dùng AI sinh lại toàn bộ gương mặt gây lệch nhân dạng (Identity Drift), <code>pantone1</code> giữ <strong>100% hình thái thật của anh Việt</strong> tại <code>Frame_Anchor (#48)</code>, tách nền Guided Filter khử lem màu mép tóc, trích xuất đúng 6 mã màu HEX từ trang phục &amp; bối cảnh công viên (<code>OLIVE #5E6B45</code>, <code>BONE #ECEBE1</code>, <code>INK #1F1F23</code>, <code>CHARCOAL #453A36</code>, <code>AMBER #D88556</code>, <code>CANOPY #5E8238</code>) và kiểm định tự động qua 5 cổng <code>verify_katana_palette.py</code> (<code>G0 + K1..K4</code>).",
        "how_title": "Gọi nhanh bằng lệnh tự nhiên PANTONE1 hoặc qua Smart AI Hook Router",
        "how_intro": "Gõ câu lệnh ngắn gọn bên dưới hoặc chạy ai_hook_engine.py --preset pantone1:",
        "how_cmd": "PANTONE1 : /Users/vietmac/Documents/CODE/AI VIDEO EDIT/viet2210.MOV",
        "local_videos_title": "🎬 Đối Chiếu Trực Tiếp: ① Video Mẫu Tham Chiếu (Ref #326c512a) &rarr; ② Video Kết Quả Master (viet2210_katana_palette_master.mp4)",
        "local_videos_badge": "Higgsfield Katana #326c512a vs Master 1080×1920 • PASS 5/5 Gates",
        "local_videos": [
          {
            "badge": "① VIDEO MẪU THAM CHIẾU (HIGGSFIELD KATANA #326c512a)",
            "src": "studios/katana_target_326c512a.mp4",
            "fallback_url": "https://static-public-media.higgsfield.ai/katana-presets/326c512a-ee04-417d-bb2a-faa3f2d1c6d1.mp4",
            "title": "Video Mẫu Gốc: Color Palette Outfit Showcase (326c512a)",
            "desc": "Mẫu gốc từ Higgsfield Katana: Khởi đầu Monochrome B&W trên nền Studio sáng, Vòng Quạt Màu Pantone xoay ở đáy và 3 thẻ màu Pantone nghiêng bật ra sau lưng nhuộm màu chủ thể."
          },
          {
            "badge": "② VIDEO KẾT QUẢ MASTER (PRESET PANTONE1 • 1080×1920)",
            "src": "studios/viet2210_katana_palette_master.mp4",
            "fallback_url": "studios/viet2210_katana_palette_master.mp4",
            "title": "Kết Quả Master Trên viet2210.MOV (2.40s Hook + Talk • SSIM 0.9977)",
            "desc": "Thành phẩm thực thi bởi katana_palette_engine.py: 2 nhịp dừng quạt màu (palette 01/02 & 02/02), sóng Radial Colorize Wave khôi phục 100.8% độ bão hòa màu thật, nối thẳng vào Frame #49 không vết cắt (ΔE00 = 0.459)."
          }
        ],
        "items": [
          {
            "tier": "1. Ba Pha Chuyển Động Chuẩn Tạp Chí (2.40s / 58 Frames @ 24fps)",
            "code": "PHA 1 (0.0–0.65s)",
            "name": "Monochrome B&W Editorial + Vòng Quạt Màu Pantone Xoay",
            "desc": "Chủ thể ở chế độ Đen–Trắng tương phản cao (S-curve) trên nền giấy Studio #F8F8F6, đỉnh màn hình hiện chữ 'one me.', dưới đáy là Vòng Quạt Màu Pantone (wheel_vibrant.png) quay mượt."
          },
          {
            "tier": "1. Ba Pha Chuyển Động Chuẩn Tạp Chí (2.40s / 58 Frames @ 24fps)",
            "code": "PHA 2 (0.65–1.80s)",
            "name": "2 Nhịp Bật 3 Thẻ Màu Pantone Nghiêng + Sóng Radial Colorize Wave",
            "desc": "Nhịp 1 (0.65s, palette 01/02: OLIVE/BONE/INK) và Nhịp 2 (1.20s, palette 02/02: CHARCOAL/AMBER/CANOPY) bật 3 thẻ màu nghiêng (-14°, -3°, +9°) ra sau lưng kèm sóng màu lan từ tâm ngực đưa độ bão hòa từ 1.68 lên 97.06."
          },
          {
            "tier": "2. Khóa Điểm Đáp 0% Halo & 5 Cổng Kiểm Định Tất Định (verify_katana_palette.py)",
            "code": "PHA 3 (1.80–2.40s)",
            "name": "Phương Trình α·F48 + (1-α)·F48 ≡ F48 & 5 Lớp SFX Studio (-16 LUFS)",
            "desc": "Thẻ Pantone và nền giấy rút mở theo chiều sâu lộ nền công viên thật tại Frame #48 (SSIM = 0.99768 >= 0.995, ΔE00 = 0.459 <= 1.0, SeamMAD = 3.428), đồng bộ sfx_katana_palette_2p4s.wav."
          }
        ],
        "asset_dir": "pantone1_katana_hook",
        "showcase_title": "🖼️ Bảng Kiểm Định 10 Mốc Frame Thực Tế & Bộ Tài Nguyên Pantone (QA Contact Sheet)",
        "showcase_badge": "Chuẩn 798F3D86 • G0 + K1..K4 VERDICT: PASS • 0% Halo",
        "preview_images": [
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/qa_katana_palette_sheet.jpg",
            "caption": "QA Contact Sheet 10 mốc thời gian (0.00s → 2.42s): Kiểm định tiến trình Monochrome → Palette 01/02 → Palette 02/02 → Bung nền thật Frame #48 → Nối mượt Frame #49",
            "web_src": "assets/pantone1_katana_hook/qa_katana_palette_sheet.jpg"
          },
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/work_katana_palette/qa_sa1_assets.jpg",
            "caption": "Bộ tài nguyên SA1: Frame #48 BT.709, Alpha Mask Guided Filter khử lem mép tóc, Vòng Quạt Màu Pantone & 6 Thẻ Màu Pantone trích xuất từ trang phục/bối cảnh",
            "web_src": "assets/pantone1_katana_hook/qa_sa1_assets.jpg"
          }
        ],
        "tech_specs": [
          "Engine lõi: <code>~/.gemini/config/skills/ai-hook/scripts/katana_palette_engine.py</code> (tích hợp vào <code>ai_hook_engine.py --preset pantone1</code> và <code>hook_scanner.py</code>).",
          "Tài nguyên đóng gói sẵn: <code>~/.gemini/config/skills/ai-hook/assets/pantone1/</code> (<code>wheel_vibrant.png</code>, <code>wheel_editorial.png</code>, <code>card_p1_a..c.png</code>, <code>card_p2_a..c.png</code>) và <code>assets/sfx_katana_palette_2p4s.wav</code>.",
          "Bộ kiểm định 5 cổng: <code>~/.gemini/config/skills/ai-hook/scripts/verify_katana_palette.py</code> (Gate G0 Seam & Identity Lock, Gate K1 Desat-to-Color Curve, Gate K2 Wheel & Cards Presence, Gate K3 Anti-Flash, Gate K4 Audio/Duration).",
          "Video mẫu tham chiếu (Ref): <code>https://static-public-media.higgsfield.ai/katana-presets/326c512a-ee04-417d-bb2a-faa3f2d1c6d1.mp4</code> (<code>/Users/vietmac/Documents/CODE/AI VIDEO EDIT/higgsfield_katana/katana_target_326c512a.mp4</code>).",
          "Video kết quả Master: <code>/Users/vietmac/Documents/CODE/AI VIDEO EDIT/viet2210_katana_palette_master.mp4</code> (<code>1080x1920 @ 24fps</code>, <code>SSIM = 0.99768</code>, <code>DeltaE00 = 0.459</code>)."
        ]
      },
      {
        "id": "spatial-camera-engine-v3-motion-physics",
        "date": "2026-10-22",
        "title": "Chuẩn Vật Lý Chuyển Động V3: 2.5D Spatial Camera Engine, Speed Graph 2 Pha & 4-Gate Verifier (Kỹ năng motion)",
        "step_target": "buoc-4",
        "source_thread": "c834f459-4d87-4611-b24e-9a566fbff574",
        "what_title": "Xóa sổ lỗi camera lắc Math.sin — Nâng cấp 2.5D Spatial Camera Engine cho cả 6 Khuôn Motion",
        "what": "Bộ lõi vật lý chuyển động <strong><code>spatialCameraEngine.ts</code></strong> và hệ thống <strong>4 Cổng Kiểm Định Tất Định (<code>verify_motion_deliverable.py</code>)</strong> áp dụng xuyên suốt 6 Khuôn Thiết Kế Gốc của kỹ năng <code>motion</code>: Thay thế hoàn toàn công thức <code>Math.sin(frame / 28)</code> cũ bằng <strong>Quỹ đạo 2.5D Spatial Camera</strong>, <strong>Đồ thị vận tốc 2 pha (Snap 82% + Continuous Drift 18%)</strong>, <strong>Diễn xuất so le 4 tầng (Staggered Choreography)</strong> và <strong>Velocity-Only Motion Blur (<code>blur = 0px</code> tuyệt đối khi đọc chữ/số liệu)</strong>.",
        "why_title": "Vì sao bản cũ bị lặp chuyển động, hở bố cục và nhòe bảng số liệu?",
        "why": "Hội ý kiến trúc cùng <strong>CLAUDE2 (Opus 5.5)</strong> chỉ ra 4 nguyên nhân gốc rễ: (1) Tài liệu cũ dạy dùng <code>Math.sin(frame / 28)</code> khiến camera nhấp nhô tại chỗ 19 chu kỳ; (2) Nội suy đều tốc hoặc nhồi mọi phần tử vào <code>localFrame = 0</code> làm chuyển động phẳng; (3) Gắn <code>blur(6px)</code> cố định theo frame làm nhòe bảng Bento suốt 17 frames; (4) Thiếu <code>-map 0:v:0 -map 1:a:0</code> khi ghép FFmpeg làm mất luồng SFX. Chuẩn V3 chặn đứng cả 4 lỗi ngay từ code và Verifier.",
        "how_title": "Gọi tự nhiên bất kỳ khuôn nào trong 6 Khuôn Motion",
        "how_intro": "Mọi lệnh tạo video Motion từ nay tự động kế thừa Profile tương ứng trong spatialCameraEngine.ts và chạy qua 4 cổng kiểm định:",
        "how_cmd": "Áp dụng khuôn Pinterest 9:16 (hoặc Clean V3 / Risograph / MasterClass / Scientific Atlas / SuiPlay) cho kịch bản xây kênh kenh.fedu.vn",
        "items": [
          {
            "tier": "1. Lõi Vật Lý Chuyển Động Dùng Chung (spatialCameraEngine.ts)",
            "code": "CAMERA 2.5D",
            "name": "Quỹ Đạo 2.5D Spatial Camera & Speed Graph 2 Pha (Snap 82% + Drift 18%)",
            "desc": "Cấm tuyệt đối Math.sin trên camera. Pha 1 (10–18 frames đầu) đi 82% quãng đường bằng bezier [0.16, 1, 0.3, 1] hoặc spring; Pha 2 trôi tuyến tính 18% quãng đường còn lại về hướng waypoint kế tiếp."
          },
          {
            "tier": "1. Lõi Vật Lý Chuyển Động Dùng Chung (spatialCameraEngine.ts)",
            "code": "CHOREO 4-TIER",
            "name": "Staggered Choreography & Full-Bleed SVG Geometry",
            "desc": "Tách pha 4 tầng: Cửa chéo SVG <polygon> full-bleed (f0–28) → Hero Keyword mặt nạ 3D giữ dấu tiếng Việt (f18–34) → Viên thuốc phụ zIndex 10 (f28–45) → Pre-cue dẫn mắt (end-12f). Chữ trong dải lụa dùng <textPath>."
          },
          {
            "tier": "2. Ma Trận 7 Profile Cho 6 Khuôn Thiết Kế Gốc (.TSX)",
            "code": "7 PROFILES",
            "name": "cleanV3 • riso • pinterest • gold • masterclass • atlas • suiplay",
            "desc": "Mỗi khuôn mang bản sắc vật lý riêng: CleanV3 giữ rz=0° thẳng chữ; Riso tách 2 rig (Mặt thật tĩnh + Đồ họa lật trang); MasterClass đi nước cờ vua theo lưới 11%; Atlas glide học thuật blur=0px; SuiPlay xuyên tâm trục Z."
          },
          {
            "tier": "3. Bốn Cổng Kiểm Định Tất Định (verify_motion_deliverable.py)",
            "code": "GATE 0–3",
            "name": "Static AST Lint • Audio -24dB • Sharpness Laplacian >=120 • Optical Flow >=0.45",
            "desc": "Gate 0 chặn code có Math.sin camera; Gate 1 bắt lỗi âm thanh câm -91dB; Gate 2 đảm bảo độ nét Laplacian >= 120 tại mọi READ_WINDOWS (Bento đạt 215.7); Gate 3 đo Farneback Optical Flow."
          }
        ],
        "asset_dir": "spatial_camera_v3",
        "showcase_title": "🖼️ Nghiệm Thu Thực Tế Chuẩn V3 Trên Video Logic Xây Kênh (kenh.fedu.vn)",
        "showcase_badge": "Chuẩn C834F459 • 2.5D Spatial Camera • 4/4 Gates Passed",
        "preview_images": [
          {
            "src": "/Users/vietmac/.gemini/antigravity/brain/c834f459-4d87-4611-b24e-9a566fbff574/v2_scene3_cho_vuong.jpg",
            "caption": "Scene 3: Cửa chéo SVG <polygon> phủ kín 100% mép trái, mở xong mới bung chữ so le (Staggered Choreography)",
            "web_src": "assets/spatial_camera_v3/v2_scene3_cho_vuong.jpg"
          },
          {
            "src": "/Users/vietmac/.gemini/antigravity/brain/c834f459-4d87-4611-b24e-9a566fbff574/v2_scene5_cong_viec_that.jpg",
            "caption": "Scene 5: Chữ uốn cong <textPath> chạy dọc dải lụa 3D + B-roll sạch không vệt chéo + Hoa dẫn mắt không đè chữ đầu",
            "web_src": "assets/spatial_camera_v3/v2_scene5_cong_viec_that.jpg"
          },
          {
            "src": "/Users/vietmac/.gemini/antigravity/brain/c834f459-4d87-4611-b24e-9a566fbff574/v2_scene6_bento_crisp.jpg",
            "caption": "Scene 6: Bento Dashboard nghiêng 3D Spatial Camera sắc nét tuyệt đối (0px blur, Laplacian = 215.7)",
            "web_src": "assets/spatial_camera_v3/v2_scene6_bento_crisp.jpg"
          },
          {
            "src": "/Users/vietmac/.gemini/antigravity/brain/c834f459-4d87-4611-b24e-9a566fbff574/v2_scene9_tat_may_la_xong.jpg",
            "caption": "Scene 9: Cú chốt thông điệp 1 trục sắc bén 'Bấm máy là nói — tắt máy là xong !' trên nền Mint Cream",
            "web_src": "assets/spatial_camera_v3/v2_scene9_tat_may_la_xong.jpg"
          }
        ]
      },
      {
        "id": "element-so-do-motion-60fps",
        "date": "2026-10-22",
        "title": "Element Sơ Đồ Motion 60fps (Explainer Flowchart & Beat-Locked Voiceover — Kỹ năng so-do-motion)",
        "step_target": "buoc-4",
        "source_thread": "e009fe7e-4b95-4ff0-82fe-245a2ba77c5d",
        "what_title": "Sơ đồ chuyển động 60fps mở sáng theo 10 Vi Nhịp &amp; 2 Chế độ giọng đọc",
        "what": "Một <strong>Element cốt lõi trong Edit Video &amp; Motion Graphic</strong>: biến một quy trình phức tạp (4 bước, 2 nhánh đối xứng, 10 vi nhịp) thành <strong>Sơ đồ chuyển động 60fps</strong> (<code>1080×1920</code>) kèm Phụ đề 5B và 4 lớp SFX. Hỗ trợ <strong>2 chế độ giọng đọc tự động</strong>: <strong>(1) Gọi bình thường</strong> &rarr; Tạo giọng từ <strong>Gemini TTS (<code>gemini-3.8-flash-tts</code>)</strong>; <strong>(2) Thêm &ldquo;giọng của tôi&rdquo;</strong> &rarr; Lấy giọng thật của bạn qua <strong>Google AI Studio + Real-Voice F0 Transfer</strong>.",
        "why_title": "Giải thích quy trình phức tạp trong 20s mà không làm người xem rối mắt",
        "why": "Nếu chỉ ngồi nói suông về quy trình 4–5 bước hoặc hiện cả tấm ảnh sơ đồ tĩnh ngay từ giây đầu, khán giả sẽ bị ngợp chữ và lướt qua. Element Sơ Đồ Motion mở sáng từng khối theo đúng nhịp lời đọc (Progressive Node Reveal), bắn tia hạt sáng dẫn mắt và nổ con số <code>~80%</code> đúng mili-giây phát âm, giúp giữ chân người xem trọn 20 giây.",
        "how_title": "Gọi mặc định (Gemini TTS) hoặc thêm 'giọng của tôi' (AI Studio)",
        "how_intro": "Gõ bình thường để dùng giọng Gemini TTS, hoặc thêm cụm 'giọng của tôi' để lấy giọng thật của bạn qua AI Studio:",
        "how_cmd": "Tạo sơ đồ motion 60fps giải thích quy trình đưa AI vào edit video bằng giọng của tôi",
        "student_install": {
          "cmd": "curl -sSL https://fedu.vn/skill/install-so-do-motion.sh | bash",
          "doc_url": "https://fedu.vn/skill/so-do-motion.html",
          "desc": "Học viên dùng Antigravity trên máy cá nhân chỉ cần chạy 1 lệnh bên dưới để cài đặt trọn bộ kỹ năng so-do-motion (tự động tách riêng thư mục cấu hình ~/.so-do-motion/config.env và hồ sơ giọng cá nhân voice_profile.json, hội ý kiến trúc cùng CLAUDE2):"
        },
        "youtube_videos": [
          {
            "badge": "① VIDEO MẪU GỐC (TIKTOK)",
            "video_id": "6xYxOScrJJQ",
            "title": "Video Mẫu Tham Khảo (TikTok Reference)",
            "desc": "Video mẫu gốc TikTok minh họa cách sử dụng Element Sơ đồ giải thích quy trình từng bước để dẫn dắt thị giác khán giả."
          },
          {
            "badge": "② BƯỚC 1: ĐỒ HỌA 60FPS + SFX",
            "video_id": "HdaIsC-FyqA",
            "title": "Bản Đồ Họa Sơ Đồ 60fps + Phụ Đề 5B + 4 Lớp SFX (Không Lời)",
            "desc": "Thành phẩm Bước 1 (1080×1920 @ 60fps, 19.50s): Sơ đồ 4 tầng mở sáng từng nhánh theo 10 Vi Nhịp, tích hợp Phụ đề 5B cách đáy sơ đồ 102px và 4 lớp SFX Studio."
          },
          {
            "badge": "③ BƯỚC 2: LỒNG TIẾNG KHÓA NHỊP",
            "video_id": "nUgeMCaA8I0",
            "title": "Bản Hoàn Chỉnh: Lồng Tiếng AI Studio Khóa 10 Vi Nhịp (165.5Hz)",
            "desc": "Thành phẩm Bước 2 (1080×1920 @ 60fps, 19.50s): Ghép giọng đọc lấy từ Google AI Studio (gemini-3.8-flash-tts + Màu giọng anh Việt 165.5Hz, -16 LUFS, vượt 4/4 Cổng Verifier)."
          }
        ],
        "items": [
          {
            "tier": "2 Chế Độ Giọng Đọc Thông Minh (Phân Nhánh Tự Động Theo Câu Lệnh)",
            "code": "MODE-1",
            "name": "Gọi bình thường → Giọng tạo từ Gemini TTS (gemini-3.8-flash-tts)",
            "desc": "Khi gõ 'Tạo sơ đồ motion...' hoặc 'SO DO MOTION' (không có cụm 'giọng của tôi'), hệ thống tự động gọi Gemini 3.8 Flash TTS sinh giọng đọc Studio miền Bắc điềm tĩnh, chuẩn hóa Studio Warm EQ (-16 LUFS)."
          },
          {
            "tier": "2 Chế Độ Giọng Đọc Thông Minh (Phân Nhánh Tự Động Theo Câu Lệnh)",
            "code": "MODE-2",
            "name": "Thêm 'giọng của tôi' → Lấy giọng thật bằng AI Studio (Voice Design + F0 Transfer)",
            "desc": "Khi thêm cụm 'giọng của tôi', hệ thống trích mẫu giọng sạch 14s từ video trong máy (hoặc ~/.so-do-motion/voice_profile.json), đo tần số cơ bản trung vị (VD: 165.5Hz) và gọi Google AI Studio kết hợp Formant-Preserving Acoustic Transfer."
          },
          {
            "tier": "Vòng Lặp Tự Học 4 Cổng Kiểm Định Tất Định (verifier_4gates.py)",
            "code": "GATE 1–2",
            "name": "Khớp Cửa Sổ 10 Vi Nhịp & Studio Warm Mastering (-16 LUFS)",
            "desc": "Cổng 1 ép từng câu đọc nằm gọn trong cửa sổ [start+0.06s, end-0.10s] của đúng nhịp đèn sáng trên sơ đồ. Cổng 2 lọc tần số chói >7.5kHz, nâng dải trầm ấm 160–220Hz và chuẩn hóa -16 LUFS."
          },
          {
            "tier": "Vòng Lặp Tự Học 4 Cổng Kiểm Định Tất Định (verifier_4gates.py)",
            "code": "GATE 3–4",
            "name": "Chống Cụt Đuôi Từ (>=80ms) & Ghép 4 Lớp SFX Voice-Safe 60fps",
            "desc": "Cổng 3 kiểm tra khoảng lặng đuôi từ >= 80ms và Peak <= -1.0 dBFS. Cổng 4 trộn giọng đọc (100%) với 4 lớp SFX (8.5%) vào video 1080×1920 @ 60fps."
          }
        ],
        "asset_dir": "so_do_motion",
        "showcase_title": "🖼️ Bảng Kiểm Định 10 Vi Nhịp 60fps • 4 Chặng Mở Sáng • Khung Phụ Đề 5B",
        "showcase_badge": "Chuẩn E009FE7E • 1080×1920 @ 60fps • 4/4 Gates Passed",
        "preview_images": [
          {
            "src": "/Users/vietmac/.gemini/antigravity/brain/105eb0df-7ed0-4ed3-82b8-7a87cb371c77/ai_edit_diagram_60fps_10beats_grid.jpg",
            "caption": "Bảng kiểm định 10 Vi Nhịp (Beats #01 → #10) từ 0.00s đến 19.50s khớp từng câu thoại và hiệu ứng mở sáng",
            "web_src": "assets/so_do_motion/ai_edit_diagram_60fps_10beats_grid.jpg"
          },
          {
            "src": "/Users/vietmac/.gemini/antigravity/brain/105eb0df-7ed0-4ed3-82b8-7a87cb371c77/preview_v2_4steps_progression.jpg",
            "caption": "Tiến trình 4 chặng mở sáng (Progressive Node Reveal): Sơ đồ bung mở tuần tự theo giọng đọc, không hiện tĩnh một cục",
            "web_src": "assets/so_do_motion/preview_v2_4steps_progression.jpg"
          },
          {
            "src": "/Users/vietmac/.gemini/antigravity/brain/105eb0df-7ed0-4ed3-82b8-7a87cb371c77/preview_v2_stage2_sub5b.png",
            "caption": "Khung hình 9:16 chuẩn: Sơ đồ 4 tầng bên trên + Hộp Phụ đề 5B khóa x-height 1:1 bên dưới (khoảng thở an toàn 102px)",
            "web_src": "assets/so_do_motion/preview_v2_stage2_sub5b.png"
          }
        ],
        "tech_specs": [
          "Thư mục kỹ năng chuẩn: <code>~/.gemini/config/skills/so-do-motion/</code> (gồm <code>SKILL.md</code>, <code>templates/spec.example.json</code>, <code>scripts/so_do_motion_cli.py</code>, <code>build_diagram_motion_60fps.py</code>, <code>self_learning_voice_loop.py</code>, <code>verifier_4gates.py</code>).",
          "Thư mục dữ liệu độc lập của từng học viên: <code>~/.so-do-motion/</code> (chứa <code>config.env</code> lưu <code>GEMINI_API_KEY</code> quyền <code>600</code> và <code>voice_profile.json</code> lưu tần số cơ bản <code>median_f0_hz</code> + mẫu giọng 14s, không bị mất khi cập nhật skill).",
          "Lệnh cài đặt 1 chạm cho học viên Antigravity: <code>curl -sSL https://fedu.vn/skill/install-so-do-motion.sh | bash</code>.",
          "Ba video minh họa thuộc Playlist YouTube <code>aivideo</code> (<code>PLJ70SzNu_fc8</code>): Mẫu TikTok (<code>6xYxOScrJJQ</code>), Bước 1 Không Lời 60fps (<code>HdaIsC-FyqA</code>), Bước 2 Có Lời Khóa Nhịp (<code>nUgeMCaA8I0</code>)."
        ]
      },
      {
        "id": "khuon-so-6-suiplay-launch-20s",
        "date": "2026-10-22",
        "title": "Khuôn Gốc .TSX Số 6: VietSuiPlayLaunch20s — Trailer 3D Portal & Match-Cut 60fps (Xuất Cả 16:9 & 9:16)",
        "step_target": "buoc-4",
        "source_thread": "22a026eb-727a-46f5-847c-626c08459a85",
        "what": "Khuôn dựng phim tự động số 6 (<code>VietSuiPlayLaunch20s.tsx</code>, 20.03s / 1.202 frames @ 60fps) đúc từ mẫu trailer công nghệ quốc tế (Pinterest <code>1099793171536756930</code>). Tự động đồng bộ <strong>10 cụm chữ Tiếng Việt</strong> + <strong>Khung Thiết Bị 3D 14 lớp Zoom-Through</strong> + <strong>16 đoạn video thực tế</strong> (So sánh Trước/Sau & 9 cú Match-Cut 0.25s/cảnh theo nhịp trống dồn), xuất đồng thời cả 2 bản <strong>Ngang 16:9</strong> và <strong>Dọc 9:16</strong>.",
        "why": "Khi cần video giới thiệu hệ thống/khóa học hoặc tổng hợp hàng loạt thành phẩm đã làm (Talking-head, Spa Edit, Nha khoa Atlas, AI Hook, Motion 60fps), việc kéo tay 16 video khớp từng nhịp trống 0.25s kèm thiết bị 3D xoay mở màn hình mất cả ngày. Đúc thành Khuôn .TSX số 6 giúp đổi toàn bộ 10 câu chữ và danh sách video trong 3 giây qua Bảng Điền Chữ <code>Tweaks</code>.",
        "how_cmd": "Áp dụng khuôn số 6 VietSuiPlayLaunch20s xuất cả bản 16:9 và 9:16 với bộ chữ mới và các video minh họa vừa làm",
        "items": [
          {
            "tier": "Stage 1–3 (0.0s – 7.25s) — Mở Màn & 3D Device Portal",
            "code": "S1–S3",
            "name": "Định nghĩa lại → Edit Video với AI (AI by Gemini)",
            "desc": "Blur-in ngang từ tâm, vẽ nét viền SVG stroke-dashoffset, nhấp nháy tắt từng ký tự theo Riser, sau đó Khung Thiết Bị 3D 14 lớp bay lên đúng Bass Drop #1 (5.04s) và Zoom-Through xuyên qua màn hình tại 7.10s."
          },
          {
            "tier": "Stage 4–5 (7.25s – 11.7s) — Showcase Trước/Sau & Đa Phong Cách",
            "code": "S4–S5",
            "name": "Tự động cắt & tạo cảnh → Style của riêng bạn",
            "desc": "Chữ 2 tầng lao ngang/dọc với Directional SVG Motion Blur trên nền các video Side-by-Side Trước & Sau (Việt 8h, Thẩm Thỏ 1, Thẩm Thỏ 2 Detox Atlas, Tiến Nha Sỹ, Claude Risograph)."
          },
          {
            "tier": "Stage 6 (11.7s – 15.2s) — Kinetic Typography Đỉnh Cao",
            "code": "S6A–S6C",
            "name": "M → Một lệnh → Tự làm toàn bộ → Bạn chỉ cần lo kiến thức",
            "desc": "Chữ M khổng lồ (scale 15.5 -> 1) thu về tâm thành Một lệnh (kèm pill AI by Gemini), bung 2 dòng Tự làm / toàn bộ và mở Khung Thẻ Vuông Bo Góc ở chính giữa chữ."
          },
          {
            "tier": "Stage 7–8 (15.2s – 20.03s) — 9 Match-Cut Drum Roll & 3D Outro",
            "code": "S7–S8",
            "name": "Dựng cơ bản có AI → offline.fedu.vn",
            "desc": "9 cảnh video thực tế cắt liên thanh 0.25s/cảnh theo nhịp trống dồn (All-Intra 60fps 0ms trễ), sau đó Zoom-Out ngược về Khung Thiết Bị 3D trên nền tia sáng chữ X (X-Glow) hiện rõ offline.fedu.vn và đóng màn trập Side Shutter."
          }
        ],
        "asset_dir": "suiplay_launch",
        "preview_images": [
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/pinterest_1099793171536756930/verify_grid_16x9.jpg",
            "caption": "Bản Ngang 16:9 (1920×1080 @ 60fps) — Lưới kiểm định 24 mốc frame qua 8 Stages",
            "web_src": "assets/suiplay_launch/verify_grid_16x9.jpg"
          },
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/pinterest_1099793171536756930/verify_grid_9x16.jpg",
            "caption": "Bản Dọc 9:16 (1080×1920 @ 60fps) — Lưới kiểm định 24 mốc frame thích ứng Reels/TikTok",
            "web_src": "assets/suiplay_launch/verify_grid_9x16.jpg"
          },
          {
            "src": "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/pinterest_1099793171536756930/key_transitions_sheet.jpg",
            "caption": "Bảng giải phẫu 60 mốc frame chuyển tiếp của video mẫu gốc Pinterest 1099793171536756930",
            "web_src": "assets/suiplay_launch/key_transitions_sheet.jpg"
          }
        ],
        "studio_file": "suiplay_launch_motion_studio.html",
        "studio_modes": [
          {
            "label": "🚀 Mở Studio Phát Đồng Bộ 3 Màn Hình (Gốc ↔ 16:9 ↔ 9:16)",
            "query": ""
          }
        ],
        "tech_specs": [
          "Khuôn gốc: <code>remotion-studio/src/compositions/VietSuiPlayLaunch20s.tsx</code> (đã sao lưu tại <code>course_repo/assets/tsx/VietSuiPlayLaunch20s.tsx</code>).",
          "2 Composition ID đăng ký sẵn: <code>VietSuiPlayLaunch16x9</code> (<code>1920×1080</code>, <code>60fps</code>, <code>1202 frames</code>) và <code>VietSuiPlayLaunch9x16</code> (<code>1080×1920</code>, <code>60fps</code>, <code>1202 frames</code>).",
          "Giải pháp chống giật frame khi cắt 16 video (hội ý cùng OPUS): Pre-slice 16 đoạn video sang chuẩn <code>60fps All-Intra (-g 1, crf 16, yuv420p)</code> tại <code>public/suiplay/</code> kết hợp <code>&lt;Sequence&gt;</code> tự mount/unmount.",
          "Directional SVG Motion Blur: Tính tự động theo vận tốc tức thời <code>stdDeviation=\"vx, vy\"</code> và tắt hoàn toàn khi chữ khóa nét."
        ]
      },
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
      "size": 23573,
      "size_formatted": "23.0 KB",
      "lines_count": 177,
      "mtime": 1792742350.2682097,
      "mtime_formatted": "23/10/2026 14:59",
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
      "size": 16563,
      "size_formatted": "16.2 KB",
      "lines_count": 141,
      "mtime": 1792683747.800313,
      "mtime_formatted": "22/10/2026 22:42",
      "headers": [
        "🎯 1. BẢNG MANTRA & TÌNH HUỐNG KÍCH HOẠT",
        "🧠 2. BỐN TRỤ CỘT TƯ DUY ĐẦU RA TỐT NHẤT (ĐÚC KẾT TỪ MOTION 01 $\\rightarrow$ 06 & CLAUDE2 OPUS 5.5)",
        "🏛️ 3. SÁU KHUÔN THIẾT KẾ GỐC (`.TSX`) & MA TRẬN ÁP DỤNG `SPATIAL CAMERA ENGINE`",
        "⚙️ 4. QUY TRÌNH THỰC THI 6 BƯỚC CHUẨN & 4 CỔNG KIỂM ĐỊNH (`4-GATE VERIFIER`)",
        "🔄 5. CƠ CHẾ TỰ ĐỘNG ĐỒNG BỘ LÊN `videoai.fedu.vn` (`ZERO-FRICTION AUTO-EVOLVE`)"
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
      "name": "Kỹ năng Edit Video cho Spa (Spa-Edit V10 Master)",
      "badge": "SPA NICHE PACK V10",
      "desc": "Gói đóng gói chuyên biệt cho chủ đề Spa/Thẩm mỹ (Gọi tự nhiên: 'Hãy edit video sau theo phong cách spa' hoặc 'EDIT SPA' — Whip-Snap Zoom 0.28s khớp nhịp lấy hơi, Logo chỉ ở CTA & Outro, Atlas 2D hội ý CLAUDE2, Trước-Sau nền trắng #F5F2EB).",
      "path": "/Users/vietmac/.gemini/config/skills/spa-edit/SKILL.md",
      "size": 8567,
      "size_formatted": "8.4 KB",
      "lines_count": 93,
      "mtime": 1792742189.1667032,
      "mtime_formatted": "23/10/2026 14:56",
      "headers": [
        "🗣️ 0. TÊN KỸ NĂNG & CÁCH GỌI TỰ NHIÊN (0 MA SÁT)",
        "🔥 1. BỐN NÂNG CẤP CỐT LÕI ĐÃ CẬP NHẬT TRONG BẢN `V10 MASTER`",
        "🚀 2. ĐẦU VÀO CẦN GÌ (`INPUTS`)?",
        "⚡ 3. CÁC LỆNH CHẠY TẤT ĐỊNH (`1-TURN CLI`)"
      ],
      "status": "ACTIVE"
    },
    "so-do-motion": {
      "id": "so-do-motion",
      "name": "Element Sơ Đồ Motion 60fps (Explainer Flowchart & Beat-Locked Voice)",
      "badge": "FLOWCHART 60FPS",
      "desc": "Tạo sơ đồ giải thích quy trình 60fps kèm Phụ đề 5B, 4 lớp SFX & Lồng tiếng Khóa Vi Nhịp 4 Cổng Verifier (Mặc định: Giọng Gemini TTS; Thêm 'giọng của tôi': Lấy giọng thật qua AI Studio).",
      "path": "/Users/vietmac/.gemini/config/skills/so-do-motion/SKILL.md",
      "size": 7020,
      "size_formatted": "6.9 KB",
      "lines_count": 81,
      "mtime": 1792678616.892709,
      "mtime_formatted": "22/10/2026 21:16",
      "headers": [
        "🗣️ 0. TÊN KỸ NĂNG & CÁCH GỌI TỰ NHIÊN (2 CHẾ ĐỘ GIỌNG ĐỌC)",
        "🏗️ 1. KIẾN TRÚC 2 BƯỚC & VÒNG LẶP TỰ HỌC 4 CỔNG VERIFIER",
        "⚡ 2. CÁC LỆNH CLI TẤT ĐỊNH (`so_do_motion_cli.py`)",
        "📦 3. CÀI ĐẶT 1 CHẠM CHO HỌC VIÊN ANTIGRAVITY"
      ],
      "status": "ACTIVE"
    },
    "ai-hook": {
      "id": "ai-hook",
      "name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "badge": "AI HOOK ROUTER V3.0",
      "desc": "Hệ thống Smart AI Hook Router v3.0 (Zero-Collision Registry hooks.d/ + register_hook.py khóa nguyên tử fcntl.flock) tự động quét 3 giây đầu video gốc và kết xuất 15 chế độ Hook: Rooftop Jump V3, Earth Zoom V3/V5, Display Transition 2.5D Homography (2.00s), Intermission Stage Velvet Curtain (2.00s), Vertical Crane Jib-Down (2.30s), Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object & Rapid Zoom.",
      "path": "/Users/vietmac/.gemini/config/skills/ai-hook/SKILL.md",
      "size": 48273,
      "size_formatted": "47.1 KB",
      "lines_count": 278,
      "mtime": 1792829249.014575,
      "mtime_formatted": "24/10/2026 15:07",
      "headers": [
        "0.1 Quy Trình Đóng Gói Hook Mới Chống Ghi Đè (`Zero-Collision Modular Registry v3.0` — Chuẩn CLAUDE2 `claude_pro_cc944965`)",
        "0. Quy Trình Định Tuyến Thông Minh Mặc Định (Smart AI Hook Router — Anh Việt Không Cần Nhớ Tên Hook)",
        "1. Kiến Trúc 4 Chế Độ Preset Đóng Gói Sẵn (`hooks_registry.json`)",
        "2. Lệnh CLI Thực Thi Nhanh (`hook_scanner.py` & `ai_hook_engine.py`)",
        "3. Tài Nguyên Tự Thân Đóng Gói Trong Skill (`assets/` & `hooks_registry.json`)",
        "4. Cổng Kiểm Định Chống Giật Tự Động & Cơ Chế Tự Học (Anti-Jitter Verifier Gate & Self-Upgrading Loop)"
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
      "name": "GiaHanBookReview.tsx",
      "kind": "composition",
      "size": 43469,
      "size_formatted": "42.5 KB",
      "lines": 1537,
      "mtime": 1792756449.4350102,
      "mtime_formatted": "23/10/2026 18:54",
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
      "size": 100860,
      "size_formatted": "98.5 KB",
      "lines": 3116,
      "mtime": 1792681167.8635862,
      "mtime_formatted": "22/10/2026 21:59",
      "desc": "============================================================================"
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
      "name": "VietSuiPlayLaunch20s.tsx",
      "kind": "composition",
      "size": 58944,
      "size_formatted": "57.6 KB",
      "lines": 1574,
      "mtime": 1792676896.3981342,
      "mtime_formatted": "22/10/2026 20:48",
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
      "size": 13417,
      "size_formatted": "13.1 KB",
      "lines": 243,
      "mtime": 1792742210.2069106,
      "mtime_formatted": "23/10/2026 14:56",
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
      "size": 25462,
      "size_formatted": "24.9 KB",
      "lines": 619,
      "mtime": 1792742219.5398512,
      "mtime_formatted": "23/10/2026 14:56",
      "desc": "Bước 5 — Kiểm định Tất Định Sản Phẩm Motion Graphic V3 (verify_motion_deliverable.py)"
    },
    {
      "name": "spa_edit_cli.py",
      "skill_id": "spa-edit",
      "skill_name": "Kỹ năng Edit Video cho Spa (Spa-Edit V10 Master)",
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
      "skill_name": "Kỹ năng Edit Video cho Spa (Spa-Edit V10 Master)",
      "size": 2365,
      "size_formatted": "2.3 KB",
      "lines": 40,
      "mtime": 1792742243.7970579,
      "mtime_formatted": "23/10/2026 14:57",
      "desc": "6-GATE DETERMINISTIC VERIFIER FOR SPA-EDIT SKILL"
    },
    {
      "name": "build_diagram_motion_60fps.py",
      "skill_id": "so-do-motion",
      "skill_name": "Element Sơ Đồ Motion 60fps (Explainer Flowchart & Beat-Locked Voice)",
      "size": 39027,
      "size_formatted": "38.1 KB",
      "lines": 834,
      "mtime": 1792678713.129159,
      "mtime_formatted": "22/10/2026 21:18",
      "desc": "STEP 1: AI VIDEO EDIT WORKFLOW DIAGRAM MOTION 60FPS (NO SPEECH + THAM THO 5B SUBTITLE SYNC + 4-LAYER SFX)"
    },
    {
      "name": "self_learning_voice_loop.py",
      "skill_id": "so-do-motion",
      "skill_name": "Element Sơ Đồ Motion 60fps (Explainer Flowchart & Beat-Locked Voice)",
      "size": 24652,
      "size_formatted": "24.1 KB",
      "lines": 599,
      "mtime": 1792678713.1320174,
      "mtime_formatted": "22/10/2026 21:18",
      "desc": "STEP 2 (UPGRADED V2): GEMINI 3.8 FLASH TTS STUDIO VOICE + REAL-VOICE ACOUSTIC TRANSFER LOOP"
    },
    {
      "name": "so_do_motion_cli.py",
      "skill_id": "so-do-motion",
      "skill_name": "Element Sơ Đồ Motion 60fps (Explainer Flowchart & Beat-Locked Voice)",
      "size": 12253,
      "size_formatted": "12.0 KB",
      "lines": 247,
      "mtime": 1792678726.2243233,
      "mtime_formatted": "22/10/2026 21:18",
      "desc": "so_do_motion_cli.py — CLI ĐIỀU PHỐI KỸ NĂNG SƠ ĐỒ MOTION 60FPS (SO-DO-MOTION)"
    },
    {
      "name": "verifier_4gates.py",
      "skill_id": "so-do-motion",
      "skill_name": "Element Sơ Đồ Motion 60fps (Explainer Flowchart & Beat-Locked Voice)",
      "size": 4848,
      "size_formatted": "4.7 KB",
      "lines": 114,
      "mtime": 1792742212.9806004,
      "mtime_formatted": "23/10/2026 14:56",
      "desc": "verifier_4gates.py"
    },
    {
      "name": "ai_hook_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 45150,
      "size_formatted": "44.1 KB",
      "lines": 1031,
      "mtime": 1792829015.4819846,
      "mtime_formatted": "24/10/2026 15:03",
      "desc": "AI Hook Engine (ai-hook) — Hệ thống đóng gói tự động hiệu ứng Vào Cảnh Đứng Nói (Gemini × CLAUDE2)"
    },
    {
      "name": "blinds_in_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 32693,
      "size_formatted": "31.9 KB",
      "lines": 706,
      "mtime": 1792800202.3285782,
      "mtime_formatted": "24/10/2026 07:03",
      "desc": "3D Venetian Blinds Peek-In Engine (`blinds_in_engine.py`) — `through-object-in` (2.15s Hook)"
    },
    {
      "name": "build_earth_zoom_master_v3.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 37313,
      "size_formatted": "36.4 KB",
      "lines": 744,
      "mtime": 1792681927.5065823,
      "mtime_formatted": "22/10/2026 22:12",
      "desc": "Earth Zoom master v3: ex_1 space | concentric cloud punch-through | Veo1 clear city | Veo B_flow->A | viet2210.MOV."
    },
    {
      "name": "display_transition_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 11575,
      "size_formatted": "11.3 KB",
      "lines": 298,
      "mtime": 1792828373.811497,
      "mtime_formatted": "24/10/2026 14:52",
      "desc": "Display Transition 2.5D Homography Engine (`display_transition_engine.py`)"
    },
    {
      "name": "earth_zoom_master_v2.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 26812,
      "size_formatted": "26.2 KB",
      "lines": 664,
      "mtime": 1792663271.6979327,
      "mtime_formatted": "22/10/2026 17:01",
      "desc": "Earth Zoom Master V2 Engine (`earth_zoom_master_v2.py`) — Chuẩn Hóa Từ Luồng 7ef7b16f-5b2b-46a2-bbe4-b4f587205229"
    },
    {
      "name": "earth_zoom_omni_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 20813,
      "size_formatted": "20.3 KB",
      "lines": 478,
      "mtime": 1792821275.3790393,
      "mtime_formatted": "24/10/2026 12:54",
      "desc": "Earth Zoom V5 Omni Self-Learning Engine (CLAUDE2 Verified Architecture)"
    },
    {
      "name": "flycam_transition_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 39972,
      "size_formatted": "39.0 KB",
      "lines": 904,
      "mtime": 1792821115.8472116,
      "mtime_formatted": "24/10/2026 12:51",
      "desc": "Flycam-Transition V2 AI Hook Engine (`flycam_transition_engine.py`)"
    },
    {
      "name": "giant_grab_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 40604,
      "size_formatted": "39.7 KB",
      "lines": 912,
      "mtime": 1792820687.649398,
      "mtime_formatted": "24/10/2026 12:44",
      "desc": "Giant-Grab AI Hook Engine (`giant_grab_engine.py`)"
    },
    {
      "name": "hero_cam_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 29821,
      "size_formatted": "29.1 KB",
      "lines": 735,
      "mtime": 1792829015.6378531,
      "mtime_formatted": "24/10/2026 15:03",
      "desc": "Hero-Cam V2 Engine: 6-View Turnaround Reference + Google Flow Veo 3.1 True 3D Orbit"
    },
    {
      "name": "hook_scanner.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 21813,
      "size_formatted": "21.3 KB",
      "lines": 457,
      "mtime": 1792829082.9184892,
      "mtime_formatted": "24/10/2026 15:04",
      "desc": "AI Hook Scanner (`hook_scanner.py`) — Bộ giải phẫu video đầu vào & gợi ý Hook thông minh"
    },
    {
      "name": "hookreg.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 5912,
      "size_formatted": "5.8 KB",
      "lines": 175,
      "mtime": 1792828448.4827209,
      "mtime_formatted": "24/10/2026 14:54",
      "desc": "AI Hook Registry v3.0 Library (`hookreg.py`) — Thiết kế Gemini × CLAUDE2 (`claude_pro_cc944965.md`)"
    },
    {
      "name": "intermission_curtain_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 25290,
      "size_formatted": "24.7 KB",
      "lines": 578,
      "mtime": 1792828445.8851185,
      "mtime_formatted": "24/10/2026 14:54",
      "desc": "Intermission Curtain Engine (intermission_curtain_engine.py) — Kỹ năng ai-hook"
    },
    {
      "name": "jib_down_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 36505,
      "size_formatted": "35.6 KB",
      "lines": 773,
      "mtime": 1792827740.0401027,
      "mtime_formatted": "24/10/2026 14:42",
      "desc": "Jib-Down Engine (`jib_down_engine.py`) — Hạ Cần Cẩu Máy Quay Từ Trên Cao Xuống Ngang Mắt (2.30s Hook)"
    },
    {
      "name": "katana_palette_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 39666,
      "size_formatted": "38.7 KB",
      "lines": 975,
      "mtime": 1792817821.3488367,
      "mtime_formatted": "24/10/2026 11:57",
      "desc": "Katana Palette Hook Engine (`katana_palette_engine.py`) — `katana-palette-hook` (2.40s Hook)"
    },
    {
      "name": "point_cloud_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 39361,
      "size_formatted": "38.4 KB",
      "lines": 896,
      "mtime": 1792774531.450546,
      "mtime_formatted": "23/10/2026 23:55",
      "desc": "3D LiDAR Matrix & Blueprint Wireframe Assembly Engine (point-cloud 2.20s AI Hook)."
    },
    {
      "name": "register_hook.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 12925,
      "size_formatted": "12.6 KB",
      "lines": 307,
      "mtime": 1792829515.4880908,
      "mtime_formatted": "24/10/2026 15:11",
      "desc": "AI Hook Atomic Registry Manager (`register_hook.py`) — Thiết kế Gemini × CLAUDE2 (`claude_pro_cc944965.md`)"
    },
    {
      "name": "rooftop_jump_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 18537,
      "size_formatted": "18.1 KB",
      "lines": 422,
      "mtime": 1792663062.2859828,
      "mtime_formatted": "22/10/2026 16:57",
      "desc": "Rooftop Jump Engine (`rooftop_jump_engine.py`) — Động cơ tự động tạo hiệu ứng Nhảy Từ Đỉnh Tòa Nhà (Master V3)"
    },
    {
      "name": "sticker_transition_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 32651,
      "size_formatted": "31.9 KB",
      "lines": 739,
      "mtime": 1792800084.41793,
      "mtime_formatted": "24/10/2026 07:01",
      "desc": "3D Die-Cut Sticker Peel & Match-Cut AI Hook Engine (`sticker_transition_engine.py`)"
    },
    {
      "name": "timelapse_freeze_engine.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 35666,
      "size_formatted": "34.8 KB",
      "lines": 853,
      "mtime": 1792821034.1258686,
      "mtime_formatted": "24/10/2026 12:50",
      "desc": "Timelapse-Freeze AI Hook Engine (`timelapse_freeze_engine.py`)"
    },
    {
      "name": "verify_flycam_transition.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 83619,
      "size_formatted": "81.7 KB",
      "lines": 1894,
      "mtime": 1792821399.0401013,
      "mtime_formatted": "24/10/2026 12:56",
      "desc": "SA2 — Deterministic Verifier & Synthetic Self-Test Suite for `flycam-transition` AI Hook."
    },
    {
      "name": "verify_intermission_curtain.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 13439,
      "size_formatted": "13.1 KB",
      "lines": 320,
      "mtime": 1792828462.419022,
      "mtime_formatted": "24/10/2026 14:54",
      "desc": "Bộ Kiểm Định 6 Cổng Verifier (G0..G5) theo chuẩn Hội ý CLAUDE2"
    },
    {
      "name": "verify_jib_down.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 34290,
      "size_formatted": "33.5 KB",
      "lines": 728,
      "mtime": 1792827694.4328005,
      "mtime_formatted": "24/10/2026 14:41",
      "desc": "Anti-Jitter / Anti-Stutter QA Verifier for Vertical-Jib / AI-Hook renders."
    },
    {
      "name": "verify_katana_palette.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 34455,
      "size_formatted": "33.6 KB",
      "lines": 856,
      "mtime": 1792817773.2329297,
      "mtime_formatted": "24/10/2026 11:56",
      "desc": "SA2 — Katana Palette Verifier (Gates G0, K1, K2, K3, K4)"
    },
    {
      "name": "verify_smooth_zoom.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 26938,
      "size_formatted": "26.3 KB",
      "lines": 467,
      "mtime": 1792820697.499675,
      "mtime_formatted": "24/10/2026 12:44",
      "desc": "Anti-Jitter / Anti-Stutter QA gate for Earth-Zoom / AI-Hook renders."
    },
    {
      "name": "verify_sticker_transition.py",
      "skill_id": "ai-hook",
      "skill_name": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "size": 58062,
      "size_formatted": "56.7 KB",
      "lines": 1347,
      "mtime": 1792819097.907293,
      "mtime_formatted": "24/10/2026 12:18",
      "desc": "SA2 — Deterministic 5-Gate Verifier (G0_COMMON + G1..G4) & Self-Test Suite"
    }
  ],
  "history": [
    {
      "name": "evolution_log.json",
      "type": "Evolution Registry",
      "skill": "Auto-Evolve Hub",
      "mtime": 1792829578.5334964,
      "mtime_formatted": "24/10/2026 15:12",
      "detail": "10 quy chuẩn • 14 studios"
    },
    {
      "name": "scripts/register_hook.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792829515.4880908,
      "mtime_formatted": "24/10/2026 15:11",
      "detail": "AI Hook Atomic Registry Manager (`register_hook.py`) — Thiết kế Gemini × CLAUDE2 (`claude_pro_cc944965.md`)"
    },
    {
      "name": "ai-hook/SKILL.md",
      "type": "Markdown Spec",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792829249.014575,
      "mtime_formatted": "24/10/2026 15:07",
      "detail": "278 dòng • 6 mục chính"
    },
    {
      "name": "scripts/hook_scanner.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792829082.9184892,
      "mtime_formatted": "24/10/2026 15:04",
      "detail": "AI Hook Scanner (`hook_scanner.py`) — Bộ giải phẫu video đầu vào & gợi ý Hook thông minh"
    },
    {
      "name": "scripts/hero_cam_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792829015.6378531,
      "mtime_formatted": "24/10/2026 15:03",
      "detail": "Hero-Cam V2 Engine: 6-View Turnaround Reference + Google Flow Veo 3.1 True 3D Orbit"
    },
    {
      "name": "scripts/ai_hook_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792829015.4819846,
      "mtime_formatted": "24/10/2026 15:03",
      "detail": "AI Hook Engine (ai-hook) — Hệ thống đóng gói tự động hiệu ứng Vào Cảnh Đứng Nói (Gemini × CLAUDE2)"
    },
    {
      "name": "scripts/verify_intermission_curtain.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792828462.419022,
      "mtime_formatted": "24/10/2026 14:54",
      "detail": "Bộ Kiểm Định 6 Cổng Verifier (G0..G5) theo chuẩn Hội ý CLAUDE2"
    },
    {
      "name": "scripts/hookreg.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792828448.4827209,
      "mtime_formatted": "24/10/2026 14:54",
      "detail": "AI Hook Registry v3.0 Library (`hookreg.py`) — Thiết kế Gemini × CLAUDE2 (`claude_pro_cc944965.md`)"
    },
    {
      "name": "scripts/intermission_curtain_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792828445.8851185,
      "mtime_formatted": "24/10/2026 14:54",
      "detail": "Intermission Curtain Engine (intermission_curtain_engine.py) — Kỹ năng ai-hook"
    },
    {
      "name": "scripts/display_transition_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792828373.811497,
      "mtime_formatted": "24/10/2026 14:52",
      "detail": "Display Transition 2.5D Homography Engine (`display_transition_engine.py`)"
    },
    {
      "name": "scripts/jib_down_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792827740.0401027,
      "mtime_formatted": "24/10/2026 14:42",
      "detail": "Jib-Down Engine (`jib_down_engine.py`) — Hạ Cần Cẩu Máy Quay Từ Trên Cao Xuống Ngang Mắt (2.30s Hook)"
    },
    {
      "name": "scripts/verify_jib_down.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792827694.4328005,
      "mtime_formatted": "24/10/2026 14:41",
      "detail": "Anti-Jitter / Anti-Stutter QA Verifier for Vertical-Jib / AI-Hook renders."
    },
    {
      "name": "scripts/verify_flycam_transition.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792821399.0401013,
      "mtime_formatted": "24/10/2026 12:56",
      "detail": "SA2 — Deterministic Verifier & Synthetic Self-Test Suite for `flycam-transition` AI Hook."
    },
    {
      "name": "scripts/earth_zoom_omni_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792821275.3790393,
      "mtime_formatted": "24/10/2026 12:54",
      "detail": "Earth Zoom V5 Omni Self-Learning Engine (CLAUDE2 Verified Architecture)"
    },
    {
      "name": "scripts/flycam_transition_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792821115.8472116,
      "mtime_formatted": "24/10/2026 12:51",
      "detail": "Flycam-Transition V2 AI Hook Engine (`flycam_transition_engine.py`)"
    },
    {
      "name": "scripts/timelapse_freeze_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792821034.1258686,
      "mtime_formatted": "24/10/2026 12:50",
      "detail": "Timelapse-Freeze AI Hook Engine (`timelapse_freeze_engine.py`)"
    },
    {
      "name": "scripts/verify_smooth_zoom.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792820697.499675,
      "mtime_formatted": "24/10/2026 12:44",
      "detail": "Anti-Jitter / Anti-Stutter QA gate for Earth-Zoom / AI-Hook renders."
    },
    {
      "name": "scripts/giant_grab_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792820687.649398,
      "mtime_formatted": "24/10/2026 12:44",
      "detail": "Giant-Grab AI Hook Engine (`giant_grab_engine.py`)"
    },
    {
      "name": "scripts/verify_sticker_transition.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792819097.907293,
      "mtime_formatted": "24/10/2026 12:18",
      "detail": "SA2 — Deterministic 5-Gate Verifier (G0_COMMON + G1..G4) & Self-Test Suite"
    },
    {
      "name": "scripts/katana_palette_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792817821.3488367,
      "mtime_formatted": "24/10/2026 11:57",
      "detail": "Katana Palette Hook Engine (`katana_palette_engine.py`) — `katana-palette-hook` (2.40s Hook)"
    },
    {
      "name": "scripts/verify_katana_palette.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792817773.2329297,
      "mtime_formatted": "24/10/2026 11:56",
      "detail": "SA2 — Katana Palette Verifier (Gates G0, K1, K2, K3, K4)"
    },
    {
      "name": "scripts/blinds_in_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792800202.3285782,
      "mtime_formatted": "24/10/2026 07:03",
      "detail": "3D Venetian Blinds Peek-In Engine (`blinds_in_engine.py`) — `through-object-in` (2.15s Hook)"
    },
    {
      "name": "scripts/sticker_transition_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792800084.41793,
      "mtime_formatted": "24/10/2026 07:01",
      "detail": "3D Die-Cut Sticker Peel & Match-Cut AI Hook Engine (`sticker_transition_engine.py`)"
    },
    {
      "name": "scripts/point_cloud_engine.py",
      "type": "Python Script",
      "skill": "AI Hook Studio v3.0 (Zero-Collision Modular Registry hooks.d/ & 15 Presets: Rooftop Jump, Earth Zoom, Display Transition, Intermission, Jib-Down, Pantone1, Sticker Transition, Flycam-Transition, Timelapse-Freeze, Point-Cloud, Giant-Grab, Blinds-In, Hero-Cam, Through Object, Rapid Zoom)",
      "mtime": 1792774531.450546,
      "mtime_formatted": "23/10/2026 23:55",
      "detail": "3D LiDAR Matrix & Blueprint Wireframe Assembly Engine (point-cloud 2.20s AI Hook)."
    },
    {
      "name": "compositions/GiaHanBookReview.tsx",
      "type": "Remotion .TSX",
      "skill": "Remotion Studio 60fps",
      "mtime": 1792756449.4350102,
      "mtime_formatted": "23/10/2026 18:54",
      "detail": "1537 dòng • Composition"
    },
    {
      "name": "auto-edit-video/SKILL.md",
      "type": "Markdown Spec",
      "skill": "Auto Edit Video V3 (Talking-Head Studio)",
      "mtime": 1792742350.2682097,
      "mtime_formatted": "23/10/2026 14:59",
      "detail": "177 dòng • 7 mục chính"
    },
    {
      "name": "scripts/verify_6gates.py",
      "type": "Python Script",
      "skill": "Kỹ năng Edit Video cho Spa (Spa-Edit V10 Master)",
      "mtime": 1792742243.7970579,
      "mtime_formatted": "23/10/2026 14:57",
      "detail": "6-GATE DETERMINISTIC VERIFIER FOR SPA-EDIT SKILL"
    },
    {
      "name": "scripts/verify_motion_deliverable.py",
      "type": "Python Script",
      "skill": "Motion Studio 60fps (Universal Archetypes)",
      "mtime": 1792742219.5398512,
      "mtime_formatted": "23/10/2026 14:56",
      "detail": "Bước 5 — Kiểm định Tất Định Sản Phẩm Motion Graphic V3 (verify_motion_deliverable.py)"
    },
    {
      "name": "scripts/verifier_4gates.py",
      "type": "Python Script",
      "skill": "Element Sơ Đồ Motion 60fps (Explainer Flowchart & Beat-Locked Voice)",
      "mtime": 1792742212.9806004,
      "mtime_formatted": "23/10/2026 14:56",
      "detail": "verifier_4gates.py"
    },
    {
      "name": "scripts/qa_lint.py",
      "type": "Python Script",
      "skill": "Render V3 (Delta Patcher & EDL Engine)",
      "mtime": 1792742210.2069106,
      "mtime_formatted": "23/10/2026 14:56",
      "detail": "qa_lint.py — Deterministic Post-Plan & Pre-Render Verifier (MFX V4.0 — CLAUDE2 Council Edition)"
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
