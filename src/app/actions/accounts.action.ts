import { Action } from '@ngrx/store';
import {Acc, Account} from '../models/accaunt.model';

export const ADD_USER = '[accounts] ADD ACCOUNT';

export const SET_CURRENTACC = '[accounts] SET CURRENT ACC';

export const GO_OUT = '[accounts] GO OUT';
export const LOAD_LS = '[accounts] LOAD LS';

export class AddUser implements Action{
    readonly type = ADD_USER;

    constructor(public payload: Account){}
}

export class SetCurrentAcc implements Action{
    readonly type = SET_CURRENTACC;

    constructor(public payload: Account){}
}

export class GoOut implements Action{
    readonly type = GO_OUT;

    constructor(){}
}
export class LoadLS {
    readonly type = LOAD_LS;

    constructor(){}
}

export type All
    = AddUser
    | SetCurrentAcc
    | GoOut
    | LoadLS;
