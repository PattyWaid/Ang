import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthFormService } from 'src/app/auth/auth-form.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  

  recInId = this.recipeService.getRecipeCount();
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  category: string[] = ['Automobiles', 'Animations', 'Technology'];


  
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private dataStorage: DataStorageService,
    private authService: AuthFormService
  ) {}

  get ingredientsControl() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      
    });
    
  }

  onSubmit() {


    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.dataStorage.storeRecipes();
    } else {
      this.recipeService.setRecipesCount(this.recInId);
      this.recipeService.addRecipe(this.recipeForm.value);
      this.dataStorage.storeRecipes();
      //this.recipeService.setRecipeByUser(this.recipeForm.value);
      this.router.navigate(['/recipes']);

    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recId = this.recInId;
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeCategory = 'Automobiles';
    let recipeUser = this.authService.getLoginData();
    let recipeIngredients = new FormArray([]);


    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recId = this.id;
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      recipeCategory = recipe.category;
      recipeUser = this.authService.getLoginData();
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    } 
      this.recipeForm = new FormGroup({
        recId: new FormControl(recId),
        name: new FormControl(recipeName, Validators.required),
        imagePath: new FormControl(recipeImagePath, Validators.required),
        description: new FormControl(recipeDescription, Validators.required),
        category: new FormControl(recipeCategory,Validators.required),
        user: new FormControl(recipeUser),
        ingredients: recipeIngredients
      });

      
      this.recInId = this.recInId + 1
    

    
    
  }
}
