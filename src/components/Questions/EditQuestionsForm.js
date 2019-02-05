import {Button, CircularProgress, Grid, withStyles} from "@material-ui/core";
import {FieldArray, withFormik} from "formik";
import React, {useState} from "react";
import {compose} from "redux";
import {firebaseConnect, getVal, isEmpty, isLoaded, withFirebase} from "react-redux-firebase";
import {withSnackbar} from "notistack";
import EditQuestionControl from './EditQuestionControl';
import uuid from "uuid";
import {connect} from "react-redux";

const EmptyQuestion = {title: ''};

const styles = theme => ({});


let QuestionsFieldArray = props => {
    const {form: {values: {questions}}, push, remove} = props;

    let {expanded} = useState([]);

    function handleAddQuestion() {
        push({id: uuid.v4(), ...EmptyQuestion});
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

            {JSON.stringify(props.form.values, null, 2)}
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
    withFirebase,

    withSnackbar,

    connect(
        (state, {quizID}) => ({
            quiz: getVal(state.firebase.data, `quizzes/${quizID}`)
        })
    ),

    firebaseConnect(({quizID}) => ([
        {
            path: `quizzes/${quizID}`
        }
    ])),

    withFormik({
        enableReinitialize: true,

        mapPropsToValues: ({quiz}) => {
            // TODO check if the question type exists
            let questions = [];

            if (isLoaded(quiz) && !isEmpty(quiz) && quiz.questions) {
                questions = quiz.questions;
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

            updateWithMeta(`quizzes/${quizID}`, values).then(() => enqueueSnackbar("Saved!"));
        }
    }),

    withStyles(styles)
)(EditQuestionsForm);