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
import {ProtectedRouteElement} from "./components/protected-route-element/protected-route-element";

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
                    <Route path="/" element={<MainPage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/logout" element={<LogoutPage />}/>
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
                    <Route path="/reset-password" element={<ResetPasswordPage />}/>
                    <Route path="/profile" element={<ProfilePage />}/>
                    <Route path="/ingredients">
                        <Route path={":id"} element={<IngredientPage />}/>
                    </Route>
                    <Route path="*" element={<Page404/>} />
                </Routes>

                {background && (
                    <Routes>
                        <Route path="/ingredients/:id" element={<IngredientDetailsModal/>} />
                    </Routes>
                )}
            </div>
            </DndProvider>
        </div>
        </ProvideAuth>
    );
}

export default App;
