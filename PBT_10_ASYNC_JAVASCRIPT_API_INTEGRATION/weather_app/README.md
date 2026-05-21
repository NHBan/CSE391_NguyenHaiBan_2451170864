1. API 1: Geocoding API (API Tìm tọa độ địa lý)
Mục đích: Chuyển đổi tên thành phố do người dùng nhập (chuỗi chữ) thành tọa độ địa lý dạng số bao gồm Vĩ độ (Latitude) và Kinh độ (Longitude). API thời tiết không thể hiểu chữ "Hanoi" hay "Tokyo", nên bắt buộc phải qua bước trung gian này

Đường dẫn (Endpoint): https://geocoding-api.open-meteo.com/v1/search

Cách dùng trong code (Tham số truyền lên):

name: Tên thành phố được bọc trong hàm encodeURIComponent(cityName) để mã hóa các ký tự đặc biệt hoặc khoảng trắng (Ví dụ: Ho Chi Minh thành Ho%20Chi%20Minh)

count=1: Giới hạn chỉ trả về 1 kết quả trùng khớp nhất để tối ưu tốc độ.

Dữ liệu nhận về (JSON): Ứng dụng sẽ bóc tách mảng results[0] để lấy ra các trường: latitude, longitude, name (tên chuẩn hóa), và country (quốc gia)

2. API 2: Weather Forecast API (API Dự báo thời tiết)
Mục đích: Lấy dữ liệu khí tượng thực tế của vị trí dựa trên tọa độ vừa tìm được từ API 1

Đường dẫn (Endpoint): https://api.open-meteo.com/v1/forecast

Cách dùng trong code (Tham số truyền lên):

latitude & longitude: Truyền cặp số vĩ độ và kinh độ vừa lấy từ API Geocoding sang

current: Khai báo các chỉ số thời tiết hiện tại cần lấy, bao gồm: temperature_2m (nhiệt độ), relative_humidity_2m (độ ẩm), wind_speed_10m (tốc độ gió), và weather_code (mã trạng thái thời tiết)

Dữ liệu nhận về (JSON):
Trả về một object current chứa các thông số số liệu. Đặc biệt là weather_code (định dạng số theo chuẩn tổ chức khí tượng WMO, ví dụ: 0 là nắng, 95 là dông bão). Số này sẽ được đưa vào bộ lọc đối chiếu trong file app.js để đổi thành chữ tiếng Việt và Emoji tương ứng

Cách dùng
[Người dùng gõ: "Tokyo"] 
       │
       ▼
[Gọi Geocoding API] ───► Trả về: Vĩ độ: 35.6895, Kinh độ: 139.6917
       │
       ▼
[Gọi Weather API]   ───► Trả về số liệu: Nhiệt độ 25°C, Mã thời tiết: 0 (Nắng)
       │
       ▼
[Cập nhật lên Giao diện UI] (Bật trạng thái Success)