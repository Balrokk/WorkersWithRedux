import * as PostActions from '../actions/form.actions';
import { Form } from '../models/form.model';
import {History} from '../models/history.model';


export type Action = PostActions.All;


const defaultState: Form = {
    users: []
};


const createState = (state) => {
    return Object.assign({}, state);
};



export function formReducer(state: Form = defaultState, action: Action) {

    switch (action.type) {

        case PostActions.ADD_USER: {

            const newState: Form = createState(state);
            let id = 0;

            if (action.payload) {
                for (let user of state.users) {
                    id++;
                }
                newState.users[id] = action.payload;
            }
            localStorage.setItem('users', JSON.stringify(newState.users));
            return newState;
        }

        case PostActions.DELETE_USER: {
            const newState: Form = createState(state);
            newState.users.splice(action.payload, 1);
            localStorage.setItem('users', JSON.stringify(newState.users));
            return newState;
        }

        case PostActions.EDIT_USER: {
            const newState: Form = createState(state);
            newState.users[action.payload1] = action.payload2;
            localStorage.setItem('users', JSON.stringify(newState.users));
            return newState;
        }

        case PostActions.LOAD_LS: {

            const newState: Form = createState(state);
            const lsUsers = localStorage.getItem('users');
            if (lsUsers !== null) {
                newState.users = (JSON.parse(lsUsers));
            }
            return newState;
        }

        default: {

            const newState: Form = createState(state);
            const lsHistory = localStorage.getItem('users');
            if (lsHistory !== null) {
                newState.users = (JSON.parse(lsHistory));
                return newState;
            }else {
                return defaultState;
            }
        }
    }
}
