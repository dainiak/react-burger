import React from "react";
import styles from './ingredient-details.module.css';

import {ingredientPropTypes} from "../../utils/prop-types";
import {useSelector} from "react-redux";
import {selectBurgerIngredientsItems} from "../../services/selectors/burger-ingredients";
import PropTypes from "prop-types";

function IngredientDetails(props: any) {
    const ingredients = useSelector(selectBurgerIngredientsItems);
    const ingredient = ingredients.find((ingredient: any) => ingredient._id === props.ingredientId);
    if(!ingredient) {
        return (<div className={styles.wrapper}><p>Ингредиент не найден</p></div>);
    }

    const name = ingredient.name;
    const image = ingredient.image;

    const nutritionFacts = [
        {name: "Калории, ккал", value: ingredient.calories},
        {name: "Белки, г", value: ingredient.proteins},
        {name: "Жиры, г", value: ingredient.fat},
        {name: "Углеводы, г", value: ingredient.carbohydrates}
    ];

    return (
        <React.Fragment>
            <p className="text text_type_main-large pt-8 pl-10">Детали ингредиента</p>
            <div className={styles.wrapper}>

                <img src={image} alt={name} className="pt-8" />
                <p className="text text_type_main-medium pt-4 pb-8">{name}</p>
                <div className={styles.nutritionFacts}>
                    {
                        nutritionFacts.map((fact: any) => (
                            <div key={fact.name} className={`text text_type_main-small text_color_inactive ${styles.nutritionFactCard}`}>
                                {fact.name}
                                <div className="text text_type_digits-small text_color_inactive">{fact.value}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

IngredientDetails.propTypes = {
    ingredientId: PropTypes.string
}

export default IngredientDetails;