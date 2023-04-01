import 'reflect-metadata';
import app from './app';
const debug = require('debug')('socketio-server:server');
import * as http from 'http';
import socketServer from './socket';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

const server = http.createServer(app);
console.log(server);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// const admin = 'admin';
const io = socketServer(server);

// io.on('connection', (socket) => {
//     socket.on('join', ({ name, room }) => {
//         socket.join(room);
//         const { user, isExist } = addUser({ name, room });
//         let userMessage = isExist
//             ? `${user.name}, let's continue messaging`
//             : `${user.name} welcome to the room ${user.room}`;

//         socket.emit('message', {
//             data: {
//                 user: {
//                     name: `${admin}`,
//                     message: userMessage,
//                 },
//             },
//         });
//         socket.broadcast.to(user.room).emit('message', {
//             data: {
//                 user: {
//                     name: `${admin}`,
//                     message: userMessage,
//                 },
//             },
//         });
//         io.to(user.room).emit('joinRoom', {
//             data: { users: getRoomUsers(user.room) },
//         });
//     });

//     socket.on('sendMessage', ({ message, params }) => {
//         const user = findUser(params);

//         if (user) {
//             io.to(user.room).emit('message', {
//                 data: { user: { name: user.name, message: message } },
//             });
//         }
//     });

//     socket.on('leftRoom', ({ params }) => {
//         const user = removeUser(params);

//         if (user) {
//             const { room, name } = user;
//             io.to(user.room).emit('message', {
//                 data: {
//                     user: { name: `${admin}`, message: `${name} has left` },
//                 },
//             });
//             io.to(user.room).emit('joinRoom', {
//                 data: { users: getRoomUsers(user.room) },
//             });
//         }
//     });

//     io.on('disconnect', () => {
//         console.log('Disconnect');
//     });
// });

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind =
        typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);

    console.log('Server Running on Port: ', port);
}
