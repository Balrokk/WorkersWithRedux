export interface Form {
    users: UserModel[];
}

export interface UserModel {
    firstName: string;
    secondName: string;
    lastName: string;
    role: string;
    dateBorn: any;
    statusWork: any;
    photo: any;
    comment: string;
}