import { combineReducers } from 'redux';

import { burgerIngredientsReducer, currentIngredientReducer } from "./burger-ingredients";
import { burgerConstructor } from "./burger-constructor";
import { order } from "./order";



const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructor,
    order: order,
    currentIngredient: currentIngredientReducer
});


export {rootReducer};