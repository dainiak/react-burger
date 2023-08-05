import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import AppHeader from './components/app-header/app-header';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MainPage } from "./pages/main-page";
import { Page404 } from "./pages/page-404";
import { IngredientPage } from "./pages/ingredient";
import { LoginPage } from "./pages/login";
import { LogoutPage } from "./pages/logout";
import { RegisterPage } from "./pages/register";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { ResetPasswordPage } from "./pages/reset-password";
import { ProfilePage } from "./pages/profile";
import { IngredientDetailsModal } from "./components/ingredient-details-modal/ingredient-details-modal";

import { ProvideAuth } from "./utils/auth";
import {AuthOnly, NonAuthOnly} from "./components/protected-route-element/protected-route-element";
import {
    ROUTE_FORGOT_PASSWORD, ROUTE_INGREDIENTS,
    ROUTE_LOGIN,
    ROUTE_LOGOUT, ROUTE_PROFILE,
    ROUTE_REGISTER,
    ROUTE_RESET_PASSWORD,
    ROUTE_ROOT
} from "./utils/routes";

function App() {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <ProvideAuth>
        <div className="App">
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
            <div className="app-main-div">
                <Routes location={background || location}>
                    <Route path={ROUTE_ROOT} element={<MainPage />}/>

                    <Route path={ROUTE_PROFILE}
                           element={<AuthOnly element={<ProfilePage />} alternative={ROUTE_LOGIN}/>} />

                    <Route path={ROUTE_LOGIN}
                           element={<NonAuthOnly element={<LoginPage />} alternative={ROUTE_PROFILE} />} />
                    <Route path={ROUTE_LOGOUT} element={<LogoutPage />}/>

                    <Route path={ROUTE_REGISTER}
                           element={<NonAuthOnly element={<RegisterPage />} alternative={ROUTE_PROFILE} />} />
                    <Route path={ROUTE_FORGOT_PASSWORD}
                           element={<NonAuthOnly element={<ForgotPasswordPage />} alternative={ROUTE_PROFILE} />} />
                    <Route path={ROUTE_RESET_PASSWORD}
                           element={<NonAuthOnly element={<ResetPasswordPage />} alternative={ROUTE_PROFILE} />} />


                    <Route path={ROUTE_INGREDIENTS}>
                        <Route path={":id"} element={<IngredientPage />}/>
                    </Route>

                    <Route path="*" element={<Page404/>} />
                </Routes>

                {background && (
                    <Routes>
                        <Route path={`${ROUTE_INGREDIENTS}/:id`} element={<IngredientDetailsModal/>} />
                    </Routes>
                )}
            </div>
            </DndProvider>
        </div>
        </ProvideAuth>
    );
}

export default App;
