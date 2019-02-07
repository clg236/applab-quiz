import React from 'react';
import {compose} from 'redux';
import {CircularProgress, Grid, withStyles} from "@material-ui/core";
import {Field, withFormik} from "formik";
import Button from "@material-ui/core/Button";
import {firebaseConnect, getVal, isEmpty, isLoaded, withFirebase} from "react-redux-firebase";
import {withSnackbar} from 'notistack';
import TextField from "../Form/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {connect} from "react-redux";
import {push} from "connected-react-router";

const styles = theme => ({});

const INITIAL_VALUES = {
    name: "",
    deadline: "",
    published: true
};

const QuizInfoForm = (props) => {
    const {classes, quizID, quiz, handleSubmit, values, errors, isSubmitting, isValid} = props;

    if (quizID && !isLoaded(quiz)) {
        return <CircularProgress/>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
                <Grid item md={12}>
                    <Field
                        name="name"
                        render={({field}) => (
                            <TextField label="Name" required fullWidth={true} {...field}
                                       error={Boolean(errors[field.name])}/>
                        )}

                    />
                </Grid>


                <Grid item md={12}>
                    <Field
                        name="deadline"
                        render={({field}) => (
                            <TextField label="Deadline" type="datetime-local" fullWidth {...field}
                                       error={Boolean(errors[field.name])}/>
                        )}
                    />
                </Grid>

                <Grid item md={12}>
                    <Field
                        name="published"
                        render={({field}) => (
                            <FormControlLabel control={
                                <Switch
                                    checked={Boolean(field.value)}
                                    onChange={field.onChange}
                                    value="hello"
                                    name={field.name}
                                />
                            } label="Published?"/>
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" variant="contained" type="submit" disabled={isSubmitting || !isValid}>
                        {quizID && quiz ? "Save" : "Submit"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default compose(
    withFirebase,

    withSnackbar,

    connect(
        (state, {quizID, isAssignment}) => {
            const prefix = isAssignment ? "assignments" : "quizzes";

            return {
                quiz: quizID ? getVal(state.firebase.data, `${prefix}/${quizID}`) : null
            };
        },
        {
            pushToHistory: push
        }
    ),

    firebaseConnect(({quizID, isAssignment}) => {
        const queries = [];

        const prefix = isAssignment ? "assignments" : "quizzes";

        if (quizID) {
            queries.push({
                path: `${prefix}/${quizID}`
            })
        }

        return queries;
    }),


    withFormik({
        enableReinitialize: true,

        mapPropsToValues: ({quizID, quiz}) => {
            if (quizID) {
                if (!isLoaded(quiz) || isEmpty(quiz)) {
                    return {...INITIAL_VALUES};
                } else {
                    return {
                        name: quiz.name,
                        deadline: "deadline" in quiz ? quiz.deadline : "",
                        published: "published" in quiz ? quiz.published : true
                    }
                }
            } else {
                return {...INITIAL_VALUES};
            }
        },

        validate: values => {
            const errors = {};

            if (!values.name) {
                errors.name = 'Required';
            }

            return errors;
        },

        handleSubmit: (values, actions) => {
            const {props: {quizID, quiz, isAssignment, firebase: {pushWithMeta, updateWithMeta}, enqueueSnackbar, pushToHistory}} = actions;
            let promise = null;

            const prefix = isAssignment ? "assignments" : "quizzes";

            if (quizID && quiz) {
                promise = updateWithMeta(`${prefix}/${quizID}`, values);
            } else {
                promise = pushWithMeta(prefix, values);
            }

            promise.then(ref => {
                actions.setSubmitting(false);

                if (quizID) {
                    enqueueSnackbar("Saved!");
                } else {
                    pushToHistory(`/admin/${prefix}/${ref.key}`);
                }
            });
        }
    }),

    withStyles(styles)
)(QuizInfoForm);