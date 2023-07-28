// Create the variables that connects to the various DOM elements
const upperDisplay = document.querySelector('div.upper-display');
const lowerDisplay = document.querySelector('div.lower-display');
const clearBtn = document.querySelector('button.clear');
const deleteBtn = document.querySelector('button.delete');
const numberBtns = document.querySelectorAll('button.number');
const operatorBtns = document.querySelectorAll('button.operator');
const equalBtn = document.querySelector('button.equal');
const decimalBtn = document.querySelector('button.decimal');

// Create 4 variables to hold the prevNumber, secondNumber, operator and displayNumber
let prevNumber: number | null = null;
let operator: string | null = null;
let displayNumber: string = "";

// Create arrays holding numbers and opperators
const numbersArray: string[] = "0123456789".split('');
const operatorArray: string[] = "+-*/".split('');

// Create 4 functions for addition, subtraction, multiplication and division
const add = (a: number, b: number) => Math.round((a + b) * 1000000000) / 1000000000;
const subtract = (a: number, b: number) => Math.round((a - b) * 1000000000) / 1000000000;
const multiply = (a: number, b: number) => Math.round((a * b) * 1000000000) / 1000000000;
const divide = (a: number, b: number): string | number => {
    if (a === 0 || b === 0) return "OOPS!!! Can't divide by zero!";
    return Math.round((a / b) * 1000000000) / 1000000000;
};

// Create a function that does the calculation and returns the result
const operate = (leftOperand: number, operator: string, rightOperand: number) => {
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
const updateLowerDisplay = () => {
    if (lowerDisplay) {
        lowerDisplay.textContent = displayNumber;
    };
};

// Create a function that updates the uppper display
const updateUpperDisplay = () => {
    if (upperDisplay) {
        upperDisplay.textContent = `${prevNumber ?? ''} ${operator ?? ''} `
    }
};

// Create a helper function that handles the calculation
const doCalculation = (leftOperand: number, operator: string, rightOperand: number) => {
    const result = operate(leftOperand, operator, rightOperand);
    if (typeof result === "number") {
        prevNumber = result;
    }
    displayNumber = result.toString();
    updateLowerDisplay();
};

// Create a function that handles number key press
const handleNumberKeyPress = (keyValue: string) => {
    displayNumber += keyValue;
    updateLowerDisplay();
};

// Create a function that handles opertor key press
const handleOperatorKeyPress = (keyValue: string) => {
    const num = Number(displayNumber);
    if (prevNumber === null) {
        num ? prevNumber = num : prevNumber = 0;
        displayNumber = "";
        operator = keyValue;
        updateUpperDisplay();
        return;
    };
    if (operator === null) operator = keyValue;
    doCalculation(prevNumber, operator, num || 0);
    displayNumber = ""
    operator = keyValue;
    updateUpperDisplay();
};

// Create a function that handles the equal key press
const handleEqualKeyPress = () => {
    const num = Number(displayNumber);
    if (prevNumber === null || operator === null || displayNumber === "") return;
    doCalculation(prevNumber, operator, num ?? 0);
    if (upperDisplay) {
        upperDisplay.textContent += `${num} = `
    };
    prevNumber = null;
    operator = null;
};

// Create a function that handles decimal key
const handleDecimalKeyPress = (keyValue: string) => {
    if (displayNumber.indexOf(keyValue) !== -1) return;
    displayNumber += keyValue;
    updateLowerDisplay();
}

// Create a function to handle clear button
const handleClearBtn = () => window.location.reload();

// Create a function to handle delete button
const handleDeleteBtn = () => {
    displayNumber = displayNumber.slice(0, -1);
    updateLowerDisplay();
}

// Create a function that handles keyboard inputs
const handleKeyboardInput = (key: string) => {
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
        handleEqualKeyPress();
    }
    if (key === "Backspace") {
        handleDeleteBtn();
    }
}

numberBtns.forEach(btn => btn.addEventListener("click", (ev) => {
    handleNumberKeyPress((ev.target as HTMLInputElement).value)
}));

decimalBtn?.addEventListener("click", (ev) => {
    handleDecimalKeyPress((ev.target as HTMLInputElement).value);
})

operatorBtns.forEach(btn => btn.addEventListener("click", (ev) => {
    handleOperatorKeyPress((ev.target as HTMLInputElement).value);
}));

equalBtn?.addEventListener("click", handleEqualKeyPress);

clearBtn?.addEventListener("click", handleClearBtn);

deleteBtn?.addEventListener("click", handleDeleteBtn);

document.addEventListener('keydown', (ev) => {
    ev.preventDefault();
    handleKeyboardInput(ev.key);
})