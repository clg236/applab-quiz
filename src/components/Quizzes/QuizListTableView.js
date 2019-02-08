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
    const {classes, quizzes, quizURL} = props;

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
                {quizzes && Object.keys(quizzes).map(key => (
                    <QuizListTableViewItem
                        key={key}
                        quizID={key}
                        quiz={quizzes[key]}
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