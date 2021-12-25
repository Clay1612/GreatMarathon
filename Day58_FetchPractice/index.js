'use strict'
const checkSexForm = document.querySelector('.content__form');

const fields = {
    nameField: document.querySelector('.form__name-input'),
    genderResultField: document.getElementById('gender-result'),
    countryResultField: document.getElementById('country-result'),
};

checkSexForm.addEventListener('submit', function () {
    event.preventDefault()         //Basic fix of page reload at the beginning of script execution

    const firstName = fields.nameField.value;
    const serverGenderUrl = 'https://api.genderize.io';
    const serverCountryURL = 'https://api.nationalize.io';
    const genderUrl = `${serverGenderUrl}?name=${firstName}`;
    const countryUrl = `${serverCountryURL}?name=${firstName}`;

    let genderPromise = fetch(genderUrl);
    genderPromise.then( function (response) {
        let json = response.json();
        json.then( function (value) {
            fields.genderResultField.textContent = `${firstName} is ${value.gender}`;
        })
    })

    let countryPromise = fetch(countryUrl);
    countryPromise.then( function (response) {
        let json = response.json();
        json.then( function (value) {
           fields.countryResultField.textContent = `${firstName} from ${value.country[0].country_id}`;
        } )
    })

    fields.nameField.value = '';
})
