let numA;
let numB;
let operator;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function calculate(operator, numA, numB) {
    return operator(numA, numB);
}

let numbers = document.querySelectorAll(".number");
let display = document.querySelector(".display");

numbers.forEach(
    function(numberBtn) {
        numberBtn.addEventListener("click", () => {
            display.textContent = numberBtn.textContent;
        });
    }
);