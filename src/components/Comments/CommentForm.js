import React from 'react';
import {compose} from 'redux';
import {Grid, Typography, withStyles} from "@material-ui/core";
import {Field, withFormik} from "formik";
import Button from "@material-ui/core/Button";
import {getVal, withFirebase} from "react-redux-firebase";
import {withSnackbar} from 'notistack';
import {Editor} from "../Form";
import {connect} from "react-redux";

const styles = theme => ({});


const CommentForm = (props) => {
    const {classes, handleSubmit, values, errors, isSubmitting, isValid} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
                <Grid item md={12}>
                    <Field
                        name="comment"
                        render={({field, form}) => (
                            <Editor field={field} form={form}/>
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" variant="contained" type="submit" disabled={isSubmitting || !isValid}>
                        Submit
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
        (state) => ({
            user: state.firebase.auth
        })
    ),

    withFormik({

        mapPropsToValues: () => {
            return {
                comment: ""
            };
        },

        validate: values => {
            const errors = {};

            if (!values.comment) {
                errors.comment = 'Required';
            }

            return errors;
        },

        handleSubmit: (values, actions) => {
            const {props: {user: {uid, displayName, photoURL}, submissionID, isAssignment, firebase: {pushWithMeta}, enqueueSnackbar}} = actions;

            const prefix = isAssignment ? "assignmentSubmissions" : "quizSubmissions";

            pushWithMeta(`assignmentSubmissions/${submissionID}/comments`, {
                comment: values.comment,
                user: {uid, displayName, photoURL}
            }).then(() => {
                actions.setSubmitting(false);
                enqueueSnackbar("Submitted!");
            });
        }
    }),

    withStyles(styles)
)(CommentForm);