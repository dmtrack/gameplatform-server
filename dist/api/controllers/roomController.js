"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const socket_controllers_1 = require("socket-controllers");
const socket_io_1 = require("socket.io");
const events_1 = __importDefault(require("../../config/events"));
let RoomController = class RoomController {
    async joinGame(io, socket, message) {
        const connectedSockets = io.sockets.adapter.rooms.get(message.room);
        console.log(connectedSockets, 'connected sockets');
        const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id);
        if (socketRooms.length > 0 ||
            (connectedSockets && connectedSockets.size === 2)) {
            socket.emit(events_1.default.SERVER.room_join_error, {
                error: 'Room is full, please choose another room to play',
            });
        }
        else {
            await socket.join(message.room);
            socket.emit('room_joined');
            if (io.sockets.adapter.rooms.get(message.room).size === 2) {
                socket.emit(events_1.default.SERVER.start_game_first, {
                    start: false,
                    symbol: 'x',
                });
                socket.to(message.room).emit(events_1.default.SERVER.start_game_second, {
                    start: true,
                    symbol: 'o',
                });
            }
        }
        // socket.on('join', ({ name, room }) => {
        //   socket.join(room);
        //   const { user, isExist } = addUser({ name, room });
        //   let userMessage = isExist
        //       ? `${user.name}, let's continue messaging`
        //       : `${user.name} welcome to the room ${user.room}`;
        //   socket.emit('message', {
        //       data: {
        //           user: {
        //               name: `${admin}`,
        //               message: userMessage,
        //           },
        //       },
    }
};
__decorate([
    (0, socket_controllers_1.OnMessage)(events_1.default.SERVER.join_game),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server,
        socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "joinGame", null);
RoomController = __decorate([
    (0, socket_controllers_1.SocketController)()
], RoomController);
exports.RoomController = RoomController;
//# sourceMappingURL=roomController.js.map