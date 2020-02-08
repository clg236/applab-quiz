import React from "react";
import {compose} from "redux";
import QuizListGridViewItem from "./QuizListGridViewItem";
import Grid from "@material-ui/core/Grid";

const QuizListGridView = props => {
    const {user, quizzes, quizURL} = props;

    function hasSubmission(quizID) {
        if (!user || !user.submissions || Object.keys(user.submissions).length === 0) {
            return false;
        }

        return Object.values(user.submissions)
            .filter(submission => submission.subject && submission.subject.id === quizID)
            .length > 0;
    }

    return (
        <Grid container spacing={3} alignItems="stretch">
            {quizzes && Object.keys(quizzes).map((key, i) => (
                <QuizListGridViewItem
                    key={key}
                    quizID={key}
                    quiz={quizzes[key]}
                    index={i}
                    hasSubmission={hasSubmission(key)}
                    quizURL={quizURL}
                />
            ))}
        </Grid>
    );
};

export default compose(
)(QuizListGridView);