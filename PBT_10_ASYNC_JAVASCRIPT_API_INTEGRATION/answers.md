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
### Câu A3 (5đ) — Promise States
Vẽ sơ đồ 3 trạng thái của Promise (`Pending → Fulfilled`, `Pending → Rejected`).
┌─── [Resolved] ───► FULFILLED (Thành công) ───► .then()
                     │                      (Trả về: value)
                     │
PENDING (Chờ xử lý) ─┤
                     │
                     │
                     └─── [Rejected] ───► REJECTED (Thất bại) ──────► .catch()
                                            (Trả về: error/reason)
Giải thích: Callback Hell là gì? Viết ví dụ 4 cấp callback hell → Refactor thành async/await.
Callback Hell (hay còn gọi là Pyramid of Doom) là hiện tượng các hàm bất đồng bộ lồng nhau quá nhiều tầng thông qua các hàm gọi lại 
Khi một tác vụ bất đồng bộ sau phụ thuộc vào kết quả của tác vụ trước, code có xu hướng phình to và thụt lề dần sang bên phải theo hình kim tự tháp. Điều này làm cho mã nguồn cực kỳ rối mắt, khó đọc, khó bảo trì và việc bóc tách xử lý lỗi (try...catch) trở thành một cực hình
Ví dụ 4 cấp Callback Hell (Ugly Code):
```javascript
// Giả định các hàm đều nhận callback (err, data) theo chuẩn cũ
dangNhap("user123", (err, user) => {
    if (err) return console.error(err);
    
    layGioHang(user.id, (err, cart) => {
        if (err) return console.error(err);
        
        taoDonHang(cart, (err, order) => {
            if (err) return console.error(err);
            
            thanhToan(order.id, (err, receipt) => {
                if (err) return console.error(err);
                console.log("Hoàn thành đơn hàng:", receipt);
            });
        });
    });
});
3. Refactor thành Async/Await
// Chuyển đổi quy trình sang dạng phẳng, dễ đọc như code đồng bộ
async function xuLyDonHang() {
    try {
        const user = await dangNhap("user123");
        const cart = await layGioHang(user.id);
        const order = await taoDonHang(cart);
        const receipt = await thanhToan(order.id);
        
        console.log("Hoàn thành đơn hàng:", receipt);
    } catch (error) {
        // Gom toàn bộ lỗi của cả 4 bước về xử lý tập trung tại một nơi
        console.error("Quy trình thất bại:", error.message);
    }
}

xuLyDonHang();
```
### Câu C1  — Error Handling Strategy
```javascript
Bạn xây dựng app E-Commerce gọi nhiều APIs. Thiết kế **chiến lược xử lý lỗi**:

1. **Network errors** (mất mạng giữa chừng) → Xử lý thế nào?
2. **API errors** (server trả 500, 404, 429 Too Many Requests) → Xử lý từng loại
1 &2 Mặc định, fetch() chỉ ném ra lỗi (bị rejected) khi gặp Network Errors (mất mạng, đứt cáp, sai DNS). Đối với các API Errors (404, 500, 429), fetch() vẫn tính là thành công nhưng thuộc tính response.ok sẽ là false. Chiến lược xử lý cụ thể cho từng loại như sau:

Network Errors:

Cách xử lý: Lắng nghe sự kiện window.addEventListener('online/offline') để thông báo giao diện toàn cục. Trên từng request, dùng khối catch để phát hiện và hiển thị UI thông báo: "Kết nối mạng bị gián đoạn. Vui lòng kiểm tra lại thiết bị." kèm nút "Thử lại"

HTTP 404 (Not Found - Không tìm thấy sản phẩm/giỏ hàng):

Cách xử lý: Lỗi này thường do dữ liệu (ví dụ: sản phẩm đã bị xóa khỏi hệ thống). Không nên crash ứng dụng, hãy chuyển hướng người dùng về trang danh mục hoặc hiển thị widget: "Sản phẩm này hiện không còn tồn tại"

HTTP 500 (Internal Server Error - Server sập/lỗi database):

Cách xử lý: Đây là lỗi từ phía hệ thống back-end. Hãy hiển thị một thông báo chung chung, thân thiện nhưng rõ ràng: "Hệ thống đang bận hoặc bảo trì. Vui lòng thử lại sau vài phút." Đừng bao giờ in trực tiếp lỗi kỹ thuật thô lên màn hình của khách hàng

HTTP 429 (Too Many Requests - Spam/Bị giới hạn lượt gọi):
Cách xử lý: Hệ thống đang chặn Client vì gửi quá nhiều request liên tiếp (Rate limit). Cách xử lý là tạm thời khóa (disable) nút bấm thao tác của user, đọc Header Retry-After từ server trả về (nếu có) để đếm ngược thời gian và tự động gửi lại sau khi hết thời gian phạt.
3. **Timeout** (API chậm > 10 giây) → Viết code `fetchWithTimeout(url, ms)`
Nếu một API thanh toán hoặc áp mã giảm giá chạy quá lâu, ta cần chủ động ngắt nó để giải phóng tài nguyên và báo lỗi cho khách hàng thay vì để họ đợi vô hạn. Ta sử dụng AbortController để làm việc này
->async function fetchWithTimeout(url, options = {}, ms = 10000) {
    // Khởi tạo bộ điều khiển ngắt tiến trình
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), ms); // Kích hoạt ngắt sau `ms` giây

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal // Gắn tín hiệu ngắt vào fetch
        });
        clearTimeout(id); // Xóa bộ đếm nếu fetch thành công trước thời hạn
        return response;
    } catch (error) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            throw new Error(`Yêu cầu bị hủy bỏ do quá thời gian phản hồi (${ms}ms)`);
        }
        throw error;
    }
}

// Cách dùng:
// fetchWithTimeout("https://api.example.com/checkout", {}, 10000).catch(console.error);
4. **Retry logic** (thử lại 3 lần nếu lỗi network) → Viết code `fetchWithRetry(url, maxRetries)`
Khi gặp lỗi mất mạng cục bộ hoặc chập chờn mạng, việc tự động gửi lại yêu cầu  từ 2-3 lần sẽ cứu vãn được trải nghiệm người dùng mà họ không cần phải bấm F5 bằng tay
->async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url, options);
            
            // Nếu là lỗi API (404, 500...), không tự động retry vì kết quả sẽ không đổi
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json(); // Thành công thì thoát hàm và trả dữ liệu
        } catch (error) {
            // Nếu đã chạm đến giới hạn lượt thử cuối cùng mà vẫn lỗi thì ném lỗi ra ngoài
            if (attempt === maxRetries) {
                throw new Error(`Đã thử lại ${maxRetries} lần nhưng vẫn thất bại. Lỗi gốc: ${error.message}`);
            }
            
            console.warn(`Lần thử ${attempt} thất bại. Thử lại sau ${delay}ms...`);
            
            // Tạo khoảng dừng (Delay) trước khi bước vào vòng lặp thử lại kế tiếp
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // (Tùy chọn nâng cao) Tăng dần thời gian chờ sau mỗi lần lỗi: delay *= 2;
        }
    }
}

// Cách dùng:
// fetchWithRetry("https://api.example.com/products", { method: "GET" }, 3, 1500)
//     .then(data => console.log(data))
//     .catch(err => alert(err.message));
```
### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race
```javascript
Giải thích sự khác nhau. Cho ví dụ thực tế khi nào dùng mỗi cái:

| Method           | Khi nào resolve?                   | Khi nào reject?            | Use case |
|--------          |------------------                  |------------------          |----------|
| `.all()`         | TẤT CẢ cùng thành công      |Ngay khi 1 cái thất bại            | Tải đủ bộ dữ liệu cốt lõi để mở trang        |
| `.allSettled()`  | TẤT CẢ đều đã chạy xong      | KHÔNG BAO GIỜ thất bại           | Tải các Widget độc lập trên Dashboard |
| `.race()`        | Thằng đầu tiên thành công   | Thằng đầu tiên thất bại           | Làm bộ đếm ngắt giờ (Timeout) cho API |
| `.any()`         | Thằng đầu tiên thành công   | Chỉ khi TẤT CẢ thất bại           | Tải file từ các Server dự phòng (CDN) |

Viết ví dụ code cho mỗi method với scenario thực tế (không phải ví dụ `delay` đơn giản).
// Scenario: Phải tải đủ cấu hình ứng dụng, giỏ hàng và thông tin user thì mới render giao diện.
const fetchUser = () => fetch("/api/user").then(r => r.json());
const fetchCart = () => fetch("/api/cart").then(r => r.json());
const fetchTheme = () => fetch("/api/theme-config").then(r => r.json());
//Gom đủ dữ liệu để mở trang Dashboard
async function initApplication() {
    try {
        // Chạy song song cả 3. Chỉ cần API /api/cart lỗi 500, lập tức nhảy xuống khối catch.
        const [user, cart, theme] = await Promise.all([
            fetchUser(),
            fetchCart(),
            fetchTheme()
        ]);
        
        console.log("Đủ data, tiến hành vẽ UI cho user:", user.name);
        renderPage(user, cart, theme);
    } catch (error) {
        console.error("Ứng dụng không thể khởi tạo do thiếu dữ liệu cốt lõi:", error.message);
        showSystemErrorPage(); // Hiện màn hình lỗi hệ thống toàn cục
    }
}
//Tải danh sách file đính kèm
// Scenario: User tải lên 3 file ảnh cùng lúc. File nào lỗi thì báo lỗi đỏ, file nào thành công thì hiện nút xem.
const uploadFile = (file) => fetch("/api/upload", { method: "POST", body: file }).then(r => r.json());

async function handleBulkUpload(filesArray) {
    // Luôn luôn resolve về một mảng chứa kết quả của cả 3 tiến trình
    const uploadStatuses = await Promise.allSettled(filesArray.map(file => uploadFile(file)));

    uploadStatuses.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`File thứ ${index + 1} tải lên THÀNH CÔNG:`, result.value.url);
            showSuccessTickInUI(index);
        } else {
            console.warn(`File thứ ${index + 1} tải lên THẤT BẠI. Lý do:`, result.reason);
            showErrorCrossInUI(index, result.reason);
        }
    });
}
//Tạo cơ chế Timeout cho API thanh toán
// Scenario: Khi bấm thanh toán, nếu API xử lý quá 5 giây mà chưa xong, hủy bỏ và báo lỗi timeout cho khách hàng.
const requestCheckout = (cartId) => fetch("/api/checkout", { method: "POST", body: cartId }).then(r => r.json());

const timeoutGuard = (ms) => new Promise((_, reject) => 
    setTimeout(() => reject(new Error("Cổng thanh toán phản hồi quá chậm!")), ms)
);

async function processPayment(cartId) {
    try {
        // Cuộc đua giữa API mạng và Bộ đếm ngược 5000ms
        const paymentResult = await Promise.race([
            requestCheckout(cartId),
            timeoutGuard(5000)
        ]);
        
        alert("Thanh toán đơn hàng thành công!");
    } catch (error) {
        // Nếu bộ đếm ngược về trước, error.message sẽ là "Cổng thanh toán phản hồi quá chậm!"
        alert(`Giao dịch thất bại: ${error.message}`);
    }
}
//Lấy ảnh từ các Server CDN dự phòng
// Scenario: Cần load một bức ảnh Banner lớn. Gọi đồng thời lên 3 cụm Server CDN khác nhau trên thế giới. 
// Server nào gần user và phản hồi về ảnh thành công trước thì lấy ngay, bất chấp các server kia bị lỗi hay chậm.
const getImgFromSingapore = () => fetch("https://sg.cdn.com/banner.jpg").then(r => r.blob());
const getImgFromUSA = () => fetch("https://us.cdn.com/banner.jpg").then(r => r.blob());
const getImgFromJapan = () => fetch("https://jp.cdn.com/banner.jpg").then(r => r.blob());

async function loadBanner() {
    try {
        // Chỉ cần 1 cụm CDN trả về blob ảnh thành công trước, biến bannerBlob sẽ nhận giá trị luôn.
        const bannerBlob = await Promise.any([
            getImgFromSingapore(),
            getImgFromJapan(),
            getImgFromUSA()
        ]);
        
        displayBanner(bannerBlob);
    } catch (aggregateError) {
        // Chỉ lọt vào đây nếu CẢ 3 SERVER CDN ĐỀU SẬP hoàn toàn.
        console.error("Tất cả các server dự phòng đều không thể kết nối:", aggregateError.errors);
        displayFallbackLocalBanner();
    }
}
---


