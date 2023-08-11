import React, {FunctionComponent, SyntheticEvent} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import {useSelector, useDispatch, shallowEqual} from "react-redux";

import {REMOVE_INGREDIENT} from "../../services/actions/burger-constructor";
import {useDrop} from "react-dnd";
import {selectBurgerIngredientsItems} from "../../services/selectors/burger-ingredients";
import {selectIngredientsCounts} from "../../services/selectors/burger-constructor";
import {useNavigate, useLocation} from "react-router-dom";
import {IBurgerIngredient} from "../../declarations/burger-ingredients";


const BurgerIngredients: FunctionComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const ingredientCategories = [
        {name: "bun", header: "Булки", headerRef: React.createRef<HTMLParagraphElement>()},
        {name: "sauce", header: "Соусы", headerRef: React.createRef<HTMLParagraphElement>()},
        {name: "main", header: "Начинки", headerRef: React.createRef<HTMLParagraphElement>()}
    ];

    const burgerIngredients: Array<IBurgerIngredient> = useSelector(selectBurgerIngredientsItems, shallowEqual);
    const counts:{[key: string]: number} = useSelector(selectIngredientsCounts, shallowEqual);

    const burgerIngredientsPerCategory = ingredientCategories.map((category) => {
        return {
            ...category,
            ingredients: burgerIngredients.filter((ingredient) => ingredient.type === category.name)
        };
    });

    const [currentCategory, setCurrentCategory] = React.useState<string|null>(ingredientCategories[0].name);

    const dispatch = useDispatch();
    const openIngredientModal = (ingredientId: string) => {
        navigate(`/ingredients/${ingredientId}`, {replace: true, state: {background: location}});
    };

    const setCategory = (name: string) => {
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
                (category.headerRef.current ? category.headerRef.current.getBoundingClientRect().top: 0)
                -
                e.currentTarget.getBoundingClientRect().top
            );
            if (distance < bestDistance) {
                relevantCategoryName = category.name;
                bestDistance = distance;
            }
        }
        setCurrentCategory(relevantCategoryName);
    }

    const [, dropTarget] = useDrop({
        accept: 'ingredientInConstructor',
        drop(item:{index: string}) {
            dispatch({type: REMOVE_INGREDIENT, payload: {index: item.index}});
        }
    });

    return (
        <React.Fragment>
        <div className={styles.mainWrapper} ref={dropTarget}>
            <p className="text text_type_main-large pt-10 pb-5">Соберите бургер</p>

            <div className={styles.tabWrapper}>
                {
                    burgerIngredientsPerCategory.map((category) => (
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
                    burgerIngredientsPerCategory.map((category) => (
                        <div className="pt-10" key={category.name}>
                            <p className="text text_type_main-medium" id={`header_${category.name}`} ref={category.headerRef}>{category.header}</p>
                            <div className={styles.ingredientCardGallery}>
                                {
                                    category.ingredients.map((item) =>
                                        <IngredientCard
                                            key={item._id}
                                            ingredientItem={item}

                                            count={
                                                counts[item._id] || 0
                                            }
                                            onClick={() => openIngredientModal(item._id)}
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

