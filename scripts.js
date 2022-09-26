let display = document.getElementById('display');
let displayResult = document.getElementById('result');
const allNumbers = document.querySelectorAll('.number');
const allOperators = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const deleteNum = document.getElementById('delete');

let displayedValue;
let resultValue;
let resultLine;
let displayArray = [];
let firstNumber = '';
let secondNumber = '';
let operator = null;
let result;


allNumbers.forEach(button => button.addEventListener('click', () => displayNumbers(button.textContent)));

allOperators.forEach(button => button.addEventListener('click', () => assignFirstNum(button.textContent)));

clear.onclick = function() {
    window.location.reload();
};

equals.addEventListener('click', () => assignSecondNumber());

deleteNum.onclick = function() {
    displayArray.pop();
    display.innerText = displayArray.join('');
}

function displayNumbers(number) {
    displayedValue = parseInt(number);
    displayArray.push(displayedValue);
    display.innerText = displayArray.join('');
};

function assignFirstNum(symbol) {
    if (operator !== null) {
        assignSecondNumber();
    }

    let num = parseInt(displayResult.innerText);

    if (!num) {
        firstNumber = parseInt(display.innerText);
    } else {
        firstNumber = num;
    }

    operator = symbol;
    displayArray = [];
};

function assignSecondNumber() {

    if (operator === null) {
        return;
    };

    secondNumber = parseInt(display.innerText);

    displayResult.innerText = operate(operator, firstNumber, secondNumber);

    operator = null;
};


function add (a, b){
    return Math.round((a + b) * 100) / 100;
};


function subtract (a, b){
    return Math.round((a - b) * 100) / 100;
};


function multiply (a, b){
    return Math.round((a * b) * 100) / 100;
};


function divide (a, b){
    return Math.round((a / b) * 100) / 100;
};

function operate(operator, a, b){

    let tempResult;

    if (!a) {
        return ;
    } else {

        console.log(a);
        console.log(operator);
        console.log(b);
        
        switch (operator){
            case '+':
                tempResult = add(a, b);
                console.log(tempResult);
                break;
            case '-':
                tempResult = subtract(a, b);
                console.log(tempResult);
                break;
            case '*':
                tempResult = multiply(a, b);
                console.log(tempResult);
                break;
            case '/':
                tempResult = divide(a, b);
                console.log(tempResult);
                break;    
        };
        return tempResult;
    }; 

}