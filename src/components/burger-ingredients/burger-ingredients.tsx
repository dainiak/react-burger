import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import ModalOverlay from "../modal-overlay/modal-overlay";
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

    return (
        <React.Fragment>
        {ingredientInModal !== null &&
            <ModalOverlay onClick={() => setIngredientInModal(null)}>
                <Modal onClose={() => setIngredientInModal(null)}>
                    <IngredientDetails ingredient={ingredientInModal} />
                </Modal>
            </ModalOverlay>
        }

        <div className={styles.mainWrapper}>
            <p className="text text_type_main-large pt-10 pb-5">Соберите бургер</p>

            <div style={{ display: 'flex' }}>
                {
                    burgerIngredients.map((category: any) => (
                        <Tab
                            value={category.name}
                            active={currentCategory === category.name}
                            onClick={() => setCurrentCategory(category.name)}
                            key={category.name}
                        >
                            {category.header}
                        </Tab>
                    ))
                }
            </div>

            <div style={{overflowY: "scroll"}}  className="custom-scroll">
                {
                    burgerIngredients.map((category: any) => (
                        <div className="pt-10" key={category.name}>
                            <p className="text text_type_main-medium">{category.header}</p>
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