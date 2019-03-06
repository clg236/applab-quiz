import {Button, CircularProgress, Grid, withStyles} from "@material-ui/core";
import {FieldArray, withFormik} from "formik";
import React, {useState} from "react";
import {compose} from "redux";
import {firebaseConnect, getVal, isEmpty, isLoaded, withFirebase} from "react-redux-firebase";
import {withSnackbar} from "notistack";
import EditQuestionControl from './EditQuestionControl';
import uuid from "uuid";
import {connect} from "react-redux";
import QuestionTypes from "../QuestionTypes";

const EmptyQuestion = {
    id: '',
    title: '',
    type: '',
    options: [],
    answer: '',
    answers: []
};

const styles = theme => ({});


let QuestionsFieldArray = props => {
    const {form: {values: {questions}}, push, remove} = props;

    let {expanded} = useState([]);

    function handleAddQuestion() {
        push({...EmptyQuestion, id: uuid.v4()});
    }

    return (
        <>
            {questions.map((question, index) => (
                <EditQuestionControl key={index} question={question} questionIndex={index}
                                     expanded={expanded && expanded[index]} remove={remove}/>
            ))}

            <div>
                <Button color="primary" fullWidth={false} onClick={handleAddQuestion}>
                    Add a question
                </Button>
            </div>
        </>
    )
};


const EditQuestionsForm = (props) => {
    const {handleSubmit, quiz} = props;

    if (!isLoaded(quiz)) {
        return <CircularProgress/>;
    } else if (isEmpty(quiz)) {
        return "There is no such quiz.";
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
                <Grid item md={12}>
                    <FieldArray name="questions" component={QuestionsFieldArray}/>
                </Grid>

                <Grid item md={12}>
                    <Button color="primary" variant="contained" type="submit">Save</Button>
                </Grid>
            </Grid>
        </form>
    );
};


export default compose(
    firebaseConnect(({quizID}) => {
        return [
            {
                path: `quizzes/${quizID}`
            }
        ];
    }),

    withFirebase,

    withSnackbar,

    connect(
        (state, {quizID}) => {
            return {
                quiz: getVal(state.firebase.data, `quizzes/${quizID}`)
            }
        }
    ),

    withFormik({
        enableReinitialize: true,

        mapPropsToValues: props => {
            const {quiz} = props

            // TODO check if the question type exists
            let questions = [];

            if (isLoaded(quiz) && !isEmpty(quiz) && quiz.questions) {
                questions = quiz.questions;

                quiz.questions.forEach((question, i) => {
                    if (question.type && question.type in QuestionTypes && QuestionTypes[question.type].prepareForEditControl) {
                        questions[i] = QuestionTypes[question.type].prepareForEditControl(question);
                    }
                });
            }



            return {
                questions
            };
        },

        handleSubmit: (values, actions) => {
            const {props: {quizID, quiz, firebase: {updateWithMeta}, enqueueSnackbar}} = actions;

            if ("submissions" in quiz && Object.keys(quiz.submissions).length > 0) {
                return ;
            }

            // filter out null values
            if (values.questions && values.questions.length > 0) {
                values.questions.forEach(question => {
                    if (question.answers && question.answers.length > 0) {
                        question.answers.forEach((answer, index, arr) => arr[index] = !!answer);
                    }
                });
            }

            updateWithMeta(`quizzes/${quizID}`, values).then(() => enqueueSnackbar("Saved!"));
        }
    }),

    withStyles(styles)
)(EditQuestionsForm);