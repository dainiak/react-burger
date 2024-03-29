import {postOrderByApi} from "../../utils/burger-api";

export const POST_ORDER = 'POST_ORDER';
export const RESET_ORDER = 'RESET_ORDER';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const postOrder:Function = (ingredients: string[]) => {
    return (dispatch: Function) => {
        dispatch({ type: POST_ORDER });

        postOrderByApi(
            ingredients
        ).then(data => {
            console.log(data);
            dispatch({
                type: POST_ORDER_SUCCESS,
                payload: data.success ? {name: data.name, number: data.order.number} : {name: data.message, number: null}
            })
        }
        )
        .catch(() => {
            dispatch({ type: POST_ORDER_FAILED });
        });
    }
}
