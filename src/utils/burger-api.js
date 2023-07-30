const NORMA_API_ENDPOINT = 'https://norma.nomoreparties.space/api'

const checkApiReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function getIngredientsByApi() {
    return fetch(
        `${NORMA_API_ENDPOINT}/ingredients`
    ).then(
        checkApiReponse
    );
}

function postOrderByApi(ingredients) {
    return fetch(
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

function resetPasswordByApi(email) {
    return fetch(
        `${NORMA_API_ENDPOINT}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({email: email})
        }
    ).then(
        checkApiReponse
    );
}

function registerByApi(email, password, name) {
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

function loginByApi(email) {
    return fetch(
        `${NORMA_API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({email: email})
        }
    ).then(
        checkApiReponse
    );
}

function logoutByApi(refreshToken) {
    return fetch(
        `${NORMA_API_ENDPOINT}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({token: refreshToken})
        }
    ).then(
        checkApiReponse
    );
}

function getTokenByApi(email) {
    return fetch(
        `${NORMA_API_ENDPOINT}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({email: email})
        }
    ).then(
        checkApiReponse
    );
}

function getUserInfoByApi(accessToken) {
    return fetch(
        `${NORMA_API_ENDPOINT}/auth/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({token: accessToken})
        }
    ).then(
        checkApiReponse
    );
}

function updateUserInfoByApi(accessToken) {
    return fetch(
        `${NORMA_API_ENDPOINT}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({token: accessToken})
        }
    ).then(
        checkApiReponse
    );
}

function setCookie() {
    document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
}

function refreshToken() {
    return localStorage.getItem("refreshToken") || null;
}

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkApiReponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkApiReponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export {getIngredientsByApi, checkApiReponse, postOrderByApi };