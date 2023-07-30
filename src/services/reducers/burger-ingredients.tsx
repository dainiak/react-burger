import {LOAD_INGREDIENTS, LOAD_INGREDIENTS_FAILED, LOAD_INGREDIENTS_SUCCESS} from "../actions/burger-ingredients";
import {initialState} from "./initial-state";


export const burgerIngredientsReducer = (state = initialState.burgerIngredients, action: any) => {
    switch(action.type) {
        case LOAD_INGREDIENTS:
            return {
                ...state,
                isLoading: true,
                hasError: false
            };
        case LOAD_INGREDIENTS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                isLoading: false,
                hasError: false
            };
        case LOAD_INGREDIENTS_FAILED:
            return {
                ...state,
                isLoading: false,
                hasError: true,
                items: initialState.burgerIngredients.items
            };
        default:
            return state;
    }
}
