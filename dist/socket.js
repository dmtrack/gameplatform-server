"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const socket_controllers_1 = require("socket-controllers");
exports.default = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: { origin: '*' },
    });
    (0, socket_controllers_1.useSocketServer)(io, { controllers: [__dirname + '/api/controllers/*.ts'] });
    return io;
};
//# sourceMappingURL=socket.js.map