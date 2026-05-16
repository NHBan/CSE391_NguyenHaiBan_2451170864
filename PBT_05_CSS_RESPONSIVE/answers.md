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
Câu A4:Đọc chương 16. Giải thích 4 tính năng chính của SCSS và cho ví dụ
    . Variables (Biến) — "Sửa 1 chỗ, tất cả tự đổi"
    Giải thích: Cho phép bạn lưu trữ các màu sắc, font chữ, khoảng cách bằng ký hiệu $. SCSS variables hoạt động ở lúc biên dịch  và có thể dùng chung với các hàm SCSS 
    Ví dụ trong bài:
    SCSS
    $color-primary: #7c3aed;
    $radius-sm: 6px;
    .btn-primary {
        background: $color-primary;
        border-radius: $radius-sm;
    }

    2. Nesting — Viết CSS lồng nhau theo cấu trúc HTML
    Giải thích: Giúp code rõ ràng, dễ đọc hơn bằng cách lồng các selector vào nhau thay vì viết lặp đi lặp lại. Sử dụng ký hiệu & để tham chiếu trực tiếp đến selector cha. Không lồng quá 3 cấp để tránh selector quá dài.
    Ví dụ trong bài:

    SCSS
    .navbar {
        background: #1a202c;

        // Dấu & thay thế cho .navbar, tạo thành .navbar__logo
        &__logo {
            color: white;
            font-weight: 700;
        }

        // Lồng pseudo-class
        &:hover {
            background: #000;
        }
    }

    3. Mixins — "Hàm CSS tái sử dụng"
    Giải thích: Đóng gói một cụm code CSS để dùng lại nhiều lần. Định nghĩa bằng @mixin và gọi ra bằng @include. Mixin có thể nhận tham số (parameters) giống như một hàm trong lập trình, rất hữu ích cho các UI components hoặc Media Queries.

    Ví dụ trong bài:

    SCSS
    // Định nghĩa
    @mixin flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    // Sử dụng
    .modal {
        @include flex-center;
        position: fixed;
    }

    4. Partials & Import — "Chia file gọn gàng"
    Giải thích: SCSS cho phép chia nhỏ code thành các file module (ví dụ: _variables.scss, _buttons.scss). Ký hiệu dấu gạch dưới _ (partial) báo cho SCSS biết đừng compile file này thành file CSS riêng lẻ. Sau đó, dùng lệnh @use để gọi tất cả vào một file main.scss duy nhất theo đúng thứ tự.
    Ví dụ trong bài:

    SCSS
    // File main.scss
    @use 'base/variables';
    @use 'mixins/flexbox';
    @use 'components/navbar';
Tại sao trình duyệt KHÔNG đọc được file .scss?
    Trình duyệt web (như Chrome, Safari, Edge) được  thiết kế  chỉ hiểu duy nhất 3 ngôn ngữ cốt lõi của web: HTML, CSS và JavaScript
    SCSS là một "ngôn ngữ tiền xử lý"dành riêng cho lập trình viên. Nó chứa các cú pháp mở rộng như biến ($), hàm (@mixin), và viết lồng nhau (nesting) — những thứ hoàn toàn không tồn tại trong tiêu chuẩn của CSS.
    Nếu bạn cố tình gắn một file .scss vào thẻ <link> của HTML,. Nó sẽ báo lỗi cú pháp hoặc đơn giản là phớt lờ toàn bộ file đó vì không dịch được
Cần bước gì để chuyển SCSS → CSS?
    Bước bắt buộc ở giữa gọi là Biên dịch.
    Bạn viết code: Bạn viết code logic, gọn gàng trong file .scss.
    Compiler xử lý: Bạn dùng một công cụ biên dịch. Công cụ này sẽ đọc file SCSS của bạn, tính toán các biến, mở khóa phần lồng nhau, chạy các mixin, và dịch tất cả về lại ngôn ngữ CSS nguyên thủy.
    Tạo ra file mới: Nó tự động sinh ra một file .css thuần túy, có thể dài và lặp lại nhiều hơn, nhưng chuẩn xác.
    Gắn vào web: Bạn lấy file .css vừa được sinh ra đó gắn vào HTML
