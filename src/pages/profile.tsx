import styles from './profile.module.css';
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const ProfilePage = () => {
    const [login, setLogin] = React.useState('value')
    const inputRef = React.useRef(null);
    const onNameChange = (e: any) => {
        setLogin(e.target.value)
    };
    const onEditIconClick = () => {
        //@ts-ignore
        setTimeout(() => inputRef && inputRef.current && inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return (
        <div className={styles.wrapper}>
            <Input
                type={"text"}
                placeholder={"Имя"}
                value={login}
                onChange={onNameChange}
                error={false}
                ref={inputRef}
                icon={'EditIcon'}
                onIconClick={onEditIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-2"
            />
            <EmailInput
                onChange={onNameChange}
                value={"mark@example.com"}
                name={'email'}
                extraClass="mb-2"
            />
            <PasswordInput
                onChange={onNameChange}
                value={"value"}
                name={'password'}
                noValidate={true}
                icon={"EditIcon"}
                formNoValidate={true}
            />
        </div>
    );
}