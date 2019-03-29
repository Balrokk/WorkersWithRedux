import { Action } from '@ngrx/store';
import { UserModel, Form } from '../models/form.model';


export const DELETE_USER = '[Form] DELETE USER';

export const EDIT_USER = '[Form] EDIT USER';

export const ADD_USER = '[Form] ADD USER';

export const LOAD_LS = '[Form] LOAD LS';


export class DeleteUser  implements  Action{
    readonly type = DELETE_USER;

    constructor(public payload: number){}
}

export class EditUser implements Action {
    readonly type = EDIT_USER;

    constructor(public payload1: number, public payload2: UserModel) {
    }
}

export class AddUser {
    readonly type = ADD_USER;

    constructor( public  payload: UserModel){}
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
