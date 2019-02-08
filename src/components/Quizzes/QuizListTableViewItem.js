import React from 'react';
import {withStyles} from "@material-ui/core";
import {default as MuiLink} from "@material-ui/core/Link";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "../Form";
import {compose} from "redux";
import {push} from "connected-react-router";
import {connect} from "react-redux";

const styles = theme => ({});

const QuizListTableViewItem = props => {
    const {classes, quizID, quiz, quizURL, pushToHistory} = props;

    function handleClicked() {
        if (quizURL) {
            pushToHistory(quizURL.replace(/:id/, quizID));
        }
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

export default compose(
    connect(null, {
       pushToHistory: push
    }),
    withStyles(styles)
)(QuizListTableViewItem);