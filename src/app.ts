const express = require('express');
const http = require('http');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
import 'reflect-metadata';
const indexRouter = require('./routes/index');

export const app = express();

import dotenv from 'dotenv';
dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(indexRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

export const server = http.createServer(app);

export default app;
