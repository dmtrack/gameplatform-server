"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var express = require('express');
const cors = require('cors');
require("reflect-metadata");
const http = require('http');
const indexRouter = require('./routes/index');
const app = express();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.server = http.createServer(app);
const io = require('socket.io')(exports.server, {
    cors: {
        origin: '*',
    },
});
app.use(cors());
app.use('/', indexRouter);
exports.default = app;
//# sourceMappingURL=app.js.map