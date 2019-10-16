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