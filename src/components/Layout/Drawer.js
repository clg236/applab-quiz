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
import * as ROLES from '../../constants/roles';
import {withFirebase} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
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
        width: '0',
        [theme.breakpoints.up('sm')]: {
            width: '240px',
        },
    },

    drawerIcon: {
        marginLeft: 8,
        marginRight: 8
    },
    icon: {
        fontSize: '32px !important',
        marginBottom: theme.spacing(1)
    }
});

function DrawerComponent(props) {
    const {classes, firebase, profile, dispatch, drawer, routes} = props;

    // layout context
    const handleDrawerClose = () => {
        dispatch({
            type: "CLOSE_DRAWER"
        });
    };

    // firebase
    const handleSignOutClicked = () => {
        firebase.logout();
    };

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
                {routes.filter(route => route.label && !route.admin).map((route, index) => {
                    return (
                        <ListItem key={index} button component={Link} to={route.path}>
                            {route.icon && (
                                <ListItemIcon className={classes.drawerIcon}>
                                    <FontAwesomeIcon icon={route.icon} size="sm" fixedWidth/>
                                </ListItemIcon>
                            )}
                            <ListItemText primary={route.label}/>
                        </ListItem>
                    );
                })}
            </List>

            {profile.role === ROLES.ROLE_ADMIN && (
                <>
                    <Divider/>
                    <List>
                        {routes.filter(route => route.label && !!route.admin).map((route, index) => {
                            return (
                                <ListItem key={index} button component={Link} to={route.path}>
                                    {route.icon && (
                                        <ListItemIcon className={classes.drawerIcon}>
                                            <FontAwesomeIcon icon={route.icon} size="sm" fixedWidth/>
                                        </ListItemIcon>
                                    )}
                                    <ListItemText primary={route.label}/>
                                </ListItem>
                            );
                        })}
                    </List>
                </>
            )}

            <Divider/>

            <List>
                <div>
                    <ListItem button onClick={handleSignOutClicked}>
                        <ListItemIcon className={classes.drawerIcon}>
                            <FontAwesomeIcon icon="sign-out-alt" size="sm" fixedWidth/>
                        </ListItemIcon>
                        <ListItemText primary="sign out"/>
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

