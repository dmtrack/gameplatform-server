const express = require('express');
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const cors = require('cors');

const port = process.env.SOCKETPORT;
import * as http from 'http';

app.use(cors());

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
