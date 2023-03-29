"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express = require('express');
const http = require('http');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require("reflect-metadata");
const indexRouter = require('./routes/index');
exports.app = express();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const socket_1 = __importDefault(require("./socket"));
const route = require('./routes/routes');
exports.app.use(logger('dev'));
exports.app.use(express.json());
exports.app.use(express.urlencoded({ extended: false }));
exports.app.use(cookieParser());
exports.app.use(express.static(path.join(__dirname, 'public')));
exports.app.use(cors());
exports.app.use(function (req, res, next) {
    next(createError(404));
});
exports.server = http.createServer(exports.app);
const io = (0, socket_1.default)(exports.server);
exports.app.use('/', indexRouter);
exports.default = exports.app;
//# sourceMappingURL=app.js.map