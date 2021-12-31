import {UI_ELEMENTS, createNewCity} from './view.js';

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

function renderWeatherInfo(city) {
    UI_ELEMENTS.nowDisplay.temperature.innerHTML = `${Math.round(city.main.temp)}&#176`;
    UI_ELEMENTS.nowDisplay.city.textContent = city.name;
    UI_ELEMENTS.nowDisplay.condition.style.backgroundImage = `url("http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png")`
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

function getWeatherInfo(cityName) {
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

//-----------------------------------------------------------------------------------------------

const favoritesCities = [];

function isCityInList(){
    return favoritesCities.find(function (item) {
        return item.querySelector('.locations-list__city-name').textContent === UI_ELEMENTS.nowDisplay.city.textContent
    })
}

function addToFavorite() {
    if (isCityInList() || UI_ELEMENTS.nowDisplay.city.textContent === 'City' ) {
        alert("City not found or it's already in list");
    } else {
        const newCity = createNewCity(UI_ELEMENTS.nowDisplay.city.textContent);
        UI_ELEMENTS.favoriteCitiesList.append(newCity);
        favoritesCities.push(newCity);
        UI_ELEMENTS.nowDisplay.AddToFavorites.style.backgroundImage = 'url("./assets/images/favorite-active.svg")';
    }
}

function removeFromFavorite(city) {
    console.log(city)
}

function favoriteCitiesHandler() {
    addToFavorite();

    favoritesCities.forEach(function (city) {
        city.querySelector('.locations-list__city-name').addEventListener('click', function (){
            getWeatherInfo(city.textContent);
        })
    })

    favoritesCities.forEach(function (city) {
        city.querySelector('.locations-list__delete-city').addEventListener('click', function () {
            removeFromFavorite(city);
        })
    })
}

UI_ELEMENTS.nowDisplay.AddToFavorites.addEventListener('click', favoriteCitiesHandler);




// const index = favoritesCities.indexOf(city);
// console.log(index);
// favoritesCities.splice( index, 1 )
// city.remove();




// UI_ELEMENTS.nowDisplay.AddToFavorites.addEventListener('click', function (){
//     const newCity = createNewCity(UI_ELEMENTS.nowDisplay.city.textContent)
//     UI_ELEMENTS.locationLIst.citiesList.append(newCity);
//
//     const cityName = newCity.querySelector('.locations-list__city-name');
//     cityName.addEventListener('click', function () {
//         getWeatherInfo(cityName.textContent);
//     })
//
//     const deleteCity = newCity.querySelector('.locations-list__delete-city');
//     deleteCity.addEventListener('click', function () {
//         newCity.remove();
//     })
// })
