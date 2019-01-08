import ACTIONS from '../actions';

const layoutReducer = (state = {}, action) => {

    switch (action.type) {
        case ACTIONS.LAYOUT.OPEN_DRAWER:
        return state;
    }
    return state;
};

const drawerReducer = (state = {open: false}, action) => {

    switch (action.type) {
        case 'OPEN_DRAWER':
            return {open: true};

        case 'CLOSE_DRAWER':
            return {open: false};
    }

    return state;
};

export { drawerReducer };