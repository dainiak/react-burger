import {getUserInfoByApi, loginUserByApi, logoutUserByApi, registerUserByApi,} from "../../utils/burger-api";
import {deleteCookie, setCookie} from "../../utils/cookies";
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT = 'LOGOUT';

export const REGISTER_NEW_USER = 'REGISTER_NEW_USER';
export const REGISTER_NEW_USER_FAILED = 'REGISTER_NEW_USER_FAILED';


export const loginUser = (email: any, password: any) => {
    return (dispatch :any) => {
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

export const registerUser = (email: any, password: any, name: any) => {
    return (dispatch :any) => {
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

export const logoutUser = () => {
    const token = localStorage.getItem('refreshToken');
    deleteCookie('token');
    localStorage.removeItem('refreshToken');

    if(!token) return (dispatch :any) => {
        dispatch({ type: LOGOUT });
    }
    return (dispatch :any) => {
        logoutUserByApi(token).finally(() => {
            dispatch({ type: LOGOUT });
        });
    }
}

export const loadUserProfile = () => {
    return (dispatch :any) => {
        getUserInfoByApi().then((data) => {
            data.success && dispatch({
                type: LOGIN_SUCCESS,
                payload: {name: data.user.name, email: data.user.email}
            })
        });
    }
}

