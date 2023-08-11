import {Navigate, useLocation} from 'react-router-dom';
import {selectUser} from "../../services/selectors/user";
import {useSelector} from "react-redux";
import React, {FunctionComponent, ReactElement} from "react";
import {LOGIN_SUCCESS} from "../../services/actions/user";
import {getUserInfoByApi} from "../../utils/burger-api";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../services/actions/user";
import {ROUTE_ROOT} from "../../utils/routes";

interface IAuthComponentProps {
    element: ReactElement;
    alternative: string;
}

export const AuthOnly:FunctionComponent<IAuthComponentProps> = ({ element, alternative }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);

    if(!loading && !user.profile && localStorage.getItem('refreshToken')){
        setLoading(true);

        getUserInfoByApi().then((data) => {
            if(data && data.success && data.user) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {name: data.user.name, email: data.user.email}
                })
                setLoading(false);
            }
            else{
                dispatch(logoutUser());
                setLoading(false);
            }
        });
    }
    if(loading){
        return <div>Загрузка данных о пользователе...</div>
    }

    return (user.profile ? element : <Navigate to={alternative} replace={true} state={{redirectedFrom: ROUTE_ROOT}}  />);
}


export const NonAuthOnly:FunctionComponent<IAuthComponentProps> = ({ element, alternative }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const location = useLocation();
    const redirectedFrom = location.state ? location.state.redirectedFrom : null;

    if(!loading && !user.profile && localStorage.getItem('refreshToken')){
        setLoading(true);

        getUserInfoByApi().then((data) => {
            if(data && data.success && data.user) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {name: data.user.name, email: data.user.email}
                })
                setLoading(false);
            }
            else{
                dispatch(logoutUser());
                setLoading(false);
            }
        });
    }

    if(loading){
        return <div>Загрузка данных о пользователе...</div>
    }

    return (user.profile ? <Navigate to={redirectedFrom ? redirectedFrom : alternative} replace/> : element);
}
