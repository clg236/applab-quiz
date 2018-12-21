import React from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { withFirebase } from '../Firebase';


const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: hotpink;
`;

//Create an Wrapper component that will render a <section> tag with some styles
const Wrapper = styled.section`
    padding: 4em;
    background: pink;
`;

//use our Title and Wrapper just like any other React componend, but they are now styled!
class App extends React.Component {
    
    render() {
        return (
            <Router>
                <Wrapper>
                    <Navigation />
                    <hr />
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                    <Route path={ROUTES.ADMIN} component={AdminPage} />
                </Wrapper>
            </Router>
        );
    }
}

export default withAuthentication(withFirebase(App));