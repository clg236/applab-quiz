import React from 'react';
import {withFormik} from 'formik';
import {compose} from "redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {firebaseConnect, getVal, isLoaded, populate, withFirebase} from "react-redux-firebase";
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
import {isPopulated} from "../../helpers";
import _ from "lodash";

//material ui for new homepage prototype
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {makeStyles} from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/EditOutlined'
import StartIcon from '@material-ui/icons/Check';
import CommentsIcon from '@material-ui/icons/CommentOutlined';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
    button: {
        margin: theme.spacing(1),
    },

    submit: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(2)
    },
});

function QuestionsForm(props) {
    const {quizID, quiz, submissionID, submission, handleSubmit, values, errors, isValid, isSubmitting, classes, enqueueSnackbar} = props;
    const isAdmin = API.Users.hasRole(ROLES.ROLE_ADMIN);

    if (!isLoaded(quiz) || (submissionID && !isLoaded(submission))) {
        return (<div>
            <CircularProgress/>
        </div>);
    }

    const deadlinePassed = quiz.deadline ? moment(quiz.deadline).isBefore(moment()) : false;
    const allowSubmission = !submission || !deadlinePassed;

    // get prev and next submission
    let prevSubmissionID = "";
    let nextSubmissionID = "";

    if (isAdmin && quiz.submissions) {
        const submissionIDs = Object.keys(quiz.submissions);
        submissionIDs.map((k, i) => {
            if (k == submissionID) {
                prevSubmissionID = i === 0 ? "" : submissionIDs[i - 1];
                nextSubmissionID = i === submissionIDs.length - 1 ? "" : submissionIDs[i + 1];
            }
        });
    }

    // quizLinkPrefix
    const quizLinkPrefix = quiz.type === 'quiz' ? 'quizzes' : 'assignments';

    function markAsCorrect(questionID, question) {
        API.Quizzes.gradeQuestion(quizID, quiz, submissionID, submission, questionID, question, true).then(_ => enqueueSnackbar("Submitted!"));
    }

    function markAsWrong(questionID, question) {
        API.Quizzes.gradeQuestion(quizID, quiz, submissionID, submission, questionID, question, false).then(_ => enqueueSnackbar("Submitted!"));
    }


    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                {isAdmin && (
                    <Grid item xs={12}>
                        <Grid container direction="row" justify="space-between">
                            <Grid item>
                                {prevSubmissionID && (
                                    <MuiLink component={Link}
                                             to={`/${quizLinkPrefix}/${quizID}/submissions/${prevSubmissionID}`}>
                                        <FontAwesomeIcon icon="hand-point-left" size="lg" fixedWidth/> Prev
                                    </MuiLink>
                                )}
                            </Grid>
                            <Grid item>
                                {nextSubmissionID && (
                                    <MuiLink component={Link}
                                             to={`/${quizLinkPrefix}/${quizID}/submissions/${nextSubmissionID}`}>
                                        Next <FontAwesomeIcon icon="hand-point-right" size="lg" fixedWidth/>
                                    </MuiLink>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                )}


                {quiz.questions && isPopulated(quiz.questions) && _.map(quiz.questions, (question, k) => {
                    const QuestionTypeControl = question.type && question.type in QuestionTypes ? QuestionTypes[question.type].ViewControl : null;
                    const questionID = question.id ? question.id : k;

                    return (
                        <React.Fragment key={k}>
                            {deadlinePassed && (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" color="primary">Deadline
                                            (<Moment>{quiz.deadline}</Moment>) has
                                            passed.</Typography>
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12}>

                                {QuestionTypeControl &&
                                <QuestionTypeControl index={k} questionID={questionID} question={question}
                                                     deadlinePassed={deadlinePassed} {...props} />}

                            </Grid>

                            {isAdmin && submission && (
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" className={classes.button}
                                            onClick={_ => markAsCorrect(questionID, question)}>
                                        Mark as Correct
                                    </Button>
                                    <Button variant="contained" color="secondary" className={classes.button}
                                            onClick={_ => markAsWrong(questionID, question)}>
                                        Mark as Wrong
                                    </Button>
                                </Grid>

                            )}

                        </React.Fragment>
                    );
                })}

                {allowSubmission && (
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" type="submit"
                                disabled={!isValid || isSubmitting} className={classes.submit}>
                            Submit!
                        </Button>
                        {isAdmin && submission && (
                            <Button color="primary" variant="contained" disabled={isSubmitting}
                                    className={classes.submit} onClick={e => {
                                API.Submissions.removeSubmission({...submission, id: submissionID});
                            }}>
                                Remove submission
                            </Button>
                        )}
                    </Grid>
                )}

            </Grid>

        </form>
    );
}

export default compose(
    firebaseConnect(({quizID, submissionID}) => {
        const queries = [{
            path: `quizzes/${quizID}`,
            populates: ["questions:questions"]
        }];

        if (submissionID) {
            queries.push({
                path: `submissions/${submissionID}`,
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
                quiz: populate(state.firebase, `quizzes/${quizID}`, [
                    "questions:questions"
                ]),
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

            if (isLoaded(quiz) && quiz.questions && isPopulated(quiz.questions) && (!submissionID || isLoaded(submission))) {
                _.map(quiz.questions, (question, i) => {
                    const type = question.type;
                    const questionID = question.id ? question.id : i;

                    if (type in QuestionTypes) {
                        if (submission && submission.answers && questionID in submission.answers) {
                            values['answers'][questionID] = submission.answers[questionID];
                        } else {
                            values['answers'][questionID] = QuestionTypes[type].defaultValue;
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
            _.forEach(quiz.questions, (question, i) => {
                const type = question.type;
                const questionID = question.id ? question.id : i;

                if (type in QuestionTypes) {
                    values['answers'][questionID] = QuestionTypes[type].sanitizeValue(values['answers'][questionID]);

                    if (QuestionTypes[type].isCorrect(question, values['answers'][questionID])) {
                        score++;
                    }
                }
            });

            let calculatedScore = score;
            if (quiz.deadline) {
                const diffInDays = moment().add(1, "days").diff(moment(quiz.deadline), 'days');
                if (diffInDays > 0) {
                    calculatedScore = Math.max(0, calculatedScore * (1 - 0.1 * diffInDays).toFixed(2));
                }
            }

            pushWithMeta("submissions", {
                answers: values['answers'],
                score: score,
                calculatedScore: calculatedScore,
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