import React from 'react';
import styled from 'styled-components';

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

const Account = () => (
    <Wrapper>
        <Title>Account</Title>
    </Wrapper> 
);

export default Account;