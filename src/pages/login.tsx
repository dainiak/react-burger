import styles from "./login.module.css";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../services/selectors/user";
import {Navigate} from "react-router-dom";
import {loginUser} from "../services/actions/user";
import {loadUserProfile} from "../services/actions/user";


export const LoginPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const userInfo = useSelector(selectUser);

    const dispatch = useDispatch();
    const onEmailChange = (e: any) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(loginUser(email, password));
    }

    if(localStorage.getItem('refreshToken')) {
        // @ts-ignore
        dispatch(loadUserProfile());
    }

    if(userInfo.profile) {
        return (<Navigate to="/" replace/>);
    }

    return (
        <div className={styles.wrapper}>
            <p className="text text_type_main-medium mb-6">
                {userInfo.hasError ? "Ошибка входа… Попробуйте ещё раз": "Вход"}
            </p>
            <EmailInput
                placeholder={"E-mail"}
                value={email}
                onChange={onEmailChange}
                name={'email'}
                size={'default'}
                extraClass="mb-2 mt-2"
            />
            <Input
                type={"password"}
                onChange={onPasswordChange}
                value={password}
                name={'password'}
                // icon={"ShowIcon"}
                placeholder={"Пароль"}
                hidden={false}
                noValidate={true}
                formNoValidate={true}
            />

            <Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20"
            onClick={onSubmit}>{userInfo.isLoading ? "Выполняется вход…": "Войти"}</Button>

            <p className="text text_type_main-small text_color_inactive mb-6">
                Вы — новый пользователь? <a href="/register" className={styles.link}>Зарегистрироваться</a>
            </p>
            <p className="text text_type_main-small text_color_inactive mb-6">
                Забыли пароль? <a href="/forgot-password" className={styles.link}>Восстановить пароль</a>
            </p>
        </div>
    );
}