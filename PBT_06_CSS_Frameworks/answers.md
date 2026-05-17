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
Phần C :bootstrap
Câu C1 (10đ) — Tùy biến Bootstrap1. 
    Quy trình đổi màu $primary sang #E63946:Công cụ cần thiết: Trình biên dịch SASS . Thay vì sửa trực tiếp mã nguồn Bootstrap, bạn tạo một file custom.scss riêng
    Các bước:Cài đặt Bootstrap qua npm: npm install bootstrap.
    Trong file custom.scss, khai báo lại biến $primary trước khi import Bootstrap:SCSS$primary: #E63946;
    @import "../node_modules/bootstrap/scss/bootstrap";

    Trình biên dịch SASS sẽ dịch file custom.scss này thành một file .css hoàn chỉnh. Bạn chỉ cần nhúng file .css mới này vào HTML
    
2. Tại sao nên dùng SASS variables thay vì override trực tiếp?
    Tính đồng bộ và triệt để: Khi đổi biến $primary, SASS sẽ tự động tính toán và cập nhật màu cho tất cả các thành phần liên quan trong Bootstrap .Dễ bảo trì và tối ưu:
     Override trực tiếp bằng CSS thủ công (.btn-primary { background: red; }) sẽ khiến bạn phải viết đi viết lại rất nhiều code lẻ tẻ để phủ hết các trạng thái (hover, viền, shadow), làm file CSS phình to, dễ gặp lỗi sót UI và rất khó bảo trì sau này
Câu C2 (10đ)  
1. Bảng so sánh giữa CSS Thuần và Bootstrap 
    Tiêu chí                     CSS Thuần                                                       Bootstrap
Số dòng CSS cần viết             "Rất nhiều (phải tự viết Flexbox, Grid, Media Queries)"       Gần như không có (chỉ dùng class có sẵn)
Thời gian phát triển,            "Lâu (code từ đầu, tự test responsive)."                         "Rất nhanh "
Khả năng tùy biến               Tuyệt đối                                                 Trung bình - Khá (dễ bị rập khuôn giao diện mặc định)

2. Khi nào NÊN và KHÔNG NÊN dùng Bootstrap?
NÊN dùng:
Làm các dự án cần tốc độ phát triển nhanh 
Phát triển các trang hệ thống nội bộ (nơi tính năng quan trọng hơn giao diện độc bản)
Làm việc trong team có nhiều người, cần một chuẩn CSS framework chung để dễ đọc code của nhau

KHÔNG NÊN dùng:
Dự án có thiết kế UI/UX mang tính đặc thù cao, độc đáo và phá cách 
Các website yêu cầu tối ưu hiệu năng và tốc độ tải trang khắt khe (vì Bootstrap chứa rất nhiều class dư thừa không sử dụng đến nếu không cấu hình PurgeCSS cẩn thận)

Phần A Tailwind Css
Bài B1 (30đ) — Landing Page TailwindCSS
flex → display: flex
items-center → align-items: center
justify-between → justify-content: space-between
p-4 → padding: 1rem (16px)
bg-white → background-color: rgb(255 255 255)
shadow-md → Đổ bóng đổ mức độ trung bình 
rounded-lg → border-radius: 0.5rem 
hover:shadow-xl → Đổ bóng mức độ lớn khi di chuột vào 
transition-shadow → transition-property: box-shadow
duration-300 → transition-duration: 300ms
w-16 → width: 4rem (64px)
h-16 → height: 4rem (64px)
rounded-full → border-radius: 100%
object-cover → object-fit: cover
ml-4 → margin-left: 1rem 
flex-1 → flex: 1 1 0% (Chiếm toàn bộ không gian trống còn lại)
text-lg → font-size: 1.125rem (18px), line-height: 1.75rem 
text-gray-800 → color: rgb(31 41 55) 
truncate → overflow: hidden; text-overflow: ellipsis; white-space: nowrap
text-sm → font-size: 0.875rem (14px), line-height: 1.25rem 
text-gray-500 → color: rgb(107 114 128)
px-4 → padding-left: 1rem; padding-right: 1rem 
py-2 → padding-top: 0.5rem; padding-bottom: 0.5rem 
bg-blue-500 → background-color: rgb
text-white → color: rgb(255 255 255)
rounded-md → border-radius: 0.375rem
hover:bg-blue-600 → Chuyển nền thành màu xanh lam đậm hơn khi di chuột vào 
focus:ring-2 → Thêm viền sáng dày 2px khi người dùng nhấp hoặc dùng tab chọn 
focus:ring-blue-300 → Chuyển màu viền ring thành xanh lam nhạt khi focus