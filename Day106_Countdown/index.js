import { intervalToDuration, formatDuration } from 'date-fns';
import { saveToLocalStorage, clearLocalStorage } from "./localStorage";

const UI_ELEMENTS = {
    countButton: document.querySelector('.content__countdown-button'),
    dateField: document.querySelector('.content__enter-date-field'),
    timerField: document.querySelector('.content__countdown-timer-field'),
    stopButton: document.querySelector('.content__stop-count-button'),
}
let timerID = undefined;

UI_ELEMENTS.countButton.addEventListener('click', renderTimer);
UI_ELEMENTS.stopButton.addEventListener('click', stopRender);

function renderTimer() {
    const targetDate = new Date(UI_ELEMENTS.dateField.value) - 10800000;

    if (Date.now() < targetDate) {
        timerID = setInterval(function () {
            const interval = intervalToDuration({
                start: Date.now(),
                end: targetDate,
            });
            UI_ELEMENTS.timerField.value = formatDuration(interval);
        }, 1000);

        saveToLocalStorage(targetDate);
    } else {
        UI_ELEMENTS.timerField.value = 'Choose date after current date';
    }
}

function stopRender() {
    clearTimeout(timerID);
    UI_ELEMENTS.timerField.value = '';
    UI_ELEMENTS.dateField.value = '';

    clearLocalStorage();
}

if (localStorage.targetDate) {
    UI_ELEMENTS.dateField.value = `${localStorage.year}-${localStorage.month}-${localStorage.day}`;
    renderTimer();
}