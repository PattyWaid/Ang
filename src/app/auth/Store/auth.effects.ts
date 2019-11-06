import { Actions, ofType, Effect } from '@ngrx/effects'
import * as fromAuth from './auth.actions';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface AuthFormResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}


export class AuthEffects {
    @Effect()
    startLogin = this.actions$.pipe(
        ofType(fromAuth.START_LOGIN),
        switchMap((authData: fromAuth.StartLogin) => {
            return this.http.post<AuthFormResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6a6IJ6S7Dg_7FHlxgEa6v7MuOLdmrJ6U',
        {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
        })
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) {}

}