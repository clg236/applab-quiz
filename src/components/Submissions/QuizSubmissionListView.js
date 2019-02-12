import React from 'react';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "../Form/TableCell";
import {CircularProgress, Typography} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import {compose} from "redux";
import {isEmpty, isLoaded} from "react-redux-firebase";
import QuizSubmissionListViewItem from "./QuizSubmissionListViewItem";


const QuizSubmissionListView = props => {
    const {quiz} = props;

    if (!isLoaded(quiz)) {
        return <CircularProgress/>;
    } else if (isEmpty(quiz) || !quiz.submissions || Object.keys(quiz.submissions).length === 0) {
        return <Typography variant="body1">There is no submissions yet.</Typography>;
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Submission Date</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {Object.keys(quiz.submissions).map(key => {
                    if (quiz.submissions[key] && typeof quiz.submissions[key] == 'object' && !isEmpty(quiz.submissions[key])) {
                        return (
                            <QuizSubmissionListViewItem
                                key={key}
                                quiz={quiz}
                                submissionID={key}
                                submission={quiz.submissions[key]}
                            />
                        );
                    }
                })}
            </TableBody>
        </Table>
    );
}

export default compose(

)(QuizSubmissionListView);
