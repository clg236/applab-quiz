import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Firebase, { FirebaseContext } from '../Firebase';
import Layout from '../Layout';

function App() {
    const firebase = new Firebase();
    return (
        <FirebaseContext.Provider value={firebase}>
            <Router>
                <Layout /> 
            </Router>
        </FirebaseContext.Provider>
    );
}

export default App;