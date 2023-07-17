import {MockOrder} from "../../utils/mock-data";
import {postOrderByApi} from "../../utils/burger-api";
export const POST_ORDER = 'POST_ORDER';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';


export const postOrder = (ingredients: any) => {
    return (dispatch :any) => {
        const debug = false;
        if(debug) {
            dispatch({ type: POST_ORDER_SUCCESS, payload: {name: MockOrder.name, number: MockOrder.order.number} });
        }
        else {
            dispatch({ type: POST_ORDER });

            postOrderByApi(
                ingredients
            ).then(data => dispatch({
                type: POST_ORDER_SUCCESS,
                payload: data.success ? {name: data.name, number: data.order.number} : {name: data.message, number: null}
            }))
            .catch(() => {
                dispatch({ type: POST_ORDER_FAILED });
            });
        }
    }
}