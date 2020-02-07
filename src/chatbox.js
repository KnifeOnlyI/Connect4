const messageBox = document.querySelector('#chatbox-message');
const chatbox = document.querySelector('#chatbox-body');

function send() {
    const text = messageBox.value;

    if (!text) return;

    messageBox.value = '';

    chatbox.appendChild(newMessage(text, 'right', playerColor));
    scrollToBottom();

    gameChat.push({
        'text': text,
        'player': playerColor
    });

    gamesStore.doc(gameId).update({
        chat: gameChat
    });

}

function receive(text) {
    chatbox.appendChild(newMessage(text, 'left'));
    scrollToBottom();
}

function setChat(chat) {
    gameChat = chat;

    while (chatbox.firstChild) {
        chatbox.removeChild(chatbox.firstChild);
    }

    chat.forEach(message => {
        const pos = message.player === playerColor ? 'right' : 'left';
        chatbox.appendChild(newMessage(message.text, pos, message.player));
        scrollToBottom();
    });
}

function scrollToBottom() {
    chatbox.scrollTop = chatbox.scrollHeight;
}

function newMessage(text, pos, color) {
    let message = document.createElement('div');
    message.classList = `message ${pos} ${color}`;
    message.innerText = text;
    return message;
}