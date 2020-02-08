import React from 'react';

import SignInPage from '../SignIn';
//a fun background from unplash.com
import {Unsplashed} from 'react-unsplash-container';
import {withTheme} from '@material-ui/core/styles';

function NonAuthenticatedLayout(props) {
    return (
        <div>
            <Unsplashed keywords={['shanghai']} style={{paddingTop: props.theme.spacing(8), height: "100vh"}}>
                <SignInPage/>
            </Unsplashed>
        </div>

    )
}

export default withTheme(NonAuthenticatedLayout);