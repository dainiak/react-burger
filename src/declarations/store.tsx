import {IBurgerIngredient, IBurgerIngredientWithUUID} from "./burger-ingredients";

export interface IStore {
    burgerIngredients: {
        items: IBurgerIngredient[];
        isLoading: boolean;
        hasError: boolean;
    };
    currentIngredient: IBurgerIngredient | null;
    order: {
        number: number;
        name: string;
        isPosting: boolean;
        hasError: boolean;
    };
    burgerConstructor: {
        bun: IBurgerIngredient | null;
        items: IBurgerIngredientWithUUID[];
    };
    user: {
        profile: {
            name: string;
            email: string;
        },
        hasError: boolean;
        isLoading: boolean;
    }
}