import React from 'react';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { withRouter } from 'react-router-dom';



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

class SignOut extends React.Component {

    handleSignOutClicked = () => {
        this.props.firebase.doSignOut();
        this.props.history.push(ROUTES.HOME);
    }

    render() {
        return (
            <Wrapper>
                <Title>Sign Out</Title>
                <button type="button" onClick={this.handleSignOutClicked}>
                    Sign Out
                </button>
            </Wrapper>
        );
    }
}

export default withRouter(withFirebase(SignOut));