import React from 'react';
import {withFormik} from 'formik';
import {compose} from "redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {firebaseConnect, getVal, withFirebase} from "react-redux-firebase";
import {connect} from "react-redux";
import {Typography, withStyles} from "@material-ui/core";
import QuestionTypes from '../QuestionTypes';
import {withSnackbar} from "notistack";


const styles = theme => ({
    submit: {
        marginTop: theme.spacing.unit,
    },
});

function QuestionsForm(props) {
    const {quiz, submission, handleSubmit, values, errors, isValid, isSubmitting, classes} = props;

    const deadlinePassed = false;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>

                {deadlinePassed && <Typography>Deadline passed.</Typography>}

                {quiz.questions.map((question, i) => {
                    const QuestionTypeControl = question.type && question.type in QuestionTypes ? QuestionTypes[question.type].ViewControl : null;

                    return (
                        <Grid item xs={12} key={i}>
                            {QuestionTypeControl && <QuestionTypeControl index={i} question={question} {...props} />}
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

                {JSON.stringify(values, null, 2)}
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
        (state, {submissionID}) => {
            return ({
                user: state.firebase.auth,
                submission: submissionID ? getVal(state.firebase.data, `quizSubmissions/${submissionID}`) : null
            });
        }
    ),

    firebaseConnect(({submissionID}) => {

        if (!submissionID) {
            return [];
        }

        return [
            {
                path: `quizSubmissions/${submissionID}`
            }
        ];
    }),


    withFormik({
        enableReinitialize: true,

        mapPropsToValues: (props) => {
            const {quiz, submission} = props;
            const values = {};

            quiz.questions.map(question => {
                const type = question.type;

                if (type in QuestionTypes) {
                    if (submission && submission.answers && question.title in submission.answers) {
                        values[question.title] = submission.answers[question.title];
                    } else {
                        values[question.title] = QuestionTypes[type].defaultValue;
                    }
                }
            });

            return values;
        },

        handleSubmit: (values, actions) => {
            const {setSubmitting, props: {user: {uid, displayName, photoURL}, quiz, firebase: {set, updateWithMeta, pushWithMeta}, enqueueSnackbar}} = actions;

            let score = 0;
            quiz.questions.forEach(question => {
                const type = question.type;

                if (type in QuestionTypes) {
                    if (QuestionTypes[type].isCorrect(question, values[question.title])) {
                        score++;
                    }
                }
            });

            pushWithMeta("quizSubmissions", {
                answers: values,
                score: score,
                user: {uid, displayName, photoURL},
                quiz: {
                    id: quiz.id,
                    name: quiz.name
                }
            }).then(ref => {
                Promise.all([
                    updateWithMeta(`userQuizzes/${uid}/${quiz.id}`, {
                        lastSubmissionScore: score,
                        lastSubmissionID: ref.key
                    }),
                    set(`userQuizzes/${uid}/${quiz.id}/submissions/${ref.key}`, true),
                    set(`quizzes/${quiz.id}/submissions/${ref.key}`, true)
                ]).then(() => {
                    setSubmitting(false);
                    enqueueSnackbar("Saved!");
                });
            });
        }
    }),


    withStyles(styles),
)(QuestionsForm);