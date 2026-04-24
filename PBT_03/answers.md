Phần A
Cau A1:
1. Inline CSS
Sử dụng thuộc tính style ngay bên trong thẻ mở của phần tử HTML
Ví dụ:
HTML
<p style="color: red;">Đoạn văn bản màu đỏ</p>
Ưu điểm: Nhanh chóng, độ ưu tiên rất cao (dễ dàng ghi đè các CSS khác)
Nhược điểm: Làm code HTML trở nên lộn xộn, không thể tái sử dụng, khó trong việc bảo trì
Khi nào nên dùng: Khi cần test nhanh một đoạn code,  hoặc khi dùng JavaScript để thay đổi style động

2. Internal CSS (Nhúng vào thẻ <style> trong HTML)
Viết code CSS bên trong cặp thẻ <style>, thường được đặt ở phần <head> của trang HTML
Ví dụ:
HTML
<head>
  <style>
    p {
      color: blue;
      font-size: 16px;
    }
  </style>
</head>
Ưu điểm: Gom toàn bộ CSS của trang vào một chỗ, không cần tạo thêm file bên ngoài. Style không bị ảnh hưởng đến các trang khác
Nhược điểm: Tăng dung lượng file HTML. Không thể tái sử dụng đoạn CSS này cho các trang HTML khác trong cùng trang
Khi nào nên dùng: Khi website chỉ có một trang duy nhất, hoặc khi trang đó có những style không chia sẻ với trang khác
3. External CSS (Nhúng từ file .css bên ngoài)
Viết CSS ở một file riêng biệt có đuôi .css, sau đó liên kết vào file HTML bằng thẻ <link> đặt trong <head>
Ví dụ:
File index.html:
HTML
<head>
  <link rel="stylesheet" href="style.css">
</head>
File style.css:
CSS
p {
  color: green;
  font-size: 16px;
}
Ưu điểm: Tách biệt hoàn toàn giao diện  và cấu trúc giúp code gọn gàng. Có thể tái sử dụng một file CSS cho hàng trăm file HTML khác nhau.
Nhược điểm: Tốn thêm yêu cầu để tải file CSS về khi mở trang web lần đầu.
Khi nào nên dùng: Là phương pháp tiêu chuẩn cho các dự án hiện nay

Câu A2  — CSS Selectors — Dự đoán kết quả
Cho HTML sau:

<div id="app">
    <header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <article class="product">
            <h2>iPhone 16</h2>
            <p class="price">25.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
        <article class="product featured">
            <h2>MacBook Pro</h2>
            <p class="price">45.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
    </main>
</div>
Không chạy code, cho biết mỗi selector sau chọn được element nào? (Ghi cụ thể text content)

1. h1                           → Chọn: ShopTLU
2. .price                       → Chọn: 45.990.000đ
3. #app header                  → Chọn: Toàn thể khối header
4. nav a:first-child             → Chọn: Home
5. .product.featured h2         → Chọn: MacBook Pro
6. article > p                  → Chọn: 25.990.000đ, 45.990.000đ và Mô tả sản phẩm...;
7. a[href="/"]                  → Chọn: Home
8. .top-bar.dark h1              → Chọn: ShopTLU

