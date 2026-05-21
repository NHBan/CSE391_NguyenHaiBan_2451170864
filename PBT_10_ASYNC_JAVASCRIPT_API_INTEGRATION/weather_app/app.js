
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const historyTags = document.getElementById("historyTags");

const stateLoading = document.getElementById("stateLoading");
const stateError = document.getElementById("stateError");
const stateSuccess = document.getElementById("stateSuccess");
const errorText = document.getElementById("errorText");
const wCity = document.getElementById("wCity");
const wIcon = document.getElementById("wIcon");
const wTemp = document.getElementById("wTemp");
const wDesc = document.getElementById("wDesc");
const wHumidity = document.getElementById("wHumidity");
const wWind = document.getElementById("wWind");
const weatherCodeMap = {
    0: { icon: "☀️", desc: "Trời quang mây tạnh" },
    1: { icon: "🌤️", desc: "Ít mây" },
    2: { icon: "⛅", desc: "Mây rải rác" },
    3: { icon: "☁️", desc: "Nhiều mây" },
    45: { icon: "🌫️", desc: "Có sương mù" },
    48: { icon: "🌫️", desc: "Sương mù đóng băng" },
    51: { icon: "🌧️", desc: "Mưa phùn nhẹ" },
    61: { icon: "🌧️", desc: "Mưa rào nhẹ" },
    63: { icon: "🌧️", desc: "Mưa vừa" },
    65: { icon: "🌧️", desc: "Mưa rất to" },
    71: { icon: "❄️", desc: "Tuyết rơi nhẹ" },
    80: { icon: "🌦️", desc: "Mưa rào dông nhẹ" },
    95: { icon: "⛈️", desc: "Có dông bão" }
};

let searchHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
function switchState(activeState) {
    stateLoading.classList.add("hidden");
    stateError.classList.add("hidden");
    stateSuccess.classList.add("hidden");

    if (activeState) activeState.classList.remove("hidden");
}
function renderHistory() {
    historyTags.textContent = "";
    searchHistory.forEach(city => {
        const tag = document.createElement("span");
        tag.className = "hist-tag";
        tag.textContent = city;
        // Sự kiện: Click vào lịch sử -> Tìm lại thành phố đó
        tag.addEventListener("click", () => fetchWeatherData(city));
        historyTags.appendChild(tag);
    });
}

function saveCityToHistory(city) {
    const cityNameInKey = city.trim();
    searchHistory = searchHistory.filter(c => c.toLowerCase() !== cityNameInKey.toLowerCase());
    searchHistory.unshift(cityNameInKey); 
    
    if (searchHistory.length > 5) searchHistory.pop();
    
    localStorage.setItem("weatherHistory", JSON.stringify(searchHistory));
    renderHistory();
}

async function fetchWeatherData(cityName) {
    if (!cityName) return;
    switchState(stateLoading);

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) throw new Error("Lỗi kết nối máy chủ dữ liệu vị trí.");
        
        const geoData = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`Không tìm thấy thành phố nào có tên "${cityName}".`);
        }

        const { latitude, longitude, name, country } = geoData.results[0];
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) throw new Error("Lỗi kết nối máy chủ dữ liệu thời tiết.");
        
        const weatherData = await weatherResponse.json();
        const current = weatherData.current;
        wCity.textContent = `${name}, ${country}`;
        wTemp.textContent = `${Math.round(current.temperature_2m)}°C`;
        wHumidity.textContent = `${current.relative_humidity_2m}%`;
        wWind.textContent = `${current.wind_speed_10m} km/h`;
        const matchedWeather = weatherCodeMap[current.weather_code] || { icon: "☁️", desc: "Mây u ám" };
        wIcon.textContent = matchedWeather.icon;
        wDesc.textContent = matchedWeather.desc;
        saveCityToHistory(name);
        switchState(stateSuccess);

    } catch (error) {
        if (!navigator.onLine) {
            errorText.textContent = "Mất kết nối mạng Internet. Vui lòng kiểm tra lại thiết bị.";
        } else {
            errorText.textContent = error.message || "Không thể tải dữ liệu. Vui lòng thử lại sau.";
        }
        switchState(stateError);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const targetCity = cityInput.value.trim();
    if (targetCity) {
        fetchWeatherData(targetCity);
        cityInput.value = "";
    }
});

renderHistory();

fetchWeatherData("Hanoi");