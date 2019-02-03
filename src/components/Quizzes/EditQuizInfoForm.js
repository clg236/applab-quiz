import React from 'react';
import {compose} from 'redux';
import {Grid, withStyles} from "@material-ui/core";
import {Field, withFormik} from "formik";
import Button from "@material-ui/core/Button";
import {withFirebase} from "react-redux-firebase";
import {withSnackbar} from 'notistack';
import TextField from "../Form/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const styles = theme => ({});


const EditQuizInfoForm = (props) => {
    const {classes, quiz, handleSubmit, values, errors, isSubmitting, isValid} = props;

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
                        {quiz && quiz.id ? "Save" : "Submit"}
                    </Button>
                </Grid>
            </Grid>


        </form>
    );
};

export default compose(
    withFirebase,

    withSnackbar,

    withFormik({
        enableReinitialize: true,

        mapPropsToValues: ({quiz}) => {
            return {
                name: quiz && "name" in quiz ? quiz.name : "",
                deadline: quiz && "deadline" in quiz ? quiz.deadline : "",
                published: quiz && "published" in quiz ? quiz.published : true
            };
        },

        validate: values => {
            const errors = {};

            if (!values.name) {
                errors.name = 'Required';
            }

            return errors;
        },

        handleSubmit: (values, actions) => {
            const {props: {quiz, firebase: {pushWithMeta, updateWithMeta}, enqueueSnackbar}} = actions;
            let promise = null;

            if (quiz && quiz.id) {
                promise = updateWithMeta(`quizzes/${quiz.id}`, values);
            } else {
                promise = pushWithMeta("quizzes", values);
            }

            promise.then(() => {
                actions.setSubmitting(false);
                enqueueSnackbar("Saved!");
            });
        }
    }),

    withStyles(styles)
)(EditQuizInfoForm);