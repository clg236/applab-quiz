import {Button, Grid, withStyles} from "@material-ui/core";
import {FieldArray, withFormik} from "formik";
import React, {useState} from "react";
import {compose} from "redux";
import {withFirebase} from "react-redux-firebase";
import {withSnackbar} from "notistack";
import EditQuestionControl from './EditQuestionControl';

const EmptyQuestion = {title: ''};

const styles = theme => ({});


let QuestionsFieldArray = ({form: {values: {questions}}, push, remove}) => {
    let {expanded} = useState([]);

    function handleAddQuestion() {
        push({...EmptyQuestion});
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
    const {handleSubmit} = props;

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

    withFormik({
        enableReinitialize: true,

        mapPropsToValues: ({quiz}) => {
            // TODO check if the question type exists
            return {
                questions: quiz.questions ? quiz.questions : []
            };
        },

        handleSubmit: (values, actions) => {
            const {props: {quiz, firebase: {updateWithMeta}, enqueueSnackbar}} = actions;

            if ("submissions" in quiz && Object.keys(quiz.submissions).length > 0) {
                return ;
            }

            updateWithMeta(`quizzes/${quiz.id}`, values).then(() => enqueueSnackbar("Saved!"));
        }
    }),

    withStyles(styles)
)(EditQuestionsForm);