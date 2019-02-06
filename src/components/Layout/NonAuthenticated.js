import React from 'react';

import SignInPage from '../SignIn';
//a fun background from unplash.com
import { Unsplashed } from 'react-unsplash-container';

function NonAuthenticatedLayout() {
    return (
        <div>
             <Unsplashed keywords={['nature', 'tech', 'water']} >
                <SignInPage />
             </Unsplashed>
        </div>
    
    )
}

export default NonAuthenticatedLayout;