import styles from './profile.module.css';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";
import {Navigate, NavLink} from "react-router-dom";
import {getUserInfoByApi} from "../utils/burger-api";
import {useSelector} from "react-redux";
import {selectUser} from "../services/selectors/user";

export const ProfilePage = () => {
    const [email, setEmail] = React.useState('value');
    const [password, setPassword] = React.useState('value');
    const [name, setName] = React.useState('value');
    const nameInputRef = React.useRef(null);
    const emailInputRef = React.useRef(null);
    const passwordInputRef = React.useRef(null);
    const user = useSelector(selectUser);


    useEffect(() => {
        if(localStorage.getItem('refreshToken'))
            getUserInfoByApi().then((data) => {
                setName(data.user.name);
                setEmail(data.user.email);
            });
    }, []);

    const onNameChange = (e: any) => {
        setName(e.target.value);
    };
    const onEmailChange = (e: any) => {
        setEmail(e.target.value);
    }
    const onPasswordChange = (e: any) => {
        setPassword(e.target.value);
    }
    const onNameEditIconClick = () => {
        //@ts-ignore
        setTimeout(() => nameInputRef && nameInputRef.current && nameInputRef.current.focus(), 0)
    }
    const onEmailEditIconClick = () => {
        //@ts-ignore
        setTimeout(() => emailInputRef && emailInputRef.current && emailInputRef.current.focus(), 0)
    }
    const onPasswordEditIconClick = () => {
        //@ts-ignore
        setTimeout(() => passwordInputRef && passwordInputRef.current && passwordInputRef.current.focus(), 0)
    }

    if(!user.profile && !localStorage.getItem('refreshToken'))
        return <Navigate to="/login"/>;

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
                value={name}
                onChange={onNameChange}
                error={false}
                ref={nameInputRef}
                icon={'EditIcon'}
                onIconClick={onNameEditIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-2"
            />
            <Input
                type={"email"}
                placeholder={"E-mail"}
                value={email}
                onChange={onEmailChange}
                error={false}
                ref={emailInputRef}
                icon={'EditIcon'}
                onIconClick={onEmailEditIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-2"
            />
            <Input
                type={"password"}
                placeholder={"Пароль"}
                value={password}
                onChange={onPasswordChange}
                error={false}
                ref={passwordInputRef}
                icon={'EditIcon'}
                onIconClick={onPasswordEditIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-2"
            />
        </div>
        </>
    );
}