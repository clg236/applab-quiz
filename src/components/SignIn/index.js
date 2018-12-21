import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: black;
`;

//Create an Wrapper component that will render a <section> tag with some styles
const Wrapper = styled.section`
    padding: 4em;
    background: pink;
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
    }

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

        return (
            <form onSubmit={this.onSubmit}>
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
                <button disabled={isInvalid} type="submit">Sign In</button>
                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

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