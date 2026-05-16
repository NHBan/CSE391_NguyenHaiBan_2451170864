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
đối với các màn hình tầm trung768px-991px phân tử sẽ chiếm 6/12 phần của bố cục 
 Tại sao không cần viết col-sm-12?
 Bootstrap ưu tiên Mobile-First