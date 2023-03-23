const express = require('express');
export const app = express();
const cors = require('cors');
import * as http from 'http';

app.use(cors());

const server = http.createServer(app);
