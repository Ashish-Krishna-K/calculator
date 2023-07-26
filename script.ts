// We create a division error type to ensure only the error is returned as a string
type DivisionError = "OOPS!!! Can't divide by zero!"

// Create 4 functions for addition, subtraction, multiplication and division
const add = (a: number, b: number) => a + b;
const subtract = (a: number, b: number) => a - b;
const multiply = (a: number, b: number) => a * b;
const divide = (a: number, b: number):DivisionError | number  => {
    if (a === 0 || b === 0) return "OOPS!!! Can't divide by zero!";
    return a / b;
};

// Create 4 variables to hold the firstNumber, secondNumber, operator and displayNumber
let firstNumber = null;
let secondNumber = null;
let operator = null;
let displayNumber: number | DivisionError = 0;

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
    }
}