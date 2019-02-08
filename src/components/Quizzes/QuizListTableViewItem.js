import React from 'react';
import {withStyles} from "@material-ui/core";
import {default as MuiLink} from "@material-ui/core/Link";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "../Form";

const styles = theme => ({});

const QuizListTableViewItem = props => {
    const {classes, quizID, quiz, submissions, onQuizSelected} = props;

    function handleClicked() {
        onQuizSelected && onQuizSelected(quizID);
    }

    return (
        <TableRow>
            <TableCell align="left">
                1
            </TableCell>
            <TableCell align="left">
                <MuiLink href={'javascript:;'} onClick={handleClicked}>{quiz.name}</MuiLink>
            </TableCell>
            <TableCell align="left">
                2/17/2019
            </TableCell>
            <TableCell align="left">
                10/10
            </TableCell>
            <TableCell align="left">
                [link to comments]
            </TableCell>
        </TableRow>
    )
}

export default withStyles(styles)(QuizListTableViewItem);