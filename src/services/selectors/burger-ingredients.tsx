import {IStore} from "../../declarations/store";

export const selectBurgerIngredientsItems = (store: IStore) => store.burgerIngredients.items;
export const selectCurrentIngredient = (store: IStore) => store.currentIngredient;

export const selectBurgerIngredients = (store: IStore) => store.burgerIngredients;