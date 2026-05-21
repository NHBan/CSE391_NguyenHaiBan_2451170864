// --- 1. ĐỊNH NGHĨA CÁC ĐƯỜNG DẪN ENDPOINTS ---
const API_ENDPOINTS = [
    "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current=temperature_2m,relative_humidity_2m",
    "https://restcountries.com/v3.1/name/vietnam",
    "https://dog.ceo/api/breeds/image/random/4"
];

// --- 2. ĐỐI TƯỢNG DOM ---
const refreshBtn = document.getElementById("refreshBtn");
const performanceMetric = document.getElementById("performanceMetric");

// --- 3. CORE FUNCTION: TẢI SONG SONG MULTI-APIS ---
async function loadDashboard() {
    const startTime = Date.now();
    
    // Đưa toàn bộ các Widget về trạng thái loading cục bộ riêng biệt
    for (let i = 0; i < API_ENDPOINTS.length; i++) {
        showWidgetLoading(i);
    }

    try {
        // Gọi lệnh SONG SONG đồng loạt 3 đường link bằng phương thức cọc định độc lập
        const results = await Promise.allSettled(
            API_ENDPOINTS.map(url => fetch(url).then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            }))
        );

        // Duyệt qua mảng kết quả trả về để phân bổ cấu trúc render
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                renderWidget(index, result.value);
            } else {
                // Một API chết không ảnh hưởng đến API còn lại nhờ cơ chế allSettled
                renderWidgetError(index, result.reason.message);
            }
        });

        // Tính toán và hiển thị tốc độ phản hồi mạng
        const duration = Date.now() - startTime;
        performanceMetric.textContent = `⚡ Dữ liệu đồng bộ hoàn tất trong: ${duration} ms`;

    } catch (criticalError) {
        // Khối catch này phòng hờ lỗi logic lập trình tổng thể ngoài ý muốn
        console.error("Lỗi cấu trúc Dashboard:", criticalError);
    }
}

// --- 4. CÁC HÀM XỬ LÝ HIỂN THỊ TRẠNG THÁI (UI STATES LAYER) ---

function showWidgetLoading(index) {
    const container = document.querySelector(`#widget-${index} .widget-content`);
    container.textContent = ""; // Clear dữ liệu cũ

    const loader = document.createElement("div");
    loader.className = "widget-loading";
    const spinner = document.createElement("div");
    spinner.className = "spinner";
    const text = document.createElement("p");
    text.textContent = "Đang đồng bộ dữ liệu...";

    loader.append(spinner, text);
    container.appendChild(loader);
}

function renderWidgetError(index, errorMessage) {
    const container = document.querySelector(`#widget-${index} .widget-content`);
    container.textContent = "";

    const errBox = document.createElement("div");
    errBox.className = "widget-error";
    errBox.innerHTML = `⚠️ <strong>Lỗi kết nối API:</strong><br>${errorMessage}`;
    
    container.appendChild(errBox);
}

// Hàm điều phối xử lý định dạng cấu trúc dữ liệu thô nhận về từ các nguồn khác nhau
function renderWidget(index, data) {
    const container = document.querySelector(`#widget-${index} .widget-content`);
    container.textContent = ""; // Tắt hiệu ứng loading

    // Tùy theo chỉ số index của mảng hằng số API_ENDPOINTS để cấu trúc DOM methods
    if (index === 0) {
        // Xử lý dữ liệu khí tượng Open-Meteo
        const div = document.createElement("div");
        div.className = "weather-info";
        div.innerHTML = `
            <p>Vùng thành phố: <span>Hà Nội</span></p>
            <p class="big-text">${Math.round(data.current.temperature_2m)}°C</p>
            <p>💧 Độ ẩm không khí: <span>${data.current.relative_humidity_2m}%</span></p>
        `;
        container.appendChild(div);
    } 
    else if (index === 1) {
        // Xử lý dữ liệu Quốc gia REST Countries
        const country = data[0];
        const div = document.createElement("div");
        div.className = "country-info";
        div.innerHTML = `
            <p>Tên chính thức: <span>${country.name.official}</span></p>
            <p>🏛️ Thủ đô: <span>${country.capital[0]}</span></p>
            <p>👥 Dân số: <span>${country.population.toLocaleString("vi-VN")} người</span></p>
            <p>🌍 Châu lục: <span>${country.region}</span></p>
        `;
        container.appendChild(div);
    } 
    else if (index === 2) {
        // Xử lý mảng link ảnh từ Dog API
        const grid = document.createElement("div");
        grid.className = "dog-gallery";
        
        data.message.forEach(imgUrl => {
            const img = document.createElement("img");
            img.className = "dog-img";
            img.src = imgUrl;
            img.alt = "Ảnh cún con dễ thương";
            img.loading = "lazy";
            grid.appendChild(img);
        });
        container.appendChild(grid);
    }
}

// --- 5. ĐĂNG KÝ SỰ KIỆN NÚT BẤM ---
refreshBtn.addEventListener("click", loadDashboard);

// --- 6. KHỞI CHẠY LẦN ĐẦU ---
loadDashboard();