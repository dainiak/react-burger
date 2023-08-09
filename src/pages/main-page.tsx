import React, {FunctionComponent} from "react";
import {useDispatch, useSelector} from "react-redux";

import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import {loadIngredients} from "../services/actions/burger-ingredients";
import {selectBurgerIngredients} from "../services/selectors/burger-ingredients";


export const MainPage:FunctionComponent = () => {
    const dispatch = useDispatch();

    React.useEffect(() => dispatch(loadIngredients()), [dispatch]);

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