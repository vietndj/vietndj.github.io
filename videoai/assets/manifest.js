/* =========================================================
   MANIFEST — videoai.fedu.vn (Trung tâm AI Video Edit FEDU)
   id        : trùng với <body data-page="...">
   file      : đường dẫn tương đối từ thư mục public/
   stage     : tên biến màu trong style.css (--c-xxx)
   q         : câu hỏi cốt lõi mà bài học này giải quyết (kicker)
   ========================================================= */
window.HUB = {
  name: "Trung tâm AI Video Edit",
  sub: "Hệ thống dựng video chuẩn FEDU • Antigravity Native",
  groups: [
    { id: "flow", title: "Lộ trình từng bước (What • Why • How)" },
    { id: "ref",  title: "Phòng Studio & Đồng bộ hệ thống" }
  ],
  pages: [
    {
      id: "index",
      file: "index.html",
      group: "flow",
      n: "00",
      title: "Tổng quan & Đầu ra thực tế",
      short: "Tổng quan",
      stage: "ink",
      icon: "🧭",
      q: "— TRUNG TÂM AI VIDEO EDIT • HỆ THỐNG DỰNG VIDEO CHUẨN FEDU"
    },
    {
      id: "dinh-dang",
      file: "01-dinh-dang.html",
      group: "flow",
      n: "01",
      title: "Ma trận 5 định dạng video",
      short: "Định dạng",
      stage: "dinhdang",
      icon: "🎬",
      q: "Tôi nên chọn định dạng nào cho video hôm nay?"
    },
    {
      id: "buoc-1",
      file: "02-buoc1-camera-cat-nhip.html",
      group: "flow",
      n: "02",
      title: "Bước 1: Cắt nhịp 2s & Khóa mắt 1/3",
      short: "B1: Cắt & Khóa mắt",
      stage: "buoc1",
      icon: "👁️",
      q: "Cách cắt sạch chữ thừa, nhịp thở và khóa mắt vào đường vàng 1/3?"
    },
    {
      id: "buoc-2",
      file: "03-buoc2-chu-phu-de.html",
      group: "flow",
      n: "02",
      title: "Bước 2: Phụ đề 5A/5B/5C & 35 kiểu chữ",
      short: "B2: Chữ & Phụ đề",
      stage: "buoc2",
      icon: "🔤",
      q: "Quy chuẩn phụ đề 2 dòng, thụt lề âm, không rách từ & 35 kiểu chữ?"
    },
    {
      id: "buoc-3",
      file: "04-buoc3-canh-tram-atlas.html",
      group: "flow",
      n: "03",
      title: "Bước 3: Cảnh trám & Bản vẽ khoa học 2D",
      short: "B3: Cảnh trám",
      stage: "buoc3",
      icon: "🖼️",
      q: "Bơm cảnh trám B-Roll & Bản vẽ Atlas giải thích quy trình 2D?"
    },
    {
      id: "buoc-4",
      file: "05-buoc4-motion-cta.html",
      group: "flow",
      n: "04",
      title: "Bước 4: Motion 60fps & 3 kiểu CTA",
      short: "B4: Motion & CTA",
      stage: "buoc4",
      icon: "⚡",
      q: "16 mẫu Motion Graphic 60fps & 3 kiểu kết thúc CTA chuyển đổi cao?"
    },
    {
      id: "buoc-5",
      file: "06-buoc5-am-thanh-xuat-file.html",
      group: "flow",
      n: "05",
      title: "Bước 5: Âm thanh 10% & Xuất file",
      short: "B5: Âm thanh & Xuất",
      stage: "buoc5",
      icon: "🔊",
      q: "Cân bằng âm nền 10%, SFX đúng nhịp và xuất MP4 1080x1920 sắc nét?"
    },
    {
      id: "phong-studio",
      file: "07-phong-studio.html",
      group: "ref",
      n: "07",
      title: "Phòng Studio chọn mẫu trực quan",
      short: "Phòng Studio",
      stage: "studio",
      icon: "🎛️",
      q: "Thử nghiệm trực tiếp 35 kiểu chữ, 3 kiểu CTA & 5 phong cách phụ đề"
    },
    {
      id: "he-thong-cap-nhat",
      file: "08-he-thong-cap-nhat.html",
      group: "ref",
      n: "08",
      title: "Danh mục Skill & Tự động cập nhật",
      short: "Đồng bộ Skill",
      stage: "kynang",
      icon: "🔄",
      q: "Hệ thống Skill Antigravity, Verifier tự động và đồng bộ Cloud"
    },
    {
      id: "edit-video-spa",
      file: "09-edit-video-spa.html",
      group: "ref",
      n: "09",
      title: "Kỹ năng Edit Video cho Spa (V7.2)",
      short: "Edit Video Spa",
      stage: "buoc4",
      icon: "🌿",
      q: "Cẩm nang đóng gói Kỹ năng Edit Video cho Spa: Đầu vào, Mantra EDIT SPA, MCP, Cài đặt máy mới & Chuyển giao học viên"
    },
    {
      id: "bang-ai-hook",
      file: "10-bang-ai-hook.html",
      group: "ref",
      n: "10",
      title: "Bảng tổng hợp AI Hook (Tự động cập nhật)",
      short: "Bảng AI Hook (Live)",
      stage: "motion",
      icon: "🎣",
      q: "Tra cứu trực tiếp toàn bộ kho AI Hook tự động cập nhật từ hooks.d/*.json, xem video Master, mở Studio & copy lệnh 1 chạm"
    }
  ]
};
