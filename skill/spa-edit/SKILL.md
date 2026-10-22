---
name: spa-edit
description: "Kỹ năng đóng gói chuyên biệt dựng video Spa / Thẩm mỹ / Da liễu chuẩn Master V7.2: Khóa mắt Affine Y=650px, Phụ đề 5B khóa x-height 1:1, Bản vẽ Mô học Scientific Atlas V2 khớp thoại, Mỗi cảnh trám chỉ dùng đúng 1 lần (Gate 6), Motion CTA 01 và Nhận diện Thương hiệu 2 tầng (Header nhỏ BRAND 01 + Màn hình đen OUTRO 01). Kích hoạt bằng mantra ngắn gọn: EDIT SPA."
---

# 🌿 KỸ NĂNG EDIT VIDEO CHO SPA (`SPA-EDIT` V7.2 — ZERO-STOP)

**Mantra kích hoạt siêu gọn:** `EDIT SPA` (hoặc nói tự nhiên: *"edit video spa"*, *"dựng clip spa này"*, `/spa-edit`).

> [!IMPORTANT]
> **QUY TẮC TIẾT KIỆM 95% TOKEN (DETERMINISTIC BLACKBOX EXECUTION):**
> 1. **CẤM ĐỌC LẠI CODE ENGINE DÀI:** Toàn bộ toán học khóa mắt `Y=650px`, phụ đề `5B` khóa `x-height 1:1`, bản vẽ `Scientific Atlas V2`, `CTA 01` và `OUTRO 01` nền đen `#050507` đã được đóng băng trong `scripts/spa_edit_cli.py`.
> 2. **CHỈ ĐỌC/SỬA 2 FILE JSON NHẸ:**
>    - Hồ sơ thương hiệu học viên: `~/.gemini/config/skills/spa-edit/brands/<brand_id>.json` (`35 dòng`).
>    - Cấu hình chuẩn ngành Spa: `~/.gemini/config/skills/spa-edit/presets/spa_clinic.json`.
> 3. **MỖI CẢNH TRÁM CHỈ DÙNG ĐÚNG 1 LẦN (`Gate 6`):** Mỗi video B-Roll (`tram1`, `tram2`, `tram3`) chỉ được xuất hiện tối đa `1 lần` (`count == 1`) trong toàn bộ video.

---

## 🚀 1. ĐẦU VÀO CẦN GÌ (`INPUTS`)?

Chỉ cần thả vào thư mục làm việc (hoặc gửi đường dẫn):
1. **1 Video nói chính (`A-Roll`):** Ví dụ `thamtho_goc.mp4` (hoặc bất kỳ file `.mp4/.mov` quay chủ thể nói).
2. **1 đến 3 Video cảnh trám (`B-Roll`):** Đặt tên `tram1.mp4`, `tram2.mp4`, `tram3.mp4` (cận cảnh vùng môi/da trước và sau liệu trình).
3. **Tên Thương hiệu Spa (Tùy chọn):** Mặc định dùng `tham_tho_beauty.json`. Nếu làm cho học viên mới, truyền `--brand-name "Tên Spa"` hoặc chỉnh trên Studio Chrome.

---

## ⚡ 2. BA LỆNH CHẠY TẤT ĐỊNH (`1-TURN CLI`)

### Trường hợp A: Chạy kết xuất hoàn chỉnh (hoặc đổi tên thương hiệu / giá ưu đãi ngay trên lệnh)
```bash
python3 ~/.gemini/config/skills/spa-edit/scripts/spa_edit_cli.py \
  --brand ~/.gemini/config/skills/spa-edit/brands/tham_tho_beauty.json \
  --outro-mode 1
```
*(Tùy chọn ghi đè nhanh không cần sửa file: thêm `--brand-name "LINH SPA BEAUTY" --monogram "LS" --price "299 NGHÌN" --outro-mode 1` hoặc `--outro-mode 2`).*

### Trường hợp B: Kiểm định độc lập 6 Cổng (`6-Gate Verifier`)
```bash
python3 ~/.gemini/config/skills/spa-edit/scripts/verify_6gates.py
```
- Kiểm tra tức thì: `RLI <= 0.80`, `Static A-Roll >= 80%`, `Fake Stats = 0`, `WER = 0.0%`, `Eye-Lock ΔY = 0.0px`, `Unique B-Roll = 1 lần/video`.

### Trường hợp C: Mở Studio Chrome Chỉnh Giao Diện 0-Token
```bash
open "/Users/vietmac/Documents/CODE/AI VIDEO EDIT/brand_logo_3_motion_studio.html"
```
*(Gõ tên thương hiệu mới trên trình duyệt ➔ Bấm nút **`💾 Xuất File Brand.json`** ➔ Lưu vào `brands/`).*
