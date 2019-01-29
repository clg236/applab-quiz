import React from 'react';
import Layout from '../Layout';

import {Provider} from 'react-redux';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {ConnectedRouter} from 'connected-react-router'
import store, {firebase, history} from '../../store';
import {reactReduxFirebaseConfig} from '../../config';
import {SnackbarProvider} from 'notistack';


function App() {
    const rrfProps = {
        firebase,
        config: reactReduxFirebaseConfig,
        dispatch: store.dispatch,
    }

    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <ConnectedRouter history={history}>
                    <SnackbarProvider>
                        <Layout/>
                    </SnackbarProvider>
                </ConnectedRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
}

export default App;