Câu B3:
    file style sau khi biên dịch là:
    * {
    box-sizing: border-box;
    }
    body {
    margin: 0;
    padding: 0;
    }
    .card {
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    }
    .card .card-image {
    width: 100%;
    border-radius: 8px 8px 0 0;
    }
    .card .card-title {
    font-family: "Arial", sans-serif;
    color: #0056b3;
    margin-top: 8px;
    }
    .card:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }
    .card.featured {
    border: 2px solid #0056b3;
    padding: 32px;
    }
    .navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    background-color: #0056b3;
    }
    .navbar .nav-item {
    color: #f8f9fa;
    margin: 0 8px;
    text-decoration: none;
    }
    .navbar .nav-item:hover {
    text-decoration: underline;
    }
    .container {
    padding: 16px;
    }
    @media (min-width: 768px) {
    .container {
        padding: 32px;
    }
    }
    .container .main-content {
    font-family: "Arial", sans-serif;
    }
    .container .main-content > p {
    margin-bottom: 16px;
    line-height: 1.5;
    }
    Lệnh compile file scss là:
    ```bash
    sass scss/style.scss css/style.css --watch
Phần C
Câu C1:trang Vnexpress
    A. Kích thước Mobile (Khoảng 375px)
    Navigation :
    Thanh menu ngang (chứa các chuyên mục Thời sự, Thế giới, Kinh doanh...) bị ẩn đi hoàn toàn
    Thay thế bằng Hamburger Menuở góc trái hoặc góc phải trên cùng. Khi bấm vào, một menu dạng dọc sẽ trượt ra 
    Logo VNExpress được căn giữa để tiết kiệm không gian
    Lưới content (Grid):
    Chuyển về 1 cột duy nhất. Các bài báo xếp chồng lên nhau theo chiều dọc
    Elements bị ẩn: Toàn bộ cột Sidebar bên phải  bị đẩy hẳn xuống cuối trang hoặc ẩn bớt các widget không quan trọng
    Font size: Tiêu đề bài viết và nội dung tóm tắt được điều chỉnh tăng/giảm tỷ lệ để dễ đọc trên màn hình nhỏ mà không bị vỡ chữ

    B. Kích thước Tablet (Khoảng 768px)
    Navigation:
    Thanh menu chuyên mục có thể xuất hiện trở lại dưới dạng thanh cuộn ngang 
    Vẫn có thể giữ lại Hamburger menu để chứa các chuyên mục phụ không hiển thị hết
    Lưới content:
    Chuyển sang cấu trúc 2 cột
    Cột trái  hiển thị tin chính, cột phải hiển thị các tin phụ hoặc danh sách tin vắn
    Elements bị ẩn/thay đổi: Sidebar bên phải của bản Desktop bắt đầu xuất hiện lại dưới dạng một cột phụ hẹp hơn
    Font size: Lớn hơn so với Mobile

    C. Kích thước Desktop (1440px)
    Navigation:
    Hiển thị đầy đủ thanh menu ngang  với tất cả các chuyên mục chính trải dài trên cùng
    Có thêm các thanh công cụ phụ như ngày tháng, thời tiết, tìm kiếm hiển thị rõ ràng
    Lưới content:
    Sử dụng cấu trúc 3 cột 
    Tin nổi bật thường chiếm không gian lớn , các tin nhỏ xếp thành lưới, và cột thứ 3 bên phải là Sidebar.
    Elements bị ẩn: Không có. Hiển thị toàn bộ các widget chức năng: "Xem nhiều", Video nổi bật, Quảng cáo banner hai bên hông
    Font size:Chuẩn cho việc đọc trên máy tính