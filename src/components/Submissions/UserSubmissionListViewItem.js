import {default as MuiLink} from "@material-ui/core/Link";
import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import Moment from "react-moment";
import TableCell from "../Form/TableCell";
import API from "../../apis";
import {withSnackbar} from "notistack";
import {compose} from "redux";

const UserSubmissionListViewItem = props => {

    const {user, submissionID, submission, enqueueSnackbar} = props;

    function handleDeleteClicked() {
        API.Submissions.removeSubmission({id: submissionID, ...submission}).then(_ => {
            enqueueSnackbar("Deleted!");
        });
    }

    const link = submission.subject.type == 'quiz'
        ? `/quizzes/${submission.subject.id}/submissions/${submissionID}`
        : `/assignments/${submission.subject.id}/submissions/${submissionID}`;

    return (
        <TableRow>
            <TableCell component="th">
                <MuiLink component={Link} to={link}>{submission.subject.name} ({submission.subject.type})</MuiLink>
            </TableCell>
            <TableCell>{submission.score}</TableCell>
            <TableCell><Moment>{submission.createdAt}</Moment></TableCell>
            <TableCell>
                <Button size="small" color="secondary" onClick={handleDeleteClicked}>Delete</Button>
            </TableCell>
        </TableRow>
    );
};

export default compose(
    withSnackbar
)(UserSubmissionListViewItem);