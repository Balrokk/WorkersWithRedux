import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Acc, Account} from '../../models/accaunt.model';
import {Observable} from 'rxjs';

import * as AccActions from '../../actions/accounts.action';


interface AppState {
    accounts: Acc;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  accounts: Observable<Acc>;

  constructor(private store: Store<AppState>) {
      this.accounts = this.store.select('accounts');
  }

  ngOnInit() {
  }

  GoOut(){
      this.store.dispatch(new AccActions.GoOut())
  }
}
