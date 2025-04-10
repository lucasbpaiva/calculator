let numA = "";
let numB = "";
let operator = "";
let firstOperand = true;

function add(a, b) {
    let result = Number(a) + Number(b);
    return Number(result.toFixed(8));
}

function subtract(a, b) {
    let result = Number(a) - Number(b);
    return Number(result.toFixed(8));
}

function multiply(a, b) {
    let result = Number(a) * Number(b);
    return Number(result.toFixed(8));
}

function divide(a, b) {
    if (b == 0) {
        return "We don't do that here"
    }
    let result = Number(a) / Number(b);
    return Number(result.toFixed(8));
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
let decimalSep = document.querySelector(".decimal-separator");
let operators = document.querySelectorAll(".operator");
let equalsBtn = document.querySelector("#equalsBtn");
let clearBtn = document.querySelector("#clearBtn");

numbers.forEach(
    function(numberBtn) {
        numberBtn.addEventListener("click", () => {
            if (firstOperand && numA.length < 9) {
                if (numB != "") { //already made an operation
                    numA = "";
                    numB = "";
                }
                display.textContent = numA.replace(".",",") + numberBtn.textContent;
                numA += numberBtn.textContent;
            } else if (!firstOperand && numB.length < 9) {
                if (numB == "") {
                    display.textContent = "";
                }
                display.textContent = numB.replace(".",",") + numberBtn.textContent;
                numB += numberBtn.textContent;
                console.log(`internally: A = ${numA}, B = ${numB}, operator = ${operator}`)
            } 
        });
    }
);

decimalSep.addEventListener("click", () => {
    if (firstOperand && numA.length < 9) {
        if (!numA.includes(".")) {
            if (numB != "") { //already made an operation
                numA = "";
                numB = "";
            }
            display.textContent = numA + ",";
            numA += ".";
        }
    } else if (!firstOperand && numB.length < 9) {
        if (numB == "") {
            display.textContent = "";
        }
        display.textContent = numB + ",";
        numB += ".";
        console.log(`internally: A = ${numA}, B = ${numB}, operator = ${operator}`)
    } 
});

operators.forEach(
    function(operatorBtn) {
        operatorBtn.addEventListener("click", () => {
            if (numB != "") {
                let result = calculate(operator, numA, numB);
                display.textContent = result;
                numA = result;
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
    }
});

clearBtn.addEventListener("click", () => {
    display.textContent = "0";
    numA = "";
    numB = "";
    operator = "";
    firstOperand = true;
});