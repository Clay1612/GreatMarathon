import {UI_ELEMENTS, favoriteCitiesHandler} from './view.js';

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f&units=metric';
export const favoritesCities = [];

window.addEventListener('unhandledrejection', function (error) {
    alert(`Sorry, ${error.reason}, script failed`);
})

function serverRequest(url) {
    return fetch(url)
        .then( function (response){
            if (response.status === 404) {
                throw new Error('404');
            }
            return response.json()
    })
}

function renderWeatherInfo(city) {
    UI_ELEMENTS.nowDisplay.temperature.innerHTML = `${Math.round(city.main.temp)}&#176`;
    UI_ELEMENTS.nowDisplay.city.textContent = city.name;
    UI_ELEMENTS.nowDisplay.condition.style.backgroundImage = `url("http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png")`

    UI_ELEMENTS.nowDisplay.AddToFavorites.addEventListener('click', favoriteCitiesHandler);

    UI_ELEMENTS.form.reset();
}

function errorProcessing(error) {
    switch (error.message) {
        case 'Failed to fetch':
            alert(`Error: Server request failed`);
            break;
        case '404':
            alert('Error: city is not found');
            break;
        default:
            throw new Error('Unexpected error');
    }
}

export function getWeatherInfo(cityName) {
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    serverRequest(url)
        .then(renderWeatherInfo)
        .catch(errorProcessing)
}

UI_ELEMENTS.form.addEventListener('submit', function () {
    event.preventDefault();
    getWeatherInfo(UI_ELEMENTS.citySearchInput.value);
    UI_ELEMENTS.nowDisplay.AddToFavorites.style.backgroundImage = 'url("./assets/images/favorite.svg")';
})
