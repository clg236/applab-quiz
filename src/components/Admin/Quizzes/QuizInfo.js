import React from 'react';
import {compose} from 'redux';
import {Grid, TextField, withStyles} from "@material-ui/core";
import {Field, withFormik} from "formik";
import Button from "@material-ui/core/Button";
import {withFirebase} from "react-redux-firebase";
import {withSnackbar} from 'notistack';

const styles = theme => ({});


const QuizInfo = (props) => {
    const {classes, quiz, handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
                <Grid item md={12}>
                    <Field
                        name="name"
                        render={({field}) => (
                            <TextField label="Name" required fullWidth={true} {...field} />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" variant="contained" type="submit">
                        {quiz && quiz.id ? "Save" : "Submit"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default compose(
    withFirebase,

    withSnackbar,

    withFormik({
        mapPropsToValues: ({quiz}) => {
            return {
                name: quiz && quiz.id ? quiz.name : ""
            };
        },

        handleSubmit: (values, actions) => {
            const {props: {quiz, firebase: {pushWithMeta, updateWithMeta}, enqueueSnackbar}} = actions;
            let promise = null;

            if (quiz && quiz.id) {
                promise = updateWithMeta(`quizzes/${quiz.id}`, values);
            } else {
                promise = pushWithMeta("quizzes", values);
            }

            promise.then(() => enqueueSnackbar("Saved!"));
        }
    }),

    withStyles(styles)
)(QuizInfo);