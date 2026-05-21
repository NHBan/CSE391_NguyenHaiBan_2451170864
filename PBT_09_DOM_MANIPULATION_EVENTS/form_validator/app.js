
const form = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');

const successModal = document.getElementById('successModal');
const modalData = document.getElementById('modalData');
const closeModalBtn = document.getElementById('closeModalBtn');

const fieldsValid = { name: false, email: false, password: false, confirm: false, phone: false };

const setStatus = (inputEl, isValid) => {
    const group = inputEl.closest('.form-group');
    if (isValid) {
        group.classList.remove('invalid');
        group.classList.add('valid');
    } else {
        group.classList.remove('valid');
        group.classList.add('invalid');
    }
};
const checkFormValidity = () => {
    const isFormValid = Object.values(fieldsValid).every(status => status === true);
    submitBtn.disabled = !isFormValid;
};
nameInput.addEventListener('input', () => {
    const val = nameInput.value.trim();
    const isValid = val.length >= 2 && val.length <= 50;
    const badge = nameInput.closest('.form-group').querySelector('.badge');
    
    setStatus(nameInput, isValid);
    badge.textContent = isValid ? "✅" : "❌";
    fieldsValid.name = isValid;
    checkFormValidity();
});
emailInput.addEventListener('input', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(emailInput.value.trim());
    
    setStatus(emailInput, isValid);
    fieldsValid.email = isValid;
    checkFormValidity();
});
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    const meter = passwordInput.closest('.form-group').querySelector('.strength-meter');
    const stBar = passwordInput.closest('.form-group').querySelector('.strength-bar');
    const stText = passwordInput.closest('.form-group').querySelector('.strength-text');
    
    if (val.length === 0) {
        meter.style.display = 'none';
        stText.style.display = 'none';
        passwordInput.closest('.form-group').classList.remove('valid', 'invalid');
        fieldsValid.password = false;
        return;
    }

    meter.style.display = 'block';
    stText.style.display = 'block';

    let score = 0;
    if (val.length >= 8) {
        const hasChar = /[a-zA-Z]/.test(val);
        const hasNum = /[0-9]/.test(val);
        const hasLower = /[a-z]/.test(val);
        const hasUpper = /[A-Z]/.test(val);
        const hasSpecial = /[^a-zA-Z0-9]/.test(val);

        if (hasChar && hasNum) score = 1;
        if (hasLower && hasUpper && hasNum && hasSpecial) score = 2; 
    }
    if (score === 0) {
        stBar.style.width = '33%';
        stBar.style.backgroundColor = '#e74c3c'; // Đỏ
        stText.textContent = 'Mật khẩu yếu (Phải từ 8 ký tự trở lên)';
        stText.style.color = '#e74c3c';
        setStatus(passwordInput, false);
        fieldsValid.password = false;
    } else if (score === 1) {
        stBar.style.width = '66%';
        stBar.style.backgroundColor = '#f1c40f'; // Vàng
        stText.textContent = 'Mật khẩu trung bình (Cần thêm chữ hoa và ký tự đặc biệt)';
        stText.style.color = '#f1c40f';
        setStatus(passwordInput, true);
        fieldsValid.password = true;
    } else {
        stBar.style.width = '100%';
        stBar.style.backgroundColor = '#2ecc71'; // Xanh lá
        stText.textContent = 'Mật khẩu mạnh tuyệt đối!';
        stText.style.color = '#2ecc71';
        setStatus(passwordInput, true);
        fieldsValid.password = true;
    }
    confirmPasswordInput.dispatchEvent(new Event('input'));
    checkFormValidity();
});
confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.value === "") {
        confirmPasswordInput.closest('.form-group').classList.remove('valid', 'invalid');
        fieldsValid.confirm = false;
        return;
    }
    const isValid = confirmPasswordInput.value === passwordInput.value && fieldsValid.password;
    setStatus(confirmPasswordInput, isValid);
    fieldsValid.confirm = isValid;
    checkFormValidity();
});

phoneInput.addEventListener('input', (e) => {
    let num = e.target.value.replace(/\D/g, '');
    if (num.length > 4 && num.length <= 7) {
        num = `${num.slice(0, 4)}-${num.slice(4)}`;
    } else if (num.length > 7) {
        num = `${num.slice(0, 4)}-${num.slice(4, 7)}-${num.slice(7, 10)}`;
    }
    e.target.value = num;

    // Check độ dài hợp lệ (Đủ 10 số gốc tương ứng 12 ký tự gồm 2 dấu gạch)
    const isValid = num.replace(/-/g, '').length === 10;
    setStatus(phoneInput, isValid);
    fieldsValid.phone = isValid;
    checkFormValidity();
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    modalData.innerHTML = `
        <p><strong>Họ và tên:</strong> ${nameInput.value.trim()}</p>
        <p><strong>Email:</strong> ${emailInput.value.trim()}</p>
        <p><strong>Số điện thoại:</strong> ${phoneInput.value}</p>
    `;
    successModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
    form.reset();
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('valid', 'invalid');
        const badge = group.querySelector('.badge');
        if(badge) badge.textContent = '';
        const meter = group.querySelector('.strength-meter');
        if(meter) meter.style.display = 'none';
        const stText = group.querySelector('.strength-text');
        if(stText) stText.style.display = 'none';
    });

    Object.keys(fieldsValid).forEach(k => fieldsValid[k] = false);
    submitBtn.disabled = true;
});