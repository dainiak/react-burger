export const selectBurgerConstructorItems = (store: any) => store.burgerConstructor.items;
export const selectBurgerConstructorBun = (store: any) => store.burgerConstructor.bun;

interface IBurgerIngredient {
    _id: string
}
interface IStore {
    burgerConstructor: {
        bun: IBurgerIngredient,
        items: IBurgerIngredient[]
    }
}

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