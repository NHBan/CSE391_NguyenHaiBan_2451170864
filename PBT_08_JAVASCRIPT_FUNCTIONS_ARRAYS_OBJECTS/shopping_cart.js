function createCart() {
    let items = [];
    let currentDiscount = "";
    const formatVND = (num) => num.toLocaleString("vi-VN");
    return {
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);
            if (item) {
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = newQuantity;
                }
            }
        },
        getTotal() {
            let subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            switch (currentDiscount) {
                case "SALE10": subtotal *= 0.9; break;
                case "SALE20": subtotal *= 0.8; break;
                case "FREESHIP": subtotal = Math.max(0, subtotal - 30000); break;
            }
            return subtotal;
        },
        applyDiscount(code) {
            currentDiscount = code;
        },
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm       │ SL │ Đơn giá      │ Tổng         │");
            
            items.forEach((item, index) => {
                const name = item.name.padEnd(14, " ");
                const qty = String(item.quantity).padStart(2, " ");
                const price = formatVND(item.price).padStart(12, " ");
                const total = formatVND(item.price * item.quantity).padStart(12, " ");
                console.log(`│ ${index + 1} │ ${name} │ ${qty} │ ${price} │ ${total} │`);
            });

            console.log("├──────────────────────────────────────────────┤");
            const finalTotal = formatVND(this.getTotal()) + "đ";
            console.log(`│ Tổng cộng:                      ${finalTotal.padStart(13, " ")} │`);
            console.log("└──────────────────────────────────────────────┘");
        },
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        clearCart() {
            items = [];
            currentDiscount = "";
        }
    };
}
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();
// Kỳ vọng:
// ┌──────────────────────────────────────────────┐
// │ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │
// │ 1 │ iPhone 16      │  2 │ 25.990.000  │ 51.980.000  │
// │ 2 │ AirPods Pro    │  2 │  6.990.000  │ 13.980.000  │
// ├──────────────────────────────────────────────┤
// │ Tổng cộng:                       65.960.000đ │
// └──────────────────────────────────────────────┘

cart.applyDiscount("SALE10");
cart.printCart();


console.log("Số SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2
