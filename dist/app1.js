"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
exports.app = express();
const route = require('./routes/routes');
exports.app.use(cors({ origin: '*' }));
exports.app.use(route);
const server = http.createServer(exports.app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        socket.join(room);
    });
    io.on('disconnect', () => {
        console.log('Disconnect');
    });
});
server.listen(5000, () => {
    console.log('Server is running');
});
//# sourceMappingURL=app1.js.map