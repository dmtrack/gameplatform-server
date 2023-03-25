import { addUser } from './users';

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
export const app = express();
const route = require('./routes/routes');
app.use(cors({ origin: '*' }));
app.use(route);

export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        socket.join(room);

        const { user } = addUser({ name, room });

        socket.emit('message', {
            data: {
                name: 'admin',
                message: `user ${name} is entered to the room`,
            },
        });
        socket.broadcast.to(user.room).emit('message', {
            data: {
                user: { name: 'admin', message: `${user.name} has joined}` },
            },
        });
    });

    io.on('disconnect', () => {
        console.log('Disconnect');
    });
});
