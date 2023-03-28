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
const admin = 'admin';
const io = new Server(exports.server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        socket.join(room);
        const { user, isExist } = (0, users_1.addUser)({ name, room });
        let userMessage = isExist
            ? `${user.name}, let's continue messaging`
            : `${user.name} welcome to the room ${user.room}`;
        socket.emit('message', {
            data: {
                user: {
                    name: `${admin}`,
                    message: userMessage,
                },
            },
        });
        socket.broadcast.to(user.room).emit('message', {
            data: {
                user: {
                    name: `${admin}`,
                    message: userMessage,
                },
            },
        });
        io.to(user.room).emit('joinRoom', {
            data: { users: (0, users_1.getRoomUsers)(user.room) },
        });
    });
    socket.on('sendMessage', ({ message, params }) => {
        const user = (0, users_1.findUser)(params);
        if (user) {
            io.to(user.room).emit('message', {
                data: { user: { name: user.name, message: message } },
            });
        }
    });
    socket.on('leftRoom', ({ params }) => {
        const user = (0, users_1.removeUser)(params);
        if (user) {
            const { room, name } = user;
            io.to(user.room).emit('message', {
                data: {
                    user: { name: `${admin}`, message: `${name} has left` },
                },
            });
            io.to(user.room).emit('joinRoom', {
                data: { users: (0, users_1.getRoomUsers)(user.room) },
            });
        }
    });
    io.on('disconnect', () => {
        console.log('Disconnect');
    });
});
//# sourceMappingURL=app.js.map