import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';



import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "./services/actions/burger-ingredients";

function App() {
    const dispatch = useDispatch();

    // @ts-ignore
    React.useEffect(() => dispatch(loadIngredients()), [dispatch]);

    // @ts-ignore
    const { isLoading, hasError } = useSelector((store) => store.burgerIngredients);



    return (
        <div className="App">
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
            <div className="app-main-div">
                {isLoading && <p>Загружаем ингредиенты...</p>}
                {hasError && <p>Ошибка при загрузке ингредиентов. Попробуйте обновить страницу.</p>}
                {!isLoading && !hasError &&
                    <BurgerIngredients />
                }
                <BurgerConstructor />
            </div>
            </DndProvider>
        </div>
    );
}

export default App;
