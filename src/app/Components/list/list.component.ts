import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Form, UserModel } from '../../models/form.model';
import {History, Record} from '../../models/history.model';
import {Acc} from '../../models/accaunt.model'



import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';


import * as moment from 'moment';
import * as FormActions from '../../actions/form.actions';
import * as HistoryActions from '../../actions/history.actions';
import * as AccountActions from '../../actions/accounts.action';


interface AppState {
    form: Form;
    accounts: Acc;
}


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

    form: Observable<Form>;
    accounts: Observable<Acc>;

    login: string;
    users: UserModel[];
    sortAsc = false;

    readonly deletestr = 'Удаление пользователя';

    constructor(private store: Store<AppState>) {
        this.form = this.store.select('form');
        this.accounts = this.store.select('accounts');
    }

    ngOnInit() {
        this.store.dispatch(new FormActions.LoadLS());
        this.store.dispatch(new AccountActions.LoadLS());
        this.form.subscribe(data => {
            this.users = data.users;
        });

        this.accounts.subscribe(data => {
            if(data!=undefined){
                this.login = data.currentAcc.login;
            }
        });
    }

    deleteUser(userId: number) {

        const formData: UserModel = this.users[userId];
        this.store.dispatch(new HistoryActions.DeleteUser(this.createRecord(formData)));
        this.store.dispatch(new FormActions.DeleteUser(userId));
        console.log(this.form);
    }

    sortByFieldName(fieldName) {
        const k = this.sortAsc ? 1 : -1;
        this.sortAsc = !this.sortAsc;
        this.users.sort((a: UserModel, b: UserModel) => {
            return (a[fieldName] > b[fieldName]) ? 1 * k : -1 * k;
        });
    }

    createData(): string {
        let now = moment();
        now.locale('ru');
        return  now.format('LLL');
    }

    createRecord(obj: UserModel): Record {
        const now: string = this.createData();
        let record: Record = {
            date: '',
            typeAction: '',
            login: '',
            newObj: {
                firstName: '',
                secondName: '',
                lastName: '',
                role: '',
                dateBorn: '',
                statusWork: '',
                photo: '',
                comment: ''
            },
            oldObj: {
                firstName: '',
                secondName: '',
                lastName: '',
                role: '',
                dateBorn: '',
                statusWork: '',
                photo: '',
                comment: ''
            }
        };
        record.date = now;
        record.typeAction = this.deletestr;
        record.login = this.login;
        record.newObj = obj;
        return record;
    }

    GoOut(){
        this.store.dispatch(new AccountActions.GoOut())
    }

}
