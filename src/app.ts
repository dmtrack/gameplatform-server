var express = require('express');
const cors = require('cors');
import 'reflect-metadata';
const http = require('http');

const indexRouter = require('./routes/index');
const app = express();

import dotenv from 'dotenv';
dotenv.config();

app.use(cors());

app.use('/', indexRouter);

export default app;
