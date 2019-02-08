import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isEmpty, isLoaded, populate, withFirebase} from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Typography, withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {withSnackbar} from "notistack";
import SubmissionListItem from "./SubmissionListItem";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "../Form/TableCell";


const styles = theme => ({});


const SubmissionList = props => {
    const {classes, enqueueSnackbar, firebase: {remove}, quiz, type} = props;

    console.log(props);

    function onDeleteSubmission(submission) {
        const uid = submission.user.uid;
        const quizID = submission.quiz.id;

        Promise.all([
            remove(`submissions/${submission.id}`),
            remove(`users/${uid}/quizzes/${quizID}`),
            remove(`users/${uid}/submissions/${quizID}`),
            remove(`quizzes/${quizID}/submissions/${submission.id}`)
        ]).then(() => {
            enqueueSnackbar("Deleted!");
        });

    }

    let content = "";

    if (!isLoaded(quiz)) {
        content = <CircularProgress/>;
    } else if (isEmpty(quiz) || isEmpty(quiz.submissions)) {
        content = <Typography variant="body1">There is no submissions yet.</Typography>;
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
                    {Object.keys(quiz.submissions).map(key => (
                        <SubmissionListItem
                            key={key}
                            type={type}
                            submission={quiz.submissions[key]}
                            onDeleteSubmission={onDeleteSubmission}/>
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
            const {quizID} = props;

            return {
                quiz: populate(state.firebase, `quizzes/${quizID}`, [
                    "submissions:submissions"

                ]),
            };
        }
    ),

    firebaseConnect(props => {
        const {quizID} = props;

        return [
            {
                path: `quizzes/${quizID}`
            },
            {
                path: "submissions"
            }
        ];
    }),

    withStyles(styles)
)(SubmissionList);