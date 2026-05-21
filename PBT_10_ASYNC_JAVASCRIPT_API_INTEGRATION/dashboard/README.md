# 📊 Multi-API Data Dashboard System

Bảng điều khiển (Dashboard) dữ liệu thời gian thực được xây dựng hoàn toàn bằng **Vanilla JavaScript thuần**, ứng dụng giải pháp điều phối đa tác vụ bất đồng bộ quy mô lớn nhằm tối ưu hóa trải nghiệm giao diện người dùng.

---

## 🛰️ Danh Sách Các Nguồn API & Cấu Trúc Khai Thác

Hệ thống tiến hành tích hợp và chuẩn hóa dữ liệu từ 3 nền tảng API REST độc lập không yêu cầu khóa bảo mật:

1. **API Thời Tiết (Open-Meteo Forecast API):**
   - **URL:** `https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current=temperature_2m,relative_humidity_2m`
   - **Mục đích:** Truy vấn nhiệt độ môi trường và chỉ số độ ẩm hiện tại dựa trên hệ tọa độ hình học cố định của Thủ đô Hà Nội.

2. **API Bản Đồ Địa Lý (REST Countries API):**
   - **URL:** `https://restcountries.com/v3.1/name/vietnam`
   - **Mục đích:** Khai thác hồ sơ quốc gia chính thống của Việt Nam để lọc ra tên chính thức, thủ đô đứng đầu, quy mô dân số và khu vực lục địa.

3. **API Giải Trí (The Dog API):**
   - **URL:** `https://dog.ceo/api/breeds/image/random/4`
   - **Mục đích:** Phản hồi một mảng chứa ngẫu nhiên 4 liên kết URL hình ảnh của các giống thú cưng để phục vụ render thẻ lưới hình ảnh.

---

## 🧠 Giải Pháp Kỹ Thuật: Cơ Chế Bất Đồng Bộ Song Song

### Tại sao sử dụng `Promise.allSettled()` thay vì `Promise.all()`?

Trong thiết kế Dashboard tổng hợp, hiệu năng xử lý độc lập của các cấu phần là yếu tố sống còn:

- **Hạn chế của `Promise.all()` (Mô hình chuỗi hạt):** Nếu một trong ba API gặp sự cố (ví dụ: Server ảnh cún con bảo trì trả về mã lỗi 500 hoặc mất kết nối mạng cục bộ), `Promise.all()` lập tức bị gãy vỡ tiến trình (`reject`) ngay lập tức. Hệ quả là toàn bộ Dashboard sẽ trống rỗng hoặc hiện màn hình lỗi chung, dù API thời tiết và quốc gia vẫn đang hoạt động tốt.
- **Giải pháp tuyệt đối của `Promise.allSettled()`:** Phương thức này chạy **song song đồng loạt** tất cả các tiến trình mạng. Nó kiên nhẫn đợi cho đến khi mọi API đều kết thúc (bất kể thành công hay thất bại) và trả về một mảng chứa đối tượng mô tả trạng thái riêng biệt của từng Promise:
  - Nếu API chạy tốt, đối tượng nhận cờ trạng thái `status: "fulfilled"` kèm giá trị dữ liệu `value`. Giao diện kích hoạt render cấu trúc thành công.
  - Nếu API sập, đối tượng nhận cờ trạng thái `status: "rejected"` kèm lý do lỗi `reason`. Hệ thống lập tức cô lập lỗi đó, chỉ vẽ bảng thông báo cảnh báo lỗi lên duy nhất Widget gặp sự cố (`renderWidgetError`), **tuyệt đối không làm sụp đổ các Widget bình thường khác**.

### Cơ chế đo lường hiệu năng mạng (Performance Metrics)
Ứng dụng sử dụng biến thời gian `Date.now()` chốt chặn tại hai đầu điểm khởi tạo và điểm hoàn thành của mảng lệnh. Do tiến trình chạy song song, tổng thời gian nạp toàn bộ Dashboard chỉ bằng thời gian của API phản hồi chậm nhất, thay vì là tổng cộng dồn của 3 API như các mô hình bất đồng bộ tuần tự thông thường.