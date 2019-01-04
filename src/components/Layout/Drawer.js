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
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../Firebase';
import LayoutContext from './Context';


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
    const { classes } = props;

    // layout context
    const layoutContext = useContext(LayoutContext);
    const handleDrawerClose = () => {
        layoutContext.setState({ ...layoutContext.state, drawerOpen: false });
    }

    // firebase
    const firebase = useContext(FirebaseContext);
    const handleSignOutClicked = () => {
        firebase.doSignOut();
    }

    // navigations
    const handleHomeMenuClicked = () => {
        props.history.push(ROUTES.HOME);
    }

    const handleQuizMenuClicked = () => {
        props.history.push(ROUTES.QUIZZES);
    }

    const handleAllQuestionsMenuClicked = () => {
        props.history.push(ROUTES.ADMIN_QUESTIONS);
    }

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: classNames(classes.drawerPaper, !layoutContext.state.drawerOpen && classes.drawerPaperClose),
            }}
            open={layoutContext.state.drawerOpen}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <div>
                    <ListItem button onClick={handleHomeMenuClicked}>
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
            <Divider />
            <List>
                <ListItem button onClick={handleAllQuestionsMenuClicked}>
                    <ListItemIcon>
                        <HelpIcon />
                    </ListItemIcon>
                    <ListItemText primary="All Questions" />
                </ListItem>
            </List>
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

export default withStyles(styles)(withRouter(DrawerComponent));
export { DRAWER_WIDTH };

