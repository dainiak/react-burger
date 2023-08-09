import styles from "./register.module.css";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FunctionComponent} from "react";
import {registerUser} from "../services/actions/user";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../services/selectors/user";
import {useForm} from "../utils/useForm";
import {ROUTE_LOGIN} from "../utils/routes";

export const RegisterPage:FunctionComponent = () => {
    const {values, handleChange} = useForm({name: '', email: '', password: ''});
    const userInfo = useSelector(selectUser);

    const dispatch = useDispatch();

    const onSubmit = (e: any) => {
        e.preventDefault();
        dispatch(registerUser(values.email, values.password, values.name));
    }

    return (
        <form onSubmit={onSubmit}>
        <div className={styles.wrapper}>
            <p className="text text_type_main-medium mb-6">
                {userInfo.hasError ? "Ошибка… Попробуйте ещё раз": "Регистрация"}
            </p>

            <Input
                type={"text"}
                onChange={handleChange}
                value={values.name}
                name={'name'}
                placeholder={"Имя"}
                hidden={false}
                noValidate={true}
                formNoValidate={true}
            />
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
                    >{userInfo.isLoading ? "Регистрируем…": "Зарегистрироваться"}</Button>

            <p className="text text_type_main-small text_color_inactive mb-6">
                Уже зарегистрированы? <a href={ROUTE_LOGIN} className={styles.link}>Войти</a>
            </p>
        </div>
        </form>
    );

}