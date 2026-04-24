Cau A1
1 Khi bạn gõ https://shopee.vn vào trình duyệt và nhấn Enter, hãy liệt kê đúng thứ tự ít nhất 5 bước xảy ra (từ DNS lookup đến render).(Nguồn từ Hành trình 0.3s xuyên đại dương)
    1 Request  xuất phát từ laptop->trình duyệt bắt đầu tìm ra IP của shoppe dựa vào DNS
     → đi qua router WiFi nhà trọ
    2→ Qua nhà mạng VNPT → chạy xuyên cáp quang dưới đáy Thái Bình Dương
    3→ Đến data center của Shoppe ở Hà Nội
    4→ Server xử lý: "Minh muốn xem áo phông"
    5→ Response chạy ngược lại: cáp quang → VNPT → router → laptop
    6→ Chrome nhận file HTML, CSS, JS → render ra giao diện →  Thấy mẫu áo phông
2 Trong DevTools của Chrome, tab Network cho thấy thông tin gì?
        tab network cho phép XEM WEBSITE tải những gì (mục 4.3 Chương 1)
Cau A2-Semintic HTML
    Lỗi phần đầu trang: Dùng <div class="header"> thay vì thẻ chuẩn <header>
    Lỗi menu điều hướng: Dùng <div class="menu"> để bọc các đường link chính thay vì dùng thẻ <nav>
    Lỗi vùng nội dung chính: Dùng <div class="main"> thay vì dùng thẻ <main>
    Lỗi khối nội dung sản phẩm: Sản phẩm là một phần nội dung độc lập, nhưng lại đang dùng 
    <div class="product"> thay vì thẻ <article>
    Lỗi phần chân trang: Dùng <div class="footer"> thay vì dùng thẻ <footer>
    Lỗi trong thẻ div cuối cùng:Phần nội dung nên sử dụng &copy thay vì ký tự đặc biệt
    
    CODE SAU KHI SUA

<header>
<div class="logo">ShopTLU</div>
<nav>
    <ul>
        <li><a href="/">Trang chủ</a></li>
        <li><a href="/products">Sản phẩm</a></li>
    </ul>
</nav>
</header>
<main>
<article class="product">
    <h2 class="title">iPhone 16 Pro</h2>
    <div class="price">25.990.000đ</div>
    <div class="image">
        <img src="iphone.jpg" alt="iPhone 16 Pro">
    </div>
</article>
</main>

<footer>
    &copy; 2026 ShopTLU
</footer>
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
<tfoot>: Đại diện cho phần chân bảng, thường được đặt ở cuối để chứa các thông tin tổng kết 
Tại sao lại không nên dùng 
    1HTML5 cung cấp các thẻ để xây dựng bố ccuj nếu sử dụng table thì sẽ phá vơ đi tiêu chuẩn 
    2Sử dụng table sẽ không tốt cho SEO và Accessibility bằng việc sử dụng các thẻ có tên gọi rõ ràng 
    3 Khó tương thích  tương thích với điện thoại dó các thẻ trong table vô cùng cứng ngắt
    4 Nếu như table phức tạp sẽ tốn nhiều thời gian tải trang hơn
    5 Khó cho việc bảo trì và nâng cấp code bởi các thẻ <th>,<tr>,<td> rất nhiều và lặp lại sẽ rất khó cho lập trình viên
Phần B bài B4
4.1 Các thẻ được sử dụng trong screenshot là:<div>,<section>,<picture>,<source>,<img>,<a>
Các thẻ mà trang shoppe không sửa dụng là:<artical>,<figure>+<figcaption>
4.2 Các trang trên em chưa tìm thấy thẻ table 
4.3  Thẻ form với action="/timkiem"
method không khai báo nên nó mặc định là Get (Thông tin đẩy lên thanh url)
 <input type="text"> được sử dụng trong form để tìm kiếm
PhanC câu C2
Thứ nhất là về SEO (Tối ưu công cụ tìm kiếm). Google không "nhìn" thấy giao diện như chúng ta; chúng đọc cấu trúc mã nguồn. Khi bạn dùng <article> hay <section>, bạn đang trực tiếp chỉ dẫn cho Google biết đâu là nội dung quan trọng nhất. Một trang web dùng toàn <div> sẽ giống như một cuốn sách không có mục lục và tiêu đề chương, khiến bot mất nhiều thời gian hơn để hiểu và khó có thể xếp hạng cao.

Thứ hai là tính Accessibility (Khả năng tiếp cận). Đây là yếu tố nhân văn và chuyên nghiệp trong lập trình. Những người khiếm thị sử dụng trình đọc màn hình (Screen Reader) để duyệt web. Nếu bạn dùng <nav>, trình đọc sẽ thông báo "Đây là phần điều hướng". Nếu bạn chỉ dùng <div class="nav">, trình đọc chỉ coi đó là một cái hộp vô danh, khiến người dùng cực kỳ khó khăn trong việc thao tác.

Hãy nhìn vào ví dụ thực tế này: Khi bạn xây dựng trang chi tiết sản phẩm, thay vì dùng <div class="ten-sp">, bạn dùng <h1>. Trình duyệt sẽ tự động ưu tiên nội dung trong <h1> để hiển thị trên kết quả tìm kiếm. Hoặc khi dùng thẻ <time datetime="2026-04-19">, các ứng dụng lịch có thể tự động nhận diện ngày tháng để nhắc hẹn cho người dùng—điều mà một thẻ <div> chứa văn bản thuần túy không bao giờ làm được.

Tuy nhiên, mình đồng ý là <div> vẫn có chỗ đứng riêng. Nó cực kỳ phù hợp cho các mục đích trình bày thuần túy . Ví dụ: khi bạn cần tạo một cái khung bọc ngoài để căn giữa trang bằng Flexbox, hoặc tạo một lớp phủ (overlay) mờ phía sau một cửa sổ thông báo . Những thành phần này không có ý nghĩa về nội dung, nên dùng div là lựa chọn tối ưu nhất để code không bị rác.


Link video :https://drive.google.com/file/d/1XSAA7AaKgwZYsXRoncYootvI6-OeQj3g/view?usp=drive_link