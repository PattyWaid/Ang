import { User } from '../user.model';
import * as fromAuthActions from './auth.actions'
import { ActionsSubject } from '@ngrx/store';

export interface authState {
    user: User
}

const initalState: authState = {
    user: null
};

export function authReducer(state: authState = initalState, action: fromAuthActions.authState) {
    switch(action.type) {
        case fromAuthActions.LOGIN:
            const user = new User(
                action.payload.email,
                action.payload.id,
                action.payload.token,
                action.payload.expirationtoken
            )
            return {
                ...state,
                user: user
            };
        case fromAuthActions.LOGOUT:
            return{
                ...state,
                user: null
            }
    }
    return state;
}