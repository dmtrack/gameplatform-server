import { Server } from 'socket.io';
import { useSocketServer } from 'socket-controllers';

const controllerPath = process.env.CONTROLLER_PATH;

export default (httpServer) => {
    const io = new Server(httpServer, {
        cors: { origin: '*' },
    });

    useSocketServer(io, { controllers: [__dirname + `${controllerPath}`] });

    return io;
};
