import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Subject } from 'rxjs';


@Component({
    selector: 'app-blog-item',
    templateUrl: './blog-item.component.html'
})
export class BlogItem implements OnDestroy{

    //@Input() rec: Recipe;
    @Input() singleRecipe: Recipe;
    @Output() closeBox = new Subject<void>();

    onClose() {
        this.closeBox.next();
    }

    ngOnDestroy() {
        this.closeBox.next();
    }

    
    
    
    


    

}