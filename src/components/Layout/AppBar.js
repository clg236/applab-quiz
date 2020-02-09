import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, {useState} from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddBoxOutlined';
import Button from '@material-ui/core/Button';
import * as ROUTES from '../../constants/routes';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {connect} from 'react-redux';

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
        textDecoration: 'none',
        color: 'white'
    },
    button: {
        margin: 10
    }
});

function AppBarComponent({classes, auth, drawer, dispatch}) {

    function handleToggleDrawerClicked() {
        if (drawer.open) {
            dispatch({
                type: "CLOSE_DRAWER"
            });
        } else {
            dispatch({
                type: "OPEN_DRAWER"
            });
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

                    <MenuIcon/>
                </IconButton>
                <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                <Link className={classes.title} href="#" variant="body2">
                Application Lab - Spring 2020
  </Link>
                    
                </Typography>
                <Button
                    variant="outlined"
                    color="inherit"
                    aria-label="create a new activity"
                    component={Link} to={ROUTES.CREATE_ACTIVITY}
                    className={classes.button}
                    startIcon={<AddIcon />}
                >
                Create Activity
                </Button>

                {/* <IconButton
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
                </IconButton> */}
                {/* <Menu
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
                    <MenuItem onClick={handleMenuClose}>My Activities</MenuItem>
                </Menu> */}
            </Toolbar>
        </AppBar>
    );
}

export default connect(
    ({firebase: {auth}, drawer}) => (
        {auth, drawer}
    )
)(withStyles(styles)(AppBarComponent));