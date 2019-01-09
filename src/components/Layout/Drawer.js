import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import classNames from 'classnames';
import React, { useContext } from 'react';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { withFirebase } from 'react-redux-firebase';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import ACTIONS from '../../actions';
import { connect } from 'react-redux';

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
    }
});


function DrawerComponent(props) {
    const { classes, firebase, auth, profile, dispatch, drawer } = props;

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
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <div>
                    <ListItem button component={props => <Link {...props} to={ROUTES.HOME} />}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={handleQuizMenuClicked}>
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Quizzes" />
                    </ListItem>
                </div>
            </List>
            {/* {profile.role == ROLES.ROLE_ADMIN &&  */}
                <>
                    <Divider />
                    <List>
                        <ListItem button component={props => <Link {...props} to={ROUTES.ADMIN_QUESTIONS} />}>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Questions" />
                        </ListItem>
                    </List>
                </>
            {/* } */}
            
            <Divider />
            <List>
                <div>
                    <ListItem button onClick={handleSignOutClicked}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign out" />
                    </ListItem>
                </div>
            </List>

        </Drawer>
    );
}

const mapStateToProps = ({drawer, firebase: { auth, profile }}) => {
    return {
        drawer,
        auth,
        profile,
    };
};

export default connect(mapStateToProps)(withFirebase(withStyles(styles)(DrawerComponent)));
export { DRAWER_WIDTH };
