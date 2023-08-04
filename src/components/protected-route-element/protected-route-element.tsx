import { Navigate } from 'react-router-dom';
import {selectUser} from "../../services/selectors/user";
import {useSelector} from "react-redux";

//@ts-ignore
export const ProtectedRouteElement = ({ element: any }) => {
    const user = useSelector(selectUser);

    // @ts-ignore
    return (user.profile ? element : <Navigate to="/login" replace/>);
}