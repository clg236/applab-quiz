import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import * as ROUTES from '../../constants/routes';
import { withFormik, Formik, Form, Field } from 'formik';
import { push } from 'connected-react-router';


import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const QuestionsCreatePage = (props) => {

    const { firebase: { pushWithMeta }, pushToHistory } = props;

    const myHandleSubmit = (func) => {
        // pushWithMeta("questions", {
        //     question: values.question
        // }).then(() => {
        //     pushToHistory(ROUTES.ADMIN_QUESTIONS);
        // });

        // console.log(values, actions);

        // actions.setSubmitting(false);
        console.log("handleSubmit: ", func);

        pushToHistory(ROUTES.ADMIN_QUESTIONS);

        if (func) {
            func();
        }

    };

    const formikSubmit = (func) => {
        console.log("formikSubmit: ", func);
    }


    const { values, handleChange, handleBlur, handleSubmit } = props;


    console.log("Props: ", props);

    return (
        <div>
            <h2>Create a question</h2>
            <button onClick={handleSubmit}>Click </button>
            <Form onSubmit={handleSubmit}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <TextField
                                label="Question"
                                name="question"
                                value={values.question}
                                required
                                fullWidth={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Create
                    </Button>
                    </Grid>
                </Grid>
            </Form>
        </div>
    );
};


export default compose(
    withFirebase,

    connect((state) => ({
        questions: state.firebase.data.questions,
    }), {
        pushToHistory: push
    }),

    withFormik({
        mapPropsToValues: () => ({ question: '' }),

        handleSubmit: (values, { setSubmitting }) => {
            console.log("inside withFormik", values);
        }
    })

)(QuestionsCreatePage);