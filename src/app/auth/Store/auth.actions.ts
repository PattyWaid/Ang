import { Action } from '@ngrx/store';

export const START_LOGIN = 'START_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload:{ 
        email: string,
        id: string,
        token: string,
        expirationtoken: Date
    }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;

}

export class StartLogin implements Action {
    readonly type = START_LOGIN;

    constructor(public payload: {email: string, password: string}) {}
}


export type authState = Login | Logout;