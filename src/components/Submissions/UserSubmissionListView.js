import React from 'react';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "../Form/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {compose} from "redux";
import {isEmpty} from "react-redux-firebase";
import UserSubmissionListViewItem from "./UserSubmissionListViewItem";


const UserSubmissionListView = props => {
    const {user} = props;

    let quizzes = {};

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Submission Date</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {Object.keys(user.submissions).map(key => {
                    if (user.submissions[key] && typeof user.submissions[key] == 'object' && !isEmpty(user.submissions[key])) {
                        const quiz = user.submissions[key].subject;
                        if (quiz && quizzes.hasOwnProperty(quiz.id)) {
                            return "";
                        }
                        quizzes[quiz.id] = true;

                        return (
                            <UserSubmissionListViewItem
                                key={key}
                                user={user}
                                submissionID={key}
                                submission={user.submissions[key]}
                            />
                        );
                    }
                })}
            </TableBody>
        </Table>
    );
}

export default compose(

)(UserSubmissionListView);
