import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import AppBar from './appBar';
import SignInPage from '../SignIn';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';


const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});


//use our Title and Wrapper just like any other React componend, but they are now styled!
class App extends React.Component {
    state = {
        open: true,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });

    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };


    render() {
        const { classes } = this.props;

        return (
            <Router>
                <SignInPage />
                                {/* <div className={classes.root}>
                                    <CssBaseline />
                                    <div>
                                        <AppBar />
                                        <Drawer
                                            variant="permanent"
                                            classes={{
                                                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                                            }}
                                            open={this.state.open}
                                        >
                                            <div className={classes.toolbarIcon}>
                                                <IconButton onClick={this.handleDrawerClose}>
                                                    <ChevronLeftIcon />
                                                </IconButton>
                                            </div>
                                            <Divider />
                                            <List></List>
                                            <Divider />
                                            <List></List>
                                        </Drawer>
                                        <main className={classes.content}>
                                            <div className={classes.appBarSpacer} />

                                            <Navigation />
                                            <hr />
                                            <Route exact path={ROUTES.LANDING} component={LandingPage} />
                                            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                                            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                                            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                                            <Route path={ROUTES.HOME} component={HomePage} />
                                            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                                            <Route path={ROUTES.ADMIN} component={AdminPage} />
                                        </main>
                                    </div>

                                </div> */}
                                
            </Router>
        );
    }
}


export default withStyles(styles)(App);
