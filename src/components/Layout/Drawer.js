import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import React from 'react';
import * as ROUTES from '../../constants/routes';
import {withFirebase} from 'react-redux-firebase';
import {push} from 'connected-react-router';
import {Link} from 'react-router-dom';
import ACTIONS from '../../actions';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DRAWER_WIDTH = 240;

const styles = theme => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: DRAWER_WIDTH,
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

    drawerIcon: {
        marginLeft: 8,
        marginRight: 8
    }
});


function DrawerComponent(props) {
    const {classes, firebase, auth, profile, dispatch, drawer} = props;

    // layout context
    const handleDrawerClose = () => {
        dispatch(ACTIONS.LAYOUT.closeDrawer());
    }

    // firebase
    const handleSignOutClicked = () => {
        firebase.logout();
    }

    // navigations
    const handleHomeMenuClicked = () => {
        dispatch(push(ROUTES.HOME));
    }

    const handleQuizMenuClicked = () => {
        dispatch(push(ROUTES.QUIZZES));
    }

    const isDrawerOpen = drawer.open;

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: classNames(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
            }}
            open={isDrawerOpen}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <List>
                <div>
                    <ListItem button component={props => <Link {...props} to={ROUTES.HOME}/>}>
                        <ListItemIcon className={classes.drawerIcon}>
                            <FontAwesomeIcon icon="home" size="lg" fixedWidth/>
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItem>
                    <ListItem button onClick={handleQuizMenuClicked}>
                        <ListItemIcon className={classes.drawerIcon}>
                            <FontAwesomeIcon icon="question" size="lg" fixedWidth/>
                        </ListItemIcon>
                        <ListItemText primary="My Quizzes"/>
                    </ListItem>
                </div>
            </List>
            {/* {profile.role == ROLES.ROLE_ADMIN &&  */}
            <>
                <Divider/>
                <List>
                    <ListItem button component={props => <Link {...props} to={ROUTES.ADMIN_USERS}/>}>
                        <ListItemIcon className={classes.drawerIcon}>
                            <FontAwesomeIcon icon="user-astronaut" size="lg" fixedWidth/>
                        </ListItemIcon>
                        <ListItemText primary="Users"/>
                    </ListItem>
                </List>
                <List>
                    <ListItem button component={props => <Link {...props} to={ROUTES.ADMIN_QUIZZES}/>}>
                        <ListItemIcon className={classes.drawerIcon}>
                            <FontAwesomeIcon icon="question" size="lg" fixedWidth/>
                        </ListItemIcon>
                        <ListItemText primary="Quizzes"/>
                    </ListItem>
                </List>
                {/*<List>*/}
                {/*<ListItem button component={props => <Link {...props} to={ROUTES.ADMIN_QUESTIONS}/>}>*/}
                {/*<ListItemIcon>*/}
                {/*<HelpIcon/>*/}
                {/*</ListItemIcon>*/}
                {/*<ListItemText primary="Questions"/>*/}
                {/*</ListItem>*/}
                {/*</List>*/}
            </>
            {/* } */}

            <Divider/>
            <List>
                <div>
                    <ListItem button onClick={handleSignOutClicked}>
                        <ListItemIcon className={classes.drawerIcon}>
                            <FontAwesomeIcon icon="sign-out-alt" size="lg" fixedWidth/>
                        </ListItemIcon>
                        <ListItemText primary="Sign out"/>
                    </ListItem>
                </div>
            </List>

        </Drawer>
    );
}

const mapStateToProps = ({drawer, firebase: {auth, profile}}) => {
    return {
        drawer,
        auth,
        profile,
    };
};

export default connect(mapStateToProps)(withFirebase(withStyles(styles)(DrawerComponent)));
export {DRAWER_WIDTH};

