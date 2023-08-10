import IngredientDetails from "../components/ingredient-details/ingredient-details";

import styles from './ingredient.module.css';

import {useParams} from "react-router-dom";
import React, {FunctionComponent} from "react";
import {useSelector} from "react-redux";
import {selectBurgerIngredients} from "../services/selectors/burger-ingredients";


export const IngredientPage:FunctionComponent = () => {
    const { isLoading, hasError } = useSelector(selectBurgerIngredients);
    const { id } = useParams<{ id: string }>();

    return (<>
        {isLoading &&
            <p>Загружаем ингредиенты...</p>}

        {hasError &&
            <p>Ошибка при загрузке ингредиентов. Попробуйте обновить страницу.</p>}

        {!isLoading && !hasError &&
            <div className={styles.wrapper}><IngredientDetails ingredientId={id} /></div>}
    </>);
}