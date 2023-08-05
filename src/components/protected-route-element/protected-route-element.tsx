import { Navigate } from 'react-router-dom';
import {selectUser} from "../../services/selectors/user";
import {useSelector} from "react-redux";
import React from "react";

//@ts-ignore
export const AuthOnly = ({ element, alternative }) => {
    const user = useSelector(selectUser);

    // @ts-ignore
    return (user.profile || localStorage.getItem('refreshToken') ? element : <Navigate to={alternative} replace/>);
}

//@ts-ignore
export const NonAuthOnly = ({ element, alternative }) => {
    const user = useSelector(selectUser);

    // @ts-ignore
    return (user.profile || localStorage.getItem('refreshToken') ? <Navigate to={alternative} replace/> : element);
}

