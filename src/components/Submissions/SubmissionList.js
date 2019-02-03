import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isEmpty, isLoaded} from 'react-redux-firebase';
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


const SubmissionList = (props) => {
    const {classes, enqueueSnackbar, firebase: {remove}, submissions} = props;

    function onDeleteSubmission(submission) {
        const uid = submission.user.uid;
        const quizID = submission.quiz.id;

        Promise.all([
            remove(`quizSubmissions/${submission.id}`),
            remove(`userQuizzes/${uid}/${quizID}`),
            remove(`quizzes/${quizID}/submissions/${submission.id}`)
        ]).then(() => {
            enqueueSnackbar("Deleted!");
        });
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
                        <SubmissionListItem key={key} submission={submissions[key]} onDeleteSubmission={onDeleteSubmission} />
                    ))}
                </TableBody>
            </Table>
        );
    }

    return content;
};


export default compose(
    withSnackbar,

    connect(
        (state, props) => {
            const {quiz} = props;
            const submissions = {};

            if ("submissions" in quiz) {
                Object.keys(quiz.submissions).map(key => {
                    let submission = getVal(state.firebase.data, `quizSubmissions/${key}`);

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
        const {quiz} = props;
        const queries = [];

        if ("submissions" in quiz) {
            Object.keys(quiz.submissions).map(key => {
                queries.push({path: `quizSubmissions/${key}`});
            });
        }

        return queries;
    }),


    withStyles(styles)
)(SubmissionList);