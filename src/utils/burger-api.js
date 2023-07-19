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

export {getIngredientsByApi, checkApiReponse, postOrderByApi };