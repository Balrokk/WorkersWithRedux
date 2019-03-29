export interface Acc {
   currentAcc: Account,
   accounts:   Account[]
}

export interface Account {
    login: string,
    password: string
}