export const initialState = {
    burgerIngredients: {
        items: [],
        isLoading: false,
        hasError: false
    },
    burgerConstructor: {
        items: [],
        bun: null
    },
    order: {
        name: '',
        number: null,
        isPosting: false,
        hasError: false
    },
    currentIngredient: null
};
