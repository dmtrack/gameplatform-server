"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.SOCKETPORT;
const start = async () => {
    try {
        app_1.server.listen(port, () => {
            console.log(`Server has successfully started on port:${port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
};
start();
//# sourceMappingURL=index.js.map