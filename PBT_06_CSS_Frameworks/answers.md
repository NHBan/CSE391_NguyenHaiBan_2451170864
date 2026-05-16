Phần A:
Câu A1 (10đ) — Grid System
Đọc tài liệu Grid System. Không chạy code, vẽ layout cho HTML sau ở 3 kích thước:

<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
Kích thước	< 768px	            768px - 991px	        ≥ 992px
Số cột	      1	                    2	                    4
Box layout	  xếp chông dọc	        Lưới 2 x2	           Nằm ngang
Câu hỏi thêm: col-md-6 nghĩa là gì?
đối với các màn hình tầm trung >768px phân tử sẽ chiếm 6/12 phần của bố cục 
 Tại sao không cần viết col-sm-12?
 Bootstrap ưu tiên Mobile-First
Câu A2 (10đ) — Utilities & Components
Giải thích class d-none d-md-block. Element này hiển thị khi nào, ẩn khi nào?
    Element sẽ hiển thị khi kích tước màn hình ở tầm trung (768px-991px) do ghi đè d-none, ẩn trong mọi kích thước màn hình
Liệt kê 5 spacing utilities (margin/padding) và giải thích.
    mt-3 (Margin Top 3):
    Tạo khoảng cách lề bên ngoài ở phía trên phần tử
    px-4 (Padding X-axis 4):
    Tạo khoảng cách lề bên trong ở trục X (tức là cả bên trái và bên phải) của phần tử
    mb-auto (Margin Bottom Auto):
    Tự động tính toán khoảng cách lề bên ngoài ở phía dưới
    Rất hay được dùng kết hợp với Flexbox để đẩy phần tử hiện tại lên trên cùng và dồn các phần tử còn lại xuống dưới đáy container
    py-2 (Padding Y-axis 2):
    Tạo khoảng cách lề bên trong ở trục Y (tức là cả phía trên và phía dưới )
    mx-auto (Margin X-axis Auto):
    Tự động chia đều lề bên ngoài ở trục X (trái và phải)
    Được sử dụng chủ yếu để căn giữa theo chiều ngang các phần tử có chiều rộng cố định 

Sự khác nhau giữa .container, .container-fluid, .container-md?
    .container:có chiều rộng tối đa cố định và luôn giữ khoảng cách giữa 2 lề tạo cảm giác thị lực
    .container-fluid:Chiều rộng chiếm 100% màn hình
    .container-md:Chiếm chiều rộng 100% đối với cách màn hình <768px, đối với các màn hình lớn hơn nó đóng vai trò là .container