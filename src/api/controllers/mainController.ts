import {
    ConnectedSocket,
    OnConnect,
    SocketController,
    SocketIO,
} from 'socket-controllers';
import { Socket, Server } from 'socket.io';
import { addUser, findUser, getRoomUsers, removeUser } from '../../users';

@SocketController()
export class MainController {
    @OnConnect()
    public onConnection(
        @ConnectedSocket() socket: Socket,
        @SocketIO() io: Server
    ) {
        console.log('new socket connected', socket.id);
    }
}
