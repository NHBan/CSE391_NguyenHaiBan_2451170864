Cau A1
1 Khi bạn gõ https://shopee.vn vào trình duyệt và nhấn Enter, hãy liệt kê đúng thứ tự ít nhất 5 bước xảy ra (từ DNS lookup đến render).(Nguồn từ Hành trình 0.3s xuyên đại dương)
    1 Request  xuất phát từ laptop->trình duyệt bắt đầu tìm ra IP của shoppe dựa vào DNS
     → đi qua router WiFi nhà trọ
    2→ Qua nhà mạng VNPT → chạy xuyên cáp quang dưới đáy Thái Bình Dương
    3→ Đến data center của Shoppe ở Hà Nội
    4→ Server xử lý: "Minh muốn xem áo phông"
    5→ Response chạy ngược lại: cáp quang → VNPT → router → laptop
    6→ Chrome nhận file HTML, CSS, JS → render ra giao diện → Minh thấy mẫu áo phông
2 Trong DevTools của Chrome, tab Network cho thấy thông tin gì?
        tab network cho phép XEM WEBSITE tải những gì (mục 4.3 Chương 1)
Cau A2-Semintic HTML
    Lỗi phần đầu trang: Dùng <div class="header"> thay vì thẻ chuẩn <header>
    Lỗi menu điều hướng: Dùng <div class="menu"> để bọc các đường link chính thay vì dùng thẻ <nav>
    Lỗi vùng nội dung chính: Dùng <div class="main"> thay vì dùng thẻ <main>
    Lỗi khối nội dung sản phẩm: Sản phẩm là một phần nội dung độc lập, nhưng lại đang dùng 
    <div class="product"> thay vì thẻ <article>
    Lỗi phần chân trang: Dùng <div class="footer"> thay vì dùng thẻ <footer>

Câu A3 — Block vs Inline
    Không chạy code, hãy vẽ tay (hoặc mô tả bằng text art) kết quả hiển thị của đoạn HTML sau. Giải thích tại sao.
    <div>Hộp 1</div>
    <span>Text A</span>
    <span>Text B</span>
    <div>Hộp 2</div>
    <span>Text C</span>
    <strong>Text D</strong>
    <div>Hộp 3</div>
    Hộp 1 Đây là phần tử block nó sẽ luôn bắt đầu từ dòng mới và chiếu chiều rộng nhiều nhất có thể
    Text A Text B Đây là phần tử inline không xuống dòng mà chỉ chiếm đủ độ rộng
    Hộp 2 
    Text C Text D (Boi dam) vì thẻ strong có mang tính chất quan trong 
    Hộp 3
Câu A4 
<thead>: Đại diện cho phần đầu bảng, được sử dụng riêng để chứa các ô tiêu đề của các cột trong bảng
<tbody>: Đại diện cho phần thân bảng, là nơi chứa toàn bộ nội dung và dữ liệu chính của bảng
<tfoot>: Đại diện cho phần chân bảng, thường được đặt ở cuối để chứa các thông tin tổng kết Tại sao lại không nên dùng 
    1HTML5 cung cấp các thẻ để xây dựng bố ccuj nếu sử dụng table thì sẽ phá vơ đi tiêu chuẩn 
    2Sử dụng table sẽ không tốt cho SEO và Accessibility bằng việc sử dụng các thẻ có tên gọi rõ ràng (Bản đồ Semantic Elements)
    3 Khó tương thích  tương thích với điện thoại dó các thẻ trong table vô cùng cứng ngắt
    4 Nếu như table phức tạp sẽ tốn nhiều thời gian tải trang hơn
    5 Khó cho việc bảo trì và nâng câops code bởi các thẻ <th>,<tr>,<td> rất nhiều và lặp lại sẽ rất khó cho lập trình viên
