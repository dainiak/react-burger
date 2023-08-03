import styles from "./reset-password.module.css";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";


export const ResetPasswordPage = () => {
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
                Сброс пароля
            </p>
            <Input
                type={"password"}
                onChange={onPasswordChange}
                value={password}
                name={'password'}
                // icon={"ShowIcon"}
                placeholder={"Введите новый пароль"}
                hidden={false}
                noValidate={true}
                formNoValidate={true}
            />

            <Input
                type={"text"}
                onChange={onPasswordChange}
                value={password}
                name={'passwordResetCode'}
                // icon={"ShowIcon"}
                placeholder={"Введите код из письма"}
                hidden={false}
                noValidate={true}
                formNoValidate={true}
            />

            <Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20"
                    onClick={onSubmit}>Сохранить</Button>

            <p className="text text_type_main-small text_color_inactive mb-6">
                Вспомнили старый пароль? <a href="/login" className={styles.link}>Войти</a>
            </p>
        </div>
    );
}