import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDEIENT = 'ADD_INGREDEINT';
export const ADD_INGREDEIENTS = 'ADD_INGREDEINTS';
export const UPDATE_INGREDEIENTS = 'UPDATE_INGREDEIENTS';
export const DELETE_INGREDEIENTS = 'DELETE_INGREDEIENTS';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDEIENT;
    
    constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDEIENTS;
    
    constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredients implements Action {
    readonly type = UPDATE_INGREDEIENTS;
    
    constructor(public payload: Ingredient) {}
}

export class DeleteIngredients implements Action {
    readonly type = DELETE_INGREDEIENTS;
    
    //constructor(public payload:  number) {}
}

export class StartEdit implements Action {
    readonly type = START_EDIT;

    constructor(public payload: number){}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export type ShoppingListActions = 
AddIngredient 
| AddIngredients 
| UpdateIngredients 
| DeleteIngredients
| StartEdit
| StopEdit;