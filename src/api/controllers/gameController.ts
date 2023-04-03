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
export class GameController {
    private getSocketGameRoom(socket: Socket): string {
        const socketRooms = Array.from(socket.rooms.values()).filter(
            (r) => r !== socket.id
        );
        const gameRoom = socketRooms && socketRooms[0];

        return gameRoom;
    }
    @OnMessage(EVENTS.SERVER.update_game)
    public async updateGame(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: any
    ) {
        const gameRoom = this.getSocketGameRoom(socket);
        socket.to(gameRoom).emit(EVENTS.SERVER.on_game_update, message);
    }
    @OnMessage(EVENTS.SERVER.game_win)
    public async gameWin(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: any
    ) {
        const gameRoom = this.getSocketGameRoom(socket);
        socket.to(gameRoom).emit(EVENTS.SERVER.on_game_win, message);
    }
}
