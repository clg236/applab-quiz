import React from 'react';
import {default as MuiLink} from "@material-ui/core/Link";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Typography, withStyles} from "@material-ui/core";


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary,
        color: theme.palette.secondary,
    },
    body: {
        fontSize: 11,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 800,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

function QuizListItem(props) {

    const {user, quizID, quiz, submissions, onQuizSelected, hideStats, isAssignment} = props;

    let text = quiz.name;
    let submission = null;

    const numQuestions = quiz.questions ? quiz.questions.length : 0;
    const numSubmissions = quiz.submissions ? Object.keys(quiz.submissions).length : 0;

    if (user) {
        if (submissions && quizID in submissions) {
            submission = submissions[quizID];
            text += ` (${submission.lastSubmissionScore}/${numQuestions})`;
        }
    } else {
        if (!hideStats) {
            text += ` (${numQuestions} questions, ${numSubmissions} submissions)`;
        }
    }

    function handleQuizClicked() {
        onQuizSelected && onQuizSelected(quizID, submission ? submission.lastSubmissionID : "");
    }

    return (
        <TableRow>
            <CustomTableCell align="left">
                1
            </CustomTableCell>
            <CustomTableCell align="left">
                <MuiLink href={'javascript:;'} onClick={handleQuizClicked}>{quiz.name}</MuiLink>
            </CustomTableCell>
            <CustomTableCell align="left">
                2/17/2019
            </CustomTableCell>
            <CustomTableCell align="left">
                10/10
            </CustomTableCell>
            <CustomTableCell align="left">
                [link to comments]
            </CustomTableCell>
        </TableRow>
    );

}

export default QuizListItem;