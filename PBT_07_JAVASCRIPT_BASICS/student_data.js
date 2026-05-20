const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];
//Tính điểm trung bình (math×0.4 + physics×0.3 + cs×0.3) cho mỗi sinh viên
function DTB(student) {
    return student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3
}
//Xếp loại: ≥8.0 Giỏi, ≥6.5 Khá, ≥5.0 Trung bình, <5.0 Yếu
function xepLoai(diem) {
    if (diem >= 8.0) return "Giỏi";
    if (diem >= 6.5) return "Khá";
    if (diem >= 5) return "Trung bình";
    return "Yếu";
}
//In bảng kết quả:
console.log("| STT | Tên   | TB   | Xếp loại |");
console.log("|-----|-------|------|-----------|");

students.forEach((student, index) => {
    console.log(
        `| ${index + 1} | ${student.name} | ${DTB(student).toFixed(1)} | ${xepLoai(DTB(student))} |`
    );
});
//Đếm số SV mỗi xếp loại
const demSinhVien = {
    "Giỏi": 0,
    "Khá": 0,
    "Trung bình": 0,
    "Yếu": 0
}
let maxStudent = students[0]
let minStudent = students[0]
students.forEach((student) => {
    let diem = DTB(student);
    student.diem=diem;
    let hocLuc = xepLoai(student.diem);
    
    student.hocLuc=hocLuc
    demSinhVien[hocLuc]++;
    if (diem > maxStudent.diem) {
        maxStudent = student;
    }
    if (diem < minStudent.diem ) {
        minStudent = student;
    }
})
//Tìm SV có điểm TB cao nhất và thấp nhất
console.log(`Sinh vien co diem trung binh lon nhat la ${maxStudent.name} voi so diem ${DTB(maxStudent)}`)
console.log(`Sinh vien co diem trung binh thap nhat la ${minStudent.name} voi so diem ${DTB(minStudent).toFixed(1)}`)
//Trung binh tung mon
let TBToan=0
let TBVatLy=0
let TBCS=0
students.forEach(student=>{
    TBToan +=student.math
    TBVatLy +=student.physics
    TBCS+=student.cs
})
console.log(`Diem trung binh toan la ${(TBToan/students.length).toFixed(1)}`)
console.log(`Diem trung binh Vat ly la ${(TBVatLy/students.length).toFixed(1)}`)
console.log(`Diem trung binh CS la ${(TBCS/students.length).toFixed(1)}`)
// Bonus: Tính điểm TB theo giới tính
let maleTotal = 0;
let femaleTotal = 0;
let maleCount = 0;
let femaleCount = 0;
students.forEach(student => {
    if (student.gender === "M") {
        maleTotal += student.diem;
        maleCount++;
    } else {
        femaleTotal += student.diem;
        femaleCount++;
    }
});
console.log("\nĐiểm TB theo giới tính");
if (maleCount > 0) {
    console.log(
        `Nam: ${(maleTotal / maleCount).toFixed(2)}`
    );
}
if (femaleCount > 0) {
    console.log(
        `Nữ: ${(femaleTotal / femaleCount).toFixed(2)}`
    );
}