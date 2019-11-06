import { Component, OnInit, AfterViewChecked, AfterViewInit, AfterContentChecked } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { Router } from '@angular/router';
import { AuthFormService } from '../auth/auth-form.service';
import { Store } from '@ngrx/store';
import * as rootAppReducer from '../Store/root-app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  isAuthenticated = false;
  activeUser: string;  
  constructor(private dataStorageService: DataStorageService,
    private authService: AuthFormService,
    private store: Store<rootAppReducer.AppState>) {}

  ngOnInit() {

    this.store.select('auth').pipe(map(authState => authState.user)).subscribe(
      userData => {
        this.isAuthenticated = !!userData;
      }
    );

    
  }

  ngAfterContentChecked(){
    this.loggedInUser();
  }
  

  loggedInUser() {
    if(localStorage.getItem('userData')){
    const email = (JSON.parse(localStorage.getItem('userData')).email);
    this.activeUser = email
    }
  }

  onLogout() {
    this.authService.logout();
    
  }



  
}
