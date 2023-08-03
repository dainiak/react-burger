import styles from './profile.module.css';
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {NavLink} from "react-router-dom";

export const ProfilePage = () => {
    const [login, setLogin] = React.useState('value');
    const inputRef = React.useRef(null);
    const onNameChange = (e: any) => {
        setLogin(e.target.value)
    };
    const onEditIconClick = () => {
        //@ts-ignore
        setTimeout(() => inputRef && inputRef.current && inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const logout = () => {

    }

    return (<>
        <div className={styles.wrapperLeft}>
            <div>
                <NavLink to={"/profile"} className={({ isActive, isPending }) =>
                    isActive ? `${styles.navlink} ${styles.active} text text_type_main-medium mb-6` : `${styles.navlink} text text_type_main-medium mb-6 text_color_inactive`
                }>
                Профиль
                </NavLink>

                <NavLink to={"/profile/orders"} className={({ isActive, isPending }) =>
                    isActive ? `${styles.navlink} ${styles.active} text text_type_main-medium mb-6` : `${styles.navlink} text text_type_main-medium mb-6 text_color_inactive`
                }>
                История заказов
                </NavLink>

                <NavLink to={"/logout"} className={({ isActive, isPending }) =>
                    isActive ? `${styles.navlink} ${styles.active} text text_type_main-medium mb-6` : `${styles.navlink} text text_type_main-medium mb-6 text_color_inactive`
                }>
                Выход
                </NavLink>
            </div>
        </div>
        <div className={styles.wrapper}>
            <Input
                type={"text"}
                placeholder={"Имя"}
                value={login}
                onChange={onNameChange}
                error={false}
                ref={inputRef}
                icon={'EditIcon'}
                onIconClick={onEditIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-2"
            />
            <EmailInput
                onChange={onNameChange}
                value={"mark@example.com"}
                name={'email'}
                extraClass="mb-2"
            />
            <PasswordInput
                onChange={onNameChange}
                value={"value"}
                name={'password'}
                noValidate={true}
                icon={"EditIcon"}
                formNoValidate={true}
            />
        </div>
        </>
    );
}