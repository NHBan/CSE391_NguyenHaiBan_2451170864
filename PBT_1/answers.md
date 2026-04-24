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