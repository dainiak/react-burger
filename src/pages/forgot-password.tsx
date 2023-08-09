import styles from "./forgot-password.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FunctionComponent} from "react";
import {sendPasswordResetEmailByApi} from "../utils/burger-api";
import {useNavigate} from "react-router-dom";
import {useForm} from "../utils/useForm";
import {ROUTE_LOGIN} from "../utils/routes";


export const ForgotPasswordPage:FunctionComponent = () => {
    const {values, handleChange} = useForm({email: ''});
    const navigate = useNavigate();

    const onSubmit = (e: any) => {
        e.preventDefault();
        sendPasswordResetEmailByApi(values.email).then(() => {
            navigate('/reset-password', {replace: true});
        });
    }

    return (
        <div className="forgot-password-page">
            <form onSubmit={onSubmit}>
            <div className={styles.wrapper}>
                <p className="text text_type_main-medium mb-6">
                    Восстановление пароля
                </p>

                <EmailInput
                    placeholder={"Укажите свой e-mail"}
                    value={values.email}
                    onChange={handleChange}
                    name={'email'}
                    size={'default'}
                    extraClass="mb-2 mt-2"
                />

                <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20"
                        >Восстановить пароль</Button>

                <p className="text text_type_main-small text_color_inactive mb-6">
                    Вспомнили пароль? <a href={ROUTE_LOGIN} className={styles.link}>Войти</a>
                </p>
            </div>
            </form>
        </div>
    );
}