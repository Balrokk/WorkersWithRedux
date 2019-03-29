
import { Acc } from '../models/accaunt.model';
import * as AccountsActions from '../actions/accounts.action';
import {SET_CURRENTACC} from '../actions/accounts.action';

export type Action = AccountsActions.All;


const defaultState: Acc = {
    currentAcc: {
        login: '',
        password: ''
    },
    accounts: []
};


const createState = (state) => {
    return Object.assign({}, state);
};


export function accountsReducer(state: Acc = defaultState, action: Action) {
    switch (action.type) {

        case AccountsActions.ADD_USER: {
            const newState: Acc = createState(state);
            let id = 0;
            if (action.payload) {
                for (let user of state.accounts) {
                    id++;
                }
                newState.accounts[id] = action.payload;
            }
            localStorage.setItem('accounts', JSON.stringify(newState.accounts));
            return newState;
        }

        case AccountsActions.SET_CURRENTACC: {
            const newState: Acc = createState(state);

            if (action.payload) {
                newState.currentAcc = action.payload;
            }
            localStorage.setItem('currentAcc', JSON.stringify(newState.currentAcc));
            return newState;
        }

        case AccountsActions.GO_OUT: {
            const newState: Acc = createState(state);

            newState.currentAcc = {
                login: '',
                password: ''
            };

            localStorage.setItem('currentAcc', JSON.stringify(newState.currentAcc));
            return newState;
        }

        case AccountsActions.LOAD_LS: {
            const newState: Acc = createState(state);
            const lscur = localStorage.getItem('currentAcc');
            const lsAcc = localStorage.getItem('accounts');
            if ((lsAcc !== null) && (lscur !== null)) {
                newState.accounts = (JSON.parse(lsAcc));
                newState.currentAcc = (JSON.parse(lscur));
            }
            return newState;
        }

        default: {
            const newState: Acc = createState(state);
            const lscur = localStorage.getItem('currentAcc');
            const lsAcc = localStorage.getItem('accounts');
            if ((lsAcc !== null) && (lscur !== null)) {
                newState.accounts = (JSON.parse(lsAcc));
                newState.currentAcc = (JSON.parse(lscur));
            }else {
                return defaultState;
            }

        }
    }
}
