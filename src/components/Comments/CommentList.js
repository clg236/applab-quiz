import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isEmpty, isLoaded} from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/core";
import {withSnackbar} from "notistack";
import List from "@material-ui/core/List";
import CommentListItem from './CommentListItem';


const styles = theme => ({
    inline: {
        display: 'inline',
    },
});


const CommentList = (props) => {
    const {classes, submission} = props;

    let content = "";

    if (!isLoaded(submission)) {
        content = <CircularProgress/>;
    } else if (isEmpty(submission)) {
        content = "There is no comments yet";
    } else {
        if (submission && (!("comments" in submission) || Object.keys(submission.comments).length === 0)) {
            content = "There is no comments yet";
        } else {
            content = (
                <List>
                    {Object.keys(submission.comments).map((key) => (
                        <CommentListItem key={key} comment={submission.comments[key]}/>
                    ))}
                </List>
            );
        }
    }

    return content;
};


export default compose(
    withSnackbar,

    connect(
        (state, props) => {
            const {submissionID} = props;

            return {
                submission: getVal(state.firebase.data, `quizSubmissions/${submissionID}`),
            };
        }
    ),

    firebaseConnect((props) => {
        const {submissionID} = props;

        return [
            {
                path: `quizSubmissions/${submissionID}`
            }
        ];
    }),


    withStyles(styles)
)(CommentList);