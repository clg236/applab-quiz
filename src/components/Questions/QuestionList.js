import React from 'react';
import QuestionListItem from './QuestionListItem';
import {withFormik} from 'formik';
import {compose} from "redux";
import * as ROUTES from "../../constants/routes";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {firebaseConnect, withFirebase} from "react-redux-firebase";
import {connect} from "react-redux";
import {push} from "connected-react-router";


function QuestionList({user, quizID, quiz, submission, handleSubmit, values, errors, isValid, isSubmitting}) {

    return (
        <form onSubmit={handleSubmit}>
            <Grid container>
                {quiz.questions.map((question, i) => (
                    <Grid item xs={12} key={i}>
                        <QuestionListItem user={user} quizID={quizID} quiz={quiz} question={question}/>
                    </Grid>
                ))}

                <Grid item xs={12}>
                    {!submission && (
                        <Button color={"primary"} variant={"contained"} type={"submit"}
                                disabled={!isValid || isSubmitting}>
                            Submit
                        </Button>
                    )}
                </Grid>

                {JSON.stringify(values, null, 2)}
            </Grid>

        </form>
    );
}


function calculateCorrectAnswers(quiz, answers) {
    let correct_answers = 0;
    let correct = '';

    quiz.questions.forEach((question) => {
        let provided = question.title in answers ? answers[question.title].trim() : null;

        if (provided == null) {
            return ;
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

    connect(null, {
        pushToHistory: push
    }),

    withFormik({
        mapPropsToValues: () => ({}),

        handleSubmit: (values, actions) => {
            const {setSubmitting, props: {quizID, user, quiz, firebase: {setWithMeta}, pushToHistory}} = actions;

            const data = {
                name: quiz.name,
                answers: values,
                correct_answers: calculateCorrectAnswers(quiz, values),
                total_questions: quiz.questions.length,
            };

            Promise.all(
                setWithMeta(`users/${user.uid}/quizzes/${quizID}`, data)
            ).then(() => {
                setSubmitting(false);
                pushToHistory(ROUTES.QUIZZES);
            });
        }
    }),
)(QuestionList);