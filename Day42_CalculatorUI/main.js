'use strict'
let operator = '';
let counter = '';
let firstNumber;
let secondNumber;
let result = '';

const numberButtons =  document.querySelectorAll('.calculator__number-button');
const operatorButtons = document.querySelectorAll('.calculator__operator-button');
const calculationButton = document.querySelector('.calculator__calculation-button');
const calculatorResultField = document.querySelector('.calculator__result-field');
const clearButton = document.querySelector('.calculator__clear-button');
const backActionButton = document.querySelector('.calculator__back-action-button');

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
    calculatorResultField.value = 0;
}

clearButton.addEventListener('click', clearValues);

for (let number of numberButtons) {
    number.addEventListener('click', function () {
        counter += number.innerHTML;
        calculatorResultField.value = counter;
    })
}

for (let operation of operatorButtons) {
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
        calculatorResultField.value = operator;
    })
}

calculationButton.addEventListener('click', function () {
    secondNumber = Number(counter);
    calc();
    calculatorResultField.value = result;
});

backActionButton.addEventListener('click', function () {
    counter = counter.substr(0, counter.length - 1);
    calculatorResultField.value = counter;
});
