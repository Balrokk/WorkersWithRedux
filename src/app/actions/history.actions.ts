import { Action } from '@ngrx/store';
import {Record} from '../models/history.model';



export const DELETE_USER = '[history] DELETE USER';

export const EDIT_USER = '[history] EDIT USER';

export const ADD_USER = '[history] ADD USER';

export const LOAD_LS = '[history] LOAD LS';



export class DeleteUser  implements  Action{
    readonly type = DELETE_USER;

    constructor(public payload: Record){}
}

export class EditUser implements Action {
    readonly type = EDIT_USER;

    constructor(public payload: Record) {
    }
}

export class AddUser implements Action{
    readonly type = ADD_USER;

    constructor(public payload: Record){}
}

export class LoadLS {
    readonly type = LOAD_LS;

    constructor(){}
}

export type All
    = DeleteUser
    | EditUser
    | AddUser
    | LoadLS;
