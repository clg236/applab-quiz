import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { ApiContext } from '../Api';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as ROUTES from '../../constants/routes';


function CreateQuestionPage(props) {
    const api = useContext(ApiContext);

    const handleSubmit = (values, actions) => {
        const question = values.question;
        api.question.create(question).then(() => {
            props.history.push(ROUTES.ADMIN_QUESTIONS);
        }).catch(error => {
            alert("Please try it again!");
        });
    };

    return (
        <div>
            <h2>Create a question</h2>
            <Formik
                initialValues={{question: ''}}
                onSubmit={handleSubmit}
                render={props => (
                    <Form onSubmit={props.handleSubmit}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Field
                                    name='question'
                                    render={({field}) => (
                                        <TextField
                                                label="Question"
                                                name={field.name}
                                                value={field.value}
                                                required
                                                fullWidth={true}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                            />
                                        )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit">
                                    Create
                            </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            />
        </div>
    );
}

export default withRouter(CreateQuestionPage);