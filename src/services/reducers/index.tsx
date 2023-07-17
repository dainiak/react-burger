import { combineReducers } from 'redux';
import { LOAD_INGREDIENTS, LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_FAILED,
    SET_CURRENT_INGREDIENT, ADD_INGREDIENT, REMOVE_INGREDIENT, REORDER_INGREDIENTS,
    POST_ORDER, POST_ORDER_SUCCESS, POST_ORDER_FAILED
} from "../actions";

const initialState = {
    burgerIngredients: {
        items: [],
        isLoading: false,
        hasError: false
    },
    burgerConstructor: {
        items: [],
        bun: null
    },
    order: {
        name: '',
        number: null,
        isPosting: false,
        hasError: false
    },
    currentIngredient: null
};


const burgerIngredientsReducer = (state = initialState.burgerIngredients, action: any) => {
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
                hasError: true
            };
        default:
            return state;
    }
}

const burgerConstructorReducer = (state = initialState.burgerConstructor, action: any) => {
    switch(action.type) {
        case ADD_INGREDIENT:
            if(action.payload.type === 'bun') {
                return {
                    ...state,
                    bun: action.payload
                };
            }
            return {
                ...state,
                items: [...state.items, action.payload]
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

const currentIngredientReducer = (state = initialState.currentIngredient, action: any) => {
    switch(action.type) {
        case SET_CURRENT_INGREDIENT:
            return action.payload;
        default:
            return state;
    }
}

const orderReducer = (state = initialState.order, action: any) => {
    switch (action.type) {
        case POST_ORDER:
            return {
                ...state,
                isPosting: true,
                hasError: false,
            }
        case POST_ORDER_SUCCESS:
            return {
                ...state,
                isPosting: false,
                hasError: false,
                name: action.payload.name,
                number: action.payload.number
            }
        case POST_ORDER_FAILED:
            return {
                ...state,
                isPosting: false,
                hasError: true
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    currentIngredient: currentIngredientReducer
});


export {rootReducer};