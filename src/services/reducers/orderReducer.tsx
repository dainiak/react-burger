import {POST_ORDER, POST_ORDER_FAILED, POST_ORDER_SUCCESS} from "../actions/order";
import {initialState} from "./initial-state";

export const orderReducer = (state = initialState.order, action: any) => {
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
                name: initialState.order.name,
                number: initialState.order.number,
                isPosting: false,
                hasError: true
            }
        default:
            return state;
    }
}
