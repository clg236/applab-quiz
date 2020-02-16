import React from "react";
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "../Form/TableCell";
import TableBody from "@material-ui/core/TableBody";
import QuizListTableViewItem from "./QuizListTableViewItem";
import API from "../../apis";
import * as ROLES from "../../constants/roles";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    table: {
        //minWidth: 650,
      },
});

const QuizListTableView = props => {
    const {classes, user, quizzes, quizURL, showScoreColumn, showActionsColumn} = props;
    const isAdmin = API.Users.hasRole(ROLES.ROLE_ADMIN);

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
        <Grid container spacing={3}>
        <Grid item xs={12}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                <TableCell><Typography variant="body1" color="inherit">#</Typography></TableCell>
                    <TableCell align="left"><Typography variant="body1" color="inherit">Topic</Typography></TableCell>
                    <TableCell align="left"><Typography variant="body1" color="inherit">Due</Typography></TableCell>
                    {showScoreColumn && <TableCell align="left"><Typography variant="body1" color="inherit">Score</Typography></TableCell>}
                    <TableCell align="left"><Typography variant="body1" color="inherit">Comments</Typography></TableCell>
                    {isAdmin && showActionsColumn && <TableCell align="left"><Typography variant="body1" color="inherit">Actions</Typography></TableCell>}
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
                        showScoreColumn={showScoreColumn}
                        showActionsColumn={showActionsColumn}
                    />
                ))}
            </TableBody>
        </Table>
        </Grid>
        </Grid>
      
    );
};

export default compose(
    withStyles(styles)
)(QuizListTableView);