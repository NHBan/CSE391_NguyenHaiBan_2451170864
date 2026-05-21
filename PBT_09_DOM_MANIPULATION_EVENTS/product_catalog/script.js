
const products = [
    { id: 1, name: "iPhone 16 Pro Max", price: 34990000, category: "phone", image: "https://picsum.photos/id/160/300/300", rating: 4.9 },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 29990000, category: "phone", image: "https://picsum.photos/id/0/300/300", rating: 4.8 },
    { id: 3, name: "Google Pixel 9 Pro", price: 24500000, category: "phone", image: "https://picsum.photos/id/119/300/300", rating: 4.7 },
    { id: 4, name: "MacBook Pro M3 14\"", price: 39990000, category: "laptop", image: "https://picsum.photos/id/180/300/300", rating: 4.9 },
    { id: 5, name: "Dell XPS 15 9530", price: 42000000, category: "laptop", image: "https://picsum.photos/id/48/300/300", rating: 4.5 },
    { id: 6, name: "Lenovo ThinkPad X1 Carbon", price: 36500000, category: "laptop", image: "https://picsum.photos/id/60/300/300", rating: 4.6 },
    { id: 7, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://picsum.photos/id/96/300/300", rating: 4.8 },
    { id: 8, name: "Samsung Galaxy Tab S9", price: 17990000, category: "tablet", image: "https://picsum.photos/id/367/300/300", rating: 4.4 },
    { id: 9, name: "Xiaomi Pad 6 Pro", price: 8490000, category: "tablet", image: "https://picsum.photos/id/3Smartphone/300/300", rating: 4.3 },
    { id: 10, name: "Sony WH-1000XM5", price: 6490000, category: "accessory", image: "https://picsum.photos/id/209/300/300", rating: 4.7 },
    { id: 11, name: "Apple Watch Ultra 2", price: 21490000, category: "accessory", image: "https://picsum.photos/id/210/300/300", rating: 4.9 },
    { id: 12, name: "Keychron K2 Mechanical Keyboard", price: 18500000, category: "accessory", image: "https://picsum.photos/id/366/300/300", rating: 4.6 }
];

const state = {
    searchQuery: "",
    selectedCategory: "all",
    sortType: "default",
    cartCount: 0
};

const app = document.getElementById("app");

// Tạo Header
const header = document.createElement("header");
const title = document.createElement("h1");
title.textContent = "3N Store";

const controls = document.createElement("div");
controls.className = "controls";

const searchInput = document.createElement("input");
searchInput.id = "searchInput";
searchInput.type = "text";
searchInput.placeholder = "Tìm sản phẩm...";

const sortSelect = document.createElement("select");
sortSelect.id = "sortSelect";
const sortOptions = [
    { val: "default", text: "Sắp xếp mặc định" },
    { val: "price-asc", text: "Giá tăng dần" },
    { val: "price-desc", text: "Giá giảm dần" },
    { val: "name-az", text: "Tên A -> Z" },
    { val: "rating-desc", text: "Đánh giá cao nhất" }
];
sortOptions.forEach(opt => {
    const o = document.createElement("option");
    o.value = opt.val;
    o.textContent = opt.text;
    sortSelect.appendChild(o);
});

const themeBtn = document.createElement("button");
themeBtn.className = "btn";
themeBtn.textContent = "🌓 Dark Mode";

const cartIcon = document.createElement("div");
cartIcon.className = "cart-icon";
cartIcon.textContent = "🛒";
const cartBadge = document.createElement("span");
cartBadge.className = "badge";
cartBadge.textContent = "0";
cartIcon.appendChild(cartBadge);

controls.append(searchInput, sortSelect, themeBtn, cartIcon);
header.append(title, controls);

const nav = document.createElement("nav");
nav.className = "categories";
const cats = ["all", "phone", "laptop", "tablet", "accessory"];
cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `btn ${cat === "all" ? "active" : ""}`;
    btn.dataset.category = cat;
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    nav.appendChild(btn);
});


const productGrid = document.createElement("main");
productGrid.className = "product-grid";


app.append(header, nav, productGrid);
const formatPrice = (num) => num.toLocaleString("vi-VN") + "đ";
function renderProducts(productsList) {
    productGrid.textContent = ""; //

    if (productsList.length === 0) {
        const noProduct = document.createElement("p");
        noProduct.textContent = "Không tìm thấy sản phẩm phù hợp.";
        noProduct.style.gridColumn = "1/-1";
        noProduct.style.textAlign = "center";
        productGrid.appendChild(noProduct);
        return;
    }

    productsList.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        const img = document.createElement("img");
        img.className = "product-img";
        img.src = p.image;
        img.alt = p.name;
        img.loading = "lazy";

        const name = document.createElement("h3");
        name.className = "product-name";
        name.textContent = p.name;

        const infoDiv = document.createElement("div");
        infoDiv.className = "product-info";
        const price = document.createElement("span");
        price.className = "price";
        price.textContent = formatPrice(p.price);
        const rating = document.createElement("span");
        rating.className = "rating";
        rating.textContent = `⭐ ${p.rating}`;
        infoDiv.append(price, rating);

        const addBtn = document.createElement("button");
        addBtn.className = "btn btn-primary";
        addBtn.textContent = "Thêm vào giỏ";
        addBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            state.cartCount++;
            cartBadge.textContent = state.cartCount;
        });
        card.addEventListener("click", () => openModal(p));

        card.append(img, name, infoDiv, addBtn);
        productGrid.appendChild(card);
    });
}

function filterAndSortProducts() {
    let result = [...products];

    // 1. Lọc theo danh mục (Category)
    if (state.selectedCategory !== "all") {
        result = result.filter(p => p.category === state.selectedCategory);
    }

    if (state.searchQuery) {
        const key = state.searchQuery.toLowerCase();
        result = result.filter(p => p.name.toLowerCase().includes(key));
    }


    if (state.sortType === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (state.sortType === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (state.sortType === "name-az") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (state.sortType === "rating-desc") result.sort((a, b) => b.rating - a.rating);

    renderProducts(result);
}


function openModal(product) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-modal";
    closeBtn.innerHTML = "&times;";
    
    const mTitle = document.createElement("h2");
    mTitle.textContent = product.name;

    const mImg = document.createElement("img");
    mImg.className = "modal-img";
    mImg.src = product.image;

    const mDesc = document.createElement("p");
    mDesc.textContent = `Sản phẩm dòng cao cấp thuộc danh mục ${product.category}. Thiết kế sang trọng, cấu hình hàng đầu thị trường, cam kết chính hãng 100%.`;
    mDesc.style.margin = "10px 0";

    const mInfo = document.createElement("div");
    mInfo.style.display = "flex";
    mInfo.style.justifyContent = "space-between";
    mInfo.innerHTML = `<strong>Giá: <span class="price">${formatPrice(product.price)}</span></strong> <span>Đánh giá: ⭐ ${product.rating}</span>`;

    content.append(closeBtn, mTitle, mImg, mDesc, mInfo);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    const closeModal = () => overlay.remove();
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });
}

searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.trim();
    filterAndSortProducts();
});

// Thay đổi Sort Dropdown
sortSelect.addEventListener("change", (e) => {
    state.sortType = e.target.value;
    filterAndSortProducts();
});

nav.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        nav.querySelector(".btn.active").classList.remove("active");
        e.target.classList.add("active");
        
        state.selectedCategory = e.target.dataset.category;
        filterAndSortProducts();
    }
});
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

renderProducts(products);