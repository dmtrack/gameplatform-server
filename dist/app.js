"use strict";
// const express = require('express');
// import * as http from 'http';
// const { Server } = require('socket.io');
// const cors = require('cors');
// export const app = express();
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// const route = require('./routes/routes');
// app.use(cors({ origin: '*' }));
// app.use(route);
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST'],
//     },
// });
// io.on('connection', (socket) => {
//     socket.on('join', ({ name, room }) => {
//         socket.join(room);
//         console.log(`user ${name} is joined the room #${room}`);
//     });
//     io.on('disconnect', (socket) => {
//         console.log('user is disconnected');
//     });
// });
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
// server.listen(5000, () => {
//     console.log('Server is running');
// });
//# sourceMappingURL=app.js.map