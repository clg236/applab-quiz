import React from 'react';
import {withFormik} from 'formik';
import {compose} from "redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {firebaseConnect, getVal, isLoaded, withFirebase} from "react-redux-firebase";
import {connect} from "react-redux";
import {CircularProgress, Typography, withStyles} from "@material-ui/core";
import QuestionTypes from '../QuestionTypes';
import {withSnackbar} from "notistack";
import moment from "moment";
import Moment from 'react-moment';
import {push} from "connected-react-router";
import API from "../../apis";
import * as ROLES from "../../constants/roles";
import {default as MuiLink} from "@material-ui/core/Link";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const styles = theme => ({
    submit: {
        marginTop: theme.spacing.unit,
    },
});

function QuestionsForm(props) {
    const {quizID, quiz, submissionID, submission, handleSubmit, values, errors, isValid, isSubmitting, classes} = props;
    const isAdmin = API.Users.hasRole(ROLES.ROLE_ADMIN);

    if (!isLoaded(quiz) || (submissionID && !isLoaded(submission))) {
        return <CircularProgress/>;
    }

    const deadlinePassed = quiz.deadline ? moment(quiz.deadline).isBefore(moment()) : false;

    // get prev and next submission
    let prevSubmissionID = "";
    let nextSubmissionID = "";

    if (isAdmin) {
        const submissionIDs = Object.keys(quiz.submissions);
        submissionIDs.map((k, i) => {
            if (k == submissionID) {
                prevSubmissionID = i === 0 ? "" : submissionIDs[i - 1];
                nextSubmissionID = i === submissionIDs.length - 1 ? "" : submissionIDs[i + 1];
            }
        });
    }

    // quizLinkPrefix
    const quizLinkPrefix = quiz.type == 'quiz' ? 'quizzes' : 'assignments';

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>

                {isAdmin && (
                    <Grid item xs="12">
                        <Grid container direction="row" justify="space-between">
                            <Grid item>
                                {prevSubmissionID && (
                                    <MuiLink component={Link} to={`/${quizLinkPrefix}/${quizID}/submissions/${prevSubmissionID}`}>
                                        <FontAwesomeIcon icon="hand-point-left" size="lg" fixedWidth/> Prev
                                    </MuiLink>
                                )}
                            </Grid>
                            <Grid item>
                                {nextSubmissionID && (
                                    <MuiLink component={Link} to={`/${quizLinkPrefix}/${quizID}/submissions/${nextSubmissionID}`}>
                                        Next <FontAwesomeIcon icon="hand-point-right" size="lg" fixedWidth/>
                                    </MuiLink>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                )}

                {deadlinePassed && (
                    <>
                        <Grid item xs={12}>
                            <Typography color="secondary">Deadline (<Moment>{quiz.deadline}</Moment>) has
                                passed.</Typography>
                        </Grid>
                    </>
                )}

                {quiz.questions && quiz.questions.map((question, i) => {
                    const QuestionTypeControl = question.type && question.type in QuestionTypes ? QuestionTypes[question.type].ViewControl : null;

                    return (
                        <Grid item xs={12} key={i}>
                            {QuestionTypeControl && <QuestionTypeControl index={i} question={question}
                                                                         deadlinePassed={deadlinePassed} {...props} />}
                        </Grid>
                    );
                })}

                {!submission && !deadlinePassed && (
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" type="submit"
                                disabled={!isValid || isSubmitting} className={classes.submit}>
                            Submit!
                        </Button>
                    </Grid>
                )}

            </Grid>

        </form>
    );
}

export default compose(
    firebaseConnect(({quizID, submissionID}) => {
        const queries = [{
            path: `quizzes/${quizID}`
        }];

        if (submissionID) {
            queries.push({
                path: `submissions/${submissionID}`
            });
        }

        return queries;
    }),

    withFirebase,

    withSnackbar,

    connect(
        (state, {quizID, submissionID}) => {
            return {
                uid: state.firebase.auth.uid,
                user: state.firebase.auth,
                quiz: getVal(state.firebase.data, `quizzes/${quizID}`),
                submission: submissionID ? getVal(state.firebase.data, `submissions/${submissionID}`) : null
            };
        }, {
            pushToHistory: push
        }
    ),

    withFormik({
        enableReinitialize: true,

        mapPropsToValues: props => {
            const {quiz, submissionID, submission} = props;
            const values = {
                answers: {}
            };

            if (isLoaded(quiz) && quiz.questions && (!submissionID || isLoaded(submission))) {
                quiz.questions.map(question => {
                    const type = question.type;

                    if (type in QuestionTypes) {
                        if (submission && submission.answers && question.id in submission.answers) {
                            values['answers'][question.id] = submission.answers[question.id];
                        } else {
                            values['answers'][question.id] = QuestionTypes[type].defaultValue;
                        }
                    }
                });
            }

            return values;
        },

        handleSubmit: (values, actions) => {
            const {
                setSubmitting,
                props: {
                    user: {
                        uid, displayName, photoURL
                    },
                    quizID,
                    quiz,
                    firebase: {
                        set, pushWithMeta
                    },
                    enqueueSnackbar,
                    pushToHistory,
                    type,
                }
            } = actions;

            if (!quiz.questions) {
                return;
            }

            let score = 0;
            quiz.questions.forEach(question => {
                const type = question.type;

                if (type in QuestionTypes) {
                    values['answers'][question.id] = QuestionTypes[type].sanitizeValue(values['answers'][question.id]);

                    if (QuestionTypes[type].isCorrect(question, values['answers'][question.id])) {
                        score++;
                    }
                }
            });

            pushWithMeta("submissions", {
                answers: values['answers'],
                score: score,
                user: {uid, displayName, photoURL},
                subject: {
                    id: quizID,
                    name: quiz.name,
                    type
                }
            }).then(ref => {
                Promise.all([
                    set(`users/${uid}/quizzes/${quizID}`, true),
                    set(`users/${uid}/submissions/${ref.key}`, true),
                    set(`quizzes/${quizID}/submissions/${ref.key}`, true)
                ]).then(() => {
                    setSubmitting(false);
                    enqueueSnackbar("Submitted!");
                    pushToHistory("/");
                });
            });
        }
    }),


    withStyles(styles),
)(QuestionsForm);