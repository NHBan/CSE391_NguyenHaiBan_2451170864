Câu A1 — Function Declaration vs Expression vs Arrow

Viết **cùng 1 hàm** `tinhThueBaoHiem(luong)` theo 3 cách:
1. Function Declaration
function tinhThueBaoHiem(luong) {
    const thue = luong > 11 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
}
2. Function Expression
const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};
3. Arrow Function
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};
**Câu hỏi:** 3 cách này có khác nhau về hoisting không? Giải thích bằng ví dụ code cụ thể.
Có sự khác biệt rõ ràng. Chỉ duy nhất Function Declaration được hoisting hoàn toàn 
Function Expression và Arrow Function không thể gọi trước khi định nghĩa vì chúng nằm trong vùng Temporal Dead Zone

// ✅ 1. Function Declaration: Hoạt động bình thường
console.log(funcDecl(15)); // Trả về: { thuong: 1.5, thuc_nhan: 13.5 }
function funcDecl(luong) {
    const thue = luong > 11 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
}
// ❌ 2. Function Expression: Lỗi ReferenceError
console.log(funcExpr(15)); // ReferenceError: Cannot access 'funcExpr' before initialization
const funcExpr = function(luong) {
    const thue = luong > 11 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};
// ❌ 3. Arrow Function: Lỗi ReferenceError (giống hệt Expression)
console.log(funcArrow(15)); // ReferenceError: Cannot access 'funcArrow' before initialization
const funcArrow = (luong) => {
    const thue = luong > 11 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};