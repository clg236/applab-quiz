import React, { useState } from 'react';
import LayoutContext from './Context';
import { withStyles } from '@material-ui/core/styles';
import DrawerComponent, { DRAWER_WIDTH } from './Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBarComponent from './AppBar';
import * as ROUTES from '../../constants/routes';
import HomePage from '../Home';
import QuizzesPage from '../Quizzes';
import { QuestionsPage, CreateQuestionPage } from '../Questions';
import { Route } from 'react-router-dom';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar
});


function AuthenticatedLayout(props) {
    const { classes } = props;

    const [state, setState] = useState({title: 'AppLab - Quizzes', badgeCount: 4, drawerOpen: false});

    return (
        <LayoutContext.Provider value={{state, setState}}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBarComponent />
                <DrawerComponent />
                
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Route exact path={ROUTES.HOME} component={HomePage} />
                    <Route exact path={ROUTES.QUIZZES} component={QuizzesPage} />
                    <Route exact path={ROUTES.ADMIN_QUESTIONS} component={QuestionsPage} />
                    <Route exact path={ROUTES.ADMIN_CREATE_QUESTION} component={CreateQuestionPage} />

                </main>
            </div>
        </LayoutContext.Provider>
    );
}

export default withStyles(styles)(AuthenticatedLayout);