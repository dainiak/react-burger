import styles from "./register.module.css";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";


export const RegisterPage = () => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const onLoginChange = (e: any) => {
        setLogin(e.target.value)
    }
    const onPasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log('submit');
    }

    return (
        <div className={styles.wrapper}>
            <p className="text text_type_main-medium mb-6">
                Вход
            </p>
            <EmailInput
                placeholder={"E-mail"}
                value={login}
                onChange={onLoginChange}
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
                    onClick={onSubmit}>Войти</Button>

            <p className="text text_type_main-small text_color_inactive mb-6">
                Вы — новый пользователь? <a href="/register" className={styles.link}>Зарегистрироваться</a>
            </p>
            <p className="text text_type_main-small text_color_inactive mb-6">
                Забыли пароль? <a href="/forgot-password" className={styles.link}>Восстановить пароль</a>
            </p>
        </div>
    );

}