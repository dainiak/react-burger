import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT} from "../actions/user";

import {initialState} from "./initial-state";

//@ts-ignore
export const userReducer = (state: object = initialState.user, action: any) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                isLoading: true,
                hasError: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                hasError: false
            };
        case LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                hasError: true,
                user: initialState.user
            };
        case LOGOUT:
            return {
                ...state,
                isLoading: false,
                hasError: false,
                user: initialState.user
            }

        default:
            return state;
    }
}
