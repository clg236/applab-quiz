import * as ROLES from './constants/roles';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const reactReduxFirebaseConfig = {
    userProfile: 'users',
    useFirestoreForProfile: false,
    enableLogging: false,
    
    profileFactory: user => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: ROLES.ROLE_USER
    })
};

const apiPrefixes = {
    quiz: {
        quizzes: "quizzes",
        userSubmissions: "userQuizzes",
        quizSubmissions: "quizSubmissions",
    },

    assignment: {

    }

}

export { firebaseConfig, reactReduxFirebaseConfig };