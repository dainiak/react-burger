import {getUserInfoByApi, loginUserByApi, logoutUserByApi, registerUserByApi,} from "../../utils/burger-api";
import {deleteCookie, setCookie} from "../../utils/cookies";

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const REGISTER_NEW_USER = 'REGISTER_NEW_USER';
export const REGISTER_NEW_USER_FAILED = 'REGISTER_NEW_USER_FAILED';


export const loginUser:Function = (email: string, password: string) => {
    return (dispatch: Function) => {
        dispatch({ type: LOGIN });

        loginUserByApi(
            email,
            password
        ).then(data => {
            setCookie('token', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            data.success && dispatch({
                type: LOGIN_SUCCESS,
                payload: {name: data.user.name, email: data.user.email}
            })
        })
        .catch(() => {
            dispatch({ type: LOGIN_FAILED });
        });
    }
}

export const registerUser:Function = (email: string, password: string, name: string) => {
    return (dispatch: Function) => {
        dispatch({ type: REGISTER_NEW_USER });

        registerUserByApi(
            email,
            password,
            name
        ).then(data => {
            setCookie('token', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            data.success && dispatch({
                type: LOGIN_SUCCESS,
                payload: {name: data.name, email: data.email}
            })
        })
        .catch(() => {
            dispatch({ type: REGISTER_NEW_USER_FAILED });
        });
    }
}

export const logoutUser:Function = () => {
    const token = localStorage.getItem('refreshToken');
    deleteCookie('token');
    localStorage.removeItem('refreshToken');

    if(!token) return (dispatch: Function) => {
        dispatch({ type: LOGOUT });
    }
    return (dispatch: Function) => {
        logoutUserByApi(token).finally(() => {
            dispatch({ type: LOGOUT });
        });
    }
}

export const loadUserProfile: Function = () => {
    return (dispatch: Function) => {
        getUserInfoByApi().then((data) => {
            data.success && dispatch({
                type: LOGIN_SUCCESS,
                payload: {name: data.user.name, email: data.user.email}
            })
        });
    }
}

