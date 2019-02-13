import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, isEmpty, isLoaded, populate} from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Typography, withStyles} from "@material-ui/core";
import {withSnackbar} from "notistack";
import QuizSubmissionListView from "./QuizSubmissionListView";
import UserSubmissionListView from "./UserSubmissionListView";


const styles = theme => ({});

const SubmissionList = props => {
    const {quizID, data} = props;

    if (!isLoaded(data)) {
        return <CircularProgress/>;
    } else if (isEmpty(data) || isEmpty(data.submissions)) {
        return <Typography variant="body1">There is no submissions yet.</Typography>;
    } else {
        if (quizID) {
            return <QuizSubmissionListView quiz={data}/>;
        } else {
            return <UserSubmissionListView user={data}/>;
        }
    }
};

export default compose(
    withSnackbar,

    connect(
        (state, props) => {
            const {quizID, uid} = props;

            return {
                data: populate(state.firebase, quizID ? `quizzes/${quizID}` : `users/${uid}`, [
                    "submissions:submissions"
                ])
            };
        }
    ),

    firebaseConnect(props => {
        const {quizID, uid} = props;

        return [
            {
                path: quizID ? `quizzes/${quizID}` : `users/${uid}`,
                populates: ["submissions:submissions"]
            }
        ];
    }),

    withStyles(styles)
)(SubmissionList);