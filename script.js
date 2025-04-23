let numA = "";
let numB = "";
let operator = "";
let firstOperand = true;
const DIGITS = "0123456789";
const MINDISPLAY = 1e-8;
const MINJS = 1e-6;

function formatResult(result) {

    if (result == 0) return 0;

    if (allowedPrecision(result) < 0 || Math.abs(result) < MINDISPLAY) { 
        //|result| > 999.999.999 or |result| < 0.00000001
        let resultAsExponential = result.toExponential(6);
        let [base, exp] = resultAsExponential.split("e");
        return Number(base) + "e" + exp;
    }

    let output = result.toFixed(allowedPrecision(result));
    // avoid automatic conversion to exponential notation when result is between 1e-8 and 1e-6
    return (Math.abs(result) < MINJS) ? output : Number(output);
}

function add(a, b) {
    return formatResult(Number(a) + Number(b));
}

function subtract(a, b) {
    return formatResult(Number(a) - Number(b));
}

function multiply(a, b) {
    return formatResult(Number(a) * Number(b));
}

function divide(a, b) {
    return (b == 0) ? "We don't do that here" : formatResult(Number(a) / Number(b));
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

    if (result.toString().includes("e")) { // result in [1e-8, 1e-6)
        return result
        .toString()
        .split("e-")
        .at(1)
    }

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

function inputNumber(number) {
    if (firstOperand && countDigits(numA) < 9) {
        if (numB != "") { //already made an operation
            numA = "";
            numB = "";
        }
        if (numA != "0") {
            display.textContent = numA.replace(".",",") + number;
            numA += number;
        } else { //prevent leading zeros
            display.textContent = number;
            numA = number; 
        }
        
    } else if (!firstOperand && countDigits(numB) < 9) {
        if (numB == "") { //starting to type numB
            display.textContent = "";
        }
        if (numB != "0") {
            display.textContent = numB.replace(".",",") + number;
            numB += number;
        } else {
            display.textContent = number;
            numB = number;
        }
    } 
    document.activeElement.blur();
}

function inputDecimalSeparator() {
    if (firstOperand && countDigits(numA) < 9 && !numA.includes(".")) {
        if (numA == "") numA = "0";
        if (numA == "-") numA = "-0";
        if (numB != "") { //already made an operation
            numA = "";
            numB = "";
        }
        display.textContent = numA + ",";
        numA += ".";
    } else if (!firstOperand && countDigits(numB) < 9 && !numB.includes(".")) {
        if (numB == "") numB = "0"; //starting to type numB
        if (numB == "-") numB = "-0";
        display.textContent = numB + ",";
        numB += ".";
    } 
    document.activeElement.blur();
}

function inputEqualsSign() {
    if (numB != "" && operator != "") {
        let result = calculate(operator, numA, numB);
        display.textContent = result.toString().replace(".",",");
        firstOperand = true;
    }
    document.activeElement.blur();
}

function inputOperator(operatorName) {
    if (numB != "") {
        let result = calculate(operator, numA, numB);
        display.textContent = result.toString().replace(".",",");
        numA = result.toString();
        numB = "";
    }
    firstOperand = false;
    operator = operatorName;
    document.activeElement.blur();
}

function inputPercentage() {
    if (firstOperand) {
        if (numA == display.textContent.replace(",",".")) {
            numA = divide(numA, 100).toString();
            display.textContent = numA.replace(".",",");
        } else {
            numB = "";
            numA = divide(display.textContent.replace(",","."), 100).toString();
            display.textContent = numA.replace(".",",");
        }
    } else {
        numB = divide(numB, 100).toString();
        display.textContent = numB.replace(".",",");
    }
    document.activeElement.blur();
}

function inputSignChange() {
    if (firstOperand) {
        if (numA == display.textContent.replace(",",".")) {
            numA = changeSign(numA);
            display.textContent = numA.replace(".",",");
        } else {
            numA = changeSign(numA);
            display.textContent = changeSign(display.textContent.replace(",","."));
        }
    } else {
        numB = changeSign(numB);
        display.textContent = numB.replace(".",",");
    }
    document.activeElement.blur();
}

function clearDisplay() {
    display.textContent = "0";
    numA = "";
    numB = "";
    operator = "";
    firstOperand = true;
    // After clicking a button, unfocus it. Otherwise pressing the Enter key will perform the equals operation and then perform the button click action.
    document.activeElement.blur();
}

function deleteDigit() {
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
    document.activeElement.blur();
}

document.addEventListener("keydown", (event) => {

    if (DIGITS.includes(event.key)) inputNumber(event.key);

    switch (event.key) {
        case "Backspace":
            deleteDigit();
            break;
        case "Escape":
            clearDisplay();
            break;
        case "–": //option + minus
            inputSignChange();
            break;
        case "%":
            inputPercentage();
            break;
        case ",":
            inputDecimalSeparator();
            break;
        case ".":
            inputDecimalSeparator();
            break;
        case "Enter":
            inputEqualsSign();
            break;
        case "+":
            inputOperator("add");
            break;
        case "-":
            inputOperator("subtract");
            break;
        case "*":
            inputOperator("multiply");
            break;
        case "/":
            inputOperator("divide");
            break;
        default:
            break;
    }
});

numbers.forEach(numberBtn => {
        numberBtn.addEventListener("click", () => {
            inputNumber(numberBtn.textContent);
        });
    });

decimalSep.addEventListener("click", inputDecimalSeparator);

operators.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", () => {
        let operatorName = operatorBtn.name;
        inputOperator(operatorName);
    });
});

equalsBtn.addEventListener("click", inputEqualsSign);

delBtn.addEventListener("click", deleteDigit);

clearBtn.addEventListener("click", clearDisplay);

plusMinusBtn.addEventListener("click", inputSignChange);

percentBtn.addEventListener("click", inputPercentage);