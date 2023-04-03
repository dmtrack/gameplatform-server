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

@SocketController()
export class RoomController {
    @OnMessage(EVENTS.SERVER.join_game)
    public async joinGame(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: any
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
            socket.emit(EVENTS.SERVER.room_joined);
            console.log(message.room);

            if (io.sockets.adapter.rooms.get(message.room).size === 2) {
                socket.emit(EVENTS.SERVER.start_game, {
                    start: false,
                    symbol: 'x',
                });
                socket.to(message.room).emit(EVENTS.SERVER.start_game, {
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
}
