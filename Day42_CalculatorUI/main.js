import {buttons} from "./view.js";

let operator = '';
let counter = '';
let firstNumber;
let secondNumber;
let result = '';

function calc() {
    switch (operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '×':
            result = firstNumber * secondNumber;
            break;
        case '÷':
            result = firstNumber / secondNumber;
            break;
    }
}

function clearValues() {
    counter = '';
    firstNumber = '';
    operator = '';
    secondNumber = '';
    buttons.calculatorResultField.value = 0;
}

buttons.clear.addEventListener('click', clearValues);

for (let number of buttons.number) {
    number.addEventListener('click', function () {
        counter += number.innerHTML;
        buttons.calculatorResultField.value = counter;
    })
}

for (let operation of buttons.operator) {
    operation.addEventListener('click', function () {
        if (operator !== '') {
            secondNumber = Number(counter);
            calc();
            firstNumber = result;
            operator = operation.firstElementChild.innerHTML;
            counter = '';
        }
        if (counter !== '') {
            firstNumber = Number(counter);
            counter = '';
        }
        operator = operation.firstElementChild.innerHTML;
        buttons.calculatorResultField.value = operator;
    })
}

buttons.calculation.addEventListener('click', function () {
    secondNumber = Number(counter);
    calc();
    buttons.calculatorResultField.value = result;
});

buttons.backAction.addEventListener('click', function () {
    counter = counter.substr(0, counter.length - 1);
    buttons.calculatorResultField.value = counter;
});
