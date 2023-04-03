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
exports.ChatController = void 0;
const socket_controllers_1 = require("socket-controllers");
const socket_io_1 = require("socket.io");
const events_1 = __importDefault(require("../../config/events"));
const users_1 = require("../../users");
let ChatController = class ChatController {
    async joinChat(io, socket, message) {
        const { user, isExist } = await (0, users_1.addUser)(message.name);
        let userMessage = isExist
            ? `${user.name}, let's continue messaging`
            : `${user.name} welcome to the room ${user.room}`;
        await socket.emit(events_1.default.SERVER.chat_joined, {
            data: {
                user: {
                    name: `wall-e`,
                    message: userMessage,
                },
            },
        });
    }
    async sendMessage(io, socket, params) {
        await io.to(params.room).emit(events_1.default.SERVER.on_message, params);
    }
};
__decorate([
    (0, socket_controllers_1.OnMessage)(events_1.default.SERVER.join_chat),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server,
        socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "joinChat", null);
__decorate([
    (0, socket_controllers_1.OnMessage)(events_1.default.SERVER.message),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server,
        socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
ChatController = __decorate([
    (0, socket_controllers_1.SocketController)()
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=messageController.js.map