const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(8000, () => {
    console.log('Sunucu 3005 portunda çalışıyor.');
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı:', socket.id);

    // Kullanıcıdan mesaj al
    socket.on('chatMessage', (data) => {
        console.log('Mesaj alındı:', data.message);
        io.emit('outputMessage', { username: data.username, message: data.message });
    });

    socket.on('disconnect', () => {
        console.log('Bir kullanıcı ayrıldı:', socket.id);
    });
});
