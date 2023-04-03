import {
    ConnectedSocket,
    MessageBody,
    OnMessage,
    SocketController,
    SocketIO,
} from 'socket-controllers';
import { Server, Socket } from 'socket.io';
import EVENTS from '../../config/events';
import { IEnterUserProps } from '../../interfaces/messages';
import { addUser } from '../../users';

@SocketController()
export class RoomController {
    @OnMessage(EVENTS.SERVER.join_game)
    public async joinGame(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: IEnterUserProps
    ) {
        const connectedSockets = io.sockets.adapter.rooms.get(message.room);
        console.log(connectedSockets, 'connected sockets');

        const socketRooms = Array.from(socket.rooms.values()).filter(
            (r) => r !== socket.id
        );

        if (
            socketRooms.length > 0 ||
            (connectedSockets && connectedSockets.size === 2)
        ) {
            socket.emit(EVENTS.SERVER.room_join_error, {
                error: 'Room is full, please choose another room to play',
            });
        } else {
            await socket.join(message.room);
            await socket.emit(EVENTS.SERVER.room_joined);

            if (io.sockets.adapter.rooms.get(message.room).size === 2) {
                console.log(socket.id);

                if (io.sockets.adapter.rooms.get(message.room).size === 2) {
                    socket.broadcast.emit(EVENTS.SERVER.start_game, {
                        start: true,
                        symbol: 'x',
                    });
                }
            }
        }
    }
}
