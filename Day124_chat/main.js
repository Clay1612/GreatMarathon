import {UI_ELEMENTS} from './view.js';
import {getCookie, setCookie} from "./cookie.js";

const URLs = {
	authorizationRequest: new URL('https://chat1-341409.oa.r.appspot.com/api/user'),
	patchRequest: new URL('https://chat1-341409.oa.r.appspot.com/api/user'),
	userInfo: new URL('https://chat1-341409.oa.r.appspot.com/api/user/me'),
}

UI_ELEMENTS.sentMessageForm.addEventListener('submit', function () {
	event.preventDefault();

	addMessage();
});

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

UI_ELEMENTS.popups.confirmationCloseButton.addEventListener('click', function () {
	UI_ELEMENTS.popups.popupOverlay.style.display = 'none';
	UI_ELEMENTS.popups.confirmationPopup.style.display = 'none';
});

UI_ELEMENTS.popups.optionsForm.addEventListener('submit', function () {
	event.preventDefault();

	const name = document.querySelector('.options-popup__name-field').value;
	setCookie('name', name);
	changeNameRequest(URLs.patchRequest);

	document.querySelector('.options-popup__name-field').value = '';
	UI_ELEMENTS.popups.popupOverlay.style.display = 'none';
	UI_ELEMENTS.popups.confirmationPopup.style.display = 'none';
})

UI_ELEMENTS.popups.authorizationForm.addEventListener('submit', function () {
	event.preventDefault();

	sendAuthorizationCode(URLs.authorizationRequest);
	UI_ELEMENTS.popups.authorizationPopup.style.display = 'none';
	UI_ELEMENTS.popups.confirmationPopup.style.display = 'grid';
});

UI_ELEMENTS.popups.confirmationForm.addEventListener('submit', function () {
	event.preventDefault();

	const token = document.querySelector('.confirmation-popup__code-field').value;
	setCookie('token', token);

	document.querySelector('.confirmation-popup__code-field').value = '';
	UI_ELEMENTS.popups.popupOverlay.style.display = 'none';
	UI_ELEMENTS.popups.confirmationPopup.style.display = 'none';
})

function addMessage() {
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

function sendAuthorizationCode(URL) {
	const mail = {
		email: document.querySelector('.authorization-popup__mail-field').value,
	}

	fetch(`${URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(mail),
	})
}

function changeNameRequest(URL) {
	const name = {
		name: getCookie('name'),
	}

	fetch(`${URL}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Authorization': `Bearer ${ getCookie('token') }`,
		},
		body: JSON.stringify(name),
	})
}

function getUserInfo(URL) {
	const request = fetch(`${URL}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Authorization': `Bearer ${ getCookie('token') }`,
		},
	});

	request
		.then(function (response) {
			return response.json()
		})
		.then(function (response) {
			console.log(response);
		})
}


setTimeout(function () {
	getUserInfo(URLs.userInfo);
}, 60000);