Câu A1 (5đ) — var / let / const:
    Đoạn 1:undefined
    Đoạn 2 :Không chạy được
    Đoạn 3: Không chạy được do const không thể thay đổi
    Đoạn 4: số 4 được thêm vào cuối mảng
    Đoạn 5 : output trong block là 2, ngoài block là 1
Câu A2 (5đ) — Data Types & Coercion
    Không chạy code, dự đoán kết quả:
    console.log(typeof null);              // object
    console.log(typeof undefined);         // underfined
    console.log(typeof NaN);              // number
    console.log("5" + 3);                 // "53"
    console.log("5" - 3);                 // 2
    console.log("5" * "3");              // 15
    console.log(true + true);            // 2
    console.log([] + []);                // 
    console.log([] + {});                // [object Object]
    console.log({} + []);                // [object Object]
    Sau khi trả lời, chạy code kiểm tra. Giải thích tại sao "5" + 3 và "5" - 3 cho kết quả khác nhau
    "5"+3="53" do ưu tiên cộng 2 ký tự vì chắc chắn đúng
    "5"-3=2 do không có phép trừ ký tự nên sẽ chuyển về dạng số
Câu A3 (5đ) — So sánh == vs ===
    Dự đoán true hay false:

    console.log(5 == "5");                // true
    console.log(5 === "5");               // false
    console.log(null == undefined);       // true
    console.log(null === undefined);      // false
    console.log(NaN == NaN);             // false
    console.log(0 == false);             // true
    console.log(0 === false);            // false
    console.log("" == false);            // true
    Quy tắc: Từ giờ trở đi, bạn nên dùng == hay ===? Tại sao?
    Nên dung === vì nó đúng với mục đích so sánh về cả giá trị và kiểu dữ liệu