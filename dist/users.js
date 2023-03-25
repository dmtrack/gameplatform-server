"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const utils_1 = require("./utils/utils");
let users = [];
const addUser = (user) => {
    const userName = (0, utils_1.trimStr)(user.name);
    const userRoom = (0, utils_1.trimStr)(user.room);
    const isExist = users.find((u) => (0, utils_1.trimStr)(u.name) === userName && (0, utils_1.trimStr)(u.room) === userRoom);
    !isExist && users.push(user);
    const currentUser = isExist || user;
    return { isExist: !!isExist, user: currentUser };
};
exports.addUser = addUser;
//# sourceMappingURL=users.js.map