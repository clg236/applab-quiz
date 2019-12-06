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

    let submissions = [];

    Object.keys(quiz.submissions).forEach(key => {
        if (quiz.submissions[key] && typeof quiz.submissions[key] == 'object' && !isEmpty(quiz.submissions[key])) {
            submissions.push([key, quiz.submissions[key]]);
        }
    });

    if (Object.keys(submissions).length > 0) {
        // a user can only have one submission
        let temp = {};
        submissions.forEach(submission => {
            if (!submission[1].user) {
                return;
            }

            let user = submission[1].user;
            if (!temp.hasOwnProperty(user.uid)) {
                temp[user.uid] = [submission];
            } else {
                temp[user.uid].push(submission);
            }
        });

        submissions = [];
        // get the last one
        Object.keys(temp).forEach(uid => {
            submissions.push(temp[uid][temp[uid].length - 1]);
        });

        submissions.sort((a, b) => {
            return a[1].user.displayName > b[1].user.displayName ? 1 : -1;
        });
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
                {submissions.map(([key, submission]) => {
                    return (
                        <QuizSubmissionListViewItem
                            key={key}
                            quiz={quiz}
                            submissionID={key}
                            submission={submission}
                        />
                    );
                })}
            </TableBody>
        </Table>
    );
}

export default compose(

)(QuizSubmissionListView);
