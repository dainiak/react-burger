import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    REORDER_INGREDIENTS,
    RESET_BURGER_CONSTRUCTOR
} from "../actions/burger-constructor";
import {initialState} from "./initial-state";

import { v4 as randomUUID } from 'uuid';
import {AnyAction} from "redux";
import {IBurgerIngredientWithUUID} from "../../declarations/burger-ingredients";

export const burgerConstructor = (state: {items: Array<IBurgerIngredientWithUUID>, bun: string|null} = initialState.burgerConstructor, action: AnyAction) => {
    switch(action.type) {
        case RESET_BURGER_CONSTRUCTOR:
            return initialState.burgerConstructor;
        case ADD_INGREDIENT:
            if(action.payload.type === 'bun') {
                return {
                    ...state,
                    bun: action.payload
                };
            }
            const itemWithUuid = {
                ...action.payload,
                uuid: randomUUID()
            }

            return {
                ...state,
                items: [...state.items, itemWithUuid]
            };
        case REMOVE_INGREDIENT:
            if(action.payload.index !== undefined)
                return {
                    ...state,
                    items: state.items.filter((_, index) => index !== action.payload.index)
                }
            return {
                ...state,
                items: state.items.filter((item) => item._id !== action.payload.id)
            }
        case REORDER_INGREDIENTS:
            return {
                ...state,
                items: state.items.map((_, index) =>
                    index === action.payload.first_index ? state.items[action.payload.second_index]
                        : index === action.payload.second_index ? state.items[action.payload.first_index]
                            : state.items[index]
                )
            }
        default:
            return state;
    }
}
