const UI_ELEMENTS = {
    messageTemplate: document.querySelector('.chat-content__message-template'),
    sentMessageForm: document.querySelector('.chat-footer__form'),
    chatContent: document.querySelector('.chat-content'),
};


UI_ELEMENTS.sentMessageForm.addEventListener('submit', function () {
    addMessage()
});

function addMessage() {
    event.preventDefault();

    const message = UI_ELEMENTS.messageTemplate.content.cloneNode(true);

    message.querySelector('.chat-content__text').textContent = document.querySelector('.chat-footer__message-input').value;
    UI_ELEMENTS.chatContent.append(message);
    UI_ELEMENTS.chatContent.scrollTop = UI_ELEMENTS.chatContent.scrollHeight;
    document.querySelector('.chat-footer__message-input').value = '';
}
