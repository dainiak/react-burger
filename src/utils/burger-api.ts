import {getCookie, setCookie} from './cookies';

const NORMA_API_ENDPOINT = 'https://norma.nomoreparties.space/api'

const checkApiResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err: PromiseRejectionEvent) => Promise.reject(err));
};

const requestApi = async (path: string, options?: RequestInit) => {
    return fetch(`${NORMA_API_ENDPOINT}${path}`, options).then(checkApiResponse);
}

const refreshTokens = async () => {
    return requestApi(
        `/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({token: localStorage.getItem("refreshToken")})
        }
    );
}

interface IFetchOptions {
    method: string,
    headers: {
        'Content-Type': string,
        authorization?: string
    },
    body?: string
}

const fetchWithRefresh = async (path: string, options:IFetchOptions) => {
    try {
        options.headers.authorization = getCookie("token");
        return await fetch(`${NORMA_API_ENDPOINT}${path}`, options);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshTokens();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("token", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            return requestApi(path, options);
        } else {
            return Promise.reject(err);
        }
    }
};

export const getIngredientsByApi = async () => {
    return requestApi(
        '/ingredients'
    );
}

export const postOrderByApi = async (ingredients: Object) => {
    return fetchWithRefresh(
        '/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({ingredients: ingredients})
        }
    );
}

export const sendPasswordResetEmailByApi = async (email: string) => {
    return requestApi(
        '/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({email})
        }
    );
}

export const resetPasswordByApi = async (password: string, token: string) => {
    return requestApi(
        '/password-reset/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({password, token})
        }
    );
}

export const registerUserByApi = async (email: string, password: string, name: string) => {
    return requestApi(
        '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({
                "email": email,
                "password": password,
                "name": name
            })
        }
    );
}

export const loginUserByApi = async (email: string, password: string) => {
    return requestApi(
        '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({
                "email": email,
                "password": password,
            })
        }
    );
}

export const logoutUserByApi = async (token: string) => {
    try {
        await requestApi(
            '/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token})
            }
        )
    }
    catch (err) {
        return Promise.reject(err);
    }
}

export const getUserInfoByApi = async () => {
    return fetchWithRefresh(
        '/auth/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(
        checkApiResponse
    );
}

export const updateUserInfoByApi = async (values: Object) => {
    return fetchWithRefresh(
        '/auth/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(values)
        }
    );
}

