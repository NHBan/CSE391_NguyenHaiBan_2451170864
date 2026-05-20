// restaurant_bill.js

const foods = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];


const useTip = true;


const today = "Wednesday";



function formatMoney(number) {
    return number.toLocaleString("vi-VN") + "đ";
}



let subtotal = 0;

foods.forEach(food => {
    subtotal += food.price * food.quantity;
});


let discountPercent = 0;


if (subtotal > 1000000) {
    discountPercent += 15;
}
else if (subtotal > 500000) {
    discountPercent += 10;
}


if (today === "Wednesday") {
    discountPercent += 5;
}

const discount = subtotal * discountPercent / 100;


const afterDiscount = subtotal - discount;

const vat = afterDiscount * 0.08;



let tip = 0;

if (useTip) {
    tip = afterDiscount * 0.05;
}


const finalTotal = afterDiscount + vat + tip;



console.log("╔════════════════════════════════════════════╗");
console.log("║             HÓA ĐƠN NHÀ HÀNG             ║");
console.log("╠════════════════════════════════════════════╣");

foods.forEach((food, index) => {

    const total = food.price * food.quantity;

    console.log(
        `║ ${index + 1}. ${food.name.padEnd(12)} x${food.quantity} ` +
        `@${(food.price / 1000)}k = ${(total / 1000)}k`.padEnd(20) +
        "║"
    );

});

console.log("╠════════════════════════════════════════════╣");

console.log(
    `║ Tổng cộng:           ${formatMoney(subtotal).padStart(16)} ║`
);

console.log(
    `║ Giảm giá (${discountPercent}%): ${formatMoney(discount).padStart(16)} ║`
);

console.log(
    `║ VAT (8%):            ${formatMoney(vat).padStart(16)} ║`
);

console.log(
    `║ Tip (5%):            ${formatMoney(tip).padStart(16)} ║`
);

console.log("╠════════════════════════════════════════════╣");

console.log(
    `║ THANH TOÁN:          ${formatMoney(finalTotal).padStart(16)} ║`
);

console.log("╚════════════════════════════════════════════╝");