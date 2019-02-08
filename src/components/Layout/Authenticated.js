import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import DrawerComponent from './Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBarComponent from './AppBar';
import * as ROUTES from '../../constants/routes';
import HomePage from '../../containers/Home';
import {Route, Switch} from 'react-router-dom';

import {AdminCreateQuizPage, AdminEditQuizPage, AdminListQuizzesPage, ListQuizzesPage, ViewQuizPage} from "../../containers/Quizzes";
import {AdminCreateAssignmentPage, AdminEditAssignmentPage, AdminListAssignmentsPage, ListAssignmentsPage} from "../../containers/Assignments";
import {AdminListUsersPage, UserDetailPage} from "../../containers/Users";

import {QuizSubmissionDetailPage, AssignmentSubmissionDetailPage} from "../../containers/Submissions";

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
                    <Route exact path={ROUTES.LIST_QUIZZES} component={ListQuizzesPage}/>
                    <Route exact path={ROUTES.LIST_ASSIGNMENTS} component={ListAssignmentsPage}/>

                    <Route path={ROUTES.VIEW_QUIZ} component={ViewQuizPage}/>
                    <Route path={ROUTES.VIEW_ASSIGNMENT} component={ViewQuizPage}/>

                    <Route path={ROUTES.VIEW_QUIZ_SUBMISSION} component={QuizSubmissionDetailPage}/>
                    <Route path={ROUTES.VIEW_ASSIGNMENT_SUBMISSION} component={AssignmentSubmissionDetailPage}/>

                    <Route exact path={ROUTES.ADMIN_LIST_QUIZZES} component={AdminListQuizzesPage}/>
                    <Route exact path={ROUTES.ADMIN_CREATE_QUIZ} component={AdminCreateQuizPage}/>
                    <Route path={ROUTES.ADMIN_Edit_QUIZ} component={AdminEditQuizPage}/>

                    <Route exact path={ROUTES.ADMIN_LIST_ASSIGNMENTS} component={AdminListAssignmentsPage}/>
                    <Route exact path={ROUTES.ADMIN_CREATE_ASSIGNMENT} component={AdminCreateAssignmentPage}/>
                    <Route path={ROUTES.ADMIN_Edit_ASSIGNMENT} component={AdminEditAssignmentPage}/>

                    <Route exact path={ROUTES.ADMIN_USERS} component={AdminListUsersPage}/>
                    <Route path={ROUTES.VIEW_USER} component={UserDetailPage}/>

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