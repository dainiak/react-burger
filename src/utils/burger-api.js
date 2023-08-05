import {getCookie, setCookie} from './cookies';

const NORMA_API_ENDPOINT = 'https://norma.nomoreparties.space/api'

const checkApiReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
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
        checkApiReponse
    );
}

const fetchWithRefresh = async (url, options) => {
    try {
        options.headers.authorization = getCookie("token");
        const res = await fetch(url, options);
        return res;
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshTokens();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            console.log("refreshData", refreshData);
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("token", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            return fetch(url, options).then(checkApiReponse);
        } else {
            return Promise.reject(err);
        }
    }
};

export const getIngredientsByApi = async () => {
    return fetch(
        `${NORMA_API_ENDPOINT}/ingredients`
    ).then(
        checkApiReponse
    );
}

export const postOrderByApi = async (ingredients) => {
    return fetchWithRefresh(
        `${NORMA_API_ENDPOINT}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({ingredients: ingredients})
        }
    ).then(
        checkApiReponse
    );
}

export const sendPasswordResetEmailByApi = async (email) => {
    return fetch(
        `${NORMA_API_ENDPOINT}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({email})
        }
    ).then(
        checkApiReponse
    );
}

export const resetPasswordByApi = async (password, token) => {
    return fetch(
        `${NORMA_API_ENDPOINT}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({password, token})
        }
    ).then(
        checkApiReponse
    );
}

export const registerUserByApi = async (email, password, name) => {
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
        checkApiReponse
    );
}

export const loginUserByApi = async (email, password) => {
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
        checkApiReponse
    );
}

export const logoutUserByApi = async () => {
    const token = localStorage.getItem('refreshToken');
    return fetch(
        `${NORMA_API_ENDPOINT}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({token})
        }
    ).then(
        checkApiReponse
    );
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
        checkApiReponse
    );
}

export const updateUserInfoByApi = async (email, name) => {
    return fetchWithRefresh(
        `${NORMA_API_ENDPOINT}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({email, name})
        }
    ).then(
        checkApiReponse
    );
}

