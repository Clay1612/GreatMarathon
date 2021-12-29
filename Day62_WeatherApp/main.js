import {UI_ELEMENTS} from './view.js';

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f&units=metric';

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

function getWeatherInfo() {
    const cityName = UI_ELEMENTS.citySearchInput.value
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    let cityInfo = undefined;
    serverRequest(url)
        .then(function (response) {
            cityInfo = response;
            UI_ELEMENTS.nowDisplay.temperature.innerHTML = `${ Math.round(cityInfo.main.temp) }&#176`;
            UI_ELEMENTS.nowDisplay.city.textContent = cityInfo.name;
            UI_ELEMENTS.nowDisplay.condition.style.backgroundImage = `url("http://openweathermap.org/img/wn/${cityInfo.weather[0].icon}@2x.png")`
        })
        .catch(function (error) {
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
        })
}

UI_ELEMENTS.form.addEventListener('submit', function () {
    event.preventDefault();
    getWeatherInfo();
})
