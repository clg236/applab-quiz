import React, { useContext } from 'react';

import { useAuthentication } from '../Session';
import { FirebaseContext } from '../Firebase';
import AuthenticatedLayout from './Authenticated';
import NonAuthenticatedLayout from './NonAuthenticated';
import LayoutContext from './Context';

function Layout(props) {
    const firebase = useContext(FirebaseContext);
    const user = useAuthentication(firebase);

    return (
        user ? <AuthenticatedLayout /> : <NonAuthenticatedLayout />
    );
}

export default Layout;
export { LayoutContext };