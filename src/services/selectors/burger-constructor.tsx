export const selectBurgerConstructorItems = (store: any) => store.burgerConstructor.items;
export const selectBurgerConstructorBun = (store: any) => store.burgerConstructor.bun;

// @ts-ignore
export const selectIngredientsCounts = (store: any) => {
    let counts = {};
    if(store.burgerConstructor.bun) {
        // @ts-ignore
        counts[store.burgerConstructor.bun._id] = 2;
    }
    for(let ingredient of store.burgerConstructor.items) {
        // @ts-ignore
        counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
    }
    return counts;
};