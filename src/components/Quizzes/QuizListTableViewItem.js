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
import API from "../../apis";
import * as ROLES from "../../constants/roles";
import {downloadSubmissions} from "../../apis/Quizzes";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    cell: {
        fontSize: '.6em'
    }
});

const QuizListTableViewItem = props => {
    const {classes, quizID, quiz, submission, quizURL, index, pushToHistory, showScoreColumn, showActionsColumn} = props;
    const isAdmin = API.Users.hasRole(ROLES.ROLE_ADMIN);

    function handleClicked(e) {
        if (quizURL) {
            pushToHistory(quizURL.replace(/:id/, quizID));
        }

        e.preventDefault();
    }

    function handleDownload() {
        downloadSubmissions(quiz);
    }

    return (
        <TableRow className={classes.cell}>
            <TableCell align="center">
                <Typography variant="body2">{index + 1}</Typography>
            </TableCell>
            <TableCell align="left">
            <Typography variant="body2"><MuiLink href='#' onClick={handleClicked}>{quiz.name}</MuiLink></Typography>
            </TableCell>
            <TableCell align="center">
            <Typography variant="body2">{quiz.deadline && <Moment format="MM/DD/YYYY HH:mm">{quiz.deadline}</Moment>}</Typography>
            </TableCell>
            {showScoreColumn && (
                <TableCell align="left">
                <Typography variant="body2">{submission ? submission.score : 0}/{quiz.questions ? _.size(quiz.questions) : 0}</Typography>
                </TableCell>
            )}
            <TableCell align="center">
            <Typography variant="body2">{submission && <MuiLink href="#" onClick={handleClicked}>Comments</MuiLink>}</Typography>
            </TableCell>
            {isAdmin && showActionsColumn && <TableCell align="center">
            <Typography variant="body2"><MuiLink href="#" onClick={handleDownload}>Download</MuiLink></Typography>
            </TableCell>}
        </TableRow>
    )
}

export default compose(
    connect(null, {
        pushToHistory: push
    }),
    withStyles(styles)
)(QuizListTableViewItem);