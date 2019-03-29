import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Record, History} from '../../models/history.model';
import { ActivatedRoute } from '@angular/router';

interface AppState {
    history: History;
}

@Component({
    selector: 'app-view-record',
    templateUrl: './view-record.component.html',
    styleUrls: ['./view-record.component.css']
})
export class ViewRecordComponent implements OnInit {

    history: Observable<History>;
    id: number;
    record: Record;
    newObjFlag: boolean;
    oldObjFlag: boolean;


    constructor(private store: Store<AppState>, private activateRoute: ActivatedRoute) {
        this.history = this.store.select('history');
        this.id = activateRoute.snapshot.params['id'];

    }

    ngOnInit() {
        this.history.subscribe(data => {
            this.record = data.list[this.id];
        });
        if(this.record.oldObj.firstName){
            this.oldObjFlag = true;
        }else {
            this.oldObjFlag = false;
        }
        if(this.record.newObj.firstName){
            this.newObjFlag = true;
        }else {
            this.newObjFlag = false;
        }
    }


}
