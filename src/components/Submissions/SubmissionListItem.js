import {default as MuiLink} from "@material-ui/core/Link";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";


const SubmissionListItem = (props) => {

    const {submission, onDeleteSubmission} = props;

    function handleDeleteClicked() {
        onDeleteSubmission && onDeleteSubmission(submission);
    }

    return (
        <TableRow>
            <TableCell component="th">
                <MuiLink component={Link} to={`/users/${submission.user.uid}`}>{submission.user.displayName}</MuiLink>
            </TableCell>
            <TableCell>{submission.score}</TableCell>
            <TableCell>{(new Date(submission.createdAt)).toISOString()}</TableCell>
            <TableCell>
                <Button size="small" color="primary" component={Link} to={`/quizzes/${submission.quiz.id}/submissions/${submission.id}`}>View</Button>
                <Button size="small" color="secondary" onClick={handleDeleteClicked}>Delete</Button>
            </TableCell>
        </TableRow>
    );
};

export default SubmissionListItem;