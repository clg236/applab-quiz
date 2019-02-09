import React from "react";
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "../Form/TableCell";
import TableBody from "@material-ui/core/TableBody";
import QuizListTableViewItem from "./QuizListTableViewItem";

const styles = theme => ({

});

const QuizListGridView = props => {
    const {classes, user, quizzes, quizURL, } = props;

    function getSubmission(quizID) {
        if (!user || !user.submissions || Object.keys(user.submissions).length === 0) {
            return null;
        }

        const submission = Object.values(user.submissions)
            .filter(submission => submission.subject && submission.subject.id == quizID);

        if (submission.length === 0) {
            return null;
        }

        return submission[0];
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="left">Topic</TableCell>
                    <TableCell align="left">Due</TableCell>
                    <TableCell align="left">Score</TableCell>
                    <TableCell align="left">Comments</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {quizzes && Object.keys(quizzes).map((key, index) => (
                    <QuizListTableViewItem
                        key={key}
                        index={index}
                        quizID={key}
                        quiz={quizzes[key]}
                        submission={getSubmission(key)}
                        quizURL={quizURL}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default compose(
    withStyles(styles)
)(QuizListGridView);