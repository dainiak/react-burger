import {IStore} from "../../declarations/store";

export const selectBurgerConstructorItems = (store: IStore) => store.burgerConstructor.items;
export const selectBurgerConstructorBun = (store: IStore) => store.burgerConstructor.bun;

export const selectIngredientsCounts = (store: IStore) => {
    let counts:{[key:string]: number} = {};
    if(store.burgerConstructor.bun) {
        counts[store.burgerConstructor.bun._id] = 2;
    }
    for(let ingredient of store.burgerConstructor.items) {
        counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
    }
    return counts;
};