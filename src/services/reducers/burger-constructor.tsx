import {ADD_INGREDIENT, REMOVE_INGREDIENT, REORDER_INGREDIENTS} from "../actions/burger-constructor";
import {initialState} from "./initial-state";
// @ts-ignore
import { v4 as randomUUID } from 'uuid';

export const burgerConstructor = (state = initialState.burgerConstructor, action: any) => {
    switch(action.type) {
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
            console.log(itemWithUuid);
            return {
                ...state,
                items: [...state.items, itemWithUuid]
            };
        case REMOVE_INGREDIENT:
            if(action.payload.index !== undefined)
                return {
                    ...state,
                    items: state.items.filter((item: any, index: any) => index !== action.payload.index)
                }
            return {
                ...state,
                items: state.items.filter((item: any) => item._id !== action.payload.id)
            }
        case REORDER_INGREDIENTS:
            return {
                ...state,
                items: state.items.map((item, index) =>
                    index === action.payload.first_index ? state.items[action.payload.second_index]
                        : index === action.payload.second_index ? state.items[action.payload.first_index]
                            : state.items[index]
                )
            }
        default:
            return state;
    }
}
