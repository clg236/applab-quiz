import React from "react";
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import QuizListGridViewItem from "./QuizListGridViewItem";
import Grid from "@material-ui/core/Grid";


const styles = theme => ({

});

const QuizListGridView = props => {
    const {classes, quizzes, submissions, quizURL} = props;

    function hasSubmission(quizID) {
        if (!submissions) {
            return false;
        }

        return Object.values(submissions)
            .filter(submission => submission.quiz && submission.quiz.id == quizID)
            .length > 0;
    }

    return (
        <Grid container spacing={24}>
            {quizzes && Object.keys(quizzes).map(key => (
                <QuizListGridViewItem
                    key={key}
                    quizID={key}
                    quiz={quizzes[key]}
                    hasSubmission={hasSubmission(key)}
                    quizURL={quizURL}
                />
            ))}
        </Grid>
    );
};

export default compose(
    withStyles(styles)
)(QuizListGridView);