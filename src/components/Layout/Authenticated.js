import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import DrawerComponent from './Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBarComponent from './AppBar';
import * as ROUTES from '../../constants/routes';
import HomePage from '../Home';
import {ListPage as QuizzesListPage} from '../Quizzes';
import {Route, Switch} from 'react-router-dom';
import {
    QuestionsListPage,
    QuestionsCreatePage,
    UsersListPage as AdminUsersListPage,
    UsersDetailPage as AdminUsersDetailPage
} from '../Admin';

import {AdminCreateQuizPage, AdminEditQuizPage, AdminListQuizzesPage, ListQuizzesPage} from "../../containers/Quizzes";
import {SubmissionDetailPage} from "../../containers/Submissions";

import logo from "../../img/logo.png"

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


function AuthenticatedLayout({classes, location}) {

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBarComponent/>
            <DrawerComponent 
                logoText={'App Lab 2.0'}
                logo={logo}
            />

            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Switch location={location}>
                    <Route exact path={ROUTES.LANDING} component={HomePage}/>
                    <Route exact path={ROUTES.HOME} component={HomePage}/>
                    <Route exact path={ROUTES.QUIZZES} component={ListQuizzesPage}/>

                    <Route path={ROUTES.QUIZ_SUBMISSION_DETAIL} component={SubmissionDetailPage}/>

                    <Route exact path={ROUTES.ADMIN_QUIZZES} component={AdminListQuizzesPage}/>
                    <Route exact path={ROUTES.ADMIN_CREATE_QUIZ} component={AdminCreateQuizPage}/>
                    <Route path={ROUTES.ADMIN_Edit_QUIZ} component={AdminEditQuizPage}/>
                    <Route exact path={ROUTES.ADMIN_QUESTIONS} component={QuestionsListPage}/>
                    <Route exact path={ROUTES.ADMIN_CREATE_QUESTION} component={QuestionsCreatePage}/>
                    <Route exact path={ROUTES.ADMIN_USERS} component={AdminUsersListPage}/>
                    <Route exact path={ROUTES.ADMIN_VIEW_USER} component={AdminUsersDetailPage}/>

                    <Route render={() => (<div>404</div>)}/>
                </Switch>

            </main>
        </div>
    );
}

export default compose(
    withStyles(styles),
    connect(({router: {location}}) => ({location}))
)(AuthenticatedLayout);