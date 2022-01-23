import {UI_ELEMENTS, favoriteCitiesHandler, createNewCity, removeFromFavorite} from './view.js';
import {saveToStorageCurrentCity, saveToStorageFavoriteCity} from "./localStorage.js";

export const APIUrls = {
    currentWeather: 'http://api.openweathermap.org/data/2.5/weather',
    forecastWeather: 'http://api.openweathermap.org/data/2.5/forecast',
    Key: 'dcb827e237f5f1a3c296d1c3322ba770&units=metric',
}


export const favoritesCities = [];

async function serverRequest(url) {
    let response = await fetch(url);

    if (response.status === 404) {
        throw new Error('404');
    }
    return response.json()
}

function getTimeFromTimestamp(timestamp) {
    function checkTime(time) {
        if (time < 10) {
            time = '0' + time
        }
        return time
    }

    const date = new Date(timestamp * 1000);
    const hours = checkTime( date.getHours() );
    const minutes = checkTime( date.getMinutes() );
    const seconds = checkTime( date.getSeconds() );
    return `${hours}:${minutes}:${seconds}`;
}

function renderWeatherInfo(city, WeatherUrl) {
    if (WeatherUrl.startsWith('http://api.openweathermap.org/data/2.5/weather')) {
        UI_ELEMENTS.nowDisplay.temperature.innerHTML = `${Math.round(city.main.temp)}&#176`;
        UI_ELEMENTS.nowDisplay.city.textContent = city.name;
        UI_ELEMENTS.nowDisplay.condition.style.backgroundImage = `url("http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png")`
        UI_ELEMENTS.nowDisplay.AddToFavorites.addEventListener('click', favoriteCitiesHandler);

        UI_ELEMENTS.detailsDisplay.city.textContent = city.name;
        UI_ELEMENTS.detailsDisplay.temperature.innerHTML = `Temperature: ${Math.round(city.main.temp)}&#176`;
        UI_ELEMENTS.detailsDisplay.feelsLike.innerHTML = `Feels like: ${Math.round(city.main.feels_like)}&#176`
        UI_ELEMENTS.detailsDisplay.weatherCondition.textContent = `Weather: ${city.weather[0].main}`
        UI_ELEMENTS.detailsDisplay.sunrise.textContent = `Sunrise: ${ getTimeFromTimestamp(city.sys.sunrise) }`;
        UI_ELEMENTS.detailsDisplay.sunset.textContent = `Sunset: ${ getTimeFromTimestamp(city.sys.sunset) }`;

        saveToStorageCurrentCity(city.name);

    } else if (WeatherUrl.startsWith('http://api.openweathermap.org/data/2.5/forecast')) {
        let count = 0;
        UI_ELEMENTS.forecastDisplay.city.textContent = city.city.name;

        for (let infoDisplay of UI_ELEMENTS.forecastDisplay.forecastInfoSection) {
            infoDisplay.querySelector('.forecast-section__date').textContent = city.list[count].dt_txt.slice(5, 10);
            infoDisplay.querySelector('.forecast-section__time').textContent = city.list[count].dt_txt.slice(10, 16);
            infoDisplay.querySelector('.forecast-section__degrees').innerHTML =
                `Temperature: ${Math.round(city.list[count].main.temp)}&#176`;
            infoDisplay.querySelector('.forecast-section__feels-like').innerHTML =
                `Feels like: ${Math.round(city.list[count].main.feels_like)}&#176`;
            infoDisplay.querySelector('.forecast-section__condition-text').textContent = city.list[count].weather[0].main;
            infoDisplay.querySelector('.forecast-section__condition-picture').style.backgroundImage =
                `url("http://openweathermap.org/img/wn/${city.list[count].weather[0].icon}@2x.png")`
            count++;
        }
    }

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

export async function getWeatherInfo(cityName, currentWeatherAPI, forecastWeatherAPI) {
    const currentWeatherUrl = `${currentWeatherAPI}?q=${cityName}&appid=${APIUrls.Key}`;
    const forecastWeatherURL = `${forecastWeatherAPI}?q=${cityName}&appid=${APIUrls.Key}`;

    try {
        let currentCity = await serverRequest(currentWeatherUrl);
        renderWeatherInfo(currentCity, currentWeatherUrl);

        let forecastCity = await serverRequest(forecastWeatherURL);
        renderWeatherInfo(forecastCity, forecastWeatherURL);
    } catch (error) {
        errorProcessing(error);
    }
}

function renderFavoriteCities(cities, index) {
    const renderCity = createNewCity( cities[index] );

    UI_ELEMENTS.favoriteCitiesList.append(renderCity);

    favoritesCities.push(renderCity.querySelector('.locations-list__city-name').textContent );
    saveToStorageFavoriteCity(favoritesCities);

    renderCity.querySelector('.locations-list__city-name').addEventListener('click', function () {
        getWeatherInfo(renderCity.textContent, APIUrls.currentWeather, APIUrls.forecastWeather);
        UI_ELEMENTS.nowDisplay.AddToFavorites.style.backgroundImage = 'url("./assets/images/favorite-active.svg")';
    })

    renderCity.querySelector('.locations-list__delete-city').addEventListener('click', function () {
        removeFromFavorite(renderCity);
    })

    if (index >= cities.length - 1) {
        return;
    }

    renderFavoriteCities(cities, index + 1);
}

UI_ELEMENTS.form.addEventListener('submit', function () {
    event.preventDefault();
    getWeatherInfo(UI_ELEMENTS.citySearchInput.value, APIUrls.currentWeather, APIUrls.forecastWeather);
    UI_ELEMENTS.nowDisplay.AddToFavorites.style.backgroundImage = 'url("./assets/images/favorite.svg")';
})

if (localStorage.getItem('favoriteCities') ) {
    const json = JSON.parse( localStorage.getItem('favoriteCities') );
    renderFavoriteCities(json, 0);
}

if ( localStorage.getItem('currentCity') ) {
    getWeatherInfo(localStorage.getItem('currentCity'), APIUrls.currentWeather, APIUrls.forecastWeather);
}
