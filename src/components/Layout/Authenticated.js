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

import * as Quizzes from "../../containers/Quizzes";
import * as Assignments from "../../containers/Assignments";
import * as Activities from "../../containers/Activities";
import {AdminListUsersPage, UserDetailPage} from "../../containers/Users";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar
});

const routes = [
    {path: ROUTES.LANDING, component: HomePage, exact: true, icon: "home", label: "HOME"},
    {path: ROUTES.HOME, component: HomePage, exact: true},
    //{path: ROUTES.LIST_QUIZZES, component: Quizzes.ListQuizzesPage, exact: true, icon: "vial", label: "SYLLABUS"},
    {
        path: ROUTES.LIST_ASSIGNMENTS,
        component: Assignments.ListAssignmentsPage,
        exact: true,
        icon: "scroll",
        label: "ACTIVITIES SUMMARY"
    },

    // {path: ROUTES.CREATE_QUIZ, component: Quizzes.CreateQuizPage, exact: true, admin: true},
    // {path: ROUTES.Edit_QUIZ, component: Quizzes.EditQuizPage, exact: false, admin: true},
    // {path: ROUTES.VIEW_QUIZ_SUBMISSION, component: Quizzes.ViewQuizPage, exact: false},
    // {path: ROUTES.VIEW_QUIZ, component: Quizzes.ViewQuizPage, exact: false},

    // {path: ROUTES.CREATE_ASSIGNMENT, component: Assignments.CreateAssignmentPage, exact: true, admin: true},
    // {path: ROUTES.Edit_ASSIGNMENT, component: Assignments.EditAssignmentPage, exact: false, admin: true},
    // {path: ROUTES.VIEW_ASSIGNMENT_SUBMISSION, component: Assignments.ViewAssignmentPage, exact: false},
    // {path: ROUTES.VIEW_ASSIGNMENT, component: Assignments.ViewAssignmentPage, exact: false},

    {path: ROUTES.CREATE_ACTIVITY, component: Activities.CreateActivityPage, exact: true, admin: true},
    {path: ROUTES.Edit_ACTIVITY, component: Activities.EditActivityPage, exact: false, admin: true},
    {path: ROUTES.VIEW_ACTIVITY_SUBMISSION, component: Activities.ViewActivityPage, exact: false},
    {path: ROUTES.VIEW_ACTIVITY, component: Activities.ViewActivityPage, exact: false},

    {
        path: ROUTES.ADMIN_LIST_USERS,
        component: AdminListUsersPage,
        exact: true,
        admin: true,
        icon: "user-astronaut",
        label: "STUDENT LIST"
    },
    // {
    //     path: ROUTES.ADMIN_LIST_QUIZZES,
    //     component: Quizzes.AdminListQuizzesPage,
    //     exact: true,
    //     admin: true,
    //     icon: "feather",
    //     label: "quizzes"
    // },
    // {
    //     path: ROUTES.ADMIN_LIST_ASSIGNMENTS,
    //     component: Assignments.AdminListAssignmentsPage,
    //     exact: true,
    //     admin: true,
    //     icon: "plus-square",
    //     label: "assignments"
    // },
    {
        path: ROUTES.ADMIN_LIST_ACTIVITIES,
        component: Activities.AdminListActivitiesPage,
        exact: true,
        admin: true,
        icon: "plus-square",
        label: "ACTIVITIES SUMMARY"
    },

    {path: ROUTES.VIEW_USER, component: UserDetailPage, exact: false, admin: true},
];


function AuthenticatedLayout({classes, location}) {
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBarComponent/>
            <DrawerComponent routes={routes}/>

            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Switch location={location}>
                    {routes.map((route, index) => <Route key={index} exact={route.exact} path={route.path}
                                                         component={route.component}/>)}
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