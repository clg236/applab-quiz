import React from 'react';
import {withStyles} from "@material-ui/core";
import {default as MuiLink} from "@material-ui/core/Link";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "../Form";
import {compose} from "redux";
import {push} from "connected-react-router";
import {connect} from "react-redux";
import Moment from "react-moment";
import _ from "lodash";

const styles = theme => ({});

const QuizListTableViewItem = props => {
    const {quizID, quiz, submission, quizURL, index, pushToHistory, showScoreColumn} = props;

    function handleClicked(e) {
        if (quizURL) {
            pushToHistory(quizURL.replace(/:id/, quizID));
        }

        e.preventDefault();
    }

    return (
        <TableRow>
            <TableCell align="left">
                {index + 1}
            </TableCell>
            <TableCell align="left">
                <MuiLink href='#' onClick={handleClicked}>{quiz.name}</MuiLink>
            </TableCell>
            <TableCell align="left">
                {quiz.deadline && <Moment format="MM/DD/YYYY HH:mm">{quiz.deadline}</Moment>}
            </TableCell>
            {showScoreColumn && (
                <TableCell align="left">
                    {submission ? submission.score : 0}/{quiz.questions ? _.size(quiz.questions) : 0}
                </TableCell>
            )}
            <TableCell align="left">
                {submission && <MuiLink href="#" onClick={handleClicked}>Comments</MuiLink>}
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