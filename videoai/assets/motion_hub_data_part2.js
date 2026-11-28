/* ==========================================================================
   PHẦN 2 DỮ LIỆU MOTION HUB — NHÓM 04 ĐẾN NHÓM 09 (ĐỒNG BỘ TỰ ĐỘNG)
   ========================================================================== */
(function () {
  var extraCategories = [
    {
      id: "cat-04-intertitle-cascade",
      num: "04",
      tag: "Intertitle · J-Cut & Cascade",
      title: "Màn Chữ Đen 2 Phân Cấp Intertitle (MOI, AEO, TIEMPO + J-Cut) & Đa Màn Hình K5",
      skill: "intertitle + edit-video-pro",
      cmd: "intertitle <video>  (hoặc nói: xen màn chữ / thẻ đen / màn chữ 2 cấp)",
      desc: "Tự động xen màn chữ đen 2 cấp chữ tóm tắt vào giữa bài nói dài mỗi 22–28s (đã đổi tên chính thức từ Text Masterclass sang intertitle ngày 28/11). Đặt Compound Clip MOI, AEO, TIEMPO chuẩn J-Cut chờm 0,87s qua đầu câu mới, nổ nhạc nhac.fedu.vn ở 0 dB rồi hạ sát -30 dB khi có giọng nói; kèm nhánh mở rộng MasterClass PullBack & Documentary Cascade đa màn hình.",
      specs: ["Compound MOI, AEO, TIEMPO", "J-Cut chờm 0.87s", "Nhạc drop 0dB → -30dB", "Gate 8C/8D & Gate 10", "CapCut PC + MP4"],
      threads: [
        { id8: "3b555f71", cid: "3b555f71-ea62-4054-b1a6-bd88464a3eec", date: "28/11/2026", title: "[CHỐT] Chuẩn hóa tên kỹ năng intertitle (thay tên cũ Text kiểu masterclass) & tích hợp edit-video-pro" },
        { id8: "9d485479", cid: "9d485479-4c2c-47b6-aeb5-2bad1ebf86d0", date: "27/11/2026", title: "Dựng Quảng cáo K5: MasterClass PullBack & Documentary Cascade đa khung hình" },
        { id8: "14a96c36", cid: "14a96c36-2d5b-4d27-bbf6-2e4c222fe42b", date: "28/11/2026", title: "Đóng gói Edit Video Pro V5.2.0 tích hợp Màn đen 2 cấp J-Cut, Âm thanh V4 & Tách nền V2" },
        { id8: "da90beb2", cid: "da90beb2-46ae-4e46-b167-925c8ad7e81f", date: "20/11/2026", title: "Nghiệm thu chuẩn Compound Clip MOI, AEO, TIEMPO + J-Cut 5 lớp SFX nội tại" }
      ],
      videos: [
        {
          slug: "k5-ads-0815-pa1-masterclass-pullback",
          title: "Quảng cáo K5 (PA1) · MasterClass PullBack đa khung hình",
          date: "27/11/2026", dur: "63,0s", res: "9:16 · Motion",
          note: "Mở cận cảnh rồi kéo lùi lộ bức tường đa màn hình thành phẩm đồng bộ cùng nhịp nhạc cao trào.",
          videoUrl: "https://media.fedu.vn/mau/k5-ads-0815-pa1-masterclass-pullback/20261127222116.mp4",
          localPath: "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/k5_ads_masterclass_outro/K5_Ads_0815_PA1_MasterClass_PullBack.mp4",
          khoai: "https://khoai.fedu.vn/c/9d485479", cid: "9d485479-4c2c-47b6-aeb5-2bad1ebf86d0"
        },
        {
          slug: "k5-ads-0815-pa2-documentary-cascade",
          title: "Quảng cáo K5 (PA2) · Documentary Cascade xếp lớp",
          date: "27/11/2026", dur: "62,5s", res: "9:16 · Motion",
          note: "Các thẻ video thành phẩm trượt xếp thác nước liên hoàn kết hợp thẻ ngắt ý 2 phân cấp.",
          videoUrl: "https://media.fedu.vn/mau/k5-ads-0815-pa2-documentary-cascade/20261127222438.mp4",
          localPath: "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/k5_ads_masterclass_outro/K5_Ads_0815_PA2_Documentary_Cascade.mp4",
          khoai: "https://khoai.fedu.vn/c/9d485479", cid: "9d485479-4c2c-47b6-aeb5-2bad1ebf86d0"
        },
        {
          slug: "nghiemthu-manden-2phancap-masterclass-jcut",
          title: "Mẫu Nghiệm thu Gốc · Màn đen 2 phân cấp J-Cut",
          date: "20/11/2026", dur: "14,6s", res: "9:16 · J-Cut",
          note: "Mẫu chuẩn kiểm định độ khớp mép trái 0,000s, giọng câu mới vào sớm dưới màn đen 1,07s.",
          videoUrl: "https://media.fedu.vn/mau/nghiemthu-manden-2phancap-masterclass-jcut/20261120152250.mp4",
          localPath: "/Users/vietmac/Documents/CODE/Quản gia/exports/NghiemThu_ManDen_2PhanCap_MasterClass_JCut.mp4",
          khoai: "https://khoai.fedu.vn/c/da90beb2", cid: "da90beb2-46ae-4e46-b167-925c8ad7e81f"
        },
        {
          slug: "ai-course-04-ban1-v04-warmclimax-tg",
          title: "Bài 04 (Bản 1) · 2-Cam xen Thẻ đen J-Cut + Nhạc dâng cao trào",
          date: "25/11/2026", dur: "4p29s", res: "9:16 · 2-Cam",
          note: "Ứng dụng xen màn chữ đen tóm tắt khép từng khối ý dài kèm nhạc nhảy vọt 4-Diamond.",
          ytId: "Z22dOVU4-i4",
          khoai: "https://khoai.fedu.vn/c/3f45956c", cid: "3f45956c-78d9-44fb-8856-b931444fafd1"
        }
      ]
    },
    {
      id: "cat-05-auto-broll-bento",
      num: "05",
      tag: "Cảnh trám tự động · V8.3",
      title: "Auto Motion B-Roll Shaders (Dual-Clock 200ms) & Thẻ đọc Micro-12P Silk Editorial",
      skill: "tao-canh-tram + motion V8.3 + edit-video-pro",
      cmd: "edit pro <video>  (thiếu B-Roll thật tự bơm qua auto_motion_broll.py)",
      desc: "Giải bài toán video ngồi nói thiếu cảnh quay phụ: cầu nối auto_motion_broll.py tự lọc các khe >= 3,0s sau scan-extract để render tối đa 4 clip đồ họa HTML5/CSS3 Shaders + GSAP (metric_gauge, split_compare, workflow_steps, text_spotlight) khớp đúng FPS gốc A-Roll và né dải phụ đề y >= 1410; song hành cùng 9 khung Bento K1..K9 khóa chữ đọc scale = 1.000 sắc nét.",
      specs: ["Dual-Clock mở sớm 200ms", "Khớp FPS gốc 24/25/30", "Tối đa 4 clip (<=25%)", "Né phụ đề y <= 1395", "Chữ đọc scale = 1.000"],
      threads: [
        { id8: "dd07234d", cid: "dd07234d-4d53-4668-a1cc-d484ee365199", date: "24/11/2026", title: "[CHỐT] Vá 6 điểm nghẽn cùng Quân 2 & đóng gói cầu nối auto_motion_broll.py vào Edit Video Pro" },
        { id8: "c30ce719", cid: "c30ce719-795c-44a0-9e80-8cffd102f637", date: "23/11/2026", title: "Nhánh PA2 OpenMotion B-Roll — Thử nghiệm 4 khuôn cảnh trám đồ họa trên clip 20s" }
      ],
      videos: [
        {
          slug: "openmotion-broll-viet-20s-9x16",
          title: "PA2 OpenMotion B-Roll · Cảnh trám đồ họa Shaders trên clip nói",
          date: "23/11/2026", dur: "20,9s", res: "9:16 · Shaders",
          note: "Mẫu gốc của cơ chế bơm cảnh trám đồ họa 3–8s tự động vào khe lời thoại thiếu B-Roll.",
          videoUrl: "https://media.fedu.vn/mau/openmotion-broll-viet-20s-9x16/20261124033800.mp4",
          localPath: "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/kobe_bench_02_openmotion_broll/PA2_OPENMOTION_BROLL_VIET_20S_9X16.mp4",
          khoai: "https://khoai.fedu.vn/c/c30ce719", cid: "c30ce719-795c-44a0-9e80-8cffd102f637"
        },
        {
          slug: "hyperframes-viet-20s-9x16",
          title: "PA1 HyperFrames · Thẻ chữ GSAP mở trước từ khóa 200ms",
          date: "23/11/2026", dur: "20,9s", res: "9:16 · GSAP",
          note: "Đối chứng nhịp nổ thẻ chữ sớm 200ms trước âm đầu từ khóa Whisper giúp mắt kịp bắt nhịp.",
          videoUrl: "https://media.fedu.vn/mau/hyperframes-viet-20s-9x16/20261124033748.mp4",
          localPath: "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/kobe_bench_01_hyperframes/PA1_HYPERFRAMES_VIET_20S_9X16.mp4",
          khoai: "https://khoai.fedu.vn/c/b54cd686", cid: "b54cd686-aea3-4dde-95bf-f118fc6016df"
        },
        {
          slug: "ai-course-04-ban1-2cam-hook-phude-outro",
          title: "Bài 04 (Edit Pro Chuẩn) · Bento Sheet + Hook + Phụ đề + OV1",
          date: "25/11/2026", dur: "4p23s", res: "9:16 · 43 Cổng",
          note: "Bản dựng qua 43 cổng kiểm định của Edit Video Pro với thẻ Poster đọc tĩnh sắc nét và Outro cá nhân OV1.",
          ytId: "LqVAHCW394Y",
          localPath: "/Volumes/1TB 2230/03_RENDER_VA_DU_AN/AI COURSE/04_Nhieu_Buoc/AI_Course_04_Ban1_2Cam_Hook_PhuDe_Outro.mp4",
          khoai: "https://khoai.fedu.vn/c/3f45956c", cid: "3f45956c-78d9-44fb-8856-b931444fafd1"
        }
      ]
    },
    {
      id: "cat-06-industry-styles",
      num: "06",
      tag: "C10 Báo Đen · Spa · Trước–Sau",
      title: "Motion Đặc thù Ngành: C10 Báo Đen Bôi Sáng × Spa Silk Ivory PA2 × 87 Video Trước–Sau",
      skill: "edit-video-pro (--palette c10) · spa-pa2 · before-after-video",
      cmd: "edit pro báo đen <video>  |  SPA PA2 <video>  |  VIDEO TRUOC SAU",
      desc: "Ba dòng đồ họa chuyên biệt cho học viên các ngành: (1) C10 Báo Đen xếp 3 lớp giấy báo trên nền Dark Slate kèm bút dạ quang #CCFF00 quét chéo 7°; (2) Spa PA2 Silk Ivory Atelier & Scientific Atlas 2D nền lụa ngà sang trọng; (3) Kho 87 video đối chứng Trước–Sau theo ngành (0% lộ tên riêng học viên).",
      specs: ["Highlight #CCFF00 vát 7°", "Dim-to-Focus 58%", "Silk Ivory #F5F2EB", "87 mẫu Trước–Sau ngành"],
      threads: [
        { id8: "ea36f187", cid: "ea36f187-5dec-49b0-9005-1747e6946209", date: "26/11/2026", title: "Tổng hợp & chuẩn hóa 87 Video Trước–Sau AI theo tên ngành nghề" },
        { id8: "862076b2", cid: "862076b2-3c0e-4d8e-9491-6d66011dae8a", date: "23/11/2026", title: "Chị Lê Hường BĐS — Biến thể Hook Pop-Art + C10 Báo Đen Dragon Castle" },
        { id8: "6501519c", cid: "6501519c-91db-40d3-8161-d832f94b0302", date: "23/11/2026", title: "Edit Video BĐS Chị Hường theo phong cách C10 Báo Đen Bôi Sáng" }
      ],
      videos: [
        {
          slug: "le-huong-dragon-castle-c10-bao-den-pro",
          title: "C10 Báo Đen Bôi Sáng · Chị Lê Hường (Dragon Castle)",
          date: "23/11/2026", dur: "1p38s", res: "9:16 · C10",
          note: " Xếp chồng 3 lớp báo chí pháp lý/tài chính, vệt dạ quang #CCFF00 quét mượt qua dòng tiêu đề chính.",
          ytId: "jLQh0lw2MJs",
          localPath: "/Users/vietmac/Documents/k4 ho so/le_huong_huong_nang_coffee_dragon/anh_viet_gui/le_huong_dragon_castle_c10_bao_den_pro.mp4",
          khoai: "https://khoai.fedu.vn/c/6501519c", cid: "6501519c-91db-40d3-8161-d832f94b0302"
        },
        {
          slug: "le-huong-dragon-castle-c10-hook-popart-pro",
          title: "C10 Báo Đen × Hook Pop-Art Mới · Chị Lê Hường",
          date: "23/11/2026", dur: "1p38s", res: "9:16 · Pop-Art",
          note: "Phiên bản nâng cấp riêng mở đầu Pop-Art tách chủ thể theo yêu cầu cá nhân hóa của học viên.",
          ytId: "BrqOoeNHCMI",
          khoai: "https://khoai.fedu.vn/c/862076b2", cid: "862076b2-3c0e-4d8e-9491-6d66011dae8a"
        },
        {
          slug: "kho-truoc-sau-ai-theo-nganh",
          title: "Bộ 87 Video Trước–Sau Theo Ngành · Mẫu BĐS Phân tích bảng giá",
          date: "26/11/2026", dur: "2p04s", res: "9:16 · Side-by-Side",
          note: "Đặt clip thô và bản dựng AI song song trên một màn hình, đóng nhãn tên ngành sạch sẽ.",
          ytId: "Nht6k8BJaiI",
          localPath: "/Users/vietmac/Documents/k4 ho so/_TONG_HOP_TRUOC_SAU_AI_THEO_NGANH/BDS_01__Phan_Tich_Bang_Gia_Hai_Phan_Khu.mp4",
          khoai: "https://khoai.fedu.vn/c/ea36f187", cid: "ea36f187-5dec-49b0-9005-1747e6946209"
        },
        {
          slug: "g2-dung-muse-pa2",
          title: "Spa PA2-V9.4 Silk Ivory · Dung Muse Beauty",
          date: "18/11/2026", dur: "62,4s", res: "9:16 · Silk Ivory",
          note: "Thẻ đọc lụa ngà Micro-12P giữ phụ đề gốc, tự quét cảnh trám xung quanh và khép màn kết Atelier.",
          videoUrl: "https://media.fedu.vn/mau/g2-dung-muse-pa2/20261118175518.mp4"
        }
      ]
    },
    {
      id: "cat-07-parallax-bds-remotion",
      num: "07",
      tag: "Parallax 2.5D · BĐS 3D · Remotion",
      title: "Tách lớp Puppet 2.5D YouTube × Bản đồ 3D Bất động sản (M1..M13) × 3 Template Remotion",
      skill: "bds-edit (M1..M13) · motion (Mau01..03) · pip-huong-dan",
      cmd: "MENU BDS  |  MAU 03 MOTION GRAPHIC <nội dung>  |  PIP HƯỚNG DẪN",
      desc: "Gồm 3 nhánh đồ họa chuyên sâu cho video ngang & thực địa: (1) Tách lớp RGBA Parallax & Dynamic Puppet 2.5D từ ảnh tĩnh cho kênh YouTube lịch sử (anh Toàn K4); (2) 13 nhánh BĐS 3D (Khoanh lô, Zoom vũ trụ, X-quang mọc tháp, Vòng cung tỉnh, Bản đồ xoay Orbit 80°); (3) 3 Template Remotion đóng gói (Paage, Adwave, Higgsfield) và PiP hướng dẫn cách quay.",
      specs: ["RGBA Depth Parallax 2.5D", "BĐS Lock T6/T7 0.0px drift", "Mau01..03 16:9 & 9:16", "PiP Tua nhanh hậu trường"],
      threads: [
        { id8: "e2c2f947", cid: "e2c2f947-5a6d-48e8-8896-fcaf354e9b3c", date: "24/11/2026", title: "Xưởng hoạt hình lịch sử V3.0 (Anh Toàn K4) — Tách lớp Dynamic Puppet 2.5D khớp nhịp đọc" },
        { id8: "3d368e20", cid: "3d368e20-e82a-47d4-92ce-567d2cea6f77", date: "27/11/2026", title: "Bảo tàng Phụ nữ V1 & V2 — Chuỗi cảnh điện ảnh khớp phách nhạc + Hook chữ kiến trúc" },
        { id8: "37153576", cid: "37153576-c5ac-4d1a-8e75-740ae3c61bb4", date: "21/11/2026", title: "BĐS Chị Hiền Hạ Long Xanh — Phối đồ họa thực địa G3 & bản đồ dự án" },
        { id8: "f47bd78d", cid: "f47bd78d-adc5-48ba-9bcb-4c54104fc8a2", date: "25/11/2026", title: "Hướng dẫn Quay Cảnh Trám 3 — Ghép minh họa PiP & nhịp cắt hành động" }
      ],
      videos: [
        {
          slug: "toan-k4-youtube-naval-battle",
          title: "Hoạt hình 2.5D · Tách lớp Dynamic Puppet (Kênh anh Toàn K4)",
          date: "24/11/2026", dur: "2p28s", res: "16:9 · 1080p",
          note: "Tách tiền cảnh – trung cảnh – hậu cảnh RGBA chuyển động khớp giọng kể thay cho ảnh tĩnh Ken Burns.",
          ytId: "k6VzK6nu5rY",
          khoai: "https://khoai.fedu.vn/c/e2c2f947", cid: "e2c2f947-5a6d-48e8-8896-fcaf354e9b3c"
        },
        {
          slug: "bui-thi-hien-fake-podcast-hlx",
          title: "BĐS Hạ Long Xanh · Chị Bùi Thị Hiền (Style G3 Thực địa)",
          date: "21/11/2026", dur: "1p37s", res: "9:16 · BĐS",
          note: "Kết hợp góc nói Podcast với thẻ dữ liệu dự án, bản đồ vùng và thông số hạ tầng.",
          ytId: "YjMTmW6esBc",
          khoai: "https://khoai.fedu.vn/c/37153576", cid: "37153576-c5ac-4d1a-8e75-740ae3c61bb4"
        },
        {
          slug: "mau03-higgsfield-master",
          title: "Template Mẫu 03 · Higgsfield Showcase (Remotion Master)",
          date: "Đóng gói chuẩn", dur: "44,8s", res: "16:9 & 9:16",
          note: "Một trong 3 Template Kinetic Showcase đóng gói sẵn (cùng Mẫu 01 Paage 70s & Mẫu 02 Adwave 61s).",
          videoUrl: "studios/mau03_higgsfield_v7_square_broll_master_web.mp4"
        },
        {
          slug: "quay-canh-tram-3-huong-dan-tong-hop-pro",
          title: "Hướng dẫn Quay Cảnh Trám 3 + Minh họa PiP & Baotang V2",
          date: "25–27/11/2026", dur: "2p52s", res: "9:16 · Hướng dẫn",
          note: "Tổng hợp cách cầm máy quay cảnh trám kèm khung PiP đối chiếu góc quay thật và kết quả.",
          ytId: "jVbPKb0v7iw",
          khoai: "https://khoai.fedu.vn/c/f47bd78d", cid: "f47bd78d-adc5-48ba-9bcb-4c54104fc8a2"
        }
      ]
    }
  ];

  if (window.MOTION_HUB_DATA && Array.isArray(window.MOTION_HUB_DATA.categories)) {
    window.MOTION_HUB_DATA.categories = window.MOTION_HUB_DATA.categories.concat(extraCategories);
  }
})();
