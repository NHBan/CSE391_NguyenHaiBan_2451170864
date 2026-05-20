// Random số từ 1 -> 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

const maxTurns = 7;
let attempts = 0;

const guessedNumbers = [];

while (attempts < maxTurns) {

    let input = prompt(
        `Lần ${attempts + 1}/${maxTurns}\nNhập số từ 1 đến 100:`
    );
    if (input === null) {
        alert("Bạn đã thoát game!");
        break;
    }

    let guess = Number(input);
    if (
        isNaN(guess) ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        alert("Vui lòng nhập số nguyên từ 1 đến 100!");
        continue;
    }
    if (guessedNumbers.includes(guess)) {
        alert("Bạn đã đoán số này rồi!");
        continue;
    }

    guessedNumbers.push(guess);

    attempts++;
    if (guess === randomNumber) {
        alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
        break;
    } else if (guess < randomNumber) {
        alert("Cao hơn!");
    } else {
        alert("Thấp hơn!");
    }
    if (attempts === maxTurns) {
        alert(
            `Bạn đã hết lượt!\nĐáp án đúng là: ${randomNumber}`
        );
    }
}