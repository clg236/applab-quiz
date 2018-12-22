import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

//our front-end material-ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: black;
`;

//Create an Wrapper component that will render a <section> tag with some styles
const Wrapper = styled.section`
    padding: 4em;
    background: pink;
    width: 'audio',
    display: 'block'
    marginLeft: 'auto',
    marginRight: 'auto',
`;

const SignIn = () => (
    <Wrapper>
        <Title>Sign In</Title>
        <SignInForm />
        <SignUpLink />
        <SignInWithGoogleButton />
    </Wrapper>
);


const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends React.Component {
    constructor(props) {
        super(props)

        this.state = {...INITIAL_STATE};

        };

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

            event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };

    render() {
        const {email, password, error} = this.state;
        const isInvalid = password === '' || email === '';
       
        const styles = {
            button: {
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            },
            buttonBlue: {
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            },
            paper: {
                marginTop: '5em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2px, 2px, 2px, 2px'
            },
            avatar: {
                margin: '5px',
                backgroundColor: 'hotpink'
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: '5px'
            },
                submit: {
                marginTop: '5px'
            },
        };
        
        return (

        <Wrapper>
            <CssBaseline />
            <Paper className={styles.paper}>
            <Avatar className={styles.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
            <form className={styles.form} onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Password"
                />
                <button className={styles.submit} style={styles.button} disabled={isInvalid} type="submit">Sign In</button>
                {error && <p>{error.message}</p>}
                
            </form>
            </Paper>
        </Wrapper>
        );
    };
};

class SignInWithGoogleButtonBase extends React.Component {

    handleClicked = () => {
        this.props.firebase.doSignInWithGoogle().then(() => {
            this.setState({...INITIAL_STATE});
            this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            this.setState({ error });
        });
    }

    render() {
        return (
            <button onClick={this.handleClicked}>Sign in with Google</button>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

const SignInWithGoogleButton = compose(
    withRouter,
    withFirebase,
)(SignInWithGoogleButtonBase);

export default SignIn;