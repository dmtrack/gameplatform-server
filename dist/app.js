"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express = require('express');
const http = require('http');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require("reflect-metadata");
const indexRouter = require('./routes/index');
exports.app = express();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const users_1 = require("./users");
const socket_1 = __importDefault(require("./socket"));
const route = require('./routes/routes');
exports.app.use(logger('dev'));
exports.app.use(express.json());
exports.app.use(express.urlencoded({ extended: false }));
exports.app.use(cookieParser());
exports.app.use(express.static(path.join(__dirname, 'public')));
exports.app.use(cors());
exports.app.use(function (req, res, next) {
    next(createError(404));
});
const admin = 'admin';
exports.server = http.createServer(exports.app);
const port = process.env.PORT;
const io = (0, socket_1.default)(exports.server);
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
exports.server.listen(port, () => {
    console.log(`Server has successfully started on port:${port}`);
});
exports.app.use(route);
// app.use('/', indexRouter);
exports.default = exports.app;
//# sourceMappingURL=app.js.map