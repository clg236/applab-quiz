import React from 'react';
import {withFormik} from "formik";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {compose} from "redux";
import {withFirebase} from "react-redux-firebase";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import * as ROUTES from "../../../constants/routes";

let Form = ({handleSubmit, values, errors, isSubmitting, isValid}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={24}>


                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" type="submit"
                                disabled={isSubmitting || !isValid}>Submit</Button>
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
            title: "",
            description: "",
            type: ""
        }),

        handleSubmit: (values, actions) => {
            const {props: {firebase: {pushWithMeta}, pushToHistory}} = actions;

            pushWithMeta("quizzes", values).then(() => {
                pushToHistory(ROUTES.ADMIN_QUIZZES);
            });
        }
    }),
)(Form);