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
