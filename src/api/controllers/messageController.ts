import {
    ConnectedSocket,
    MessageBody,
    OnMessage,
    SocketController,
    SocketIO,
} from 'socket-controllers';
import { Server, Socket } from 'socket.io';
import EVENTS from '../../config/events';
import { IEnterUserProps, IMessageParams } from '../../interfaces/messages';
import { addUser } from '../../users';

@SocketController()
export class ChatController {
    @OnMessage(EVENTS.SERVER.join_chat)
    public async joinChat(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: IEnterUserProps
    ) {
        const { user, isExist } = await addUser(message.name);

        let userMessage = isExist
            ? `${user.name}, let's continue messaging`
            : `${user.name} welcome to the room ${user.room}`;

        await socket.emit(EVENTS.SERVER.chat_joined, {
            data: {
                user: {
                    name: `wall-e`,
                    message: userMessage,
                },
            },
        });
    }
    @OnMessage(EVENTS.SERVER.message)
    public async sendMessage(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() params: any
    ) {
        await io.to(params.room).emit(EVENTS.SERVER.on_message, params);
    }
}
