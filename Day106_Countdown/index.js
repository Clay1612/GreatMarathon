import { intervalToDuration, formatDuration  } from 'date-fns';

const UI_ELEMENTS = {
    countButton: document.querySelector('.content__countdown-button'),
    dateField: document.querySelector('.content__enter-date-field'),
    timerField: document.querySelector('.content__countdown-timer-field'),
}

UI_ELEMENTS.countButton.addEventListener('click', function (){
    if (Date.now() < new Date(UI_ELEMENTS.dateField.value) - 10800000) {
        const interval = intervalToDuration({
            start: Date.now(),
            end: new Date(UI_ELEMENTS.dateField.value) - 10800000,
        });
        UI_ELEMENTS.timerField.value = formatDuration(interval);
    } else {
        UI_ELEMENTS.timerField.value = 'Choose date after current date';
    }
});


