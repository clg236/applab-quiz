import React from 'react';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';

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

const SignOut = ({ firebase }) => (
    <Wrapper>
        <Title>Sign Out</Title>
        <button type="button" onClick={firebase.doSignOut}>
            Sign Out
        </button>
    </Wrapper>
)

export default withFirebase(SignOut);