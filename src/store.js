import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig, reactReduxFirebaseConfig } from './config';

// Initialize Firebase instance
firebase.initializeApp(firebaseConfig);

const store = createStore(
    rootReducer,
    {},
    compose(
        // enhance store with store.firebase
        reactReduxFirebase(firebase, reactReduxFirebaseConfig),

        // thunk
        applyMiddleware(thunk.withExtraArgument(getFirebase)),

        // support redux devtools
        typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;