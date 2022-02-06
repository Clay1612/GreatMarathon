import { intervalToDuration, formatDuration  } from 'date-fns';

const countButton = document.querySelector('.content__countdown-button');
const dateField = document.querySelector('.content__enter-date-field');
const timerField = document.querySelector('.content__countdown-timer-field');

countButton.addEventListener('click', function (){
    if (Date.now() < new Date(dateField.value) - 10800000) {
        const interval = intervalToDuration({
            start: Date.now(),
            end: new Date(dateField.value) - 10800000,
        })

        timerField.value = formatDuration(interval);
    } else {
        timerField.value = 'Choose date after current date'
    }
})


