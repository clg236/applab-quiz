import React, {useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isLoaded} from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {QuestionsForm} from "../../components/Questions";
import {QuizList} from "../../components/Quizzes";
import {CommentForm, CommentList} from "../../components/Comments";
import classnames from "classnames";



const styles = theme => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    list: {
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing.unit * 3,
    },

    paperPadding: {
        padding: theme.spacing.unit * 3,
    },

    comments: {
        marginTop: theme.spacing.unit * 2
    },

    commentForm: {
        marginTop: theme.spacing.unit * 2
    }
});


const ListAssignments = ({classes, user}) => {

    let [selectedQuizID, setSelectedQuizID] = useState('');
    let [submissionID, setSubmissionID] = useState('');

    function handleQuizSelected(quizID, submissionID) {
        if (selectedQuizID && quizID == selectedQuizID) {
            setSelectedQuizID('');
            setSubmissionID('');
        } else {
            setSelectedQuizID(quizID);
            setSubmissionID(submissionID);
        }
    }

    return (
        <main className={classes.content}>
            <h1>assignments</h1>
            <p>The table below lists all current and past assignments assigned to you</p>

            <Grid container direction={'row'} justify={'center'} alignItems={'stretch'} >
                <Grid item md={14} xs={16}>
                    <Paper className={classes.list}>
                        <QuizList isAssignment user={user} onQuizSelected={handleQuizSelected}/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={16} direction={'row'} justify={'center'} alignItems={'stretch'}>
                {selectedQuizID && (
                    <Grid item md={11} xs={16}>
                        <Paper className={classes.paperPadding}>
                            <QuestionsForm isAssignment quizID={selectedQuizID} submissionID={submissionID}/>
                        </Paper>

                        {submissionID && (
                            <Paper className={classnames(classes.comments, classes.paperPadding)}>
                                <Typography variant="h5" gutterBottom component="h3">Comments</Typography>
                                <CommentList isAssignment submissionID={submissionID}/>

                                <div className={classes.commentForm}>
                                    <Typography variant="h6" gutterBottom component="h4">Leave a comment</Typography>
                                    <CommentForm isAssignment submissionID={submissionID}/>
                                </div>
                            </Paper>
                        )}
                    </Grid>
                )}

            </Grid>
        </main>
    );
};


export default compose(
    connect(
        (state) => {
            return ({
                user: state.firebase.auth
            });
        }
    ),

    withStyles(styles)
)(ListAssignments);