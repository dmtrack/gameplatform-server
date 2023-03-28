"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomUsers = exports.addUser = exports.findUser = void 0;
const utils_1 = require("./utils/utils");
let users = [];
const findUser = (user) => {
    const userName = (0, utils_1.trimStr)(user.name);
    const userRoom = (0, utils_1.trimStr)(user.room);
    return users.find((u) => (0, utils_1.trimStr)(u.name) === userName && (0, utils_1.trimStr)(u.room) === userRoom);
};
exports.findUser = findUser;
const addUser = (user) => {
    const isExist = (0, exports.findUser)(user);
    !isExist && users.push(user);
    const currentUser = isExist || user;
    return { isExist: !!isExist, user: currentUser };
};
exports.addUser = addUser;
const getRoomUsers = (room) => {
    return users.filter((u) => u.room === room);
};
exports.getRoomUsers = getRoomUsers;
//# sourceMappingURL=users.js.map