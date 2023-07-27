// Create the variables that connects to the various DOM elements
var upperDisplay = document.querySelector('div.upper-display');
var lowerDisplay = document.querySelector('div.lower-display');
var clearBtn = document.querySelector('button.clear');
var deleteBtn = document.querySelector('button.delete');
var numberBtns = document.querySelectorAll('button.number');
var operatorBtns = document.querySelectorAll('button.operator');
var equalBtn = document.querySelector('button.equal');
var decimalBtn = document.querySelector('button.decimal');
// Create 4 variables to hold the prevNumber, secondNumber, operator and displayNumber
var prevNumber = null;
var operator = null;
var displayNumber = "";
// Create arrays holding numbers and opperators
var numbersArray = "0123456789".split('');
var operatorArray = "+-*/".split('');
// Create 4 functions for addition, subtraction, multiplication and division
var add = function (a, b) { return a + b; };
var subtract = function (a, b) { return a - b; };
var multiply = function (a, b) { return a * b; };
var divide = function (a, b) {
    if (a === 0 || b === 0)
        return "OOPS!!! Can't divide by zero!";
    return a / b;
};
// Create a function that does the calculation and returns the result
var operate = function (leftOperand, operator, rightOperand) {
    switch (operator) {
        case ('+'):
            return add(leftOperand, rightOperand);
        case ('-'):
            return subtract(leftOperand, rightOperand);
        case ('*'):
            return multiply(leftOperand, rightOperand);
        case ('/'):
            return divide(leftOperand, rightOperand);
        default:
            return '';
    }
};
// Create a function that updates the lower display
var updateLowerDisplay = function () {
    if (lowerDisplay) {
        lowerDisplay.textContent = displayNumber;
    }
    ;
};
// Create a function that updates the uppper display
var updateUpperDisplay = function () {
    if (upperDisplay) {
        upperDisplay.textContent = "".concat(prevNumber !== null && prevNumber !== void 0 ? prevNumber : '', " ").concat(operator !== null && operator !== void 0 ? operator : '', " ");
    }
};
// Create a helper function that handles the calculation
var doCalculation = function (leftOperand, operator, rightOperand) {
    var result = operate(leftOperand, operator, rightOperand);
    if (typeof result === "number") {
        prevNumber = result;
    }
    displayNumber = result.toString();
    updateLowerDisplay();
};
// Create a function that handles number key press
var handleNumberKeyPress = function (keyValue) {
    displayNumber += keyValue;
    updateLowerDisplay();
};
// Create a function that handles opertor key press
var handleOperatorKeyPress = function (keyValue) {
    var num = Number(displayNumber);
    if (prevNumber === null) {
        num ? prevNumber = num : prevNumber = 0;
        displayNumber = "";
        operator = keyValue;
        updateUpperDisplay();
        return;
    }
    ;
    if (operator === null)
        operator = keyValue;
    doCalculation(prevNumber, operator, num || 0);
    displayNumber = "";
    operator = keyValue;
    updateUpperDisplay();
};
// Create a function that handles the equal key press
var handleEqualKeyPress = function (keyValue) {
    var num = Number(displayNumber);
    if (prevNumber === null)
        return;
    if (operator === null)
        return;
    doCalculation(prevNumber, operator, num !== null && num !== void 0 ? num : 0);
    if (upperDisplay) {
        upperDisplay.textContent += "".concat(num, " = ");
    }
    ;
    prevNumber = null;
    operator = null;
};
// Create a function that handles decimal key
var handleDecimalKeyPress = function (keyValue) {
    if (displayNumber.indexOf(keyValue) !== -1)
        return;
    displayNumber += keyValue;
    updateLowerDisplay();
};
// Create a function to handle clear button
var handleClearBtn = function () { return window.location.reload(); };
// Create a function to handle delete button
var handleDeleteBtn = function () {
    displayNumber = displayNumber.slice(0, -1);
    updateLowerDisplay();
};
// Create a function that handles keyboard inputs
var handleKeyboardInput = function (key) {
    if (numbersArray.indexOf(key) !== -1) {
        handleNumberKeyPress(key);
    }
    if (operatorArray.indexOf(key) !== -1) {
        handleOperatorKeyPress(key);
    }
    if (key === ".") {
        handleDecimalKeyPress(key);
    }
    if (key === "=" || key === "Enter") {
        handleEqualKeyPress(key);
    }
    if (key === "Backspace") {
        handleDeleteBtn();
    }
};
numberBtns.forEach(function (btn) { return btn.addEventListener("click", function (ev) {
    handleNumberKeyPress(ev.target.value);
}); });
decimalBtn === null || decimalBtn === void 0 ? void 0 : decimalBtn.addEventListener("click", function (ev) {
    handleDecimalKeyPress(ev.target.value);
});
operatorBtns.forEach(function (btn) { return btn.addEventListener("click", function (ev) {
    handleOperatorKeyPress(ev.target.value);
}); });
equalBtn === null || equalBtn === void 0 ? void 0 : equalBtn.addEventListener("click", function (ev) {
    handleEqualKeyPress(ev.target.value);
});
clearBtn === null || clearBtn === void 0 ? void 0 : clearBtn.addEventListener("click", handleClearBtn);
deleteBtn === null || deleteBtn === void 0 ? void 0 : deleteBtn.addEventListener("click", handleDeleteBtn);
document.addEventListener('keydown', function (ev) {
    ev.preventDefault();
    console.log(ev.key);
    handleKeyboardInput(ev.key);
});
