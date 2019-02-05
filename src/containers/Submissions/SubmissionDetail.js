import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isLoaded} from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Divider, withStyles} from "@material-ui/core";
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
        marginTop: theme.spacing.unit * 2
    },

    comments: {
        marginTop: theme.spacing.unit * 2
    },

    commentForm: {
        marginTop: theme.spacing.unit * 2
    }
});


const SubmissionDetail = ({classes, quizID, quiz, submissionID, submission}) => {

    return (
        <main className={classes.content}>
            {!isLoaded(quiz) || !isLoaded(submission)
                ? <CircularProgress/> : (
                    <>
                        <Typography variant="h4" gutterBottom component="h2">
                            {quiz.name}
                        </Typography>

                        <Paper className={classnames(classes.paper, classes.form)}>
                            <QuestionsForm quizID={quizID} submissionID={submissionID}/>
                        </Paper>

                        <Paper className={classnames(classes.paper, classes.comments)}>
                            <Typography variant="h5" gutterBottom component="h3">Comments</Typography>
                            <CommentList submissionID={submissionID}/>

                            <div className={classes.commentForm}>
                                <Typography variant="h6" gutterBottom component="h4">Leave a comment</Typography>
                                <CommentForm submissionID={submissionID}/>
                            </div>
                        </Paper>
                    </>
                )
            }
        </main>
    );
};


export default compose(
    connect(
        (state, props) => {
            const {match: {params: {quizID, submissionID}}} = props;

            return ({
                quizID,
                submissionID,
                quiz: getVal(state.firebase.data, `quizzes/${quizID}`),
                submission: getVal(state.firebase.data, `quizSubmissions/${submissionID}`)
            });
        }
    ),

    firebaseConnect(props => {
        const {match: {params: {quizID, submissionID}}} = props;

        return [
            {
                path: `quizzes/${quizID}`
            },
            {
                path: `quizSubmissions/${submissionID}`
            },
        ];
    }),

    withStyles(styles)
)(SubmissionDetail);