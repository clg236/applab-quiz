import React from 'react';
import {compose} from 'redux';
import {CircularProgress, Grid, Typography, withStyles} from "@material-ui/core";
import {Field, withFormik} from "formik";
import Button from "@material-ui/core/Button";
import {firebaseConnect, getVal, isEmpty, isLoaded, withFirebase} from "react-redux-firebase";
import {withSnackbar} from 'notistack';
import {connect} from "react-redux";
import API from "../../apis";
import Rating from "../Form/Rating";


const styles = theme => ({});


const QualitiesForm = props => {
    const {classes, quiz, submission, handleSubmit, isSubmitting, isValid} = props;

    if (!isLoaded(submission) || !isLoaded(quiz)) {
        return <CircularProgress/>;
    } else if (isEmpty(submission) || isEmpty(quiz)) {
        return <Typography variant="body1">There is no submission.</Typography>;
    }

    if (!quiz.qualities || quiz.qualities.length === 0) {
        return <Typography variant="body1">There is no qualities set.</Typography>;
    }

    const disabled = !!submission.qualities;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
                {quiz.qualities.map((quality, i) => {
                    return (
                        <Grid item md={12} key={i}>
                            <Typography variant="title">{quality.name}</Typography>
                            <Field
                                name={quality.id}
                                render={({field, form}) => (
                                    <Rating field={field} form={form} disabled={disabled}/>
                                )}
                            />
                        </Grid>
                    );
                })}

                <Grid item xs={12}>
                    {disabled
                        ? <Typography variant="body1">Evaluated
                            by {submission.qualitiesCreatedBy.displayName}</Typography>
                        : (
                            <Button color="primary" variant="contained" type="submit"
                                    disabled={isSubmitting || !isValid}>
                                Submit
                            </Button>
                        )
                    }
                </Grid>
            </Grid>
        </form>
    );
};

export default compose(
    withSnackbar,

    firebaseConnect(({quizID, submissionID}) => {
        return [
            {
                path: `quizzes/${quizID}`
            },
            {
                path: `submissions/${submissionID}`
            },
        ]
    }),

    withFirebase,

    connect(
        ({firebase}, {quizID, submissionID}) => ({
            auth: firebase.auth,
            quiz: getVal(firebase.data, `quizzes/${quizID}`),
            submission: getVal(firebase.data, `submissions/${submissionID}`)
        })
    ),

    withFormik({

        mapPropsToValues: props => {
            const {quizID, quiz, submissionID, submission} = props;
            const values = {};

            if (quiz.qualities) {
                quiz.qualities.forEach(v => {
                    values[v.id] = 0;
                });
            }

            if (submission && submission.qualities) {
                Object.keys(submission.qualities).map(k => {
                    values[k] = submission.qualities[k];
                });
            }

            return values;
        },

        handleSubmit: (values, actions) => {
            const {
                props: {
                    submissionID,
                    submission,
                    enqueueSnackbar
                }
            } = actions;

            API.Qualities.saveQualities(
                {id: submissionID, ...submission},
                values
            ).then(_ => {
                actions.setSubmitting(false);
                enqueueSnackbar("Submitted!");
            });
        }
    }),

    withStyles(styles)
)(QualitiesForm);