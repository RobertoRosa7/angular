import {Action } from '@ngrx/store';
import { PersonFirestore } from '../models/person';
import { UserFirestore } from '../models/user';

export enum UserActionsTypes {
    USER_ALL = '[ USER_ALL ] - GET ALL USERS',
    USER_NEW = '[USER_NEW ] - CREATE NEW USER',
    USER_DEL = '[USER_DEL] - DELETE AN USER',
    USER_UP = '[ USER_UP] - UPDATE USER'
}

export class UserAll implements Action {
    public readonly type = UserActionsTypes.USER_ALL;
}
export class UserNew implements Action {
    public readonly type = UserActionsTypes.USER_NEW;
    constructor(public payload:{"user":UserFirestore}){}
}
export class UserUp implements Action {
    public readonly type = UserActionsTypes.USER_UP;
    constructor(public payload:{"id":string, "changes":Partial<UserFirestore>}){}
}
export class UserDel implements Action{
    public readonly type = UserActionsTypes.USER_DEL;
    constructor(public payload:{"id":string}){}
}
export type UserActions = UserAll | UserNew | UserDel | UserUp;