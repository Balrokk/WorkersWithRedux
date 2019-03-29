import * as HistoryActions from '../actions/history.actions';
import {History, Record} from '../models/history.model';


export type Action = HistoryActions.All;


const defaultState: History = {
    list: []
};


const createState = (state) => {
    return Object.assign({}, state);
};


export function historyReducer(state: History = defaultState, action: Action) {

    switch (action.type) {

        case HistoryActions.ADD_USER: {
            const newState: History = createState(state);
            let id = 0;
            if (action.payload) {
                for (let user of state.list) {
                    id++;
                }
                newState.list[id] = action.payload;
            }
            localStorage.setItem('list', JSON.stringify(newState.list));
            return newState;
        }

        case HistoryActions.DELETE_USER: {
            const newState: History = createState(state);
            let id = 0;
            for (let user of state.list) {
                id++;
            }
            newState.list[id] = action.payload;
            localStorage.setItem('list', JSON.stringify(newState.list));
            return newState;
        }

        case HistoryActions.EDIT_USER: {
            const newState: History = createState(state);
            let id = 0;
            for (let user of state.list) {
                id++;
            }
            newState.list[id] = action.payload;
            localStorage.setItem('list', JSON.stringify(newState.list));
            return newState;
        }

        case HistoryActions.LOAD_LS: {
            const newState: History = createState(state);
            const lsHistory = localStorage.getItem('list');
            if (lsHistory !== null) {
                newState.list = (JSON.parse(lsHistory));
            }
            return newState;
        }

        default: {
            const newState: History = createState(state);
            const lsHistory = localStorage.getItem('list');
            if (lsHistory !== null) {
                newState.list = (JSON.parse(lsHistory));
                return newState;
            }else {
                return defaultState;
            }

        }
    }
}
