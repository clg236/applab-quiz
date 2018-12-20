import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;

//Create an Wrapper component that will render a <section> tag with some styles
const Wrapper = styled.section`
    padding: 4em;
    background: black;
`;

//use our Title and Wrapper just like any other React componend, but they are now styled!
const App = () => (
    <Wrapper>
        <Title>App</Title>
    </Wrapper>
)

export default App;