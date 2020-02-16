import {createStore, compose, applyMiddleware} from 'redux';
import createRootReducer from './reducers';
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase';
// import thunk from 'redux-thunk';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {firebaseConfig, reactReduxFirebaseConfig} from './config';

import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';


// Initialize Firebase instance
firebase.initializeApp(firebaseConfig);
export {firebase};

// history
export const history = createBrowserHistory();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    createRootReducer(history),
    {
        drawer: {
            open: false,
        }
    },
    composeEnhancers(
        applyMiddleware(routerMiddleware(history)),
    )
);

export default store;