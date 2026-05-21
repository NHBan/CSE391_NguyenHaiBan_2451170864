
function pipe(...fns) {
    return (initialValue) => fns.reduce((value, fn) => fn(value), initialValue);
}

const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log(process(5)); // → "Kết quả: 20"
function memoize(fn) {
    const cache = {};
    return function (...args) {
        // Dùng JSON.stringify để tạo key duy nhất từ các tham số truyền vào
        const key = JSON.stringify(args); 
        if (cache[key] !== undefined) {
            return cache[key];
        }
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000)); // → "Đang tính..." → 499999500000
console.log(expensiveCalc(1000000)); // → (không in "Đang tính...", lấy cache!)
function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId); 
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn(); 
        } catch (error) {
            if (attempt === maxAttempts) throw error; 
            console.log(`Lỗi lần ${attempt}. Đang thử lại...`);
        }
    }
}