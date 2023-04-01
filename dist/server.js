"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const debug = require('debug')('socketio-server:server');
const http = __importStar(require("http"));
const socket_1 = __importDefault(require("./socket"));
const users_1 = require("./users");
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '8000');
app_1.default.set('port', port);
const server = http.createServer(app_1.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
const admin = 'admin';
const io = (0, socket_1.default)(server);
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
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Server Running on Port: ', port);
}
//# sourceMappingURL=server.js.map