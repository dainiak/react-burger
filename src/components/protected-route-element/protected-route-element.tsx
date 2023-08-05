import { Navigate } from 'react-router-dom';
import {selectUser} from "../../services/selectors/user";
import {useSelector} from "react-redux";
import React from "react";
import {LOGIN_SUCCESS} from "../../services/actions/user";
import {getUserInfoByApi} from "../../utils/burger-api";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../services/actions/user";

//@ts-ignore
export const AuthOnly = ({ element, alternative }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);

    if(!loading && !user.profile && localStorage.getItem('refreshToken')){
        setLoading(true);
        // @ts-ignore
        getUserInfoByApi().then((data) => {
            if(data && data.success && data.user) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {name: data.user.name, email: data.user.email}
                })
                setLoading(false);
            }
            else{
                // @ts-ignore
                dispatch(logoutUser());
                setLoading(false);
            }
        });
    }
    if(loading){
        return <div>Загрузка данных о пользователе...</div>
    }

    // @ts-ignore
    return (user.profile ? element : <Navigate to={alternative} replace/>);
}

//@ts-ignore
export const NonAuthOnly = ({ element, alternative }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);

    if(!user.profile && localStorage.getItem('refreshToken')){
        setLoading(true);
        // @ts-ignore
        getUserInfoByApi().then((data) => {
            if(data && data.success && data.user) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {name: data.user.name, email: data.user.email}
                })
                setLoading(false);
            }
            else{
                // @ts-ignore
                dispatch(logoutUser());
                setLoading(false);
            }
        });
    }
    if(loading){
        return <div>Загрузка данных о пользователе...</div>
    }

    // @ts-ignore
    return (user.profile ? <Navigate to={alternative} replace/> : element);
}

