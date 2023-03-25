import { IUser } from './interfaces/user';
import { trimStr } from './utils/utils';

let users: IUser[] = [];
export const addUser = (user) => {
    const userName = trimStr(user.name);
    const userRoom = trimStr(user.room);
    const isExist = users.find(
        (u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom
    );
    !isExist && users.push(user);

    const currentUser = isExist || user;

    return { isExist: !!isExist, user: currentUser };
};
