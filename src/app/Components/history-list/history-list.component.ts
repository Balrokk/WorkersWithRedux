import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {History, Record} from '../../models/history.model';
import {Observable} from 'rxjs';
import {Acc} from '../../models/accaunt.model'

import * as HistoryActions from '../../actions/history.actions';
import * as AccountActions from '../../actions/accounts.action';

interface AppState {
    history: History
    accounts: Acc;
}

@Component({
    selector: 'app-history-list',
    templateUrl: './history-list.component.html',
    styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

    history: Observable<History>;
    accounts: Observable<Acc>;
    historyList: Record[];

    constructor(private store: Store<AppState>) {
        this.history = this.store.select('history');
        this.accounts = this.store.select('accounts');
    }

    ngOnInit() {
        this.store.dispatch(new HistoryActions.LoadLS());
        this.history.subscribe(data => {
            this.historyList = data.list;
        });
    }

    GoOut(){
        this.store.dispatch(new AccountActions.GoOut())
    }

}
