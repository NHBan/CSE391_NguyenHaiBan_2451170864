# 👥 Hệ Thống Quản Lý Người Dùng (User CRUD System)

Ứng dụng web Single Page quản lý dữ liệu thành viên toàn diện, giao tiếp bất đồng bộ thời gian thực với Mock REST API `JSONPlaceholder`. Kiến trúc mã nguồn được phân rã thành hai lớp độc lập: **API Layer** lo quản lý dữ liệu mạng và **UI Layer** kiểm soát hiển thị giao diện.

---

## 🛰️ Danh Sách API Và Cách Sử Dụng Trong Ứng Dụng

Hệ thống kết nối trực tiếp với tài nguyên `/users` của máy chủ JSONPlaceholder (`https://jsonplaceholder.typicode.com`). Dưới đây là mô tả chi tiết cơ chế hoạt động của từng phương thức HTTP (HTTP Methods) đã sử dụng:

### 1. READ — Lấy danh sách thành viên (GET)
- **Endpoint:** `GET /users`
- **Cách dùng trong code:** Được gọi ngay khi vừa tải trang trong hàm `loadInitialData()`. Lớp API sử dụng lệnh `fetch` mặc định gửi yêu cầu dạng `GET` để nhận về mảng chứa 10 bản ghi cấu trúc người dùng mẫu.
- **Xử lý UI:** Trong lúc đợi phản hồi mạng, giao diện kích hoạt trạng thái `showLoading()` để hiển thị các thẻ hộp nhấp nháy (Skeleton loaders). Khi dữ liệu về thành công, hàm `ui.renderUsers()` sẽ phân tích cú pháp để xây dựng cấu trúc thẻ hiển thị thông tin.

### 2. CREATE — Tạo tài khoản người dùng mới (POST)
- **Endpoint:** `POST /users`
- **Cách dùng trong code:** Khi form ở chế độ mặc định và kích hoạt sự kiện `submit`, lớp API sẽ gửi yêu cầu với cấu hình:
  - `method: "POST"`
  - `body`: Chuyển đổi đối tượng thông tin người dùng nhập `{ name, email }` thành chuỗi JSON thô qua `JSON.stringify()`.
  - `headers`: Khai báo `"Content-type": "application/json"`.
- **Đặc thù Mock API:** Máy chủ sẽ giả lập lưu dữ liệu và trả về đối tượng vừa tạo kèm mã định danh `id: 11`. Hệ thống ứng dụng sẽ bọc lại và gán một ID duy nhất tăng dần ở Client-side để đưa trực tiếp vào đầu mảng hiển thị mà không cần reload trang.

### 3. UPDATE — Thay đổi thông tin người dùng (PUT)
- **Endpoint:** `PUT /users/:id`
- **Cách dùng trong code:** Khi click nút **Sửa**, dữ liệu của card người dùng sẽ điền ngược vào form. Khi nhấn lưu, API gửi yêu cầu ghi đè dữ liệu lên đường dẫn đích của user đó (Ví dụ: `PUT /users/3`).
  - `method: "PUT"`
  - Gửi kèm chuỗi dữ liệu cập nhật trong phần thân `body`.
- **Xử lý UI:** Sau khi nhận phản hồi xác nhận thành công từ API, hệ thống chạy hàm `.map()` để đồng bộ thông tin thay đổi của node đó ngay lập tức trên giao diện.

### 4. DELETE — Xóa người dùng khỏi hệ thống (DELETE)
- **Endpoint:** `DELETE /users/:id`
- **Cách dùng trong code:** Sử dụng phương thức `DELETE` nhắm trực tiếp vào ID của người dùng (Ví dụ: `DELETE /users/5`).
  - `method: "DELETE"`
- **Xử lý UI:** Sau khi nhận mã phản hồi thành công từ máy chủ, client chạy bộ lọc `.filter()` để loại bỏ đối tượng có ID tương ứng ra khỏi danh sách cục bộ, thẻ hiển thị tự động biến mất kèm thông báo Toast xanh báo thành công.

---

## 🛠️ Tính Năng Trải Nghiệm Người Dùng (UX)

- **Client-Side Realtime Filter:** Sử dụng sự kiện `input` trên ô tìm kiếm giúp lọc ngay lập tức người dùng theo Tên hoặc Email từ mảng cục bộ mà không cần gửi lại yêu cầu HTTP quá nhiều lần lên server, giúp tiết kiệm băng thông.
- **Skeleton Loader:** Giao diện tải trước dạng bộ khung tạo cảm giác ứng dụng tải nhanh và chuyên nghiệp hơn so với việc dùng chữ "Loading..." thô sơ.
- **Toast Alert Notification:** Các hành động thành công hay lỗi API đều hiển thị dưới dạng các hộp thông báo trượt từ góc phải màn hình, tự động biến mất sau 3 giây mà không làm gián đoạn trải nghiệm của người dùng.