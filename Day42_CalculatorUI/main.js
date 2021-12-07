'use strict'
let operation;
let counter;
let firstNumber;
let SecondNumber;
let result;

const numberButtons =  document.querySelectorAll('.calculator__number-button');
const operatorButtons = document.querySelectorAll('.calculator__operator-button');
const calculationButton = document.querySelector('.calculator__calculation-button');

for (let number of numberButtons) {
    number.addEventListener('click', function () {
        if (counter) {
            counter += number.innerHTML;
        } else {
            counter = number.innerHTML;
        }
    })
}

for (let operator of operatorButtons) {
    operator.addEventListener('click', function () {
        if (counter) {
            firstNumber = Number(firstNumber = counter);
            counter = null;
        }
        operation = operator.firstElementChild.innerHTML;
    })
}

function calc() {
    switch (operation) {
        case '+':
            result = Number(firstNumber) + Number(counter);
            break;
        case '-':
            result = Number(firstNumber) - Number(counter);
            break
        case '*':
            result = Number(firstNumber) * Number(counter);
            break
        case ':':
            result = Number(firstNumber) / Number(counter);
            break
    }
    return result;
}

calculationButton.addEventListener('click', function (){
    calc();
    console.log(result);
});





