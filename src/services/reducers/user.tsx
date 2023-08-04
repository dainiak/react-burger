import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, REGISTER_NEW_USER, REGISTER_NEW_USER_FAILED} from "../actions/user";

import {initialState} from "./initial-state";

//@ts-ignore
export const userReducer = (state: object = initialState.user, action: any) => {
    switch(action.type) {
        case LOGIN:
            return {
                profile: initialState.user.profile,
                isLoading: true,
                hasError: false
            };
        case LOGIN_SUCCESS:
            return {
                profile: action.payload,
                isLoading: false,
                hasError: false
            };
        case LOGIN_FAILED:
            return {
                profile: initialState.user.profile,
                isLoading: false,
                hasError: true
            };
        case REGISTER_NEW_USER:
            return {
                profile: initialState.user.profile,
                isLoading: true,
                hasError: false
            };
        case REGISTER_NEW_USER_FAILED:
            return {
                profile: initialState.user.profile,
                isLoading: false,
                hasError: true
            };
        case LOGOUT:
            return initialState.user;

        default:
            return state;
    }
}
