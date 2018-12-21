import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';


const NavigationAuth = (props) => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
            Email: {props.firebase.auth.currentUser && props.firebase.auth.currentUser.email}
            <SignOutButton />
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
);


const Navigation = (props) => (
    <div>
        <AuthUserContext.Consumer>
            {
                authUser => {
                    return authUser ? <NavigationAuth firebase={props.firebase} /> : <NavigationNonAuth />;
                }
            }
        </AuthUserContext.Consumer>
    </div>
);

export default withFirebase(Navigation);
