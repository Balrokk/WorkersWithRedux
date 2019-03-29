import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Acc, Account} from './models/accaunt.model';

import {Injectable} from '@angular/core';

interface AppState {
    accounts: Acc;
}

@Injectable()
export class MenuGuard implements CanActivate {

    accounts: Observable<Acc>;
    acc: Account[];
    login: string;
    password: string;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {


        let log = this.login;
        let pas = this.password;
        let authFlag = false;

        if(this.acc){
            this.acc.forEach(function (item) {
                if ((log === item.login) && (pas === item.password)) {
                    authFlag = true;
                }

            });
        }


        if (!authFlag) {
            alert('Данный пользователь не зарегестрирован');
        }

        return authFlag;

    }

    constructor(private store: Store<AppState>) {
        this.accounts = this.store.select('accounts');
        this.accounts.subscribe(data => {
            if (data != undefined) {
                this.acc = data.accounts;
                this.login = data.currentAcc.login;
                this.password = data.currentAcc.password;
            }
        });

    }
}