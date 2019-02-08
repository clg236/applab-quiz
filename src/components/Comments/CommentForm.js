import React from 'react';
import {compose} from 'redux';
import {CircularProgress, Grid, Typography, withStyles} from "@material-ui/core";
import {Field, withFormik} from "formik";
import Button from "@material-ui/core/Button";
import {firebaseConnect, getVal, isLoaded, isEmpty, withFirebase} from "react-redux-firebase";
import {withSnackbar} from 'notistack';
import {Editor} from "../Form";
import {connect} from "react-redux";

const styles = theme => ({});


const CommentForm = props => {
    const {classes, submission, handleSubmit, isSubmitting, isValid} = props;

    if (!isLoaded(submission)) {
        return <CircularProgress/>;
    } else if (isEmpty(submission)) {
        return <Typography variant="body1">There is no submission.</Typography>;
    }

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
    withSnackbar,

    withFirebase,

    connect(
        ({firebase}, {submissionID}) => ({
            auth: firebase.auth,
            submission: getVal(firebase.data, `submissions/${submissionID}`)
        })
    ),

    firebaseConnect(({submissionID}) => ([{
        path: `submissions/${submissionID}`
    }])),

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
            const {
                props: {
                    auth: {uid, displayName, photoURL},
                    submissionID,
                    submission,
                    firebase: {pushWithMeta, set},
                    enqueueSnackbar
                }
            } = actions;


            pushWithMeta("comments", {
                comment: values.comment,
                user: {uid, displayName, photoURL},
                submissionID,
                subject: submission.subject
            }).then(ref => {
                actions.setSubmitting(false);
                enqueueSnackbar("Submitted!");

                set(`users/${uid}/comments/${ref.key}`, true);
                set(`submissions/${submissionID}/comments/${ref.key}`, true);
            });
        }
    }),

    withStyles(styles)
)(CommentForm);