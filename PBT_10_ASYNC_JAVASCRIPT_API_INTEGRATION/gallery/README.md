# 📸 Infinite Scroll & Lazy Loading Gallery

Một thư viện hình ảnh hiệu năng cao được xây dựng hoàn toàn bằng **Vanilla JavaScript thuần**, ứng dụng API trình duyệt hiện đại `IntersectionObserver` nhằm giải quyết bài toán tối ưu băng thông mạng và hiệu năng hiển thị (Rendering performance) với lượng dữ liệu lớn.

---

## 🛰️ Chi Tiết API Sử Dụng & Tham Số

Dự án giao tiếp trực tiếp với dịch vụ cung cấp ảnh mẫu **Lorem Picsum** (`https://picsum.photos`).

### Endpoint Phân Trang
- **URL:** `https://picsum.photos/v2/list`
- **Phương thức:** `GET`
- **Tham số cấu hình truyền lên URL:**
  - `page`: Số thứ tự trang cần lấy dữ liệu (Tự động tăng tiến từ `1` sau mỗi lần kích hoạt chạm đáy).
  - `limit`: Số lượng bản ghi ảnh giới hạn trả về cho một lượt gọi (Mặc định cấu hình cấu trúc: `20` ảnh).
- **Cơ chế bóc tách ảnh lớn/nhỏ:** API trả về một mảng chứa ID độc bản của từng ảnh. Ứng dụng tận dụng ID này để gọi trực tiếp CDN hiển thị ảnh theo kích thước mong muốn:
  - Ảnh lưới Grid hiển thị (Tối ưu nhẹ): `https://picsum.photos/id/{id}/400/400`
  - Ảnh phóng to xem Modal Lightbox (Chất lượng cao): `https://picsum.photos/id/{id}/1000/800`

---

## 🛠️ Giải Pháp Công Nghệ Tối Ưu Hiệu Năng

Ứng dụng triển khai hai bộ **IntersectionObserver** độc lập nhằm triệt tiêu hoàn toàn sự chậm trễ giao diện:

### 1. Vô Hạn Cuộn Trang (Infinite Scroll)
- **Cơ chế cũ (Tệ):** Lắng nghe sự kiện `window.addEventListener('scroll')` buộc trình duyệt phải tính toán toán học liên tục hàng trăm lần mỗi giây -> Gây hiện tượng nghẽn luồng xử lý (Layout Thrashing).
- **Giải pháp IntersectionObserver (Tốt):** Gắn bộ giám sát lên thẻ phần tử mồi `#loadTrigger` ở đáy trang. Trình duyệt chỉ kích hoạt chạy hàm `loadMorePhotos()` khi và chỉ khi thẻ này lọt vào tầm mắt của người dùng. Hoàn toàn không tốn tài nguyên xử lý tính toán nền khi đang lướt ở giữa trang.

### 2. Tải Ảnh Chậm (Lazy Loading Images)
- Toàn bộ 20 thẻ ảnh mới khi bơm vào lưới DOM ban đầu sẽ được gán một chuỗi SVG rỗng siêu nhẹ ở thuộc tính `src` để tránh việc trình duyệt đồng loạt tải 20 bức ảnh nặng cùng lúc. Đường dẫn thực được giấu tạm ở `data-src`.
- Một `IntersectionObserver` thứ hai theo dõi sát sao từng thẻ ảnh. Khi ảnh cách Viewport hiển thị 200px (`rootMargin: "0px 0px 200px 0px"`), đường dẫn thực từ `data-src` mới được đẩy sang `src` để trình duyệt tải ngầm trước.
- Ngay khi ảnh tải xong, lệnh `observer.unobserve(img)` được kích hoạt lập tức để giải phóng tài nguyên hệ thống ra khỏi bộ nhớ giám sát.