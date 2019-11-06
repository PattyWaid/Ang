import { Component, OnInit, OnDestroy, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { element } from 'protractor';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy, DoCheck{
  recipes: Recipe[];
  newRec: any;
  subscription: Subscription;
  anotherSub: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorage: DataStorageService) {
  }

  

  ngOnInit() {
    this.onGetRecipesCount();
    this.listOfRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  listOfRecipes() {
    this.subscription = this.dataStorage.fetchRecipes().subscribe(
      params => {
        let arr = [];
              if(params){
              
              for (let index = 0; index < params.length; index++) {
                if(params[index].user === (JSON.parse(localStorage.getItem('userData')).email)) {
                   arr.push(params[index]);
                }  
            }

            
            
          }
          this.recipes = arr;  
          //this.recipeService.setRecipeByUser(this.recipes);
            
      });
  }

  onGetRecipesCount() {
    this.anotherSub = this.dataStorage.fetchRecipes().subscribe(
      params => {
        if(params){
        for(let rec = 0; rec < params.length-1; rec++){
          this.recipeService.setRecipesCount((params[params.length-1].recId) + 1);
          
        }
      }
      }
    );
    
  }

  
  ngDoCheck() {
    let arr: Recipe[] =[]
    for (let index = 0; index < this.recipeService.getRecipes().length; index++) {
      if(this.recipeService.getRecipes()[index].user === (JSON.parse(localStorage.getItem('userData')).email)) {
         arr.push(this.recipeService.getRecipes()[index]);
      }
  }
  this.recipes = arr;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.anotherSub.unsubscribe();
  }
}
