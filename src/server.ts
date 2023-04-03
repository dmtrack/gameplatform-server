import 'reflect-metadata';
import * as http from 'http';
import app from './app';
import socketServer from './socket';

import dotenv from 'dotenv';
dotenv.config();
const server = http.createServer(app);
const io = socketServer(server);

const port = process.env.PORT;

const start = async () => {
    try {
        server.listen(port, () => {
            console.log(`Server has successfully started on port:${port}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
