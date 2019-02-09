import {default as MuiLink} from "@material-ui/core/Link";
import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import Moment from "react-moment";
import TableCell from "../Form/TableCell";


const SubmissionListItem = props => {

    const {submissionID, submission, type, onDeleteSubmission} = props;

    function handleDeleteClicked() {
        onDeleteSubmission && onDeleteSubmission(submissionID);
    }

    const link = type == 'quiz'
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
                <Button size="small" color="secondary" onClick={handleDeleteClicked}>Delete</Button>
            </TableCell>
        </TableRow>
    );
};

export default SubmissionListItem;