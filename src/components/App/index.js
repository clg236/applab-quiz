import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Firebase, { FirebaseContext } from '../Firebase';
import Api, { ApiContext } from '../Api';
import Layout from '../Layout';

function App() {
    const firebase = new Firebase();
    const api = new Api();
    return (
        <FirebaseContext.Provider value={firebase}>
            <ApiContext.Provider value={api}>
                <Router>
                    <Layout />
                </Router>
            </ApiContext.Provider>

        </FirebaseContext.Provider>
    );
}

export default App;