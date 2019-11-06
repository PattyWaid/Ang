import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFormService } from './auth-form.service';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as rootAppReducer from '../Store/root-app.reducer';
import { Store } from '@ngrx/store';


@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate{

    constructor(private authService: AuthFormService,
        private router: Router,
        private store: Store<rootAppReducer.AppState>){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |
    Promise<boolean | UrlTree >| Observable<boolean | UrlTree> {
       return this.store.select('auth').pipe(
           take(1),
           map(authState => {
               return authState.user
           }),
           map(user => {
               const isAuth = !!user;
               if(isAuth) {

                   return true;
                   
               } else {

                
                return this.router.createUrlTree(['/auth']);
               }
           })
       );
    }

}