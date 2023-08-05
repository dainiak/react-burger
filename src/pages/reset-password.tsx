import styles from "./reset-password.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {resetPasswordByApi} from "../utils/burger-api";


export const ResetPasswordPage = () => {
    const [token, setToken] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordReset, setPasswordReset] = React.useState(false);

    const onTokenChange = (e: any) => {
        setToken(e.target.value)
    }
    const onPasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        resetPasswordByApi(password, token).then(() => {
            setPasswordReset(true);
        });
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
                onChange={onTokenChange}
                value={token}
                name={'passwordResetCode'}
                // icon={"ShowIcon"}
                placeholder={"Введите код из письма"}
                hidden={false}
                noValidate={true}
                formNoValidate={true}
                extraClass={"mt-6 mb-2"}
            />

            {passwordReset ? <p>Запрос отправлен</p> : null}
            <Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20"
                    onClick={onSubmit}>Сохранить</Button>

            <p className="text text_type_main-small text_color_inactive mb-6">
                Вспомнили старый пароль? <a href="/login" className={styles.link}>Войти</a>
            </p>
        </div>
    );
}