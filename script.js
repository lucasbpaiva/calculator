let numA = "";
let numB = "";
let operator = "";
let firstOperand = true;
const DIGITS = "0123456789";

function add(a, b) {
    if (numA.includes(".") || numB.includes(".")) {
        let result = Number(a) + Number(b);
        return Number(result.toFixed(allowedPrecision(result)));
    }
    return Number(a) + Number(b);
}

function subtract(a, b) {
    if (numA.includes(".") || numB.includes(".")) {
        let result = Number(a) - Number(b);
        return Number(result.toFixed(allowedPrecision(result)));
    }
    return Number(a) - Number(b);
}

function multiply(a, b) {
    if (numA.includes(".") || numB.includes(".")) {
        let result = Number(a) * Number(b);
        return Number(result.toFixed(allowedPrecision(result)));
    }
    return Number(a) * Number(b);
}

function divide(a, b) {
    let result = Number(a) / Number(b);
    return Number(result.toFixed(allowedPrecision(result)));
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

function countDigits(numberString) {
    let cleanedString = numberString
        .split("")
        .filter(char => DIGITS.includes(char))
        .join("");
    return cleanedString.length;
}

function allowedPrecision(result) {
    if (result < 0) result *= -1;

    let beforeDecimalPoint = result
    .toString()
    .split(".")
    .at(0)
    .length;

    return 9 - beforeDecimalPoint;
}

function changeSign(numString) {
    return numString.length > 0 ? (numString * -1).toString() : "-";
}

let display = document.querySelector(".display");
let numbers = document.querySelectorAll(".number");
let decimalSep = document.querySelector(".decimal-separator");
let operators = document.querySelectorAll(".operator");
let equalsBtn = document.querySelector("#equalsBtn");
let delBtn = document.querySelector("#delBtn");
let clearBtn = document.querySelector("#clearBtn");
let plusMinusBtn = document.querySelector("#plusMinusBtn");
let percentBtn = document.querySelector("#percentBtn");

numbers.forEach(
    function(numberBtn) {
        numberBtn.addEventListener("click", () => {
            if (firstOperand && countDigits(numA) < 9) {
                if (numB != "") { //already made an operation
                    numA = "";
                    numB = "";
                }
                display.textContent = numA.replace(".",",") + numberBtn.textContent;
                numA += numberBtn.textContent;
            } else if (!firstOperand && countDigits(numB) < 9) {
                if (numB == "") { //starting to type numB
                    display.textContent = "";
                }
                display.textContent = numB.replace(".",",") + numberBtn.textContent;
                numB += numberBtn.textContent;
            } 
        });
    }
);

decimalSep.addEventListener("click", () => {
    if (firstOperand && countDigits(numA) < 9) {
        if (!numA.includes(".")) {
            if (numB != "") { //already made an operation
                numA = "";
                numB = "";
            }
            display.textContent = numA + ",";
            numA += ".";
        }
    } else if (!firstOperand && countDigits(numB) < 9) {
        if (!numB.includes(".")) {
            if (numB == "") { //starting to type numB
                display.textContent = "";
            }
            display.textContent = numB + ",";
            numB += ".";
        }
    } 
});

operators.forEach(
    function(operatorBtn) {
        operatorBtn.addEventListener("click", () => {
            if (numB != "") {
                let result = calculate(operator, numA, numB);
                display.textContent = result;
                numA = result.toString();
                numB = "";
            }
            firstOperand = false;
            operator = operatorBtn.name;
        });
    }
);

equalsBtn.addEventListener("click", () => {
    if (numB != "" && operator != "") {
        let result = calculate(operator, numA, numB);
        display.textContent = result.toString().replace(".",",");
        firstOperand = true;
        console.log(`internally: A = ${numA}, B = ${numB}, operator = ${operator}`);
    }
});

delBtn.addEventListener("click", () => {
    if (firstOperand && numA != "" && numA == display.textContent.replace(",",".")) {
        if (countDigits(numA) == 1) {
            numA = "";
            display.textContent = "0";
        } else {
            numA = numA.slice(0, -1);
            display.textContent = numA.replace(".",",");
        }
    } else if (!firstOperand && numB != "") {
        if (countDigits(numB) == 1) {
            numB = "";
            display.textContent = "0";
        } else {
            numB = numB.slice(0, -1);
            display.textContent = numB.replace(".",",");
        }
    }
});

clearBtn.addEventListener("click", () => {
    display.textContent = "0";
    numA = "";
    numB = "";
    operator = "";
    firstOperand = true;
});

plusMinusBtn.addEventListener("click", () => {
    if (firstOperand) {
        numA = changeSign(numA);
        display.textContent = numA.replace(".",",");
    } else {
        numB = changeSign(numB);
        display.textContent = numB.replace(".",",");
    }
});

percentBtn.addEventListener("click", () => {
    if (firstOperand) {
        numA = divide(numA, 100).toString();
        display.textContent = numA.replace(".",",");
    } else {
        numB = divide(numB, 100).toString();
        display.textContent = numB.replace(".",",");
    }
});