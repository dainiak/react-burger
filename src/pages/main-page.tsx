import React, {FunctionComponent} from "react";
import {useSelector} from "react-redux";

import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import {selectBurgerIngredients} from "../services/selectors/burger-ingredients";


export const MainPage:FunctionComponent = () => {
    const { isLoading, hasError } = useSelector(selectBurgerIngredients);

    return (<>
        {isLoading &&
            <p>Загружаем ингредиенты...</p>}

        {hasError &&
            <p>Ошибка при загрузке ингредиентов. Попробуйте обновить страницу.</p>}

        {!isLoading && !hasError &&
            <BurgerIngredients />}

        <BurgerConstructor />
    </>);
}