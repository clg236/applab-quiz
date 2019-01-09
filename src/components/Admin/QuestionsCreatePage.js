import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import * as ROUTES from '../../constants/routes';
import { Formik, Field } from 'formik';
import { push } from 'connected-react-router';


import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

let QuestionsCreatePage = ({ firebase: { pushWithMeta }, pushToHistory }) => {

    const handleSubmit = (values, actions) => {
        pushWithMeta("questions", {
            question: values.question
        }).then(() => {
            pushToHistory(ROUTES.ADMIN_QUESTIONS);
        });
    };

    return (
        <div>
            <h2>Create a question</h2>

            <Formik
                initialValues={{ question: "" }}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Field
                                    name="question"
                                    render={({ field }) => (
                                        <TextField
                                            label="Question"
                                            name={field.name}
                                            value={field.value}
                                            required
                                            fullWidth={true}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            onFocus={field.onFocus}
                                        />)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit">Create</Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </div>
    );
};



export default compose(
    withFirebase,

    connect(null, {
        pushToHistory: push
    }),

)(QuestionsCreatePage);