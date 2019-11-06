import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import * as fromRootApp from './Store/root-app.reducer';
import { QuillModule } from 'ngx-quill';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromRootApp.appReducer),
    SharedModule,
    CoreModule,
    //QuillModule.forRoot()
   // AuthModule,
  //  ShoppingListModule,
   // RecipesModules
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
