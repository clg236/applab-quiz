import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import WcIcon from '@material-ui/icons/Wc';
import classNames from 'classnames';
import React from 'react';
import * as ROUTES from '../../constants/routes';
import {withFirebase} from 'react-redux-firebase';
import {push} from 'connected-react-router';
import {Link} from 'react-router-dom';
import ACTIONS from '../../actions';
import {connect} from 'react-redux';

//fontawesome icons!
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { faVial } from '@fortawesome/free-solid-svg-icons'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

//user interface styles
import {
    drawerWidth,
    transition,
    boxShadow,
    defaultFont
  } from "../../jss/uiconstants.jsx";


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
        border: "none",
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        zIndex: "1",
        ...boxShadow,
        width: drawerWidth,
        [theme.breakpoints.up("md")]: {
          width: drawerWidth,
          position: "fixed",
          height: "100%"
        },
        [theme.breakpoints.down("sm")]: {
          width: drawerWidth,
          ...boxShadow,
          position: "fixed",
          display: "block",
          top: "0",
          height: "100vh",
          right: "0",
          left: "auto",
          zIndex: "1032",
          visibility: "visible",
          overflowY: "visible",
          borderTop: "none",
          textAlign: "left",
          paddingRight: "0px",
          paddingLeft: "0",
          transform: `translate3d(${drawerWidth}px, 0, 0)`,
          ...transition
        }
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

    background: {
        position: "absolute",
        zIndex: "1",
        height: "100%",
        width: "100%",
        display: "block",
        top: "0",
        left: "0",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        "&:after": {
          position: "absolute",
          zIndex: "3",
          width: "100%",
          height: "100%",
          content: '""',
          display: "block",
          background: "#000",
          opacity: ".8"
        }
      },
      item: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        "&:hover,&:focus,&:visited,&": {
          color: "#FFFFFF"
        }
      },
      itemLink: {
        width: "auto",
        transition: "all 300ms linear",
        margin: "10px 15px 0",
        borderRadius: "3px",
        position: "relative",
        display: "block",
        padding: "10px 15px",
        backgroundColor: "transparent",
        ...defaultFont
      },
      itemIcon: {
        width: "24px",
        height: "30px",
        fontSize: "24px",
        lineHeight: "30px",
        float: "left",
        marginRight: "15px",
        textAlign: "center",
        verticalAlign: "middle",
        color: "rgba(255, 255, 255, 0.8)"
      },
      logoImage: {
        width: "30px",
        display: "inline-block",
        maxHeight: "30px",
        marginLeft: "10px",
        marginRight: "15px"
      },

    
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
                        <ListItemIcon>
                        <FontAwesomeIcon icon={faIgloo} />
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItem>
                    <ListItem button onClick={handleQuizMenuClicked}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faVial} />
                        </ListItemIcon>
                        <ListItemText primary="My Assignments"/>
                    </ListItem>
                </div>
            </List>
            {/* {profile.role == ROLES.ROLE_ADMIN &&  */}
            <>
                <Divider/>
                    <p>Administrators Only</p>
                <Divider/>
                <List>
                    <ListItem button component={props => <Link {...props} to={ROUTES.ADMIN_USERS}/>}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faUserAstronaut} />
                        </ListItemIcon>
                        <ListItemText primary="People"/>
                    </ListItem>
                </List>
                <List>
                    <ListItem button component={props => <Link {...props} to={ROUTES.ADMIN_QUIZZES}/>}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faPlusSquare} />
                        </ListItemIcon>
                        <ListItemText primary="Create and Manage"/>
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
                        <ListItemIcon>
                        <FontAwesomeIcon icon={faSignOutAlt} />
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

