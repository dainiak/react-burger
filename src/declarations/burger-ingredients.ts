export interface IBurgerIngredient {
    _id: string;
    name: string;
    type: "bun"|"main"|"sauce";
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_large: string;
    image_mobile: string;
}

export interface IBurgerIngredientWithUUID extends IBurgerIngredient {
    uuid: string;
}