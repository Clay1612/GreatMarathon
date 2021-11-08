'use strict'
let operator = prompt('Введите идентификатор действия: sum - сложение, minus - вычитание, multi - умножение, div - деление, rem - остаток от деления, expo - возведение в степень')
let a = +prompt('Введите первое число');
let b = +prompt('Введите второе число');
const isValid = (operator && a && b && typeof a === 'number' && typeof b === 'number');
let result;

let operations = {
    sum: a + b,
    multi: a * b,
    minus: a - b,
    div: a / b,
    rem: a % b,
    expo: a ** b,
}

function calc(operator) {                  //Для консольной версии необходимо добавить параметры a, b
    if (operator in operations) {
        return operations[operator]
    } else {
        return 'unknown operation';
    }
}

if (isValid) {
    result = calc(operator);
    alert('Результат: ' + result);
} else {
    alert('Error');
}