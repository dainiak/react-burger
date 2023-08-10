import styles from './profile.module.css';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, FunctionComponent, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {updateUserInfoByApi} from "../utils/burger-api";
import {useSelector} from "react-redux";
import {selectUser} from "../services/selectors/user";
import {ROUTE_LOGOUT, ROUTE_ORDERS, ROUTE_PROFILE} from "../utils/routes";
import {loadUserProfile} from "../services/actions/user";
import {useDispatch} from "react-redux";

export const ProfilePage:FunctionComponent = () => {
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
    const dispatch = useDispatch();

    useEffect(() => {
        setName(user.profile.name);
        setEmail(user.profile.email);
    }, [user.profile.name, user.profile.email]);

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        isEditingName && setName(e.target.value);
    };
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        isEditingEmail && setEmail(e.target.value);
    }
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        isEditingPassword && setPassword(e.target.value);
    }
    const onNameIconClick = () => {
        if(isEditingName) {
            setIsEditingName(false);
            updateUserInfoByApi({name}).then(() => {
                dispatch(loadUserProfile());
            });
        }
        else {
            setIsEditingName(true);
        }
    }
    const onEmailIconClick = () => {
        if(isEditingEmail) {
            setIsEditingEmail(false);
            updateUserInfoByApi({email}).then(() => {
                dispatch(loadUserProfile());
            });
        }
        else {
            setIsEditingEmail(true);
        }
    }
    const onPasswordIconClick = () => {
        if(isEditingPassword) {
            setIsEditingPassword(false);
            updateUserInfoByApi({password}).then(() => {
                dispatch(loadUserProfile());
            });
        }
        else {
            setIsEditingPassword(true);
        }
    }

    return (<>
        <div className={styles.wrapperLeft}>
            <div>
                <NavLink to={ROUTE_PROFILE} className={({ isActive }) =>
                    isActive ? `${styles.navlink} ${styles.active} text text_type_main-medium mb-6` : `${styles.navlink} text text_type_main-medium mb-6 text_color_inactive`
                }>
                Профиль
                </NavLink>

                <NavLink to={ROUTE_ORDERS} className={({ isActive }) =>
                    isActive ? `${styles.navlink} ${styles.active} text text_type_main-medium mb-6` : `${styles.navlink} text text_type_main-medium mb-6 text_color_inactive`
                }>
                История заказов
                </NavLink>

                <NavLink to={ROUTE_LOGOUT} className={({ isActive }) =>
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
                icon={isEditingName ? 'CheckMarkIcon' : isEditingPassword||isEditingEmail ? undefined : 'EditIcon'}
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
                icon={isEditingEmail ? 'CheckMarkIcon' : isEditingPassword||isEditingName ? undefined : 'EditIcon'}
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
                icon={isEditingPassword ? 'CheckMarkIcon' : isEditingEmail||isEditingName ? undefined : 'EditIcon'}
                disabled={!isEditingPassword}
                onIconClick={onPasswordIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-2"
            />
            {isEditingEmail || isEditingName || isEditingPassword ? <p className="text text_type_main-default text_color_inactive mb-2">Для сохранения изменений нажмите на иконку ✔</p> : null}
        </div>
        </>
    );
}