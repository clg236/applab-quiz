import {Button, CircularProgress, Grid, withStyles} from "@material-ui/core";
import {FieldArray, withFormik} from "formik";
import React, {useState} from "react";
import {compose} from "redux";
import {firebaseConnect, isEmpty, isLoaded, populate, withFirebase} from "react-redux-firebase";
import {withSnackbar} from "notistack";
import EditQuestionControl from './EditQuestionControl';
import {connect} from "react-redux";
import QuestionTypes from "../QuestionTypes";
import {isPopulated} from "../../helpers";

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
        push({...EmptyQuestion});
    }

    return (
        <>
            {questions && questions.map((question, i) => (
                <EditQuestionControl key={i} question={question} questionIndex={i}
                                     expanded={expanded && expanded[i]} remove={remove}/>
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
    } else if (!isPopulated(quiz.questions)) {
        return <CircularProgress/>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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
                path: `quizzes/${quizID}`,
                populates: [
                    "questions:questions",
                ]
            }
        ];
    }),

    withFirebase,

    withSnackbar,

    connect(
        (state, {quizID}) => {
            return {
                quiz: populate(state.firebase, `quizzes/${quizID}`, [
                    "questions:questions",
                ])
            }
        }
    ),

    withFormik({
        enableReinitialize: true,

        mapPropsToValues: props => {
            const {quiz} = props;

            // TODO check if the question type exists
            let questions = [];

            if (isLoaded(quiz) && !isEmpty(quiz) && quiz.questions && isPopulated(quiz.questions)) {
                Object.keys(quiz.questions).forEach((k, i) => {
                    const question = quiz.questions[k];

                    if (question.type && question.type in QuestionTypes) {
                        if (QuestionTypes[question.type].prepareForEditControl) {
                            questions[i] = QuestionTypes[question.type].prepareForEditControl(question);
                        } else {
                            questions[i] = question;
                        }
                    } else {
                        questions[i] = {...EmptyQuestion};
                    }

                    questions[i].id = question.id ? question.id : k;
                });
            }

            return {
                questions
            };
        },

        handleSubmit: (values, actions) => {
            const {props: {quizID, firebase: {set, updateWithMeta, pushWithMeta}, enqueueSnackbar}} = actions;

            // filter out null values
            if (values.questions && values.questions.length > 0) {
                values.questions.forEach(question => {
                    if (question.answers && question.answers.length > 0) {
                        question.answers.forEach((answer, index, arr) => arr[index] = !!answer);
                    }
                });
            }


            const updates = [];
            values.questions.forEach(question => {
                if (question.id) {
                    updates.push(updateWithMeta(`questions/${question.id}`, question));
                } else {
                    updates.push(pushWithMeta("questions", question));
                }
            });

            Promise.all(updates)
                .then(references => {
                    const updates = {};

                    references.forEach((ref, i) => {
                        // ref is available if we use pushWithMeta
                        if (ref && ref.key) {
                            updates[ref.key] = true;
                        } else {
                            // trying to get the id from values
                            if (i < values.questions.length && values.questions[i].id) {
                                updates[values.questions[i].id] = true;
                            }
                        }
                    });

                    set(`quizzes/${quizID}/questions`, updates).then(_ => enqueueSnackbar("Saved!"));
                });
        }
    }),

    withStyles(styles)
)(EditQuestionsForm);