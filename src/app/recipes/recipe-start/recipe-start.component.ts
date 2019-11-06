import { Component, OnInit, DoCheck } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements DoCheck, OnInit {
  isPresent: boolean;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  

  }

  ngDoCheck() {
    if(this.recipeService.getRecipes().length === 0){
      this.isPresent = false;
    } else {
       this.isPresent = true;
    }
  }

}
