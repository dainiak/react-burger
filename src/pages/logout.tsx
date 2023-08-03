import {Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LOGOUT} from "../services/actions/user";

export const LogoutPage = () => {
    const dispatch = useDispatch();
    dispatch({type: LOGOUT});
    return (<Navigate to="/login" replace/>);
}