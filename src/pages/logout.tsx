import {Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../services/actions/user";
import {FunctionComponent} from "react";

export const LogoutPage:FunctionComponent = () => {
    const dispatch = useDispatch();
    dispatch(logoutUser());
    return (<Navigate to="/login" replace/>);
}