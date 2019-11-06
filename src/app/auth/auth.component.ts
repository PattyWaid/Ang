import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthFormService, AuthFormResponse } from './auth-form.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolder } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{

  constructor(private authformService: AuthFormService,
    private router:Router,
    private cfResolver: ComponentFactoryResolver) {}

  isLoggedIn = false;
  isLoading = false;
  isError: string = null;
  @ViewChild(PlaceHolder, {static: false}) hostPosition: PlaceHolder;

  private closeSub: Subscription;

  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSubmit(authform: NgForm) {
    
    
    if(!authform.valid){
      return;
    }
    const email = authform.value.email;
    const password = authform.value.password;

    let obServer: Observable<AuthFormResponse>;
    this.isLoading = true;
    if(this.isLoggedIn) {

      obServer = this.authformService.login(email, password);

    }
    else {
      obServer = this.authformService.signup(email, password);
    }

    obServer.subscribe(
        
      respData => {

        this.isLoading = false;
        this.router.navigate(['/recipes']);
        
      },
      error => {
        this.isError = error;
        this.onHandleErrorDynamic(this.isError);
        this.isLoading = false;
      }
      
    );

    authform.reset()
  }

  ngOnDestroy() {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onHandleErrorDynamic(message: string) {
     const alertComp =  this.cfResolver.resolveComponentFactory(AlertComponent);

     const hostView = this.hostPosition.viewContainer;
     hostView.clear()

     const componentRef = hostView.createComponent(alertComp);

     componentRef.instance.message = message;
     this.closeSub = componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe();
        hostView.clear();
     });
  }

  onHandleError() {
    this.isError = null;
  }

}
