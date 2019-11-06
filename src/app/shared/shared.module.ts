import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';
import { PlaceHolder } from './placeholder/placeholder.directive';
import { ShortenPipe } from './shorten.pipe';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { DisplayBlogs } from './display-blogs/display-blogs.component';
import { BlogItem } from './display-blogs/blog-item/bolg-item.compnent';

import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { SubTextPipe } from './subtext.pipe';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinner,
        PlaceHolder,
        ShortenPipe,
        DropdownDirective,
        DisplayBlogs,
        BlogItem,
        SubTextPipe
    ],
    imports: [CommonModule],
    exports: [
        AlertComponent,
        LoadingSpinner,
        PlaceHolder,
        ShortenPipe,
        DropdownDirective,
        CommonModule,
        DisplayBlogs,
        BlogItem,
        SubTextPipe
    ],
    entryComponents: [
        AlertComponent
      ]
})
export class SharedModule {

}