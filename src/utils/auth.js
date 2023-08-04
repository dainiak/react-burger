import { useContext, useState, createContext } from 'react';

import { setCookie, getCookie } from './cookies';
import {getUserInfoByApi} from "./burger-api";



export const loginRequest = async form => {
    return await fetch('https://cosmic.nomoreparties.space/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
};

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        const userInfo = await getUserInfoByApi();
        if (userInfo.success) {
            setUser(userInfo.user);
        }
        return userInfo.success;
    };

    return {
        user,
        getUser,
    };
}