let numA = "";
let numB = "";
let operator = "";
let firstOperand = true;

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
let operators = document.querySelectorAll(".operator");
let clearBtn = document.querySelector("#clearBtn");

numbers.forEach(
    function(numberBtn) {
        numberBtn.addEventListener("click", () => {
            if (firstOperand && numA.length < 9) {
                display.textContent = numA + numberBtn.textContent;
                numA += numberBtn.textContent;
            } else if (!firstOperand && numB.length < 9) {
                if (numB == "") {
                    display.textContent = "";
                }
                display.textContent = numB + numberBtn.textContent;
                numB += numberBtn.textContent;
                console.log(`internally: A = ${numA}, B = ${numB}, operator = ${operator}`)
            } 
        });
    }
);

operators.forEach(
    function(operatorBtn) {
        operatorBtn.addEventListener("click", () => {
            firstOperand = false;
            operator = operatorBtn.name;
        });
    }
);

clearBtn.addEventListener("click", () => {
    display.textContent = "0";
    numA = "";
    numB = "";
    operator = "";
    firstOperand = true;
});