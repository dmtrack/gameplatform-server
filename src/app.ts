const express = require('express');
const http = require('http');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
import 'reflect-metadata';
const indexRouter = require('./routes/index');

export const app = express();

import dotenv from 'dotenv';
dotenv.config();

import { addUser, findUser, getRoomUsers, removeUser } from './users';
import socketServer from './socket';

const route = require('./routes/routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(function (req, res, next) {
    next(createError(404));
});

const admin = 'admin';
export const server = http.createServer(app);

const port = process.env.PORT;

const io = socketServer(server);

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        socket.join(room);
        const { user, isExist } = addUser({ name, room });
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
            data: { users: getRoomUsers(user.room) },
        });
    });

    socket.on('sendMessage', ({ message, params }) => {
        const user = findUser(params);

        if (user) {
            io.to(user.room).emit('message', {
                data: { user: { name: user.name, message: message } },
            });
        }
    });

    socket.on('leftRoom', ({ params }) => {
        const user = removeUser(params);

        if (user) {
            const { room, name } = user;
            io.to(user.room).emit('message', {
                data: {
                    user: { name: `${admin}`, message: `${name} has left` },
                },
            });
            io.to(user.room).emit('joinRoom', {
                data: { users: getRoomUsers(user.room) },
            });
        }
    });

    io.on('disconnect', () => {
        console.log('Disconnect');
    });
});

app.use('/', indexRouter);

export default app;
