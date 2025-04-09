let numA = "";
let numB = "";
let operator = "";
let firstOperand = true;

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

function calculate(operator, numA, numB) {
    switch (operator) {
        case "add":
            return add(numA, numB);
        case "subtract":
            return subtract(numA, numB);
        case "multiply":
            return multiply(numA, numB);
        case "divide":
            return divide(numA, numB);
        default:
            break;
    }
}

let display = document.querySelector(".display");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let equalsBtn = document.querySelector("#equalsBtn");
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

equalsBtn.addEventListener("click", () => {
    let result = calculate(operator, numA, numB);
    display.textContent = result;
});

clearBtn.addEventListener("click", () => {
    display.textContent = "0";
    numA = "";
    numB = "";
    operator = "";
    firstOperand = true;
});