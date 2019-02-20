import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isEmpty, isLoaded, populate} from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {QuestionsForm} from "../../components/Questions";
import {CommentForm, CommentList} from "../../components/Comments";
import classnames from "classnames";


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
        marginTop: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2
    },

    comments: {
        marginTop: theme.spacing.unit * 2
    },

    commentForm: {
        marginTop: theme.spacing.unit * 2
    }
});


const ViewQuiz = props => {
    const {classes, user, quizID, quiz, submission} = props;

    let content = '';
    let submissionID = props.submissionID;
    let type = props.type ? props.type : 'quiz';

    if (!isLoaded(quiz) || (submissionID && !isLoaded(submission)) || (!submissionID && !isLoaded(user))) {
        content = <CircularProgress/>;
    } else if (isEmpty(quiz)) {
        content = <Typography variant="body1" gutterBottom>There are no current quizzes.</Typography>;
    } else {

        if (!submissionID) {
            if (user.submissions) {
                Object.keys(user.submissions).forEach(key => {
                    if (user.submissions[key].subject && user.submissions[key].subject.id == quizID) {
                        submissionID = key;
                    }
                });
            }
        }

        content = (
            <>
                <Typography variant="h4" gutterBottom component="h2">
                    {quiz.name}
                </Typography>

                {submissionID && submission && submission.user && (
                    <Typography variant="subheading">by {submission.user.displayName}</Typography>
                )}

                <Paper className={classnames(classes.paper, classes.form)}>
                    <QuestionsForm quizID={quizID} submissionID={submissionID} type={type} />
                </Paper>

                {submissionID && (
                    <Paper className={classnames(classes.paper, classes.comments)}>
                        <Typography variant="h5" gutterBottom component="h3">Comments</Typography>
                        <CommentList submissionID={submissionID} type={type}/>

                        <div className={classes.commentForm}>
                            <Typography variant="h6" gutterBottom component="h4">Leave a comment</Typography>
                            <CommentForm submissionID={submissionID} type={type}/>
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
            const {match: {params: {id, submissionID}}} = props;

            const data = {
                uid: auth.uid,
                quizID: id,
                submissionID,
                quiz: getVal(state.firebase.data, `quizzes/${id}`),
            };

            if (submissionID) {
                data['submission'] = getVal(state.firebase.data, `submissions/${submissionID}`);
            } else {
                data['user'] = populate(state.firebase, `users/${auth.uid}`, [
                    "submissions:submissions"
                ]);
            }

            return data;
        }
    ),

    firebaseConnect(props => {
        const {uid, match: {params: {id, submissionID}}} = props;
        const queries = [{
            path: `quizzes/${id}`
        }];

        if (submissionID) {
            queries.push({
                path: `submissions/${submissionID}`
            });
        } else {
            queries.push({
                path: `users/${uid}`
            }, {
                path: `submissions`
            });
        }

        return queries;
    }),

    withStyles(styles)
)(ViewQuiz);