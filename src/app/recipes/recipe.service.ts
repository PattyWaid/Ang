import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as shoppingListActions from '../shopping-list/Store/shopping-list.action';
import * as rootAppReducer from '../Store/root-app.reducer';
import { Comments } from '../shared/comments.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  private recipesByUser: Recipe[] = [];
  private count: number = 0;
  
  //private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService,
    private store: Store<rootAppReducer.AppState>) {}

  setRecipes(recipes: Recipe[]) {
    if(recipes){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
    }
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    for(const rec in this.recipes){
      if(this.recipes[rec].recId === index){
        return this.recipes[this.recipes.indexOf(this.recipes[rec])];
      }
    }
  }


  getRecipeCount() {
   return this.count;
  }

  setRecipesCount(idCount: number) {
    this.count = idCount;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new shoppingListActions.AddIngredients(ingredients));
    //this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    for(const rec in this.recipes){
      if(this.recipes[rec].recId === index){
        this.recipes[this.recipes.indexOf(this.recipes[rec])] = newRecipe;
      }
    }
    this.recipesChanged.next(this.recipes.slice());
  }

  
  deleteRecipe(recIndex: number) {
    for(const rec in this.recipes){
      if(this.recipes[rec].recId === recIndex){
        this.recipes.splice(this.recipes.indexOf(this.recipes[rec]),1);
        break;
      }
    }
    this.recipesChanged.next(this.recipes.slice());
  }

}
