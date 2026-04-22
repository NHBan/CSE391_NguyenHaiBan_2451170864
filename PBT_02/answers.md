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
Câu A3 aria-label dùng khi nào? Tại sao KHÔNG nên dùng aria-label khi đã có <label>?
    3.1Sử dụng ảia-label khi bạn muốn phần tử đó có chức năng nhưng không hiển thị chữ bên cạnh, phân biệt các vùng gioóng nhau
    3.2 Không nên sử dụng aria-label bởi :
        - ghi đe dữ liệu khi trình screenread được sử dụng nó sẽ ưu tiên aria-label mà bỏ qua label
        -khi không có sự đồng nhất giữa label và aria-label sẽ gây sự bối rỗi cho người sử dụng trình đọc màn hình
Câu A4 
-Giải thích thuộc tính loading="lazy" trên thẻ <img>. Nó cải thiện gì? Khi nào KHÔNG nên dùng?
    +Thuộc tính loading=lazy là dạng người dùng đến đâu thì ảnh sẽ được tải đến đó
     - tăng trải nghiệm cho người dùng:mượt mà bởi không phải tải một lượng ảnh cùng 1 lúc
     -Tiết kiệm dữ liệu mạng cho người dùng
     -giảm áp lực băng thông
     + Không nên dùng cho những ảnh bắt buộc phải được tải lên ngay từ đầu như logo của thương hiệu
-Tại sao nên cung cấp nhiều <source> trong thẻ <video>? Liệt kê ít nhất 3 format video web phổ biến.
    Tại mỗi trình duyệt lại có cahsc giải mã khacs nhau nên muốn đảm bảo video được phát qua nhiều trình duyệt phải cung cấp nhiều source
-Thuộc tính alt trên <img> dùng để làm gì? Viết alt tốt cho 3 trường hợp:
    +Tốt cho SEO: trình duyệt độc và đề xuất tìm kiếm
    +Khi ảnh bj lỗi hoặc chưa kịp load alt sẽ hiện để người dùng nận biết dược
    +Hỗ trợ người khiếm thính
Ảnh sản phẩm iPhone 16
alt="Tông tin chi tiết của điện thoại"
Ảnh trang trí :
alt="" 
Ảnh biểu đồ doanh thu Q1/2026
alt="Thông tin chi tiết kết quả của biểu đồ"
Cau A5  So sánh <figure> vs <img>
<!-- Cách 1 -->
<img src="product.jpg" alt="iPhone">
<!--Hình ảnh riêng lẻ 
alt: sử dụng để thay thế cho ảnh
-->
<!-- Cách 2 -->
<figure>
    <img src="product.jpg" alt="iPhone 16 Pro Max 256GB Titan">
    <figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption>
</figure>
<!-- Hình ảnh đi kèm với ghi chú
figcaption dùng để mô tả đặc điểm của ảnh
-->
Khi nào dùng Cách 1, khi nào dùng Cách 2? Cho 2 ví dụ thực tế cho mỗi cách
    - Sử dụng thẻ img khi chỉ muốn hình ảnh đi riêngg lẻ mà không cần chú thích
    - sử dụng thẻ figure và figcaption khi muốn đây là một khối riêng biệt người đọc có thể nhận biết được nội dung mà không cần phụ thuộc vào các phần ở trên


Caau B1
 tại sao HTML không thể validate confirm password
    -Căn bản HTML không phải là ngôn ngữ lập trình mà đây là ngôn ngữ siêu văn bản nên không thể lấy ra dữ liệu ở textbox pasword để so sánh được
    -Tính cục bộ: nên phần dữ liệu trong ô confirm pasword HTML không thể đối chiếu với textbox mật khẩu được




Phan C:
<form>
Tên: <input type="text">

<input type="email" placeholder="Email của bạn">

<input type="password" placeholder="Mật khẩu">
<input type="password" placeholder="Nhập lại mật khẩu">

Phone: <input type="text" value="0901234567">

<select>
    <option>Hà Nội</option>
    <option>TP.HCM</option>
</select>

<label>
    Tôi đồng ý điều khoản
</label>

<input type="submit" value="Gửi">
</form>
Lỗi 1: Dòng 2 — Input "Tên" không có <label for="...">, vi phạm accessibility 

Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>

Lỗi 2: Dòng 4 — Input "Email" thiếu thuộc tính name và id, đồng thời không có label, chỉ dùng placeholder  sẽ biến mất khi gõ, không thay thế được label.

Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>

Lỗi 3: Dòng 6 & 7 — Hai ô Password thiếu id, name và không thể phân biệt được mục đích nếu không có label,HTML không thể tự validate "Nhập lại mật khẩu", nhưng cần cấu trúc đúng trước.

Sửa: <label for="pwd">Mật khẩu:</label> <input type="password" id="pwd" name="password" required>
<label for="cpwd">Nhập lại mật khẩu:</label> <input type="password" id="cpwd" name="confirm_password" required>

Lỗi 4: Dòng 9 — Input "Phone" dùng type="text". Nên dùng type="tel" để trình duyệt di động hiển thị bàn phím số và hỗ trợ validation tốt hơn.

Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value="0901234567">

Lỗi 5: Dòng 11 — Thẻ <select> thiếu thuộc tính name (dữ liệu sẽ không được gửi lên server) và không có label.

Sửa: <label for="city">Thành phố:</label> <select id="city" name="city">...</select>

Lỗi 6: Dòng 12 & 13 — Các thẻ <option> thiếu thuộc tính value. Khi gửi form, server sẽ nhận giá trị rỗng hoặc không xác định.

Sửa: <option value="hanoi">Hà Nội</option> <option value="hcm">TP.HCM</option>

Lỗi 7: Dòng 16 — Thẻ <label> "Tôi đồng ý" không được liên kết với một <input type="checkbox">. Label này đang đứng cô đơn và không có chức năng chọn.

Sửa: <input type="checkbox" id="terms" name="terms" required> <label for="terms">Tôi đồng ý điều khoản</label>

Lỗi 8: Dòng 20 — Sử dụng <input type="submit"> là cách cũ. Best practice hiện nay là dùng thẻ <button type="submit"> để dễ dàng tùy biến nội dung và đồng nhất với button khác.

Sửa: <button type="submit">Gửi</button>
Cau C2:
1 Viết pattern regex cho CMND/CCCD và Số tài khoản
<label for="cccd">Số CMND/CCCD (12 số):</label>
<input type="text" id="cccd" name="cccd" 
       pattern="\d{12}" 
       title="Vui lòng nhập đúng 12 chữ số CMND/CCCD" required>

<label for="stk">Số tài khoản (10-15 số):</label>
<input type="text" id="stk" name="stk" 
       pattern="\d{10,15}" 
       title="Số tài khoản phải từ 10 đến 15 chữ số" required>

<label for="email">Email:</label>
<input type="email" id="email" name="email" required>

<label for="pin">Mã PIN (6 số):</label>
<input type="password" id="pin" name="pin" 
       pattern="\d{6}" 
       inputmode="numeric"
       title="Mã PIN phải gồm đúng 6 chữ số" required>
2Giải thích: HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
Chưa đủ an toàn
-Khi người dùng chọn kiểm tra và xóa đi các thuộc tính reqired thì có thể gửi dữ liệu lỗi lên sever
-HTML5 chỉ hộ trợ nhấp đúng định dạng chứ không thể kiểm tra được nội dung