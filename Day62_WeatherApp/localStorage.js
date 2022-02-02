export function saveToStorageFavoriteCity(favoriteCities) {
    const json = JSON.stringify(favoriteCities)
    localStorage.setItem('favoriteCities', json);
}

export function removeFromStorageFavoriteCity(city) {
    const favoriteCities = JSON.parse( localStorage.getItem('favoriteCities') );
    favoriteCities.splice( favoriteCities.indexOf( city ),  1 );

    saveToStorageFavoriteCity(favoriteCities);
}