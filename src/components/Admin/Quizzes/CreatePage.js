import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Form from './QuizForm';

let CreatePage = () => {

    return (
        <Grid container spacing={16} direction="column">
            <Typography variant="h2">Create Quiz</Typography>

            <Grid item>
                <Form/>
            </Grid>
        </Grid>
    );
};


export default CreatePage;
