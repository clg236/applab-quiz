import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import DrawerComponent from './Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBarComponent from './AppBar';
import * as ROUTES from '../../constants/routes';
import HomePage from '../Home';
import QuizzesPage from '../Quizzes';
import { Route, Switch } from 'react-router-dom';
import { QuestionsListPage, QuestionsCreatePage, QuizzesListPage, QuizzesCreatePage } from '../Admin';

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


function AuthenticatedLayout({ classes, location }) {

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarComponent />
            <DrawerComponent />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Switch location={location}>
                    <Route exact path={ROUTES.HOME} component={HomePage} />
                    <Route exact path={ROUTES.QUIZZES} component={QuizzesPage} />
                    <Route exact path={ROUTES.ADMIN_QUIZZES} component={QuizzesListPage} />
                    <Route exact path={ROUTES.ADMIN_CREATE_QUIZ} component={QuizzesCreatePage} />
                    <Route exact path={ROUTES.ADMIN_QUESTIONS} component={QuestionsListPage} />
                    <Route exact path={ROUTES.ADMIN_CREATE_QUESTION} component={QuestionsCreatePage} />
                    <Route render={() => (<div>404</div>)} />
                </Switch>

            </main>
        </div>
    );
}

export default compose(
    withStyles(styles),
    connect(({ router: { location } }) => ({ location }))
)(AuthenticatedLayout);