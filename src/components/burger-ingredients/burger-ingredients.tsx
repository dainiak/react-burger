import React, {SyntheticEvent} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {SET_CURRENT_INGREDIENT} from "../../services/actions/burger-ingredients";
import {REMOVE_INGREDIENT} from "../../services/actions/burger-constructor";
import {useDrop} from "react-dnd";

// @ts-ignore
function BurgerIngredients() {
    const ingredientCategories = [
        {name: "bun", header: "Булки", headerRef: React.createRef()},
        {name: "sauce", header: "Соусы", headerRef: React.createRef()},
        {name: "main", header: "Начинки", headerRef: React.createRef()}
    ];

    const burgerIngredients = useSelector(
        (store: any) => store.burgerIngredients.items
    );

    // @ts-ignore
    const countIngredients = (store: any) => {
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

    // @ts-ignore
    const counts = useSelector(countIngredients, shallowEqual);

    const burgerIngredientsPerCategory = ingredientCategories.map((category: any) => {
        return {
            ...category,
            ingredients: burgerIngredients.filter((ingredient: any) => ingredient.type === category.name)
        };
    });

    const [currentCategory, setCurrentCategory] = React.useState(ingredientCategories[0].name);

    const dispatch = useDispatch();
    const setCurrentIngredient = (ingredient: any) => {
        dispatch({type: SET_CURRENT_INGREDIENT, payload: ingredient})
    };

    const currentIngredient = useSelector((store: any) => store.currentIngredient);

    const setCategory = (name: any) => {
        setCurrentCategory(name);
        const element = document.getElementById(`header_${name}`);
        if (element)
            element.scrollIntoView({ behavior: "smooth" });
    };

    const updateActiveTab = (e: SyntheticEvent) => {
        let relevantCategoryName = null;
        let bestDistance = Infinity;
        for (let category of ingredientCategories) {

            const distance = Math.abs(
                // @ts-ignore
                category.headerRef.current.getBoundingClientRect().top - e.currentTarget.getBoundingClientRect().top
            );
            if (distance < bestDistance ) {
                relevantCategoryName = category.name;
                bestDistance = distance;
            }
        }
        // @ts-ignore
        setCurrentCategory(relevantCategoryName);
    }

    const [, dropTarget] = useDrop({
        accept: 'ingredientInConstructor',
        drop(item) {
            // @ts-ignore
            dispatch({type: REMOVE_INGREDIENT, payload: {index: item.index}});
        }
    });

    // @ts-ignore
    // @ts-ignore
    return (
        <React.Fragment>
        {currentIngredient !== null &&
            <Modal onClose={() => setCurrentIngredient(null)}>
                <IngredientDetails ingredient={currentIngredient} />
            </Modal>
        }

        <div className={styles.mainWrapper} ref={dropTarget}>
            <p className="text text_type_main-large pt-10 pb-5">Соберите бургер</p>

            <div className={styles.tabWrapper}>
                {
                    burgerIngredientsPerCategory.map((category: any) => (
                        <Tab
                            value={category.name}
                            active={currentCategory === category.name}
                            onClick={() => setCategory(category.name)}
                            key={category.name}
                        >
                            {category.header}
                        </Tab>
                    ))
                }
            </div>

            <div className={`custom-scroll ${styles.catalogWrapper}`} onScroll={updateActiveTab}>
                {
                    burgerIngredientsPerCategory.map((category: any) => (
                        <div className="pt-10" key={category.name}>
                            <p className="text text_type_main-medium" id={`header_${category.name}`} ref={category.headerRef}>{category.header}</p>
                            <div className={styles.ingredientCardGallery}>
                                {
                                    category.ingredients.map((item: any) =>
                                        <IngredientCard
                                            key={item._id}
                                            ingredientItem={item}

                                            count={
                                                // @ts-ignore
                                                counts[item._id] || 0
                                            }
                                            onClick={() => setCurrentIngredient(item)}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

        </React.Fragment>
    )
}

export default BurgerIngredients;