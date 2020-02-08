import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
//our front-end material-ui
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import Logo from '../../img/logo.png'
import DeleteIcon from '@material-ui/icons/ChildCareOutlined';

import styled from 'styled-components';

import {withFirebase} from 'react-redux-firebase';

const styles = theme => ({

    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100vh',
        overflow: 'auto',
    },

    main: {
        width: 'auto',
        //display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: 10,
        marginBottom: 75,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
        boxShadow: "none",
        overflow: "hidden"
    },
    logo: {
        paddingBottom: '1em'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        paddingTop: 25,
    },
    submit: {
        paddingTop: 10,
        marginTop: theme.spacing(3),
    },
});


const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};


function SignIn(props) {
    const [state, setState] = useState(INITIAL_STATE);
    const firebase = props.firebase;

    const handleFormSubmit = event => {
        const {email, password} = state;

        firebase
            .login({
                email, password
            })
            .then(() => {
                props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                setState({...state, error});
            });

        event.preventDefault();
    };

    const handleSignInWithGoogleClicked = () => {
        firebase
            .login({
                provider: 'google',
                type: 'popup'
            })
            .then(() => {
                props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                setState({...state, error});
            });
    }

    const {classes} = props;

    return (
        <div>
            <div className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <div className={classes.logo}>
                        <img src={Logo} alt="logo" width="150px"/>
                    </div>
                    <Typography component="h1" variant="h5">APPLICATION LAB</Typography>
                    <Typography component="h2">Spring 2020</Typography>
                    <Typography component="p">Welcome message...</Typography>
                    <form className={classes.form} onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <Button
                                onClick={handleSignInWithGoogleClicked}
                                startIcon={<DeleteIcon/>}
                                type="submit"
                                variant="contained"
                                color="primary">NYU Student Sign In
                            </Button>
                        </FormGroup>
                    </form>
                </Paper>
                <Paper className={classes.paper}>
                    <Typography component="p" align="center">By your use of these resources, you agree to abide by
                        the <a
                            href="http://www.nyu.edu/about/policies-guidelines-compliance/policies-and-guidelines/responsible-use-of-nyu-computers-and-data-policy-on.html">Policy
                            on Responsible Use of NYU Computers and Data.</a></Typography>
                </Paper>
            </div>
        </div>
    );

};


export default withFirebase(withStyles(styles)(withRouter(SignIn)));