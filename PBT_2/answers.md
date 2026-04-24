Cau A1
type="text" -> Ô nhập văn bản một dòng, không có sẵn validation -> Dùng cho form nhập họ tên
type="email" -> Ô nhập text, tự kiểm tra có @ -> Dùng cho form đăng ký thành viên 
type="password" -> Ô nhập ký tự ẩn , không có sẵn validation -> Dùng cho form đăng nhập
type="number" -> Ô nhập số có nút tăng giảm, giới hạn bởi min/max -> Dùng để chọn Số lượng sản phẩm.
type="tel" -> Ô nhập text, hiện bàn phím số trên di động -> Dùng cho form nhập số điện thoại .
type="date" -> Ô chọn ngày tháng từ lịch hiển thị -> Dùng cho khách hàng chọn ngày
type="range" -> Thanh trượt chọn giá trị trong khoảng định sẵn -> Dùng cho bộ lọc khoảng giá sản phẩm
type="checkbox" -> Ô vuông tích chọn một hoặc nhiều mục -> Dùng để chọn thương hiệu muốn lọc
type="radio" -> Nút tròn chọn duy nhất một mục trong nhóm -> Dùng để chọn phương thức thanh toán
type="file" -> Nút bấm chọn tệp tin từ thiết bị -> Dùng để tải lên ảnh đánh giá sản phẩm
CauA3
1 Tại sao <label for="email"> quan trọng cho người dùng screen reader?
Form không có <label> = người dùng screen reader không biết ô nhập gì
2 Khi nào dùng <fieldset> + <legend>? Cho ví dụ cụ thể.
Dùng khi muốn nhóm cá ô dữ liệu có liên quan đến nhau và muốn đặt tên cho chúng
<fieldset>
<legend>Thông tin khách hàng</legend>
<label>Họ và tên:</label>
<input type="text" name="fullname" required>
<label>Số điện thoại:</label>
<input type="tel" name="phone" required>
  </fieldset>
3 aria-label dùng khi nào? Tại sao KHÔNG nên dùng aria-label khi đã có <label>?
    3.1Sử dụng ảia-label khi bạn muốn phần tử đó có chức năng nhưng không hiển thị chữ bên cạnh, phân biệt các vùng gioóng nhau
    3.2 Không nên sử dụng aria-label bởi :
        - ghi đe dữ liệu khi trình screenread được sử dụng nó sẽ ưu tiên aria-label mà bỏ qua label
        -khi không có sự đồng nhất giữa label và aria-label sẽ gây sự bối rỗi cho người sử dụng trình đọc màn hình