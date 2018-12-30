import { useState, useContext, useEffect } from 'react';

function useAuthentication(firebase) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => setUser(user));

        return () => {
            listener();
        };
    }, []);

    return user;
}

export default useAuthentication;