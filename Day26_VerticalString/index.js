function showVerticalMessage(message) {
    let verticalMessage = '';
    if (message.length > 10) {
        message = message.substr(0, 10);
    }
    for (let char of message) {
        verticalMessage += char + '\n';
    }
    if (message[0] === 'м') {
        verticalMessage = verticalMessage[0].toUpperCase() + verticalMessage.slice(1);
    }
    return verticalMessage;
}

console.log( showVerticalMessage('марафон') )