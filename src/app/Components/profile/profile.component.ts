import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Form, UserModel} from '../../models/form.model';
import { Record } from '../../models/history.model';
import {Observable} from 'rxjs';
import {Acc} from '../../models/accaunt.model';



import * as moment from 'moment';
import * as FormActions from '../../actions/form.actions';
import * as HistoryActions from '../../actions/history.actions';
import * as AccountActions from '../../actions/accounts.action';



interface AppState {
    form: Form;
    accounts: Acc;
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {

    form: Observable<Form>;
    accounts: Observable<Acc>;

    login: string;

    readonly addstr = 'Добавление пользователя';

    myForm: FormGroup = new FormGroup({
        firstName:  new FormControl('', [Validators.required]),
        secondName:  new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required]),
        dateBorn: new FormControl('', [Validators.required]),
        statusWork: new FormControl('', [Validators.required]),
        photo: new FormControl('', []),
        comment: new FormControl('', []),
    });

    constructor(private store: Store<AppState>, ) {
        this.form = this.store.select('form');
        this.accounts = this.store.select('accounts');
    }

    ngOnInit() {
        this.store.dispatch(new FormActions.LoadLS());

        this.store.dispatch(new AccountActions.LoadLS());
        this.accounts.subscribe(data => {
            if(data!=undefined){
                this.login = data.currentAcc.login;
            }
        });
    }

    // Добавление поьзователья
    addUser() {
        const formData: UserModel = this.myForm.getRawValue();
        this.store.dispatch(new FormActions.AddUser(formData));
        this.store.dispatch(new HistoryActions.AddUser(this.createRecord(formData)));
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
        record.typeAction = this.addstr;
        record.login = this.login;
        record.newObj = obj;
        return record;
    }
}
