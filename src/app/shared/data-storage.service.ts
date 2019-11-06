import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaust, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthFormService } from '../auth/auth-form.service';
import { pipe } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService,
    private authService: AuthFormService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-project-one-27a56.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {

      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-project-one-27a56.firebaseio.com/recipes.json',
      ).pipe(
      map(recipes => {
      if(recipes != null){
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    } else {
      return 
    }
      }),

    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    })
  );
        
  }
}
