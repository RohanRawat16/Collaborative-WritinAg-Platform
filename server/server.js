const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Required to correctly resolve paths

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from root, 'css' and 'js' directories
app.use(express.static(path.join(__dirname, '../')));
app.use(express.static(path.join(__dirname, '../css')));
app.use(express.static(path.join(__dirname, '../js')));

io.on('connection', (socket) => {
    socket.on('update', (data) => {
        socket.broadcast.emit('update', data);
    });
});

// Use the port provided by Vercel or default to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
