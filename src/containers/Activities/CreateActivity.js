import React from 'react';
import Typography from '@material-ui/core/Typography';
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import {QuizInfoForm} from "../../components/Quizzes"
import {UserIsAdmin} from "../../components/Auth";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100vh',
        overflow: 'auto',
    }
});

const CreateActivity = ({classes}) => {
    return (
        <main className={classes.root}>

            <QuizInfoForm type="activity" redirectURL="/activities/:id/edit"/>
        </main>
    );
};


export default compose(
    UserIsAdmin,

    withStyles(styles)
)(CreateActivity);