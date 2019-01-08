import React from 'react';

import AuthenticatedLayout from './Authenticated';
import NonAuthenticatedLayout from './NonAuthenticated';
import { connect } from 'react-redux';

function Layout({ auth }) {
    return (
        auth.isLoaded && !auth.isEmpty ? <AuthenticatedLayout /> : <NonAuthenticatedLayout />
    );
}

export default connect(({ firebase: { auth } }) => ({ auth }))(Layout);