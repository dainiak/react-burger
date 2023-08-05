import styles from "./forgot-password.module.css";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {sendPasswordResetEmailByApi} from "../utils/burger-api";
import {useNavigate} from "react-router-dom";


export const ForgotPasswordPage = () => {
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();

    const onEmailChange = (e: any) => {
        setEmail(e.target.value)
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        sendPasswordResetEmailByApi(email).then(() => {
            navigate('/reset-password', {replace: true});
        });
    }

    return (
        <div className="forgot-password-page">
            <div className={styles.wrapper}>
                <p className="text text_type_main-medium mb-6">
                    Восстановление пароля
                </p>
                <EmailInput
                    placeholder={"Укажите свой e-mail"}
                    value={email}
                    onChange={onEmailChange}
                    name={'email'}
                    size={'default'}
                    extraClass="mb-2 mt-2"
                />

                <Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20"
                        onClick={onSubmit}>Восстановить пароль</Button>

                <p className="text text_type_main-small text_color_inactive mb-6">
                    Вспомнили пароль? <a href="/login" className={styles.link}>Войти</a>
                </p>
            </div>
        </div>
    );
}