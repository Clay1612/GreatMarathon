import {favoritesCities, getWeatherInfo} from './main.js'
import {saveToStorageFavoriteCity, removeFromStorageFavoriteCity} from "./localStorage.js";

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
        getWeatherInfo(currentCity.textContent);
        UI_ELEMENTS.nowDisplay.AddToFavorites.style.backgroundImage = 'url("./assets/images/favorite-active.svg")';
    })

    currentCity.querySelector('.locations-list__delete-city').addEventListener('click', function () {
        removeFromFavorite(currentCity);
    })
}