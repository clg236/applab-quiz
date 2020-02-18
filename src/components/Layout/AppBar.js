import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import {Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddBoxOutlined';
import Button from '@material-ui/core/Button';
import * as ROUTES from '../../constants/routes';
import {connect} from 'react-redux';
import * as ROLES from "../../constants/roles";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {compose} from "redux";


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

function AppBarComponent({classes, auth, profile, drawer, location, dispatch}) {

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

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar disableGutters>
                {location.pathname !== '/activities/create' ? 
                <IconButton color="inherit" aria-label="Toggle drawer" onClick={handleToggleDrawerClicked}
                            className={classes.btnToggle}>
                    <MenuIcon/>
                </IconButton> : <Link className={classes.title} to={"/"} variant="body2">
                        <IconButton color="secondary">
                            <ChevronLeftIcon/>
                            Back
                        </IconButton>
                    </Link>
                }

                <Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>

                </Typography>

                {profile.role === ROLES.ROLE_ADMIN && (
                    location.pathname !== '/activities/create' ? 
                    <Button variant="outlined" color="inherit" aria-label="create a new activity" component={Link}
                            to={ROUTES.CREATE_ACTIVITY} className={classes.button} startIcon={<AddIcon/>}>
                        Create Activity
                    </Button> : null
                )}
            </Toolbar>
        </AppBar>
    );
}
export default compose(
    connect(
        ({firebase: {auth, profile}, drawer, router: {location}}) => (
            {auth, profile, drawer, location}
        )
    ),

    withStyles(styles),

)(AppBarComponent);
