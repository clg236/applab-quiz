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
import LayoutContext from './Context';
import { DRAWER_WIDTH } from './Drawer';
import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


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

function AppBarComponent(props) {
    const { classes } = props;
    const layoutContext = useContext(LayoutContext);

    function handleOpenDrawerClicked() {
        layoutContext.setState({ ...layoutContext.state, drawerOpen: true });
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
            position="absolute"
            className={classNames(classes.appBar, layoutContext.state.drawerOpen && classes.appBarShift)}
        >
            <Toolbar disableGutters={!layoutContext.state.drawerOpen} className={classes.toolbar}>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={handleOpenDrawerClicked}
                    className={classNames(
                        classes.menuButton,
                        layoutContext.state.drawerOpen && classes.menuButtonHidden,
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
                    {layoutContext.state.title}
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={layoutContext.state.badgeCount} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                <IconButton
                    aria-owns={Boolean(menuAnchorEl) ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={handleAccountClicked}
                    color="inherit"
                >
                    <AccountCircle />
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

export default withStyles(styles)(AppBarComponent);