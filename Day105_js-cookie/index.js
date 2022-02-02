import Cookies from './node_modules/js-cookie/dist/js.cookie.min.mjs'

const cityName = document.querySelector('.city').textContent;

Cookies.set('currentCity', cityName);
console.log( Cookies.get('currentCity') );

console.log( Cookies.get() );
