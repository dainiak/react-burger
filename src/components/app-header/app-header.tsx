import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
        <div className={styles.logo}><Logo /></div>

        <nav className={styles.nav}>
            <a href={"#"} className={`${styles.navlink} pl-5`}>
                <BurgerIcon type="primary" /> <span className={`text text_type_main-default text_color_primary pb-2 pt-2 pl-2 pr-5 ${styles.cv}`}>Конструктор</span>
            </a>

            <a href={"#"} className={`${styles.navlink}`}>
                <ListIcon type="primary" /> <span className={`text text_type_main-default text_color_inactive pl-2 ${styles.cv}`}>Лента заказов</span>
            </a>

            <a href={"#"} className={`${styles.navlink} ${styles.flushRight}`}>
                <ProfileIcon type="primary" /> <span className={`text text_type_main-default text_color_inactive pl-2 pr-5 ${styles.cv}`}>Личный кабинет</span>
            </a>
        </nav>
    </header>
  );
}


export default AppHeader;