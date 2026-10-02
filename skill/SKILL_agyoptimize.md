---
name: agy-optimize
description: Quét, chẩn đoán và tối ưu hệ thống Antigravity. Giảm lag, tiết kiệm token, dọn rác context.
---

# 🚀 KỸ NĂNG: TỐI ƯU HỆ THỐNG ANTIGRAVITY (AGY-OPTIMIZE)

**Mantra Triggers:** `OPTIMIZE`, `TỐI ƯU`, `DỌN RÁC AGY`

Kỹ năng này giúp Agent tự động quét, phân tích và đề xuất các hành động tối ưu hóa để dọn dẹp hệ thống Antigravity của User, giảm thiểu tình trạng phình to context (context bloat), tiết kiệm token và giảm lag.

## 📋 HƯỚNG DẪN THỰC THI CHO AGENT
Khi kích hoạt kỹ năng này, bạn **PHẢI** thực hiện theo đúng thứ tự 5 Phase sau đây. Tuân thủ nghiêm ngặt các mốc giới hạn (threshold).

---

### PHASE 1: AUDIT (TỰ ĐỘNG - KHÔNG HỎI USER)
Sử dụng công cụ `run_command` để kiểm tra thư mục hệ thống của Antigravity (thường ở `~/.gemini/config/`). Thu thập các thông tin sau:
1. **Quét Skills (`skills/`):** Dùng `ls -la` và `du -sh` để liệt kê tất cả các kỹ năng đã cài đặt và dung lượng của từng cái.
2. **Quét Rules (`rules/`):** Liệt kê tất cả rule, kiểm tra dung lượng từng rule và tính TỔNG dung lượng thư mục `rules/`.
3. **Quét MCP và Hooks:** Đọc file `mcp_config.json` (liệt kê danh sách server/tool) và `hooks.json` (nếu có).
4. **Kiểm tra trạng thái tạm dừng:** Tìm kiếm các thư mục `skills-paused/`, `rules-paused/` hoặc các thư mục lưu trữ (archive).
5. **Đánh giá Context Footprint:** Tính tổng số bytes của tất cả file `SKILL.md` đang bật + toàn bộ dung lượng `rules/`.
6. **Kiểm tra Threshold:** Ghi nhận xem tổng dung lượng `rules/` có vượt qua mức cảnh báo **12KB** hay không.

---

### PHASE 2: DIAGNOSE (TỰ ĐỘNG PHÂN TÍCH)
Tiến hành phân tích sâu các dữ liệu từ Phase 1:

- **Đánh giá Health Score cho từng Skill:**
  - *Dung lượng:* Cảnh báo BÉO PHÌ (Bloated) nếu 1 skill > 20KB.
  - *Trùng lặp:* Kiểm tra nhanh nội dung (dùng `grep` hoặc `cat`) xem có 2 skill nào tương tự chức năng không.
  - *Tính chất công cụ:* Kỹ năng nào chỉ là script/công cụ đơn giản có thể được gợi ý chuyển thành MCP Tool.
- **Đánh giá Rule:**
  - Xem có rule nào trùng lặp với nội dung đã có trong skill không.
  - Có rule nào vượt **4KB** không (giới hạn khuyến nghị cho 1 rule).
  - Tổng rule có vượt quá **12KB** không.

**Tạo Báo Cáo:** Sử dụng file artifact (định dạng HTML - INKDOC theo thiết kế Dark Glassmorphic Obsidian điểm nhấn Emerald) để hiển thị chi tiết chẩn đoán này.

---

### PHASE 3: RECOMMEND (TƯƠNG TÁC VỚI USER)
Trình bày kết quả phân tích cho User dưới dạng một Bảng Markdown gồm 4 nhóm hành động:

| Trạng thái | Thể loại | Mô tả & Đề xuất |
|---|---|---|
| 🟢 **AUTO-FIX** | Tự động xử lý ngay | - Chuyển rule trùng lặp/dư thừa thành rule định tuyến 1 dòng.<br>- Thu gọn tổng `rules/` < 12KB.<br>- Xóa các thư mục skill trống/lỗi. |
| 🟡 **RECOMMEND MERGE** | Đề xuất gộp | - Liệt kê các skill trùng lắp chức năng.<br>- Ước tính số token tiết kiệm được nếu gộp. |
| 🔴 **USER DECISION** | Chờ quyết định | - Danh sách skill ít dùng nên chuyển sang `skills-paused/`.<br>- Các rule có thể tạm tắt. |
| 🔵 **MCP PACKAGING** | Đóng gói thành MCP | - Danh sách skill nên chuyển sang dạng MCP để gọi On-demand (tiết kiệm token do không phải load thường xuyên). |

*Lúc này, hãy DỪNG LẠI và hỏi User xem họ muốn áp dụng những đề xuất nào ở nhóm 🟡, 🔴, và 🔵 (nhóm 🟢 sẽ tự chạy nếu user đồng ý "Tiến hành sửa").*

---

### PHASE 4: EXECUTE (CHỜ USER XÁC NHẬN)
Sau khi có lệnh duyệt từ User:
1. **Backup:** Chạy lệnh tạo bản sao lưu: `cp -r ~/.gemini/config/skills/ ~/.gemini/config/skills-backup-$(date +%Y%m%d)/`
2. **Thực thi:** Lần lượt thực hiện các hành động đã được duyệt (gộp, di chuyển vào paused, xóa, sửa nội dung).
3. **Xác minh:** Kiểm tra lại file sau mỗi bước (dùng `ls` hoặc `cat`).
4. **Báo cáo sau tối ưu:** Tạo bảng so sánh Before/After về dung lượng, token tiết kiệm được.
5. *(Tùy chọn)* Nếu User có kỹ năng hoặc tool `sao_luu` để commit lên Git, hãy gợi ý chạy nó.

---

### PHASE 5: MAINTENANCE GUIDE (HƯỚNG DẪN BẢO TRÌ)
Kết thúc phiên, in ra lịch trình bảo trì hệ thống để User lưu ý:
- 📅 **Hàng Tuần:** Kiểm tra tổng dung lượng context (đặc biệt thư mục Rules).
- 🧩 **Khi thêm Skill mới:** Chạy lại `OPTIMIZE` để kiểm tra độ tương thích.
- 🐌 **Khi hệ thống giật, lag hoặc quên context:** Hô Mantra `DỌN RÁC AGY`.
- 📆 **Hàng Tháng:** Audit toàn diện.
