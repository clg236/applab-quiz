import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isLoaded, isEmpty, populate} from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Divider, withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {QuestionsForm} from "../../components/Questions";
import {CommentForm, CommentList} from "../../components/Comments";
import classnames from "classnames";
import {getIn} from "formik";


const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },

    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },

    form: {
        marginTop: theme.spacing.unit * 2
    },

    comments: {
        marginTop: theme.spacing.unit * 2
    },

    commentForm: {
        marginTop: theme.spacing.unit * 2
    }
});


const ViewQuiz = props => {
    const {classes, user, quizID, quiz, submissionID, submission, isAssignment} = props;

    let content = '';

    if (!isLoaded(quiz) || (submissionID && !isLoaded(submission)) || (!submissionID && !isLoaded(user))) {
        content = <CircularProgress/>;
    } else if (isEmpty(quiz)) {
        content = <Typography variant="body1">There is nothing here.</Typography>;
    } else {
        const submissionPrefix = isAssignment ? "assignmentSubmissions" : "quizSubmissions";

        let _submissionID = submissionID;

        if (!submissionID) {
            // find my submission
            const submissions = getIn(user, submissionPrefix);

            if (submissions) {
                Object.keys(submissions).forEach(key => {
                    if (submissions[key].quiz && submissions[key].quiz.id == quizID) {
                        _submissionID = key;
                    }
                });
            }
        }

        content = (
            <>
                <Typography variant="h4" gutterBottom component="h2">
                    {quiz.name}
                </Typography>

                <Paper className={classnames(classes.paper, classes.form)}>
                    <QuestionsForm quizID={quizID} submissionID={_submissionID} isAssignment={isAssignment}/>
                </Paper>

                {_submissionID && (
                    <Paper className={classnames(classes.paper, classes.comments)}>
                        <Typography variant="h5" gutterBottom component="h3">Comments</Typography>
                        <CommentList submissionID={_submissionID} isAssignment={isAssignment}/>

                        <div className={classes.commentForm}>
                            <Typography variant="h6" gutterBottom component="h4">Leave a comment</Typography>
                            <CommentForm submissionID={_submissionID} isAssignment={isAssignment}/>
                        </div>
                    </Paper>
                )}
            </>
        )
    }

    return <main className={classes.content}>{content}</main>;
};


export default compose(
    connect(
        (state, props) => {
            const {firebase: {auth}} = state;
            const {match: {params: {id, submissionID}}, isAssignment} = props;

            const quizPrefix = isAssignment ? "assignments" : "quizzes";
            const submissionPrefix = isAssignment ? "assignmentSubmissions" : "quizSubmissions";

            const data = {
                uid: auth.uid,
                quizID: id,
                submissionID,
                quiz: getVal(state.firebase.data, `${quizPrefix}/${id}`),
            };

            if (submissionID) {
                data['submission'] = getVal(state.firebase.data, `${submissionPrefix}/${submissionID}`);
            } else {
                data['user'] = populate(state.firebase, `users/${auth.uid}`, [
                    `${submissionPrefix}:${submissionPrefix}`
                ]);
            }

            return data;
        }
    ),

    firebaseConnect(props => {
        const {uid, quizID, submissionID, isAssignment} = props;
        const quizPrefix = isAssignment ? "assignments" : "quizzes";
        const submissionPrefix = isAssignment ? "assignmentSubmissions" : "quizSubmissions";

        const queries = [{
            path: `${quizPrefix}/${quizID}`
        }];

        if (submissionID) {
            queries.push({
                path: `${submissionPrefix}/${submissionID}`
            });
        } else {
            queries.push({
                path: `users/${uid}`
            }, {
                path: `${submissionPrefix}`
            });
        }

        return queries;
    }),

    withStyles(styles)
)(ViewQuiz);