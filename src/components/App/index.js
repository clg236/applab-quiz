import React from 'react';
import Layout from '../Layout';

import {Provider} from 'react-redux';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {ConnectedRouter} from 'connected-react-router'
import store, {firebase, history} from '../../store';
import {reactReduxFirebaseConfig} from '../../config';
import {SnackbarProvider} from 'notistack';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faUserAstronaut, faQuestion, faHome, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';



// fontawesome
library.add(faUserAstronaut, faQuestion, faHome, faSignOutAlt);

// material ui
// @see https://material-ui.com/customization/themes/
const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: green,
    }
});

// main App component
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
                        <MuiThemeProvider theme={theme}>
                            <Layout/>
                        </MuiThemeProvider>
                    </SnackbarProvider>
                </ConnectedRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
}

export default App;