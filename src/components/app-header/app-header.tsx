import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {NavLink, useLocation} from "react-router-dom";

function AppHeader() {
  return (
    <header className={styles.header}>
        <div className={styles.logo}><Logo /></div>

        <nav className={styles.nav}>
            <NavLink to={"/"} className={({ isActive, isPending }) =>
                isActive ? `${styles.navlink} ${styles.active} pl-5 text_color_primary` : `${styles.navlink} pl-5 text_color_inactive`
            }>
                <BurgerIcon type="primary" /> <span className={`text text_type_main-default pb-2 pt-2 pl-2 pr-5 ${styles.cv}`}>Конструктор</span>
            </NavLink>

            <NavLink to={"/orders"} className={({ isActive, isPending }) =>
                isActive ? `${styles.navlink} ${styles.active} text_color_primary` : `${styles.navlink} text_color_inactive`
            }>
                <ListIcon type="primary" /> <span className={`text text_type_main-default pl-2 ${styles.cv}`}>Лента заказов</span>
            </NavLink>

            <NavLink to={"/profile"} className={({ isActive, isPending }) =>
                isActive ? `${styles.navlink} ${styles.active} ${styles.flushRight} text_color_primary` : `${styles.navlink} ${styles.flushRight} text_color_inactive`
            }>
                <ProfileIcon type="primary" /> <span className={`text text_type_main-default pl-2 pr-5 ${styles.cv}`}>Личный кабинет</span>
            </NavLink>
        </nav>
    </header>
  );
}


export default AppHeader;