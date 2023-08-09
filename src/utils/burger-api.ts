import {getCookie, setCookie} from './cookies';

const NORMA_API_ENDPOINT = 'https://norma.nomoreparties.space/api'

const checkApiResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err: PromiseRejectionEvent) => Promise.reject(err));
};

const refreshTokens = async () => {
    return fetch(
        `${NORMA_API_ENDPOINT}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({token: localStorage.getItem("refreshToken")})
        }
    ).then(
        checkApiResponse
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

const fetchWithRefresh = async (url: string, options:IFetchOptions) => {
    try {
        options.headers.authorization = getCookie("token");
        return await fetch(url, options);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshTokens();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("token", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            return fetch(url, options).then(checkApiResponse);
        } else {
            return Promise.reject(err);
        }
    }
};

export const getIngredientsByApi = async () => {
    return fetch(
        `${NORMA_API_ENDPOINT}/ingredients`
    ).then(
        checkApiResponse
    );
}

export const postOrderByApi = async (ingredients: Object) => {
    return fetchWithRefresh(
        `${NORMA_API_ENDPOINT}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({ingredients: ingredients})
        }
    ).then(
        checkApiResponse
    );
}

export const sendPasswordResetEmailByApi = async (email: string) => {
    return fetch(
        `${NORMA_API_ENDPOINT}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({email})
        }
    ).then(
        checkApiResponse
    );
}

export const resetPasswordByApi = async (password: string, token: string) => {
    return fetch(
        `${NORMA_API_ENDPOINT}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({password, token})
        }
    ).then(
        checkApiResponse
    );
}

export const registerUserByApi = async (email: string, password: string, name: string) => {
    return fetch(
        `${NORMA_API_ENDPOINT}/auth/register`, {
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
    ).then(
        checkApiResponse
    );
}

export const loginUserByApi = async (email: string, password: string) => {
    return fetch(
        `${NORMA_API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({
                "email": email,
                "password": password,
            })
        }
    ).then(
        checkApiResponse
    );
}

export const logoutUserByApi = async (token: string) => {
    try {
        fetch(
            `${NORMA_API_ENDPOINT}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token})
            }
        ).then(
            checkApiResponse
        )
    }
    catch (err) {
        return Promise.reject(err);
    }
}

export const getUserInfoByApi = async () => {
    return fetchWithRefresh(
        `${NORMA_API_ENDPOINT}/auth/user`, {
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
        `${NORMA_API_ENDPOINT}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(values)
        }
    ).then(
        checkApiResponse
    );
}

