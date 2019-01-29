import React from 'react';
import {Field, withFormik} from "formik";
import {Grid, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Questions from './Form/Questions';
import {compose} from "redux";
import {withFirebase} from "react-redux-firebase";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import * as ROUTES from "../../../constants/routes";


let QuizForm = ({handleSubmit, values, errors}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <fieldset>
                            <legend>Basic Information</legend>
                            <Field
                                name="name"
                                render={({field}) => (
                                    <TextField label="Name" required fullWidth={true} {...field} />
                                )}
                            />
                        </fieldset>
                    </Grid>

                    <Questions/>

                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" type="submit">Submit</Button>
                    </Grid>


                </Grid>
            </form>

            {JSON.stringify(values, null, 2)}
            {JSON.stringify(errors, null, 2)}
        </div>
    );
}

export default compose(
    withFirebase,

    connect(null, {
        pushToHistory: push
    }),

    withFormik({
        mapPropsToValues: () => ({
            name: "",
            questions: []
        }),

        handleSubmit: (values, actions) => {
            const {props: {firebase: {pushWithMeta}, pushToHistory}} = actions;

            pushWithMeta("quizzes", values).then(() => {
                pushToHistory(ROUTES.ADMIN_QUIZZES);
            });
        }
    }),
)(QuizForm);