import { addUser, findUser, getRoomUsers, removeUser } from './users';
import dotenv from 'dotenv';

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
export const app = express();
const route = require('./routes/routes');
app.use(cors({ origin: '*' }));
app.use(route);
dotenv.config();

const PORT = process.env.SOCKETPORT;

export const server = http.createServer(app);
const admin = 'admin';

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

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

server.listen(PORT, () => {
    console.log(`Server has successfully started on port:${PORT}`);
});
