### Câu A1 (5đ) — DOM Tree

Cho HTML:

```html
<div id="app">
    <header>
        <h1>Todo App</h1>
        <nav>
            <a href="#" class="active">All</a>
            <a href="#">Active</a>
            <a href="#">Completed</a>
        </nav>
    </header>
    <main>
        <form id="todoForm">
            <input id="todoInput" type="text">
            <button type="submit">Add</button>
        </form>
        <ul id="todoList">
            <li class="todo-item">Learn HTML</li>
            <li class="todo-item completed">Learn CSS</li>
        </ul>
    </main>
</div>
```

1. Vẽ DOM tree (sơ đồ cây) cho HTML trên
div#app
├── header
│   ├── h1
│   └── nav
│       ├── a.active
│       ├── a
│       └── a
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    └── ul#todoList
        ├── li.todo-item
        └── li.todo-item.completed
2. Viết **querySelector** cho mỗi yêu cầu:
    - Chọn thẻ <h1>
    document.querySelector('h1');

    - Chọn input trong form
    document.querySelector('#todoInput');

    - Chọn tất cả .todo-item
    document.querySelectorAll('.todo-item');

    - Chọn link đang active
    document.querySelector('a.active');

    - Chọn <li> đầu tiên trong 
    document.querySelector('#todoList li');

    - Chọn tất cả <a> bên trong <nav>
    document.querySelectorAll('nav a');
### Câu A2 (5đ) — innerHTML vs textContent

Giải thích sự khác nhau. Cho ví dụ khi nào dùng mỗi cái. 
1. Sự khác nhau giữa innerHTML và textContent
innerHTML: Lấy hoặc thiết lập toàn bộ nội dung của một phần tử dưới dạng mã HTML. Trình duyệt sẽ phân tích cú pháp  chuỗi này và chuyển nó thành các DOM nodes thực sự (render ra các thẻ, in đậm, hình ảnh...)

textContent: Lấy hoặc thiết lập nội dung của phần tử dưới dạng văn bản thuần túy. Bất kỳ thẻ HTML nào nằm trong chuỗi cũng sẽ bị biến thành văn bản bình thường, trình duyệt không render chúng
**Câu hỏi bảo mật:** Tại sao `innerHTML` có thể gây lỗ hổng **XSS**? Viết 1 ví dụ code minh họa:
Lỗ hổng XSS (Cross-Site Scripting) xảy ra khi bạn lấy dữ liệu không an toàn (do user nhập) và đưa trực tiếp vào trang web thông qua innerHTML

Vì innerHTML ép trình duyệt phải biên dịch chuỗi thành mã HTML thực, nếu user cố tình nhập các thẻ chứa mã độc như <script> hoặc gắn sự kiện ẩn như <img onerror="mã_độc">, trình duyệt sẽ tự động thực thi đoạn mã JavaScript đó ngay khi nó được chèn vào DOM. Hậu quả là tin tặc có thể đánh cắp cookie, token, hoặc chiếm quyền điều khiển phiên đăng nhập của người dùng khác
```javascript
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;  // ← Nguy hiểm!
// Sửa thế nào?
// SỬA LẠI THÀNH textContent:
document.querySelector("#result").textContent = userInput;  // ← Tuyệt đối an toàn!

### Câu A3 (5đ) — Event Bubbling
Không chạy code, dự đoán thứ tự console.log:
```javascript
document.querySelector("#outer").addEventListener("click", () => {
    console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    // e.stopPropagation();  ← nếu bỏ comment → output thay đổi thế nào?
});
```

```html
<div id="outer">
    <div id="inner">
        <button id="btn">Click me</button>
    </div>
</div>
```

Khi click vào button, output = 
BUTTON
INNER
OUTER 
Nếu uncomment `stopPropagation()`, output = BUTTON
