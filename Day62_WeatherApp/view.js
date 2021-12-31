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