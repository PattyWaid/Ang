import { Ingredient } from '../../shared/ingredient.model';
import * as shoppingListActions from './shopping-list.action';


export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function ShoppingListReducer(state: State  = initialState, action: shoppingListActions.ShoppingListActions) {
    switch(action.type) {
        case shoppingListActions.ADD_INGREDEIENT:
            return {...state,
            ingredients: [...state.ingredients, action.payload]
        };
        case shoppingListActions.ADD_INGREDEIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case shoppingListActions.UPDATE_INGREDEIENTS:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            } ;
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient : null,
                editedIngredientIndex: -1
            };
        case shoppingListActions.DELETE_INGREDEIENTS:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                }),
                editedIngredient : null,
                editedIngredientIndex: -1

            };
        case shoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload]}
            };
        case shoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        default:
                return state;
        }
       
}