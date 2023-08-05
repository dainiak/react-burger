import styles from './profile.module.css';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {getUserInfoByApi, updateUserInfoByApi} from "../utils/burger-api";
import {useSelector} from "react-redux";
import {selectUser} from "../services/selectors/user";

export const ProfilePage = () => {
    const [email, setEmail] = React.useState('');
    const [isEditingEmail, setIsEditingEmail] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [isEditingPassword, setIsEditingPassword] = React.useState(false);
    const [name, setName] = React.useState('');
    const [isEditingName, setIsEditingName] = React.useState(false);
    const nameInputRef = React.useRef(null);
    const emailInputRef = React.useRef(null);
    const passwordInputRef = React.useRef(null);
    const user = useSelector(selectUser);


    useEffect(() => {
        if(localStorage.getItem('refreshToken'))
            getUserInfoByApi().then((data) => {
                setName(data.user.name);
                setEmail(data.user.email);
            });
    }, []);

    const onNameChange = (e: any) => {
        isEditingName && setName(e.target.value);
    };
    const onEmailChange = (e: any) => {
        isEditingEmail && setEmail(e.target.value);
    }
    const onPasswordChange = (e: any) => {
        isEditingPassword && setPassword(e.target.value);
    }
    const onNameIconClick = () => {
        if(isEditingName) {
            setIsEditingName(false);
            updateUserInfoByApi(email, name).then((data) => {
                setName(data.user.name);
                setEmail(data.user.email);
            });
        }
        else {
            setIsEditingName(true);
        }
    }
    const onEmailIconClick = () => {
        if(isEditingEmail) {
            setIsEditingEmail(false);
            updateUserInfoByApi(email, name).then((data) => {
                setName(data.user.name);
                setEmail(data.user.email);
            });
        }
        else {
            setIsEditingEmail(true);
        }
    }
    const onPasswordIconClick = () => {

    }

    return (<>
        <div className={styles.wrapperLeft}>
            <div>
                <NavLink to={"/profile"} className={({ isActive, isPending }) =>
                    isActive ? `${styles.navlink} ${styles.active} text text_type_main-medium mb-6` : `${styles.navlink} text text_type_main-medium mb-6 text_color_inactive`
                }>
                Профиль
                </NavLink>

                <NavLink to={"/profile/orders"} className={({ isActive, isPending }) =>
                    isActive ? `${styles.navlink} ${styles.active} text text_type_main-medium mb-6` : `${styles.navlink} text text_type_main-medium mb-6 text_color_inactive`
                }>
                История заказов
                </NavLink>

                <NavLink to={"/logout"} className={({ isActive, isPending }) =>
                    isActive ? `${styles.navlink} ${styles.active} text text_type_main-medium mb-6` : `${styles.navlink} text text_type_main-medium mb-6 text_color_inactive`
                }>
                Выход
                </NavLink>
            </div>
        </div>
        <div className={styles.wrapper}>
            <Input
                type={"text"}
                placeholder={"Имя"}
                value={name}
                onChange={onNameChange}
                error={false}
                ref={nameInputRef}
                icon={isEditingName ? 'CheckMarkIcon' : 'EditIcon'}
                onIconClick={onNameIconClick}
                disabled={!isEditingName}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-2"
            />
            <Input
                type={"email"}
                placeholder={"E-mail"}
                value={email}
                onChange={onEmailChange}
                error={false}
                ref={emailInputRef}
                icon={isEditingEmail ? 'CheckMarkIcon' : 'EditIcon'}
                onIconClick={onEmailIconClick}
                disabled={!isEditingEmail}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-2"
            />
            <Input
                type={"password"}
                placeholder={"Пароль"}
                value={password}
                onChange={onPasswordChange}
                error={false}
                ref={passwordInputRef}
                icon={isEditingPassword ? 'CheckMarkIcon' : 'EditIcon'}
                disabled={true}
                onIconClick={onPasswordIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-2"
            />
        </div>
        </>
    );
}