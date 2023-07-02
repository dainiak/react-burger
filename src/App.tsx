import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

import {MockData} from "./utils/mock-data";
import ModalOverlay from "./components/modal-overlay/modal-overlay";
import Modal from "./components/modal/modal";

function App() {
    const apiEndpoint = 'https://norma.nomoreparties.space/api/ingredients';

    const [state, setState] = React.useState<any>({
        isLoading: false,
        hasError: false,
        burgerIngredientsData: []
    });

    function getIngredientsByApi() {
        setState({ ...state, hasError: false, isLoading: true });
        fetch(apiEndpoint)
            .then(res => res.json())
            .then(data => setState({
                ...state,
                burgerIngredientsData: data.success ? data.data : [],
                isLoading: false
            }))
            .catch(e => {
                setState({ ...state, hasError: true, isLoading: false });
            });
    };

    function getIngredients() {
        const debug = false;
        if(debug) {
            setState({
                ...state,
                burgerIngredientsData: MockData,
                isLoading: false
            });
        }
        else
                    getIngredientsByApi();
    }

    React.useEffect(getIngredients, []);

    const { burgerIngredientsData, isLoading, hasError } = state;


  return (
    <div className="App">
        <AppHeader />
        <div style={{display: "flex", flexDirection: "row", justifyContent:"center"}}>
            {isLoading && <p>Загружаем ингредиенты...</p>}
            {hasError && <p>Ошибка при загрузке ингредиентов. Попробуйте обновить страницу.</p>}
            {!isLoading && !hasError &&
                <BurgerIngredients  burgerIngredients={state.burgerIngredientsData} />
            }
            <BurgerConstructor />

        </div>
    </div>
  );
}

export default App;
