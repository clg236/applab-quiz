import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { connectRouter } from 'connected-react-router';
import { drawerReducer } from './layout';


const createRootReducer = (history) => {
    return combineReducers({
        firebase: firebaseReducer,
        router: connectRouter(history),
        drawer: drawerReducer,
    });
}

export default createRootReducer;