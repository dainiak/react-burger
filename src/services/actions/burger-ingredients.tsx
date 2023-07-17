import {MockData} from "../../utils/mock-data";
import {getIngredientsByApi} from "../../utils/burger-api";

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';

export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS';
export const LOAD_INGREDIENTS_FAILED = 'LOAD_INGREDIENTS_FAILED';

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

