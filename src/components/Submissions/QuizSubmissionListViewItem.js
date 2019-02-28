import {default as MuiLink} from "@material-ui/core/Link";
import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import Moment from "react-moment";
import TableCell from "../Form/TableCell";
import API from "../../apis";
import * as ROLES from "../../constants/roles";
import {withSnackbar} from "notistack";

const QuizSubmissionListViewItem = props => {

    const {quiz, submissionID, submission, enqueueSnackbar} = props;

    const uid = API.Users.getCurrentUserID();
    const isAdmin = API.Users.hasRole(ROLES.ROLE_ADMIN);
    // const showDeleteButton = (uid && submission.user.uid === uid) || isAdmin;
    const showDeleteButton = false;

    function handleDeleteClicked() {
        if (showDeleteButton) {
            API.Submissions.removeSubmission({id: submissionID, ...submission}).then(_ => {
                enqueueSnackbar("Deleted!");
            });
        }
    }

    const link = quiz.type == 'quiz'
        ? `/quizzes/${submission.subject.id}/submissions/${submissionID}`
        : `/assignments/${submission.subject.id}/submissions/${submissionID}`;

    return (
        <TableRow>
            <TableCell component="th">
                <MuiLink component={Link} to={`/users/${submission.user.uid}`}>{submission.user.displayName}</MuiLink>
            </TableCell>
            <TableCell>{submission.score}</TableCell>
            <TableCell><Moment>{submission.createdAt}</Moment></TableCell>
            <TableCell>
                <Button size="small" color="primary" component={Link} to={link}>View</Button>
                {showDeleteButton && <Button size="small" color="secondary" onClick={handleDeleteClicked}>Delete</Button>}
            </TableCell>
        </TableRow>
    );
};

export default withSnackbar(QuizSubmissionListViewItem);