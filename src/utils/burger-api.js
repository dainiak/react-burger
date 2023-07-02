const NORMA_API_ENDPOINT = 'https://norma.nomoreparties.space/api'

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function getIngredients() {
    return fetch(
        `${NORMA_API_ENDPOINT}/ingredients`
    ).then(
        checkReponse
    );
}

export {getIngredients, checkReponse};