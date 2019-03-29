import { UserModel } from './form.model';

export interface History {
    list: Record[];
}

export interface Record {
    date: string;
    typeAction: string;
    login: string;
    oldObj: UserModel;
    newObj: UserModel;
}