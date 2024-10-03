const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the root, 'css', and 'js' directories
app.use(express.static(path.join(__dirname, '..'))); // Root directory
app.use(express.static(path.join(__dirname, '../css'))); // CSS folder
app.use(express.static(path.join(__dirname, '../js'))); // JS folder

// Serve the index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

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
