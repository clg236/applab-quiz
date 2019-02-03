import React from 'react';
import {default as MuiLink} from "@material-ui/core/Link";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

function QuizListItem(props) {

    const {user, quiz, submissions, onQuizSelected, hideStats} = props;

    let text = quiz.name;
    let submission = null;

    const numQuestions = quiz.questions ? quiz.questions.length : 0;
    const numSubmissions = quiz.submissions ? Object.keys(quiz.submissions).length : 0;

    if (user) {
        if (submissions && quiz.id in submissions) {
            submission = submissions[quiz.id];
            text += ` (${submission.lastSubmissionScore}/${numQuestions})`;
        }
    } else {
        if (!hideStats) {
            text += ` (${numQuestions} questions, ${numSubmissions} submissions)`;
        }
    }

    function handleQuizClicked() {
        onQuizSelected && onQuizSelected(quiz, submission ? submission.lastSubmissionID : 0);
    }

    return (
        <TableRow>
            <TableCell>
                <Typography variant="body1">
                    <MuiLink href={'javascript:;'} onClick={handleQuizClicked}>{text}</MuiLink>
                </Typography>
            </TableCell>
        </TableRow>
    );

}

export default QuizListItem;