import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import {getIngredients} from "./utils/burger-api";

import {MockData} from "./utils/mock-data";

function App() {
    const [state, setState] = React.useState<any>({
        isLoading: false,
        hasError: false,
        burgerIngredientsData: []
    });

    function loadIngredients() {
        const debug = false;
        if(debug) {
            setState({
                ...state,
                burgerIngredientsData: MockData,
                isLoading: false
            });
        }
        else {
            setState({ ...state, hasError: false, isLoading: true });

            getIngredients().then(data => setState({
                ...state,
                burgerIngredientsData: data.success ? data.data : [],
                isLoading: false
            }))
            .catch(e => {
                setState({ ...state, hasError: true, isLoading: false });
            });
        }
    }

    React.useEffect(loadIngredients, []);

    const { burgerIngredientsData, isLoading, hasError } = state;


  return (
    <div className="App">
        <AppHeader />
        <div className="app-main-div">
            {isLoading && <p>Загружаем ингредиенты...</p>}
            {hasError && <p>Ошибка при загрузке ингредиентов. Попробуйте обновить страницу.</p>}
            {!isLoading && !hasError &&
                <BurgerIngredients burgerIngredients={burgerIngredientsData} />
            }
            <BurgerConstructor />

        </div>
    </div>
  );
}

export default App;
