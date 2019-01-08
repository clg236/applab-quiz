import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { DRAWER_WIDTH } from './Drawer';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';


import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux';
import ACTIONS from '../../actions';

const styles = theme => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
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
    }
});

function AppBarComponent({ classes, auth, drawer, dispatch }) {

    function handleOpenDrawerClicked() {
        dispatch(ACTIONS.LAYOUT.openDrawer());
    }

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    function handleAccountClicked(e) {
        setMenuAnchorEl(e.currentTarget);
    }

    function handleMenuClose() {
        setMenuAnchorEl(null);
    }

    const isDrawerOpen = drawer.open;

    return (
        <AppBar
            position="absolute"
            className={classNames(classes.appBar, isDrawerOpen && classes.appBarShift)}
        >
            <Toolbar disableGutters={!isDrawerOpen} className={classes.toolbar}>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={handleOpenDrawerClicked}
                    className={classNames(
                        classes.menuButton,
                        isDrawerOpen && classes.menuButtonHidden,
                    )}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    The awesome quiz app
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                <IconButton
                    aria-owns={Boolean(menuAnchorEl) ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={handleAccountClicked}
                    color="inherit"
                >
                    {
                        auth.photoURL ? 
                            <Avatar alt={auth.name} src={auth.photoURL} /> : 
                            <Avatar alt={auth.name}><AccountCircle /></Avatar>
                    }
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={menuAnchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default connect(({ firebase: { auth }, drawer }) => ({ auth, drawer }))(withStyles(styles)(AppBarComponent));