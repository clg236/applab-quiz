import React from 'react';
import {withFormik} from 'formik';
import {compose} from "redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {firebaseConnect, getVal, withFirebase} from "react-redux-firebase";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import * as Types from '../QuestionTypes';
import {withSnackbar} from "notistack";


const styles = theme => ({
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function QuestionsForm(props) {
    const {quiz, response, handleSubmit, values, errors, isValid, isSubmitting, classes} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
                {quiz.questions.map((question, i) => (
                    <Grid item xs={12} key={i}>
                        {question.type == 'text' && <Types.Text index={i} question={question} {...props} />}
                        {question.type == 'single' && <Types.Single index={i} question={question} {...props} />}
                        {question.type == 'multiple' && <Types.Multiple index={i} question={question} {...props} />}
                        {question.type == 'code' && <Types.Code index={i} question={question} {...props} />}
                    </Grid>
                ))}

                {!response && (
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
        (state, {responseId}) => {
            return ({
                user: state.firebase.auth,
                response: responseId ? getVal(state.firebase.data, `responses/${responseId}`) : null
            });
        }
    ),

    firebaseConnect(({responseId}) => {

        if (!responseId) {
            return [];
        }

        return [
            {
                path: `responses/${responseId}`
            }
        ];
    }),


    withFormik({
        enableReinitialize: true,

        mapPropsToValues: (props) => {
            const {response} = props;

            if (response) {
                return response.answers;
            }

            return {};
        },

        // Custom sync validation
        validate: (values, {quiz: {questions}}) => {
            const errors = {};

            questions.forEach(question => {
                if (!(question.title in values)) {
                    errors[question.title] = 'Required';
                } else {
                    // if it's a multiple type question, there should be at least one answer provided.
                    if (question.type == 'multiple' && values[question.title].filter(Boolean).length === 0) {
                        errors[question.title] = 'Required';
                    }
                }
            });

            return errors;
        },


        handleSubmit: (values, actions) => {
            const {setSubmitting, props: {user: {uid, displayName, photoURL}, quiz, firebase: {set, pushWithMeta}, enqueueSnackbar}} = actions;
            const score = calculateCorrectAnswers(quiz, values);

            pushWithMeta("responses", {
                answers: values,
                score: score,
                user: {uid, displayName, photoURL}
            }).then(ref => {
                Promise.all([
                    set(`users/${uid}/responses/${quiz.id}/${ref.key}`, true),
                    pushWithMeta(`quizzes/${quiz.id}/responses`, {
                        id: ref.key,
                        score: score,
                        user: {uid, displayName, photoURL}
                    })
                ]).then(() => {
                    setSubmitting(false);
                    enqueueSnackbar("Saved!");
                });
            });
        }
    }),


    withStyles(styles),
)(QuestionsForm);