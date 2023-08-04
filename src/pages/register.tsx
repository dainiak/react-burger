import styles from "./register.module.css";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {registerUser} from "../services/actions/user";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../services/selectors/user";

export const RegisterPage = () => {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const userInfo = useSelector(selectUser);

    const dispatch = useDispatch();

    const onEmailChange = (e: any) => {
        setEmail(e.target.value)
    }
    const onNameChange = (e: any) => {
        setName(e.target.value)
    }
    const onPasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(registerUser(email, password, name));
    }

    return (
        <div className={styles.wrapper}>
            <p className="text text_type_main-medium mb-6">
                {userInfo.hasError ? "Ошибка… Попробуйте ещё раз": "Регистрация"}
            </p>
            <Input
                type={"text"}
                onChange={onNameChange}
                value={name}
                name={'name'}
                // icon={"ShowIcon"}
                placeholder={"Имя"}
                hidden={false}
                noValidate={true}
                formNoValidate={true}
            />
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
                    onClick={onSubmit}>{userInfo.isLoading ? "Регистрируем…": "Зарегистрироваться"}</Button>

            <p className="text text_type_main-small text_color_inactive mb-6">
                Уже зарегистрированы? <a href="/login" className={styles.link}>Войти</a>
            </p>
        </div>
    );

}