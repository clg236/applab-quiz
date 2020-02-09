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
import Typography from '@material-ui/core/Typography';

//material ui for new homepage prototype
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {makeStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

const DRAWER_WIDTH = 260;

const styles = theme => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px',
        backgroundColor: '#81FCED',
        ...theme.mixins.toolbar,
    },
    drawerHeader: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '24px',
        backgroundColor: '#81FCED',
        color: '#7D4CDB',
        padding: '10px'
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
            width: '0',
        },
    },

    drawerIcon: {
        marginLeft: 8,
        color: '#7D4CDB'
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
            variant="temporary"
            classes={{
                paper: classNames(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
            }}
            open={isDrawerOpen}
            ModalProps={{ onBackdropClick: handleDrawerClose }}
        >
            <div className={classes.toolbarIcon}>
                <div className={classes.drawerHeader}>
                <Typography variant="body1" color="inherit">Welcome</Typography>
                <Typography variant="h5" color="inherit" gutterBottom>Christian Grewell</Typography>
                </div>
                
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <List>
                {routes.filter(route => route.label && !route.admin).map((route, index) => {
                    return (
                        <ListItem key={index} onClick={handleDrawerClose} button component={Link} to={route.path}>
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
                    <div className={classes.drawerHeader}>
                    <Typography variant="h6" color="inherit">Instructor Actions</Typography>
                </div>
                    <List>
                        {routes.filter(route => route.label && !!route.admin).map((route, index) => {
                            return (
                                <ListItem key={index} button onClick={handleDrawerClose} component={Link} to={route.path}>
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
                        <ListItemText primary="SIGN OUT"/>
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

