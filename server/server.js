const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('../')); // Serve static files from the root

io.on('connection', (socket) => {
    socket.on('update', (data) => {
        socket.broadcast.emit('update', data);
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
