import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthFormService } from './auth-form.service';
import { Injectable } from '@angular/core';
import { take, exhaustMap, map } from 'rxjs/operators';
import * as appRootReducer from '../Store/root-app.reducer'
import { Store } from '@ngrx/store';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService: AuthFormService,
        private store: Store<appRootReducer.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user
            }),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone(
                    {
                        params: new HttpParams().set('auth', user.token)
                    });
                return next.handle(modifiedReq)
            })
        )
    }

}
