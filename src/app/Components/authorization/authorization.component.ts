import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Acc, Account} from '../../models/accaunt.model'

import * as AccActions from '../../actions/accounts.action';

interface AppState {
    accounts: Acc;
}

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

    accounts: Observable<Acc>;

    myForm: FormGroup = new FormGroup({
        login:  new FormControl('', [Validators.required]),
        password:  new FormControl('', [Validators.required]),
    });

    constructor(private store: Store<AppState>, ) {
        this.accounts = this.store.select('accounts');
        this.store.dispatch(new AccActions.LoadLS());
    }

    ngOnInit() {
    }

    setCurrAcc(){
        const formData: Account = this.myForm.getRawValue();
        this.store.dispatch(new AccActions.SetCurrentAcc(formData));
    }
}
