import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as rootAppReducer from '../Store/root-app.reducer';
import * as fromAuthActions from './Store/auth.actions';
import * as fromEnv from 'src/environments/environment';

export interface AuthFormResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}


@Injectable({providedIn: 'root'})
export class AuthFormService {

    //user = new BehaviorSubject<User>(null);
    private expirationTimer:any;

    constructor(private http: HttpClient,
        private router: Router,
        private store: Store<rootAppReducer.AppState>){}

    signup(email: string, password: string) {
        return this.http.post<AuthFormResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+fromEnv.environment.firebaseAPIKey
        , {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError),
        tap(respData => {
            this.handleAuthentication(
                respData.email,
                respData.localId,
                respData.idToken,
                +respData.expiresIn
            )
        }));
    }


    login(email: string, password: string) {
        return this.http.post<AuthFormResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+fromEnv.environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),
        tap(respData => {
            this.handleAuthentication(
                respData.email,
                respData.localId,
                respData.idToken,
                +respData.expiresIn
            )
        }));
    }

    getLoginData() {

        const data = JSON.parse(localStorage.getItem('userData'))
        return data.email;
        
    }

    

    logout() {
       // this.user.next(null);
       this.store.dispatch(new fromAuthActions.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if(this.expirationTimer) {
            clearTimeout(this.expirationTimer);
        }
        return this.expirationTimer = null;
    }


    private handleError(respError: HttpErrorResponse) {
        let errorMessage = "An Unknown Error Occurred";
                if(!respError.error || !respError.error.error) {
                    return throwError(errorMessage);
                }
                switch(respError.error.error.message) {
                    case 'EMAIL_EXISTS': 
                    errorMessage = "Email already Existst";
                    break;
                    case 'EMAIL_NOT_FOUND':
                    errorMessage = "Email does not Exists";
                    break
                    case 'INVALID_PASSWORD':
                    errorMessage = "Invalid Password";
                    break;
                    }
                    return throwError(errorMessage);
                }


    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        //this.user.next(user);
        this.store.dispatch(new fromAuthActions.Login(
            {
                email: user.email,
                id: user.id,
                token: user.token,
                expirationtoken: expirationDate
            }
        ));
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));

        
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        )


        if(loadUser.token) {
            this.store.dispatch(new fromAuthActions.Login({
                email: loadUser.email,
                id: loadUser.id,
                token: loadUser.token,
                expirationtoken: new Date(userData._tokenExpirationDate)
            }));
            //this.user.next(loadUser);
            const expirationDuration = new Date(userData._tokenExpirationDate)
            .getTime() - new Date().getTime()
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.expirationTimer = setTimeout(() =>
            this.logout()
            ,expirationDuration);

    }
    
    }

