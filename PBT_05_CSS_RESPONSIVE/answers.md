Cau A1:
1Viết chính xác thẻ <meta viewport> chuẩn. Giải thích từng thuộc tính.
<meta name="viewport" content="width=device-width, initial-scale=1.0">
width=device-width: Yêu cầu trình duyệt thiết lập chiều rộng của trang web bằng đúng với chiều rộng vật lý của màn hình thiết bị đang hiển thị
initial-scale=1.0: Thiết lập mức độ thu phóng  ban đầu là 100% khi trang vừa tải xong, đảm bảo nội dung hiển thị đúng kích thước thực mà không bị phóng to hay thu nhỏ
2 Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào? (Đọc chương 13)
    Nếu không có thẻ <meta viewport>, Safari trên iPhone (và hầu hết các trình duyệt mobile khác) sẽ giả định trang web của bạn chỉ được thiết kế cho máy tính

    Trình duyệt sẽ render trang web ở một chiều rộng mặc định của Desktop.
    Sau đó, nó sẽ thu nhỏ toàn bộ giao diện đó để ép hiển thị vừa vặn trong màn hình hẹp của điện thoại
3 Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px. Tại sao Mobile-First được khuyên dùng?
    Mobile-First : Bạn viết CSS mặc định từ đầu cho màn hình nhỏ nhất. Sau đó, bạn dùng Media Query min-width để bổ sung và mở rộng giao diện khi kích thước màn hình lớn dần lên

    Desktop-First: Bạn viết CSS mặc định cho màn hình lớn trước. Sau đó, bạn dùng Media Query max-width để cắt giảm, thay đổi bố cục và ẩn bớt phần tử nhằm ép giao diện vừa với màn hình nhỏ dần xuống
    
    Mobile-First được khuyên dùng vì:
        Mobile-First CSS: Mobile nhận ít CSS nhất → parse nhanh nhất
        Responsive images: Ảnh nhỏ hơn cho mobile (srcset)
        Viewport units cho hero section (không cần tính toán JS)
        System font fallback: -apple-system, BlinkMacSystemFont load ngay, không cần download
Câu A2:Ghi lại breakpoints chuẩn (theo tài liệu hoặc Bootstrap). Cho mỗi breakpoint:
    1. X-Small (xs)
    Kích thước: < 576px
    Thiết bị đại diện: Điện thoại di động 
    Hiển thị lưới sản phẩm: 1 cột
    Class Bootstrap: col-12 

    2. Small (sm)
    Kích thước: ≥ 576px
    Thiết bị đại diện: Điện thoại (Màn hình ngang)
    Hiển thị lưới sản phẩm: 2 cột
    Class Bootstrap: col-sm-6

    3. Medium (md)
    Kích thước: ≥ 768px
    Thiết bị đại diện: Máy tính bảng 
    Hiển thị lưới sản phẩm: 3 cột
    Class Bootstrap: col-md-4

    4. Large (lg)
    Kích thước: ≥ 992px
    Thiết bị đại diện: Máy tính xách tay 
    Hiển thị lưới sản phẩm: 4 cột
    Class Bootstrap: col-lg-3

    5. Extra Large (xl)
    Kích thước: ≥ 1200px
    Thiết bị đại diện: Máy tính để bàn 
    Hiển thị lưới sản phẩm: 4 hoặc 5 cột
    Class Bootstrap: col-xl-3

    6. Extra Extra Large (xxl)
    Kích thước: ≥ 1400px
    Thiết bị đại diện: Màn hình Tivi
    Hiển thị lưới sản phẩm: 6 cột
    Class Bootstrap: col-xxl-2
Câu A3:Đọc CSS sau, cho biết ở mỗi kích thước màn hình, .container có width bao nhiêu? Điền bảng.
.container { width: 100%; padding: 10px; }
@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
Chiều rộng màn hình	.container width
375px (iPhone SE)	100%
600px	            540px
800px	            720px
1000px	            960px
1400px	            1140px