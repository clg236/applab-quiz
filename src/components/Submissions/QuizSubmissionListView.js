import React from 'react';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "../Form/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {compose} from "redux";
import {isEmpty} from "react-redux-firebase";
import QuizSubmissionListViewItem from "./QuizSubmissionListViewItem";


const QuizSubmissionListView = props => {
    const {quiz} = props;

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