import { fromUnixTime } from 'date-fns';

export function saveToLocalStorage(date) {
    const targetDate = fromUnixTime(date / 1000);
    localStorage.setItem('targetDate', targetDate);

    if (targetDate.getDate() < 10) {
        localStorage.setItem('day', `0${targetDate.getDate()}`);
    } else {
        localStorage.setItem('day', targetDate.getDate() );
    }

    if ( (targetDate.getMonth() + 1) < 10 ) {
        localStorage.setItem('month', `0${targetDate.getMonth() + 1}`);
    } else {
        localStorage.setItem('month', targetDate.getMonth() + 1 );
    }

    localStorage.setItem('year', targetDate.getFullYear() );
}

export function clearLocalStorage() {
    localStorage.clear();
}