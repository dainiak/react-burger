import { useContext, useState, createContext } from 'react';

import { setCookie, getCookie } from './cookies';


export const getUserRequest = async () =>
    await fetch('https://cosmic.nomoreparties.space/api/user', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });

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
        return await getUserRequest()
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Код здесь
                }
                return data.success;
            });
    };

    const signIn = async form => {
        const data = await loginRequest(form)
            .then(res => {
                let authToken;
                res.headers.forEach(header => {
                    if (header.indexOf('Bearer') === 0) {
                        authToken = header.split('Bearer ')[1];
                    }
                });
                if (authToken) {
                    setCookie('token', authToken);
                }
                return res.json();
            })
            .then(data => data);

        if (data.success) {
            setUser({ ...data.user, id: data.user._id });
        }
    };

    const signOut = cb => {
        /*return fakeAuth.signOut(() => {
            setUser(null);
            cb();
        });*/
    };

    return {
        user,
        getUser,
        signIn,
        signOut
    };
}