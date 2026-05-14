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