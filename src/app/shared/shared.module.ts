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
import { ReactiveFormsModule } from '@angular/forms';
import { ReplyComponent } from './display-blogs/blog-item/reply/reply.component';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinner,
        PlaceHolder,
        ShortenPipe,
        DropdownDirective,
        DisplayBlogs,
        BlogItem,
        SubTextPipe,
        ReplyComponent
    ],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [
        AlertComponent,
        LoadingSpinner,
        PlaceHolder,
        ShortenPipe,
        DropdownDirective,
        CommonModule,
        DisplayBlogs,
        BlogItem,
        SubTextPipe,
        ReplyComponent
    ],
    entryComponents: [
        AlertComponent
      ]
})
export class SharedModule {

}