import React from 'react';
import {compose} from 'redux';
import {CircularProgress, FormControl, Grid, withStyles} from "@material-ui/core";
import {Field, withFormik} from "formik";
import Button from "@material-ui/core/Button";
import {firebaseConnect, getVal, isEmpty, isLoaded, withFirebase} from "react-redux-firebase";
import {withSnackbar} from 'notistack';
import TextField from "../Form/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import API from "../../apis";
import {Editor, InputLabel} from "../Form";

const styles = theme => ({});

const INITIAL_VALUES = {
    name: "",
    description: "",
    deadline: "",
    published: true,
    type: "quiz"
};

const QuizInfoForm = (props) => {
    const {classes, quizID, quiz, handleSubmit, values, errors, isSubmitting, isValid} = props;

    if (quizID && !isLoaded(quiz)) {
        return <CircularProgress/>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Field name="name">
                        {({field, form}) => (<TextField label="Name" required fullWidth={true} {...field}
                                                        error={Boolean(errors[field.name])}/>)}
                    </Field>
                </Grid>


                <Grid item md={12}>
                    <FormControl fullWidth>
                        <InputLabel>Description</InputLabel>
                        <Field
                            name="description">
                            {({field, form}) => (<Editor field={field} form={form} withMargin/>)}
                        </Field>
                    </FormControl>
                </Grid>

                <Grid item md={12}>
                    <Field name="deadline">
                        {({field, form, meta}) => (
                            <TextField label="Deadline" type="datetime-local" fullWidth {...field}
                                       error={Boolean(errors[field.name])}/>)}
                    </Field>
                </Grid>

                <Grid item md={12}>
                    <Field name="published">{({field, form, meta}) => (
                        <FormControlLabel control={
                            <Switch
                                checked={Boolean(field.value)}
                                onChange={field.onChange}
                                name={field.name}
                            />
                        } label="Published?"/>
                    )}</Field>
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
    withSnackbar,

    firebaseConnect(({quizID}) => {
        const queries = [];

        if (quizID) {
            queries.push({
                path: `quizzes/${quizID}`
            })
        }

        return queries;
    }),

    connect(
        (state, {quizID}) => {
            return {
                quiz: quizID ? getVal(state.firebase.data, `quizzes/${quizID}`) : null
            };
        },
        {
            pushToHistory: push
        }
    ),


    withFormik({
        enableReinitialize: true,

        mapPropsToValues: props => {
            const {quizID, quiz} = props;

            const type = props.type ? props.type : 'quiz';

            if (quizID) {
                if (!isLoaded(quiz) || isEmpty(quiz)) {
                    return {...INITIAL_VALUES, type};
                } else {
                    return {
                        name: quiz.name,
                        description: "description" in quiz ? quiz.description : "",
                        deadline: "deadline" in quiz ? quiz.deadline : "",
                        published: "published" in quiz ? quiz.published : true,
                        type
                    }
                }
            } else {
                return {...INITIAL_VALUES, type};
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
            const {props: {quizID, enqueueSnackbar, pushToHistory}} = actions;

            API.Quizzes.saveQuizInfo(values, quizID)
                .then(ref => {
                    actions.setSubmitting(false);

                    if (quizID) {
                        enqueueSnackbar("Saved!");
                    } else {
                        let redirectURL = actions.props.redirectURL;
                        if (!redirectURL) {
                            if (values.type == 'quiz') {
                                redirectURL = `quizzes/:id`;
                            } else {
                                redirectURL = `assignments/:id`;
                            }
                        }

                        pushToHistory(redirectURL.replace(/:id/, ref.key));
                    }
                });
        }
    }),

    withStyles(styles)
)(QuizInfoForm);