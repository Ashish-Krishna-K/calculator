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

