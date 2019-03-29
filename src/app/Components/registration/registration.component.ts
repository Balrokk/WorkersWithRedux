import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Acc, Account} from '../../models/accaunt.model'

import * as AccActions from '../../actions/accounts.action';

interface AppState {
    acc: Acc;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    acc: Observable<Acc>;

    myForm: FormGroup = new FormGroup({
        login:  new FormControl('', [Validators.required]),
        password:  new FormControl('', [Validators.required]),
        repPassword:  new FormControl('', [Validators.required]),
    });

    constructor(private store: Store<AppState>, ) {
        this.acc = this.store.select('acc');
    }

    ngOnInit() {
        this.store.dispatch(new AccActions.LoadLS());
    }

    // Добавление поьзователья
    add() {
        const formData: Account = this.myForm.getRawValue();
        this.store.dispatch(new AccActions.AddUser(formData));
        console.log('RegistrationComponent after AddUser store', this.store);
    }

}
