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


const styles = theme => ({
    submit: {
        marginTop: theme.spacing.unit,
    },
});

function QuestionsForm(props) {
    const {quiz, submissionID, submission, handleSubmit, values, errors, isValid, isSubmitting, classes} = props;

    if (!isLoaded(quiz) || (submissionID && !isLoaded(submission))) {
        return <CircularProgress/>;
    }

    const deadlinePassed = quiz.deadline ? moment(quiz.deadline).isBefore(moment()) : false;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>

                {deadlinePassed && (
                    <>
                        <Grid item xs={12}>
                            <Typography color="secondary">Deadline (<Moment>{quiz.deadline}</Moment>) has passed.</Typography>
                        </Grid>
                    </>
                )}

                {quiz.questions && quiz.questions.map((question, i) => {
                    const QuestionTypeControl = question.type && question.type in QuestionTypes ? QuestionTypes[question.type].ViewControl : null;

                    return (
                        <Grid item xs={12} key={i}>
                            {QuestionTypeControl && <QuestionTypeControl index={i} question={question} deadlinePassed={deadlinePassed} {...props} />}
                        </Grid>
                    );
                })}

                {!submission && !deadlinePassed && (
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" type="submit"
                                disabled={!isValid || isSubmitting} className={classes.submit}>
                            Submit
                        </Button>
                    </Grid>
                )}

            </Grid>

        </form>
    );
}


function calculateCorrectAnswers(quiz, answers) {
    let correct_answers = 0;
    let correct = '';

    return quiz.questions.length;

    quiz.questions.forEach((question) => {
        let provided = question.title in answers ? answers[question.title].trim() : null;

        if (provided == null) {
            return;
        }

        switch (question.type) {
            case 'text':
                // get the configured correct answers
                correct = question.answer || '';

                if (!correct || correct === provided) {
                    correct_answers++;
                }
                break;

            case 'single':
                // get the configured correct answers
                correct = question.options.filter(option => !!option.answer);

                // only the first one
                if (correct.length === 0 || correct[0].option == provided) {
                    correct_answers++;
                }

                break;

            case 'multiple':

                provided = provided.reduce((out, bool, index) => bool ? out.concat(index) : out, []);

                // get the configured correct answers
                correct = question.options.reduce((out, option, index) => !!option.answer ? out.concat(index) : out, []);

                // all the answers should match
                if (correct.length == provided.length
                    && correct.every(i => provided.includes(i))
                    && provided.every(i => correct.includes(i))) {

                    correct_answers++;
                }
                break;

            case 'code':
                correct_answers++;
                break;
        }

    });

    return correct_answers;
}

export default compose(
    withFirebase,

    withSnackbar,

    connect(
        (state, {quizID, submissionID}) => {
            return {
                uid: state.firebase.auth.uid,
                user: state.firebase.auth,
                quiz: getVal(state.firebase.data, `quizzes/${quizID}`),
                submission: submissionID ? getVal(state.firebase.data, `quizSubmissions/${submissionID}`) : null
            };
        }, {
            pushToHistory: push
        }
    ),

    firebaseConnect(({quizID, submissionID}) => {
        const queries = [{
            path: `quizzes/${quizID}`
        }];

        if (submissionID) {
            queries.push({
                path: `quizSubmissions/${submissionID}`
            })
        }

        return queries;
    }),


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
                        set, updateWithMeta, pushWithMeta
                    },
                    enqueueSnackbar,
                    pushToHistory
                }
            } = actions;

            if (!quiz.questions) {
                return ;
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


            pushWithMeta("quizSubmissions", {
                answers: values['answers'],
                score: score,
                user: {uid, displayName, photoURL},
                quiz: {
                    id: quizID,
                    name: quiz.name
                }
            }).then(ref => {
                Promise.all([
                    updateWithMeta(`userQuizzes/${uid}/${quizID}`, {
                        lastSubmissionScore: score,
                        lastSubmissionID: ref.key
                    }),
                    set(`userQuizzes/${uid}/${quizID}/submissions/${ref.key}`, true),
                    set(`quizzes/${quizID}/submissions/${ref.key}`, true)
                ]).then(() => {
                    setSubmitting(false);
                    enqueueSnackbar("Submitted!");
                    pushToHistory(`/quizzes/${quizID}/submissions/${ref.key}`);
                });
            });
        }
    }),


    withStyles(styles),
)(QuestionsForm);