import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Firebase, { FirebaseContext } from '../Firebase';
import Api, { ApiContext } from '../Api';
import Layout from '../Layout';

import { Provider } from 'react-redux';
import store from '../../store';
import { connect } from 'react-redux';

function App() {
    // const firebase = new Firebase();
    // const api = new Api(firebase);
    return (
        // <FirebaseContext.Provider value={firebase}>
        //     <ApiContext.Provider value={api}>
        //         <Router>
        //             <Layout />
        //         </Router>
        //     </ApiContext.Provider>

        // </FirebaseContext.Provider>

        <Provider store={store}>
            <Router>
                <Layout />
            </Router>
        </Provider>
    );
}

export default App;