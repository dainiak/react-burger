import { useAuth } from '../../utils/auth';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

//@ts-ignore
export const ProtectedRouteElement = ({ element: any }) => {
    //@ts-ignore
    let { getUser, ...auth } = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        let user = await getUser();
        setUserLoaded(true);

    };

    useEffect(() => {
        init();
    }, []);

    // @ts-ignore
    return (auth.user ? element : <Navigate to="/login" replace/>);
}