import { createStore, compose, applyMiddleware } from 'redux';
import createRootReducer from './reducers';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig, reactReduxFirebaseConfig } from './config';

import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';


// Initialize Firebase instance
firebase.initializeApp(firebaseConfig);
export { firebase };

// history
export const history = createBrowserHistory();

const store = createStore(
    createRootReducer(history),
    {},
    compose(
        applyMiddleware(routerMiddleware(history)),

        // thunk
        applyMiddleware(thunk.withExtraArgument(getFirebase)),

        // support redux devtools
        typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;