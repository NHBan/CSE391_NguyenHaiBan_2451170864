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


Câu A3 — Box Model — Tính toán kích thước
Đọc chương 11 (Box Model). Tính kích thước thực tế (chiều rộng thực tế render trên browser) cho mỗi trường hợp sau:

/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 450px
→ Không gian chiếm trên trang = 470px

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = 350px
→ Không gian chiếm trên trang = 420px

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = 40px
→ Giải thích tại sao KHÔNG PHẢI 65px
Do cơ chế Margin collapse, khi hai phần tử khối xếp theo chiều dọc margin-bottom của phần tử trên và margin-top ở phần tử dưới sẽ không cộng dồn vào nhau mà sẽ ưu tiên cái có margin lớn nhất 
Nâng cao: Nếu .box-a có margin-bottom: -10px và .box-b có margin-top: 40px, khoảng cách = 30px
→Đối với 2 margin mà trái dấu sẽ thực hiện cộng để lấy ra khoảng cách sau cùng:40+(-10)=30px
→Mở rộng: với 2 margin nhỏ hơn 0 thì lấy số nhỏ nhất làm khoảng cách

Câu A4 — Specificity (Độ ưu tiên)
Cho các CSS rules sau cùng target 1 element <p class="price" id="main-price">:
p { color: black; }                    /* Rule A */
.price { color: blue; }               /* Rule B */
#main-price { color: red; }           /* Rule C */
p.price { color: green; }             /* Rule D */
1 Tính specificity score (a, b, c) cho mỗi rule
→Rule A(0,0,1) có 1 element
→Rule B(0,1,0) có 1 class
→Rule A(1,0,0) có 1 id
→Rule A(0,1,1) có 1 class và 1 element
2 Element sẽ có màu gì? Giải thích
→element sẽ có màu đỏ bởi Rule C có id nên có mức độ ưu tiên cao hơn và specificity score là (1,0,0)
3 Nếu thêm <p class="price" id="main-price" style="color: orange;">, element có màu gì?
→element sẽ có màu cam bởi đây là inline CSS có mức độ cao nhất 
4 Nếu Rule A thêm !important, element có màu gì? Tại sao?
→ element sẽ có màu đen bởi !important là ưu tiên cao nhất

Câu B1: Các selectors đã được sử dụng là
Bộ chọn toàn cục:
*

Bộ chọn thẻ HTML:
body, header, footer, a, h2

Bộ chọn lớp:
.list-style-type-none, .active, .table

Bộ chọn ID:
#user-frofile

Bộ chọn phần tử con:
.table th

.table tr:nth-child(even)

.table tr:hover

Trạng thái:
:hover (trong a:hover, a:hover::after, .table tr:hover)

:nth-child(even) (trong .table tr:nth-child(even))

Phần tử giả:
::after (trong a::after, a:hover::after)