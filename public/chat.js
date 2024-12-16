const socket = io();

// Giriş yapma işlemi
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    if (username) {
        socket.emit('userJoined', username); // Kullanıcı adını göndereceğiz
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('chat-screen').style.display = 'flex';
    }
});

// Mesaj gönderme işlemi
document.getElementById('submitBtn').addEventListener('click', () => {
    sendMessage();
});

// Enter tuşuyla mesaj gönderme
document.getElementById('message').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Mesaj gönderme fonksiyonu
function sendMessage() {
    const message = document.getElementById('message').value.trim();
    if (message) {
        const username = document.getElementById('username').value;
        socket.emit('chatMessage', { username, message });
        document.getElementById('message').value = '';
    }
}

// Yeni mesaj geldiğinde
socket.on('outputMessage', (data) => {
    displayMessage(data.username, data.message);
});

// Mesajı ekrana yazdırma
function displayMessage(username, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${username}:</strong> ${message}`;
    document.getElementById('output').appendChild(messageElement);
    scrollToBottom();
}

// Mesaj kutusunu en alta kaydırma
function scrollToBottom() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Çıkış yapma işlemi
document.getElementById('logout-btn').addEventListener('click', () => {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('chat-screen').style.display = 'none';
});
