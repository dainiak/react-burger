import { combineReducers } from 'redux';

import { burgerIngredientsReducer } from "./burger-ingredients";
import { burgerConstructor } from "./burger-constructor";

import { userReducer} from "./user";


import { orderReducer } from "./orderReducer";



const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructor,
    order: orderReducer,
    user: userReducer
});


export {rootReducer};