import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Form, UserModel} from '../../models/form.model';
import {Observable} from 'rxjs';
import {Record} from '../../models/history.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Acc} from '../../models/accaunt.model';


import * as HistoryActions from '../../actions/history.actions';
import * as PostActions from '../../actions/form.actions'
import * as moment from 'moment';
import * as AccountActions from '../../actions/accounts.action';


interface AppState {
    form: Form;
    accounts: Acc;
}


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

    form: Observable<Form>;
    accounts: Observable<Acc>;

    login: string;
    user: UserModel;
    oldUser: UserModel;
    nameButton: string = 'Редактировать';
    readonly editStr = 'Редактирование профиля';
    id: number;


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

    constructor(
        private store: Store<AppState>,
        private activateRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.form = this.store.select('form');
        this.id = activateRoute.snapshot.params['id'];
        this.accounts = this.store.select('accounts');

    }

    ngOnInit() {
        this.form.subscribe(data => {
            this.user = data.users[this.id];
            this.initForm(data);
        });
        this.myForm.disable();

        this.store.dispatch(new AccountActions.LoadLS());
        this.accounts.subscribe(data => {
            if(data!=undefined){
                this.login = data.currentAcc.login;
            }
        });
    }

    //Добавление (сетим) данных в форму
    initForm(data: Form) {
        let user: any = null;
        if (this.id !== undefined) {
            user = data.users[this.id];
        }
        if (user) {
            user.dateBorn= moment(user.dateBorn).format('YYYY-MM-DD');
            this.myForm.patchValue(user);
        }
    }

    workButton() {
        if (this.nameButton !== 'Сохранить') {
            this.myForm.enable();
            this.oldUser = this.user;
            return this.nameButton = 'Сохранить';

        } else {
            // Редактирование
            const formData: UserModel = this.myForm.getRawValue();

            this.store.dispatch(new PostActions.EditUser(this.id, formData));
            this.store.dispatch(new HistoryActions.EditUser(this.createRecord(this.oldUser, formData)));
            this.router.navigate(['/menu/list']);
        }
    }

    createData(): string {
        let now = moment();
        now.locale('ru');
        return  now.format('LLL');
    }

    createRecord(obj1: UserModel, obj2: UserModel): Record {
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
        record.typeAction = this.editStr;
        record.login = this.login;
        record.newObj = obj2;
        record.oldObj = obj1;
        return record;
    }
}
