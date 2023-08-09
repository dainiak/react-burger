import {getIngredientsByApi} from "../../utils/burger-api";

export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS';
export const LOAD_INGREDIENTS_FAILED = 'LOAD_INGREDIENTS_FAILED';

export const loadIngredients:Function = () => {
    return (dispatch :any) => {
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

