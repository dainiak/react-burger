import {MockData, MockOrder} from "../../utils/mock-data";
import {getIngredientsByApi, postOrderByApi} from "../../utils/burger-api";

export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS';
export const LOAD_INGREDIENTS_FAILED = 'LOAD_INGREDIENTS_FAILED';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS';

export const POST_ORDER = 'POST_ORDER';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const loadIngredients = () => {
    return (dispatch :any) => {
        const debug = false;
        if(debug) {
            dispatch({ type: LOAD_INGREDIENTS_SUCCESS, payload: MockData });
        }
        else {
            dispatch({ type: LOAD_INGREDIENTS });

            getIngredientsByApi(
                ).then(data => dispatch({
                    type: LOAD_INGREDIENTS_SUCCESS,
                    payload: data.success ? data.data : []
                }))
                .catch(() => {
                    dispatch({ type: LOAD_INGREDIENTS_FAILED });
                });
        }
    }
}

export const postOrder = (ingredients: any) => {
    return (dispatch :any) => {
        const debug = true;
        if(debug) {
            dispatch({ type: POST_ORDER_SUCCESS, payload: {name: MockOrder.name, number: MockOrder.order.number} });
        }
        else {
            dispatch({ type: POST_ORDER });

            postOrderByApi(
                ingredients
            ).then(data => dispatch({
                type: POST_ORDER_SUCCESS,
                payload: data.success ? {name: data.name, number: data.order.number} : {name: 'error', number: null}
            }))
            .catch(() => {
                dispatch({ type: POST_ORDER_FAILED });
            });
        }
    }
}