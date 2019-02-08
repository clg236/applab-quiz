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

const DRAWER_WIDTH = 200;

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
        width: theme.spacing.unit * 5,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 7,
        },
    },

    drawerIcon: {
        marginLeft: 8,
        marginRight: 8
    },
    icon: {
        fontSize: '32px !important',
        marginBottom: theme.spacing.unit
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
                            <FontAwesomeIcon icon="home" size="sm" fixedWidth/>
                        </ListItemIcon>
                        <ListItemText primary="home"/>
                    </ListItem>
                    <ListItem button component={props => <Link {...props} to={ROUTES.LIST_QUIZZES}/>}>
                        <ListItemIcon className={classes.drawerIcon}>
                            <FontAwesomeIcon icon="vial" size="sm" fixedWidth/>
                        </ListItemIcon>
                        <ListItemText primary="quizzes" />
                    </ListItem>
                    <ListItem button component={props => <Link {...props} to={ROUTES.LIST_ASSIGNMENTS}/>}>
                        <ListItemIcon className={classes.drawerIcon}>
                            <FontAwesomeIcon icon="scroll" size="sm" fixedWidth/>
                        </ListItemIcon>
                        <ListItemText primary="assignments" />
                    </ListItem>
                </div>
            </List>
            {/* {profile.role == ROLES.ROLE_ADMIN &&  */}
            <>
                <Divider/>
                <List>
                    <ListItem button component={props => <Link {...props} to={ROUTES.ADMIN_USERS}/>}>
                        <ListItemIcon className={classes.drawerIcon}>
                                <FontAwesomeIcon icon="user-astronaut" fixedWidth />
                        </ListItemIcon>
                        <ListItemText primary="people"/>
                        
                    </ListItem>
                </List>
                <List>
                    <ListItem button component={props => <Link {...props} to={ROUTES.ADMIN_LIST_QUIZZES}/>}>
                        <ListItemIcon className={classes.drawerIcon}>
                            <FontAwesomeIcon icon="plus-square" size="sm" fixedWidth/>
                        </ListItemIcon>
                        <ListItemText primary="create and manage" />
                    </ListItem>
                </List>
                <List>
                    <ListItem button component={props => <Link {...props} to={ROUTES.ADMIN_LIST_ASSIGNMENTS}/>}>
                        <ListItemIcon className={classes.drawerIcon}>
                            <FontAwesomeIcon icon="plus-square" size="sm" fixedWidth/>
                        </ListItemIcon>
                        <ListItemText primary="create and manage" />
                    </ListItem>
                </List>
            </>
            {/* } */}

            <Divider/>
            <List>
                <div>
                    <ListItem button onClick={handleSignOutClicked}>
                        <ListItemIcon className={classes.drawerIcon}>
                            <FontAwesomeIcon icon="sign-out-alt" size="sm" fixedWidth/>
                        </ListItemIcon>
                        <ListItemText primary="sign out" />
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

