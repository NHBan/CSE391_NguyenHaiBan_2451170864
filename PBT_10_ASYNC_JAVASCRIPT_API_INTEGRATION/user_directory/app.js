// --- 1. API LAYER ---
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async _request(endpoint, options = {}) {
        const response = await fetch(`${this.baseURL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Lỗi hệ thống: HTTP ${response.status}`);
        }
        return response.json();
    },

    async getUsers() {
        return this._request("/users");
    },
    
    async getUser(id) {
        return this._request(`/users/${id}`);
    },
    
    async createUser(data) {
        return this._request("/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    },
    
    async updateUser(id, data) {
        return this._request(`/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    },
    
    async deleteUser(id) {
        return this._request(`/users/${id}`, { method: "DELETE" });
    }
};

// --- 2. UI LAYER ---
const ui = {
    userGrid: document.getElementById("userGrid"),
    form: document.getElementById("userForm"),
    formTitle: document.getElementById("formTitle"),
    userIdInput: document.getElementById("userId"),
    nameInput: document.getElementById("name"),
    emailInput: document.getElementById("email"),
    cancelBtn: document.getElementById("cancelBtn"),
    toastContainer: document.getElementById("toastContainer"),

    renderUsers(usersList) {
        this.userGrid.textContent = "";
        if (usersList.length === 0) {
            const p = document.createElement("p");
            p.textContent = "Không tìm thấy người dùng nào.";
            p.style.gridColumn = "1/-1";
            this.userGrid.appendChild(p);
            return;
        }

        usersList.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";
            card.dataset.id = user.id;

            const info = document.createElement("div");
            info.className = "user-info";
            const h3 = document.createElement("h3");
            h3.textContent = user.name;
            const p = document.createElement("p");
            p.textContent = user.email;
            info.append(h3, p);

            const actions = document.createElement("div");
            actions.className = "card-actions";
            const editBtn = document.createElement("button");
            editBtn.className = "btn btn-edit";
            editBtn.textContent = "Sửa";
            editBtn.dataset.action = "edit";

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn btn-delete";
            deleteBtn.textContent = "Xóa";
            deleteBtn.dataset.action = "delete";

            actions.append(editBtn, deleteBtn);
            card.append(info, actions);
            this.userGrid.appendChild(card);
        });
    },

    showLoading() {
        this.userGrid.textContent = "";
        for (let i = 0; i < 4; i++) {
            const skeleton = document.createElement("div");
            skeleton.className = "skeleton-card";
            this.userGrid.appendChild(skeleton);
        }
    },

    showToast(message, type) {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        this.toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },

    showError(msg) { this.showToast(msg, "error"); },
    showSuccess(msg) { this.showToast(msg, "success"); },

    fillForm(user) {
        this.formTitle.textContent = "Cập Nhật Người Dùng";
        this.userIdInput.value = user.id;
        this.nameInput.value = user.name;
        this.emailInput.value = user.email;
        this.cancelBtn.classList.remove("hidden");
    },

    resetForm() {
        this.form.reset();
        this.userIdInput.value = "";
        this.formTitle.textContent = "Thêm Người Dùng Mới";
        this.cancelBtn.classList.add("hidden");
    }
};

// --- 3. STATE MANAGEMENT & CONTROLLER ---
let localUsers = [];

// Tải dữ liệu ban đầu
async function loadInitialData() {
    ui.showLoading();
    try {
        localUsers = await api.getUsers();
        ui.renderUsers(localUsers);
    } catch (err) {
        ui.showError("Không thể tải danh sách người dùng.");
    }
}

// Xử lý Submit Form (Create / Update)
ui.form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = ui.userIdInput.value;
    const userData = { name: ui.nameInput.value.trim(), email: ui.emailInput.value.trim() };

    try {
        if (id) {
            // Thực thi UPDATE (PUT)
            const updatedUser = await api.updateUser(id, userData);
            // Cập nhật mảng client-side (JSONPlaceholder trả về id dạng string hoặc số tùy cơ chế)
            localUsers = localUsers.map(u => String(u.id) === String(id) ? { ...u, ...updatedUser, id: Number(id) } : u);
            ui.showSuccess("Cập nhật thành viên thành công!");
        } else {
            // Thực thi CREATE (POST)
            const newUser = await api.createUser(userData);
            // Giả lập ID duy nhất ở client vì API luôn trả về id: 11
            newUser.id = localUsers.length > 0 ? Math.max(...localUsers.map(u => u.id)) + 1 : 1;
            localUsers.unshift(newUser);
            ui.showSuccess("Thêm thành viên thành công!");
        }
        ui.renderUsers(localUsers);
        ui.resetForm();
    } catch (err) {
        ui.showError("Thao tác thất bại. Vui lòng thử lại.");
    }
});

// Xử lý Sự kiện trên Danh sách (Event Delegation cho nút Edit / Delete)
ui.userGrid.addEventListener("click", async (e) => {
    const action = e.target.dataset.action;
    if (!action) return;

    const card = e.target.closest(".user-card");
    const id = Number(card.dataset.id);

    if (action === "edit") {
        const user = localUsers.find(u => u.id === id);
        if (user) ui.fillForm(user);
    } 
    
    if (action === "delete") {
        if (confirm("Bạn có chắc chắn muốn xóa thành viên này khỏi hệ thống không?")) {
            try {
                await api.deleteUser(id);
                localUsers = localUsers.filter(u => u.id !== id);
                ui.renderUsers(localUsers);
                ui.showSuccess("Đã xóa thành viên thành công.");
                if (String(ui.userIdInput.value) === String(id)) ui.resetForm();
            } catch (err) {
                ui.showError("Không thể xóa thành viên vào lúc này.");
            }
        }
    }
});

// Tìm kiếm thời gian thực (Client-side search)
document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = localUsers.filter(u => 
        u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
    );
    ui.renderUsers(filtered);
});

// Bấm nút Hủy bỏ chế độ sửa
ui.cancelBtn.addEventListener("click", () => ui.resetForm());

// Khởi động
loadInitialData();