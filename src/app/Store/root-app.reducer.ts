import * as fromShoppingListReducer from '../shopping-list/Store/shopping-list.reducer';
import * as fromAuthReducer from '../auth/Store/aurh.reducer';

import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
    shoppingList: fromShoppingListReducer.State,
    auth: fromAuthReducer.authState
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingListReducer.ShoppingListReducer,
    auth: fromAuthReducer.authReducer
}