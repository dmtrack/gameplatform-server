"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const users_1 = require("./users");
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
exports.app = express();
const route = require('./routes/routes');
exports.app.use(cors({ origin: '*' }));
exports.app.use(route);
exports.server = http.createServer(exports.app);
const io = new Server(exports.server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        socket.join(room);
        console.log(socket);
        const { user } = (0, users_1.addUser)({ name, room });
        console.log(user.room);
        // socket.emit('message', {
        //     data: {
        //         name: 'admin',
        //         message: `user with ${name} is entered to the room`,
        //     },
        // });
        socket.broadcast.to(user.room).emit('enter', {
            data: { user: { name: 'admin', message: `${user} has joined}` } },
        });
    });
    io.on('disconnect', () => {
        console.log('Disconnect');
    });
});
//# sourceMappingURL=app.js.map