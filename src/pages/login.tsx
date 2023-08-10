import styles from "./login.module.css";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FunctionComponent, FormEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../services/selectors/user";
import {Navigate} from "react-router-dom";
import {loginUser} from "../services/actions/user";
import {loadUserProfile} from "../services/actions/user";
import {useForm} from "../utils/useForm";
import {ROUTE_FORGOT_PASSWORD, ROUTE_REGISTER} from "../utils/routes";


export const LoginPage:FunctionComponent = () => {
    const {values, handleChange} = useForm({email: '', password: ''});
    const userInfo = useSelector(selectUser);
    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser(values.email, values.password));
    }

    if(localStorage.getItem('refreshToken')) {
        dispatch(loadUserProfile());
    }

    if(userInfo.profile) {
        return (<Navigate to="/" replace/>);
    }

    return (
        <form onSubmit={onSubmit}>
        <div className={styles.wrapper}>
            <p className="text text_type_main-medium mb-6">
                {userInfo.hasError ? "Ошибка входа… Попробуйте ещё раз": "Вход"}
            </p>

            <EmailInput
                placeholder={"E-mail"}
                value={values.email}
                onChange={handleChange}
                name={'email'}
                size={'default'}
                extraClass="mb-2 mt-2"
            />
            <Input
                type={"password"}
                onChange={handleChange}
                value={values.password}
                name={'password'}
                placeholder={"Пароль"}
                hidden={false}
                noValidate={true}
                formNoValidate={true}
            />

            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20"
                >{userInfo.isLoading ? "Выполняется вход…": "Войти"}</Button>

            <p className="text text_type_main-small text_color_inactive mb-6">
                Вы — новый пользователь? <a href={ROUTE_REGISTER} className={styles.link}>Зарегистрироваться</a>
            </p>
            <p className="text text_type_main-small text_color_inactive mb-6">
                Забыли пароль? <a href={ROUTE_FORGOT_PASSWORD} className={styles.link}>Восстановить пароль</a>
            </p>
        </div>
        </form>
    );
}