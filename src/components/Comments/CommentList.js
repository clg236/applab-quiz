import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isEmpty, isLoaded, populate} from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Typography, withStyles} from "@material-ui/core";
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
        content = <Typography variant="body1">There are no comments yet</Typography>;
    } else {
        if (submission && (!("comments" in submission) || Object.keys(submission.comments).length === 0)) {
            content = <Typography variant="body1">There are no comments yet</Typography>;
        } else {
            content = (
                <List>
                    {Object.keys(submission.comments).map((key) => {
                        if (submission.comments[key] && typeof submission.comments[key] == 'object') {
                            return <CommentListItem key={key} comment={submission.comments[key]}/>;
                        }
                    })}
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
                submission: populate(state.firebase, `submissions/${submissionID}`, [
                    "comments:comments"
                ]),
            };
        }
    ),

    firebaseConnect(props => {
        const {submissionID} = props;

        return [
            {
                path: `submissions/${submissionID}`,
                populates: ["comments:comments"]
            }
        ];
    }),


    withStyles(styles)
)(CommentList);