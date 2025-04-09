let numA = "";
let numB = "";
let operator = "";
let state = "A"; // "A" or "B"

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

let display = document.querySelector(".display");
let numbers = document.querySelectorAll(".number");
let clearBtn = document.querySelector("#clearBtn");

numbers.forEach(
    function(numberBtn) {
        numberBtn.addEventListener("click", () => {
            if (numA.length < 9) {
                display.textContent = numA + numberBtn.textContent;
                numA += numberBtn.textContent;
            }
        });
    }
);

clearBtn.addEventListener("click", () => {
    display.textContent = "0";
    numA = "";
});