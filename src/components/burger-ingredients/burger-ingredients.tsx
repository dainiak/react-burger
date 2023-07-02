import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients(props: any) {
    const ingredientCategories = [
        {name: "bun", header: "Булки"},
        {name: "sauce", header: "Соусы"},
        {name: "main", header: "Начинки"}
    ];

    let burgerIngredients = ingredientCategories.map((category: any) => {
        return {
            ...category,
            ingredients: props.burgerIngredients.filter((ingredient: any) => ingredient.type === category.name)
        };
    });

    const [currentCategory, setCurrentCategory] = React.useState(ingredientCategories[0].name);
    const [ingredientInModal, setIngredientInModal] = React.useState(null);

    const setCategory = (name: any) => {
        setCurrentCategory(name);
        const element = document.getElementById(`header_${name}`);
        if (element)
            element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <React.Fragment>
        {ingredientInModal !== null &&
            <Modal onClose={() => setIngredientInModal(null)}>
                <IngredientDetails ingredient={ingredientInModal} />
            </Modal>
        }

        <div className={styles.mainWrapper}>
            <p className="text text_type_main-large pt-10 pb-5">Соберите бургер</p>

            <div className={styles.tabWrapper}>
                {
                    burgerIngredients.map((category: any) => (
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

            <div className={`custom-scroll ${styles.catalogWrapper}`}>
                {
                    burgerIngredients.map((category: any) => (
                        <div className="pt-10" key={category.name}>
                            <p className="text text_type_main-medium" id={`header_${category.name}`}>{category.header}</p>
                            <div className={styles.ingredientCardGallery}>
                                {
                                    category.ingredients.map((item: any) =>
                                        <IngredientCard
                                            key={item._id}
                                            text={item.name}
                                            price={item.price}
                                            thumbnail={item.image}
                                            onClick={() => setIngredientInModal(item)}
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