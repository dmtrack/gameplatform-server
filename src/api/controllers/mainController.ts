import {
    ConnectedSocket,
    OnConnect,
    SocketController,
    SocketIO,
} from 'socket-controllers';
import { Socket, Server } from 'socket.io';
import { addUser, findUser, getRoomUsers, removeUser } from '../../users';

const admin = 'admin';

@SocketController()
export class MainController {
    @OnConnect()
    public onConnection(
        @ConnectedSocket() socket: Socket,
        @SocketIO() io: Server
    ) {
        console.log('new socket connected', socket.id);

        // socket.on('join', ({ name, room }) => {
        //     socket.join(room);
        //     const { user, isExist } = addUser({ name, room });
        //     let userMessage = isExist
        //         ? `${user.name}, let's continue messaging`
        //         : `${user.name} welcome to the room ${user.room}`;

        //     socket.emit('message', {
        //         data: {
        //             user: {
        //                 name: `${admin}`,
        //                 message: userMessage,
        //             },
        //         },
        //     });
        //     socket.broadcast.to(user.room).emit('message', {
        //         data: {
        //             user: {
        //                 name: `${admin}`,
        //                 message: userMessage,
        //             },
        //         },
        //     });
        //     io.to(user.room).emit('joinRoom', {
        //         data: { users: getRoomUsers(user.room) },
        //     });
        // });

        // socket.on('sendMessage', ({ message, params }) => {
        //     const user = findUser(params);

        //     if (user) {
        //         io.to(user.room).emit('message', {
        //             data: { user: { name: user.name, message: message } },
        //         });
        //     }
        // });

        // socket.on('leftRoom', ({ params }) => {
        //     const user = removeUser(params);

        //     if (user) {
        //         const { room, name } = user;
        //         io.to(user.room).emit('message', {
        //             data: {
        //                 user: { name: `${admin}`, message: `${name} has left` },
        //             },
        //         });
        //         io.to(user.room).emit('joinRoom', {
        //             data: { users: getRoomUsers(user.room) },
        //         });
        //     }
        // });

        // io.on('disconnect', () => {
        //     console.log('Disconnect');
        // });
    }
}
