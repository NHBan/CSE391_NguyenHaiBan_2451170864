// --- DOM ELEMENTS ---
const addForm = document.getElementById('addForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoFooter = document.getElementById('todoFooter');
const todoCount = document.getElementById('todoCount');
const filtersContainer = document.getElementById('filters');
const clearCompletedBtn = document.getElementById('clearCompleted');

// --- STATE ---
// Lấy data từ LocalStorage hoặc gán mảng rỗng nếu chưa có
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// --- CORE FUNCTIONS ---
const saveToStorage = () => localStorage.setItem('todos', JSON.stringify(todos));

const updateFooter = () => {
    if (todos.length === 0) {
        todoFooter.classList.add('hidden');
        return;
    }
    todoFooter.classList.remove('hidden');

    // Cập nhật số đếm Active
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.innerHTML = `<strong>${activeCount}</strong> items left`;

    // Ẩn/hiện nút Clear Completed
    const hasCompleted = todos.some(t => t.completed);
    clearCompletedBtn.style.display = hasCompleted ? 'block' : 'none';
};

const render = () => {
    todoList.textContent = '';
    let filteredTodos = todos;
    if (currentFilter === 'active') filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === 'completed') filteredTodos = todos.filter(t => t.completed);

    // Dùng DOM methods thuần túy để tạo elements (KHÔNG dùng innerHTML)
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'toggle-cb';
        checkbox.checked = todo.completed;

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '❌';
        li.append(checkbox, span, editInput, deleteBtn);
        todoList.appendChild(li);
    });

    updateFooter();
};
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ id: Date.now(), text, completed: false });
        todoInput.value = '';
        saveToStorage();
        render();
    }
});

todoList.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const id = Number(li.dataset.id);

    // Xóa todo
    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        saveToStorage();
        render();
    }
    
    // Toggle completed
    if (e.target.classList.contains('toggle-cb')) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        saveToStorage();
        render();
    }
});

// 3. EVENT DELEGATION: Double click để Edit
todoList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('todo-text')) {
        const li = e.target.closest('.todo-item');
        li.classList.add('editing');
        const editInput = li.querySelector('.edit-input');
        editInput.focus();
        
        // Đưa con trỏ chuột xuống cuối text
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
    }
});

// 4. Lưu lại sau khi Edit (Nhấn Enter)
todoList.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('edit-input') && e.key === 'Enter') {
        const li = e.target.closest('.todo-item');
        const id = Number(li.dataset.id);
        const newText = e.target.value.trim();

        if (newText) {
            const todo = todos.find(t => t.id === id);
            todo.text = newText;
        } else {
            // Nếu xóa hết text thì xóa luôn todo đó
            todos = todos.filter(t => t.id !== id);
        }
        
        saveToStorage();
        render(); // render tự động xóa class 'editing'
    }
});

// 5. Filters
filtersContainer.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'A') {
        // Cập nhật UI nút active
        document.querySelector('.filters a.active').classList.remove('active');
        e.target.classList.add('active');

        // Áp dụng filter
        currentFilter = e.target.dataset.filter;
        render();
    }
});

// 6. Clear Completed
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveToStorage();
    render();
});

// --- INIT ---
render();