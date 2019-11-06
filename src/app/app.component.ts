import { Component, OnInit } from '@angular/core';
import { AuthFormService } from './auth/auth-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthFormService){}

  ngOnInit(){
    this.authService.autoLogin();
    
  }

  //loadedFeature = 'recipe';

  //onNavigate(feature: string, ) {
   // this.loadedFeature = feature;
  //}
}

// https://ng-project-one-27a56.firebaseapp.com
