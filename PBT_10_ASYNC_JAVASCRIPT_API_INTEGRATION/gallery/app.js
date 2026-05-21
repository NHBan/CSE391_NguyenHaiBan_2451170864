// --- 1. CẤU HÌNH TRẠNG THÁI (STATE) ---
const CONFIG = {
    limit: 20,
    apiBase: "https://picsum.photos/v2/list"
};

const state = {
    page: 1,
    isLoading: false,
    hasMore: true
};

// --- 2. ĐỐI TƯỢNG DOM ---
const galleryGrid = document.getElementById("galleryGrid");
const loadTrigger = document.getElementById("loadTrigger");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close-btn");

// --- 3. INTERSECTION OBSERVERS (TỐI ƯU HIỆU NĂNG) ---

// A. Observer chịu trách nhiệm Lazy Load từng ảnh đơn lẻ
const imageLazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Chuyển link ảnh thực từ data-src sang src để kích hoạt trình duyệt tải về
            img.src = img.dataset.src;
            
            img.addEventListener("load", () => {
                img.classList.add("loaded");
                img.closest(".photo-card").classList.remove("placeholder");
            });

            // Ngừng quan sát ảnh này vì nó đã được load xong
            observer.unobserve(img);
        }
    });
}, { rootMargin: "0px 0px 200px 0px" }); // Load trước khi ảnh hiện vào tầm mắt 200px

// B. Observer chịu trách nhiệm Infinite Scroll ở đáy trang
const infiniteScrollObserver = new IntersectionObserver((entries) => {
    // Nếu điểm kích hoạt lọt vào viewport VÀ hệ thống không bận loading
    if (entries[0].isIntersecting && !state.isLoading && state.hasMore) {
        loadMorePhotos();
    }
}, { threshold: 0.1 });

// --- 4. HÀM CORE TRUY VẤN & XỬ LÝ LÔGIC ---

async function loadMorePhotos() {
    state.isLoading = true;
    loadTrigger.classList.remove("hidden");

    try {
        const response = await fetch(`${CONFIG.apiBase}?page=${state.page}&limit=${CONFIG.limit}`);
        if (!response.ok) throw new Error("Lỗi tải dữ liệu hình ảnh.");

        const photos = await response.json();

        // Nếu API trả về mảng rỗng -> Hết ảnh để tải
        if (photos.length === 0) {
            state.hasMore = false;
            loadTrigger.innerHTML = "<p>🎉 Bạn đã xem hết tất cả hình ảnh!</p>";
            infiniteScrollObserver.unobserve(loadTrigger);
            return;
        }

        renderPhotos(photos);
        state.page++; // Tăng trang phục vụ lần scroll kế tiếp

    } catch (error) {
        console.error(error.message);
        // Hiển thị thông báo lỗi tạm thời dưới đáy thay vì crash app
        const errText = loadTrigger.querySelector("p");
        if (errText) errText.textContent = "Lỗi kết nối mạng. Đang đợi thử lại...";
    } finally {
        state.isLoading = false;
    }
}

function renderPhotos(photoList) {
    photoList.forEach(photo => {
        // Tạo khung thẻ Card (Đặt sẵn trạng thái placeholder tạo hiệu ứng xương nhấp nháy)
        const card = document.createElement("div");
        card.className = "photo-card placeholder";

        const img = document.createElement("img");
        img.alt = `Photo by ${photo.author}`;
        
        // CẤU HÌNH LAZY LOAD: Lưu URL ảnh gốc vào `data-src`, dùng ảnh base64 siêu nhẹ làm đệm
        img.dataset.src = `https://picsum.photos/id/${photo.id}/400/400`;
        img.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'></svg>";

        // Lưu đường dẫn ảnh size lớn dùng riêng khi bật Lightbox Modal
        card.dataset.bigSrc = `https://picsum.photos/id/${photo.id}/1000/800`;

        card.appendChild(img);
        galleryGrid.appendChild(card);

        // Đưa ảnh vào danh sách giám sát của Lazy Load Observer
        imageLazyObserver.observe(img);
    });
}

// --- 5. HỆ THỐNG LIGHTBOX MODAL EVENT ---

// Ủy quyền sự kiện (Event Delegation) click trên toàn bộ lưới Grid
galleryGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".photo-card");
    if (!card) return;

    const bigUrl = card.dataset.bigSrc;
    lightboxImg.src = bigUrl;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
});

const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = ""; // Clear để tối ưu bộ nhớ
};

closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Hỗ trợ phím Escape đóng nhanh modal
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
    }
});

// --- 6. KHỞI CHẠY ---
// Kích hoạt theo dõi thẻ trigger ở đáy trang để bắt đầu tự động chuỗi tải ảnh đầu tiên
infiniteScrollObserver.observe(loadTrigger);