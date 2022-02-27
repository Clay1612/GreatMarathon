export const UI_ELEMENTS = {
	messageTemplate: document.querySelector('.chat-content__message-template'),
	sentMessageForm: document.querySelector('.chat-footer__form'),
	chatContent: document.querySelector('.chat-content'),
	optionsButton: document.querySelector('.chat-header__options-button'),
	authorizationButton: document.querySelector('.chat-header__authorization-button'),
	popups: {
		popupOverlay: document.querySelector('.popup-wrapper'),
		optionsPopup: document.querySelector('.options-popup'),
		optionsCloseButton: document.querySelector('.options-popup__close-button'),
		optionsForm: document.querySelector('.options-popup__name-form'),
		authorizationPopup: document.querySelector('.authorization-popup'),
		authorizationCloseButton: document.querySelector('.authorization-popup__close-button'),
		authorizationForm: document.querySelector('.authorization-popup__mail-form'),
		confirmationPopup: document.querySelector('.confirmation-popup'),
		confirmationCloseButton: document.querySelector('.confirmation-popup__close-button'),
		confirmationForm: document.querySelector('.confirmation-popup__code-form'),
	},
};