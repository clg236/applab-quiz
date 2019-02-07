import {default as MuiLink} from "@material-ui/core/Link";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {Link} from "react-router-dom";
import Moment from "react-moment";


const UserQuizListItem = props => {

    const {quizID, quiz} = props;

    return (
        <TableRow>
            <TableCell component="th">
                <MuiLink component={Link} to={`/quizzes/${quizID}/submissions/${quiz.lastSubmissionID}`}>{quiz.name}</MuiLink>
            </TableCell>
            <TableCell>{quiz.lastSubmissionScore}</TableCell>
            <TableCell><Moment>{quiz.updatedAt}</Moment></TableCell>
        </TableRow>
    );
};

export default UserQuizListItem;