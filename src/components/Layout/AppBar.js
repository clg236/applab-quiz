import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import classNames from 'classnames';
import React, {useContext, useState} from 'react';
import {DRAWER_WIDTH} from './Drawer';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../img/logo.png'

//fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {connect} from 'react-redux';
import ACTIONS from '../../actions';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        paddingLeft: 0,
    },
    menuButtonHidden: {
        display: 'none',
    },
    btnToggle: {
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        flexGrow: 1,
    }
});

function AppBarComponent({classes, auth, drawer, dispatch}) {

    function handleToggleDrawerClicked() {
        if (drawer.open) {
            dispatch(ACTIONS.LAYOUT.closeDrawer());
        } else {
            dispatch(ACTIONS.LAYOUT.openDrawer());
        }
    }

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    function handleAccountClicked(e) {
        setMenuAnchorEl(e.currentTarget);
    }

    function handleMenuClose() {
        setMenuAnchorEl(null);
    }

    return (
        <AppBar
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar disableGutters>
                <IconButton
                    color="inherit"
                    aria-label="Toggle drawer"
                    onClick={handleToggleDrawerClicked}
                    className={classes.btnToggle}
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
                    App Lab 2.0
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={0} color="secondary">
                        <NotificationsIcon/>
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
                            <Avatar alt={auth.name} src={auth.photoURL}/> :
                            <Avatar alt={auth.name}><AccountCircle/></Avatar>
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

export default connect(
    ({firebase: {auth}, drawer}) => (
        {auth, drawer}
        ))(withStyles(styles)(AppBarComponent));