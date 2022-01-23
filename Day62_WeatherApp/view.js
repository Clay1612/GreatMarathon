import {favoritesCities, APIUrls, getWeatherInfo} from './main.js'
import {saveToStorageFavoriteCity, removeFromStorageFavoriteCity} from "./localStorage.js";

export const UI_ELEMENTS = {
    form: document.querySelector('.form'),
    citySearchInput: document.querySelector('.form__search-text-input'),
    switchButtons : document.querySelectorAll('.weather-info__switch-button'),
    nowDisplay : {
        display: document.querySelector('.now-section'),
        temperature: document.querySelector('.now-section__temperature'),
        city: document.querySelector('.now-section__city > span'),
        condition: document.querySelector('.now-section__condition'),
        AddToFavorites: document.querySelector('.now-section__favorites-button'),
    },
    favoriteCitiesList: document.querySelector('.locations-list__cities-list'),
    detailsDisplay: {
        display: document.querySelector('.details-section'),
        city: document.querySelector('.details-section__city'),
        temperature: document.querySelector('.weather-temperature'),
        feelsLike: document.querySelector('.weather-feels-like'),
        weatherCondition: document.querySelector('.weather-condition'),
        sunrise: document.querySelector('.weather-sunrise'),
        sunset: document.querySelector('.weather-sunset'),
    },
    forecastDisplay: {
        display: document.querySelector('.forecast-section'),
        city: document.querySelector('.forecast-section__city'),
        forecastInfoSection: document.querySelectorAll('.forecast-section__weather-info-block'),
    },
}

window.addEventListener('unhandledrejection', function (error) {
    alert(`Sorry, ${error.reason}, script failed`);
})

export function createNewCity(cityName) {
    const newCity = document.createElement('li');
    newCity.className = 'locations-list__city';

    const name = document.createElement('button');
    name.className = 'locations-list__city-name';
    name.textContent = cityName;

    const cityDeleteButton = document.createElement('button');
    cityDeleteButton.className = 'locations-list__delete-city';

    newCity.append(name, cityDeleteButton);

    return newCity;
}

function isCityInList(){
    return favoritesCities.find(function (item) {
        return item === UI_ELEMENTS.nowDisplay.city.textContent
    })
}

function addToFavorite() {
    if (isCityInList() || UI_ELEMENTS.nowDisplay.city.textContent === 'City' ) {
        alert("City already in list");
    } else {
        const newCity = createNewCity(UI_ELEMENTS.nowDisplay.city.textContent);

        UI_ELEMENTS.favoriteCitiesList.append(newCity);
        favoritesCities.push( newCity.querySelector('.locations-list__city-name').textContent );
        UI_ELEMENTS.nowDisplay.AddToFavorites.style.backgroundImage = 'url("./assets/images/favorite-active.svg")';
        saveToStorageFavoriteCity(favoritesCities);

        return newCity;
    }
}

export function removeFromFavorite(currentCity) {
    favoritesCities.splice( favoritesCities.indexOf( currentCity.querySelector('.locations-list__city-name').textContent ),  1 )
    currentCity.remove();
    removeFromStorageFavoriteCity(currentCity.querySelector('.locations-list__city-name').textContent);

   if(currentCity.querySelector('.locations-list__city-name').textContent === UI_ELEMENTS.nowDisplay.city.textContent) {
       UI_ELEMENTS.nowDisplay.AddToFavorites.style.backgroundImage = 'url("./assets/images/favorite.svg")';
   }
}

export function favoriteCitiesHandler() {
    const currentCity = addToFavorite();
    if (currentCity === undefined) return;

    currentCity.querySelector('.locations-list__city-name').addEventListener('click', function () {
        getWeatherInfo(currentCity.textContent, APIUrls.currentWeather, APIUrls.forecastWeather);
        UI_ELEMENTS.nowDisplay.AddToFavorites.style.backgroundImage = 'url("./assets/images/favorite-active.svg")';
    })

    currentCity.querySelector('.locations-list__delete-city').addEventListener('click', function () {
        removeFromFavorite(currentCity);
    })
}

function switchInfoDisplay(currentButton, switchButtons) {
    for (let switchButton of switchButtons) {
        switchButton.classList.remove('button-active');
    }

    currentButton.classList.add('button-active');

    switch (currentButton.textContent) {
        case 'Now':
            UI_ELEMENTS.nowDisplay.display.style.display = 'grid';
            UI_ELEMENTS.detailsDisplay.display.style.display = 'none';
            UI_ELEMENTS.forecastDisplay.display.style.display = 'none';
            break;
        case 'Details':
            UI_ELEMENTS.nowDisplay.display.style.display = 'none';
            UI_ELEMENTS.detailsDisplay.display.style.display = 'grid';
            UI_ELEMENTS.forecastDisplay.display.style.display = 'none';
            break;
        case 'Forecast':
            UI_ELEMENTS.nowDisplay.display.style.display = 'none';
            UI_ELEMENTS.detailsDisplay.display.style.display = 'none';
            UI_ELEMENTS.forecastDisplay.display.style.display = 'grid';
            break;
    }
}

function addButtonSwitchOnClick(buttons, index) {

    buttons[index].addEventListener('click', function () {
        switchInfoDisplay(buttons[index], UI_ELEMENTS.switchButtons)
    });

    if (index < buttons.length - 1) {
        addButtonSwitchOnClick(buttons, index + 1);
    }
}

addButtonSwitchOnClick(UI_ELEMENTS.switchButtons, 0);
