'use strict'
const nameField = document.querySelector('.form__name-input');
const checkSexForm = document.querySelector('.content__form');

checkSexForm.addEventListener('submit', function () {
    event.preventDefault()         //Basic fix of page reload at the beginning of script execution

    const firstName = nameField.value;
    const serverUrl = 'https://api.genderize.io';
    const url = `${serverUrl}?name=${firstName}`;
    const result = document.querySelector('.content__result-field');

    let promise = fetch(url);
    promise.then( function (response) {
        let json = response.json();
        json.then( function (value) {
            result.textContent = `${firstName} is ${value.gender}`;
        })
    })

    nameField.value = '';
})