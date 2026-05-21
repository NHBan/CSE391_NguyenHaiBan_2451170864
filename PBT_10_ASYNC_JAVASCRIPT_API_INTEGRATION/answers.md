### Câu A1 (5đ) — Sync vs Async
Output dự đoán là:
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
### Câu A2 (5đ) — Fetch API

Giải thích từng dòng code:

```javascript
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
```
1. `await fetch(...)` — `fetch` trả về gì? Tại sao cần `await`?
    fetch trả về: Một đối tượng Promise, bên trong chứa một đối tượng Response 
    Tại sao cần implicit await? Vì fetch là tác vụ bất đồng bộ . Từ khóa await buộc JavaScript tạm dừng hàm getData cho đến khi Promise này hoàn thành, giúp ta lấy trực tiếp đối tượng Response ra để làm việc thay vì phải dùng .then().
2. `response.ok` — Khi nào `false`? Liệt kê 3 status codes tương ứng.
    Khi nào false? Khi mã trạng thái HTTP trả về từ máy chủ nằm ngoài khoảng 200 - 299 (tức là yêu cầu gặp lỗi từ phía Client hoặc Server)

    3 status codes tương ứng:
    404 (Not Found - Không tìm thấy trang/API)
    500 (Internal Server Error - Máy chủ gặp lỗi hệ thống)
    403 (Forbidden - Bị chặn, không có quyền truy cập)
3. `response.json()` — Tại sao cần `await` lần nữa?
    Lý do cần await: Khi dòng code fetch chạy xong, trình duyệt mới chỉ nhận được phần đầu của phản hồi. Phần thân dữ liệu  dạng chuỗi JSON thô vẫn đang được truyền tải tiếp tục theo dạng luồng dữ liệu qua mạng

    Phương thức response.json() trả về một Promise đại diện cho quá trình đọc toàn bộ luồng dữ liệu đó và chuyển đổi  nó thành một Object JavaScript. Vì quá trình đọc/parse luồng này tốn thời gian, ta bắt buộc phải dùng await để đợi dữ liệu hoàn chỉnh
4. `try...catch` — Catch những lỗi gì? (Network error? 404? JSON parse error?)
    Khối catch này sẽ bắt được:
    Network error : Mất mạng, đứt cáp, sai tên miền (DNS lỗi), hoặc bị chặn bởi chính sách CORS. Khi đó fetch tự ném ra lỗi
    Lỗi HTTP tự định nghĩa: Mã lỗi 404, 500... do chính câu lệnh throw new Error() ở dòng if (!response.ok) chủ động ném ra
    JSON parse error (Lỗi định dạng JSON): Nếu API phản hồi về một chuỗi không phải định dạng JSON (ví dụ: một trang HTML báo lỗi hoặc chuỗi text trống), hàm response.json() sẽ thất bại và ném ra lỗi cú pháp cấu trúc, khối catch sẽ bắt được luôn
