import { combineReducers } from 'redux';

import { burgerIngredientsReducer } from "./burger-ingredients";
import { burgerConstructor } from "./burger-constructor";

import { userReducer} from "./user";


import { order } from "./order";



const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructor,
    order: order,
    user: userReducer
});


export {rootReducer};