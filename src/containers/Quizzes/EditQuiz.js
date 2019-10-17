import React from 'react';
import Typography from '@material-ui/core/Typography';
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import {EditQuiz} from "../../components/Quizzes"
import {UserIsAdmin} from "../../components/Auth";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100vh',
        overflow: 'auto',
    }
});

const EditQuizPage = props => {
    const {classes, match: {params: {id}}} = props;

    const redirectURL = "/quizzes/:id/edit";

    return (
        <main className={classes.root}>
            <Typography variant="h4" gutterBottom component="h2">Edit Quiz</Typography>

            <EditQuiz quizID={id} type="quiz" redirectURL={redirectURL}/>
        </main>
    );
};


export default compose(
    UserIsAdmin,

    withStyles(styles)
)(EditQuizPage);