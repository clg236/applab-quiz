import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isEmpty, isLoaded, withFirebase} from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {withSnackbar} from "notistack";
import SubmissionListItem from "./SubmissionListItem";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


const styles = theme => ({});


const SubmissionList = props => {
    const {classes, isAssignment, enqueueSnackbar, firebase: {remove}, submissions} = props;

    function onDeleteSubmission(submission) {
        const uid = submission.user.uid;
        const quizID = submission.quiz.id;

        if (isAssignment) {
            Promise.all([
                remove(`assignmentSubmissions/${submission.id}`),
                remove(`userAssignments/${uid}/${quizID}`),
                remove(`assignments/${quizID}/submissions/${submission.id}`)
            ]).then(() => {
                enqueueSnackbar("Deleted!");
            });
        } else {
            Promise.all([
                remove(`quizSubmissions/${submission.id}`),
                remove(`userQuizzes/${uid}/${quizID}`),
                remove(`quizzes/${quizID}/submissions/${submission.id}`)
            ]).then(() => {
                enqueueSnackbar("Deleted!");
            });
        }
    }

    let content = "";

    if (!isLoaded(submissions)) {
        content = <CircularProgress/>;
    } else if (isEmpty(submissions)) {
        content = "There is no submissions yet.";
    } else {
        content = (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Submission Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Object.keys(submissions).map(key => (
                        <SubmissionListItem
                            key={key}
                            isAssignment={isAssignment}
                            submission={submissions[key]}
                            onDeleteSubmission={onDeleteSubmission} />
                    ))}
                </TableBody>
            </Table>
        );
    }

    return content;
};


export default compose(
    withFirebase,

    withSnackbar,

    connect(
        (state, props) => {
            const {quiz, isAssignment} = props;
            const submissions = {};
            const prefix = isAssignment ? "assignmentSubmissions" : "quizSubmissions";

            if ("submissions" in quiz) {
                Object.keys(quiz.submissions).map(key => {
                    let submission = getVal(state.firebase.data, `${prefix}/${key}`);

                    if (submission) {
                        submissions[key] = {id: key, ...submission};
                    }
                });
            }

            return {
                submissions: submissions,
            };
        }
    ),

    firebaseConnect((props) => {
        const {quiz, isAssignment} = props;
        const queries = [];
        const prefix = isAssignment ? "assignmentSubmissions" : "quizSubmissions";

        if ("submissions" in quiz) {
            Object.keys(quiz.submissions).map(key => {
                queries.push({path: `${prefix}/${key}`});
            });
        }

        return queries;
    }),


    withStyles(styles)
)(SubmissionList);