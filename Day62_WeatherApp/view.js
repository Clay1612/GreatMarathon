import {favoritesCities, getWeatherInfo} from './main.js'

export const UI_ELEMENTS = {
    form: document.querySelector('.form'),
    citySearchInput: document.querySelector('.form__search-text-input'),
    nowDisplay : {
        temperature: document.querySelector('.now-section__temperature'),
        city: document.querySelector('.now-section__city > span'),
        condition: document.querySelector('.now-section__condition'),
        AddToFavorites: document.querySelector('.now-section__favorites-button'),
    },
    favoriteCitiesList: document.querySelector('.locations-list__cities-list'),
}

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

export function isCityInList(){
    return favoritesCities.find(function (item) {
        return item.querySelector('.locations-list__city-name').textContent === UI_ELEMENTS.nowDisplay.city.textContent
    })
}

export function addToFavorite() {
    if (isCityInList() || UI_ELEMENTS.nowDisplay.city.textContent === 'City' ) {
        alert("City already in list");
    } else {
        const newCity = createNewCity(UI_ELEMENTS.nowDisplay.city.textContent);
        UI_ELEMENTS.favoriteCitiesList.append(newCity);
        favoritesCities.push( newCity );
        UI_ELEMENTS.nowDisplay.AddToFavorites.style.backgroundImage = 'url("./assets/images/favorite-active.svg")';

        return newCity;
    }
}

export function removeFromFavorite(currentCity) {
    favoritesCities.splice( favoritesCities.indexOf(currentCity),  1 )
    currentCity.remove();
    UI_ELEMENTS.nowDisplay.AddToFavorites.style.backgroundImage = 'url("./assets/images/favorite.svg")';
}

export function favoriteCitiesHandler() {
    const currentCity = addToFavorite();
    if (currentCity === undefined) return;

    currentCity.querySelector('.locations-list__city-name').addEventListener('click', function () {
        getWeatherInfo(currentCity.textContent);
    })

    currentCity.querySelector('.locations-list__delete-city').addEventListener('click', function () {
        removeFromFavorite(currentCity);
    })
}