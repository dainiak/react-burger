import {Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../services/actions/user";

export const LogoutPage = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    localStorage.getItem('refreshToken') && dispatch(logoutUser());
    return (<Navigate to="/login" replace/>);
}