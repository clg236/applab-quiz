import React from 'react';
import Typography from '@material-ui/core/Typography';
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import {QuizDetail} from "../../components/Quizzes"

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    }
});

let CreateQuiz = ({classes}) => {

    return (
        <main className={classes.root}>
            <Typography variant="h4" gutterBottom component="h2">Create a quiz</Typography>

            <QuizDetail/>
        </main>
    );
};


export default compose(
    withStyles(styles)
)(CreateQuiz);