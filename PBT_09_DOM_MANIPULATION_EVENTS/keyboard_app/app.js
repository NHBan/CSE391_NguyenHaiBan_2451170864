
const images = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/id/${i + 10}/800/500`,
    thumb: `https://picsum.photos/id/${i + 10}/100/100`,
    alt: `Bức ảnh thiên nhiên thứ ${i + 1}`
}));
const commands = [
    { id: "next", text: "Chuyển đến ảnh kế tiếp", shortcut: "→", action: () => changeImage(state.currentIndex + 1) },
    { id: "prev", text: "Quay lại ảnh phía trước", shortcut: "←", action: () => changeImage(state.currentIndex - 1) },
    { id: "toggle-slide", text: "Bật/Tắt slideshow tự động", shortcut: "Space", action: () => toggleSlideshow() },
    { id: "theme", text: "Thay đổi giao diện Sáng / Tối", shortcut: "", action: () => document.body.classList.toggle("dark-theme") },
    { id: "reset", text: "Quay về ảnh đầu tiên (Số 1)", shortcut: "1", action: () => changeImage(0) }
];

const state = {
    currentIndex: 0,
    isSlideshowRunning: false,
    slideshowInterval: null,
    paletteOpen: false,
    selectedCommandIndex: 0,
    filteredCommands: [...commands]
};
const mainViewer = document.getElementById("mainViewer");
const activeImg = document.getElementById("activeImg");
const slideshowBadge = document.getElementById("slideshowBadge");
const imgIndexBadge = document.getElementById("imgIndexBadge");
const thumbList = document.getElementById("thumbList");

const commandPalette = document.getElementById("commandPalette");
const paletteInput = document.getElementById("paletteInput");
const commandList = document.getElementById("commandList");

let lastFocusedElement = null; 
function initGallery() {
    thumbList.innerHTML = "";
    images.forEach((img, idx) => {
        const thumb = document.createElement("img");
        thumb.src = img.thumb;
        thumb.alt = `Thu nhỏ: ${img.alt}`;
        thumb.className = `thumb-item ${idx === 0 ? "active" : ""}`;
        thumb.setAttribute("role", "option");
        thumb.setAttribute("aria-selected", idx === 0 ? "true" : "false");
        
        thumb.addEventListener("click", () => {
            changeImage(idx);
            mainViewer.focus();
        });
        thumbList.appendChild(thumb);
    });
    updateViewer();
}

function updateViewer() {
    const currentImg = images[state.currentIndex];
    activeImg.src = currentImg.url;
    activeImg.alt = currentImg.alt;
    imgIndexBadge.textContent = `${state.currentIndex + 1} / ${images.length}`;
    const thumbs = thumbList.querySelectorAll(".thumb-item");
    thumbs.forEach((t, idx) => {
        if (idx === state.currentIndex) {
            t.classList.add("active");
            t.setAttribute("aria-selected", "true");
        } else {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
        }
    });
}

function changeImage(index) {
    if (index >= images.length) state.currentIndex = 0;
    else if (index < 0) state.currentIndex = images.length - 1; 
    else state.currentIndex = index;
    updateViewer();
}

function toggleSlideshow() {
    if (state.isSlideshowRunning) {
        clearInterval(state.slideshowInterval);
        slideshowBadge.textContent = "Slideshow: Tắt";
        state.isSlideshowRunning = false;
    } else {
        slideshowBadge.textContent = "Slideshow: Đang Chạy ⏳";
        state.isSlideshowRunning = true;
        state.slideshowInterval = setInterval(() => {
            changeImage(state.currentIndex + 1);
        }, 2500);
    }
}
document.addEventListener("keydown", (e) => {
    // A. Bắt tổ hợp phím tắt mở Command Palette (Ctrl + K)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPalette();
        return;
    }
    if (state.paletteOpen) {
        handlePaletteKeydown(e);
        return;
    }
    if (document.activeElement === mainViewer) {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            changeImage(state.currentIndex + 1);
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            changeImage(state.currentIndex - 1);
        }
        if (e.key === " ") {
            e.preventDefault();
            toggleSlideshow();
        }
       
        if (e.key >= "1" && e.key <= "9") {
            e.preventDefault();
            changeImage(Number(e.key) - 1);
        }
    }
});


function openPalette() {
    lastFocusedElement = document.activeElement; 
    state.paletteOpen = true;
    commandPalette.setAttribute("aria-hidden", "false");
    paletteInput.value = "";
    state.selectedCommandIndex = 0;
    filterCommands();
    paletteInput.focus(); 
}

function closePalette() {
    state.paletteOpen = false;
    commandPalette.setAttribute("aria-hidden", "true");
    if (lastFocusedElement) lastFocusedElement.focus(); 
}

function filterCommands() {
    const query = paletteInput.value.trim().toLowerCase();
    state.filteredCommands = commands.filter(cmd => 
        cmd.text.toLowerCase().includes(query)
    );
    state.selectedCommandIndex = 0;
    renderPaletteList();
}

function renderPaletteList() {
    commandList.textContent = "";
    if (state.filteredCommands.length === 0) {
        const noResult = document.createElement("li");
        noResult.className = "command-item";
        noResult.textContent = "Không tìm thấy lệnh nào...";
        commandList.appendChild(noResult);
        return;
    }

    state.filteredCommands.forEach((cmd, idx) => {
        const li = document.createElement("li");
        li.className = `command-item ${idx === state.selectedCommandIndex ? "selected" : ""}`;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", idx === state.selectedCommandIndex ? "true" : "false");
        
        const textSpan = document.createElement("span");
        textSpan.textContent = cmd.text;

        const shortcutSpan = document.createElement("span");
        shortcutSpan.className = "command-shortcut";
        shortcutSpan.textContent = cmd.shortcut;

        li.append(textSpan, shortcutSpan);
        li.addEventListener("click", () => {
            cmd.action();
            closePalette();
        });
        commandList.appendChild(li);
    });
}

function handlePaletteKeydown(e) {
    if (e.key === "Escape") {
        e.preventDefault();
        closePalette();
    }
    else if (e.key === "ArrowDown") {
        e.preventDefault();
        state.selectedCommandIndex = (state.selectedCommandIndex + 1) % state.filteredCommands.length;
        renderPaletteList();
    }
    else if (e.key === "ArrowUp") {
        e.preventDefault();
        state.selectedCommandIndex = (state.selectedCommandIndex - 1 + state.filteredCommands.length) % state.filteredCommands.length;
        renderPaletteList();
    }
    else if (e.key === "Enter") {
        e.preventDefault();
        const activeCommand = state.filteredCommands[state.selectedCommandIndex];
        if (activeCommand) {
            activeCommand.action();
            closePalette();
        }
    }
}
paletteInput.addEventListener("input", filterCommands);


initGallery();
mainViewer.focus();