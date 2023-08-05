import styles from "./reset-password.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {resetPasswordByApi} from "../utils/burger-api";
import {useForm} from "../utils/useForm";
import {ROUTE_LOGIN} from "../utils/routes";


export const ResetPasswordPage = () => {
    const {values, handleChange} = useForm({token: '', password: ''});

    const [passwordResetRequestSent, setPasswordResetRequestSent] = React.useState(false);

    const onSubmit = (e: any) => {
        e.preventDefault();
        resetPasswordByApi(values.password, values.token).then(() => {
            setPasswordResetRequestSent(true);
        });
    }

    return (
        <form onSubmit={onSubmit}>
        <div className={styles.wrapper}>
            <p className="text text_type_main-medium mb-6">
                Сброс пароля
            </p>

            <Input
                type={"password"}
                onChange={handleChange}
                value={values.password}
                name={'password'}
                placeholder={"Введите новый пароль"}
                hidden={false}
                noValidate={true}
                formNoValidate={true}
            />

            <Input
                type={"text"}
                onChange={handleChange}
                value={values.token}
                name={'token'}
                placeholder={"Введите код из письма"}
                hidden={false}
                noValidate={true}
                formNoValidate={true}
                extraClass={"mt-6 mb-2"}
            />

            {passwordResetRequestSent ? <p>Запрос отправлен</p> : null}
            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20"
                    >Сохранить</Button>

            <p className="text text_type_main-small text_color_inactive mb-6">
                Вспомнили старый пароль? <a href={ROUTE_LOGIN} className={styles.link}>Войти</a>
            </p>
        </div>
        </form>
    );
}