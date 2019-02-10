import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

//our front-end material-ui
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import Logo from '../../img/logo.png'

import { withFirebase } from 'react-redux-firebase';

const styles = theme => ({

    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },

    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        opacity: 0.75,
        boxShadow: "none",
        overflow: "hidden"
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        paddintTop: 10,
        marginTop: theme.spacing.unit * 3,
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
        const { email, password } = state;

        firebase
            .login({
                email, password
            })
            .then(() => {
                props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                setState({ ...state, error });
            });

        event.preventDefault();
    };

    const handleInputChange = event => {
        setState({ ...state, [event.target.name]: event.target.value });
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
                setState({ ...state, error });
            });
    }

    const { classes } = props;
    const { email, password, error } = state;

    return (
        <div>
            <div className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <img src={Logo} />
                </Paper>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}><LockIcon /></Avatar>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <form className={classes.form} onSubmit={handleFormSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus value={email} onChange={handleInputChange} placeholder="Email Address" />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" value={password} onChange={handleInputChange} placeholder="Password" />
                        </FormControl>

                        <FormGroup>
                            <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>Sign In As Guest</Button>
                            <Divider variant="middle" />
                            <Divider variant="middle" />
                            <Divider variant="middle" />
                            <Divider variant="middle" />
                            <Button onClick={handleSignInWithGoogleClicked} type="submit" fullWidth variant="contained" color="primary" >Sign In As Student</Button>
                        </FormGroup>
                    </form>
                </Paper>
                <Paper className={classes.paper}>
                    <Typography >By your use of these resources, you agree to abide by the <a href="http://www.nyu.edu/about/policies-guidelines-compliance/policies-and-guidelines/responsible-use-of-nyu-computers-and-data-policy-on.html">Policy on Responsible Use of NYU Computers and Data.</a></Typography>
                </Paper>
            </div>
        </div>
    );
    
};


export default withFirebase(withStyles(styles)(withRouter(SignIn)));