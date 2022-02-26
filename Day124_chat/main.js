import {UI_ELEMENTS} from './view.js';

UI_ELEMENTS.sentMessageForm.addEventListener('submit', addMessage);

UI_ELEMENTS.optionsButton.addEventListener('click', function () {
	UI_ELEMENTS.popups.popupOverlay.style.display = 'block';
	UI_ELEMENTS.popups.optionsPopup.style.display = 'grid';
});

UI_ELEMENTS.popups.optionsCloseButton.addEventListener('click', function () {
	UI_ELEMENTS.popups.popupOverlay.style.display = 'none';
	UI_ELEMENTS.popups.optionsPopup.style.display = 'none';
});

UI_ELEMENTS.authorizationButton.addEventListener('click', function () {
	UI_ELEMENTS.popups.popupOverlay.style.display = 'block';
	UI_ELEMENTS.popups.authorizationPopup.style.display = 'grid';
});

UI_ELEMENTS.popups.authorizationCloseButton.addEventListener('click', function () {
	UI_ELEMENTS.popups.popupOverlay.style.display = 'none';
	UI_ELEMENTS.popups.authorizationPopup.style.display = 'none';
});

UI_ELEMENTS.popups.authorizationForm.addEventListener('submit', function () {
	event.preventDefault();

	UI_ELEMENTS.popups.authorizationPopup.style.display = 'none';
	UI_ELEMENTS.popups.confirmationPopup.style.display = 'grid';
});

UI_ELEMENTS.popups.confirmationCloseButton.addEventListener('click', function () {
	UI_ELEMENTS.popups.popupOverlay.style.display = 'none';
	UI_ELEMENTS.popups.confirmationPopup.style.display = 'none';
});

function addMessage() {
	event.preventDefault();

	const message = UI_ELEMENTS.messageTemplate.content.cloneNode(true);

	if (document.querySelector('.chat-footer__message-input').value) {
		message.querySelector('.chat-content__text').textContent = document.querySelector('.chat-footer__message-input').value;
		message.querySelector('.chat-content__time').textContent = getCurrentTime();
		UI_ELEMENTS.chatContent.append(message);

		UI_ELEMENTS.chatContent.scrollTop = UI_ELEMENTS.chatContent.scrollHeight;
		document.querySelector('.chat-footer__message-input').value = '';
	}
}

function getCurrentTime() {
	const hours = new Date().getHours();
	const minutes = new Date().getMinutes();
	let time;

	if (minutes <= 9) {
		time = `${hours}:0${minutes}`;
	} else {
		time = `${hours}:${minutes}`;
	}

	return time;
}