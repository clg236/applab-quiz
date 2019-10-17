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

const CreateQuiz = ({classes}) => {
    return (
        <main className={classes.root}>
            <Typography variant="h4" gutterBottom component="h2">Create a quiz</Typography>
            <QuizInfoForm type="quiz" redirectURL="/quizzes/:id/edit"/>
        </main>
    );
};


export default compose(
    UserIsAdmin,
    withStyles(styles)
)(CreateQuiz);