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


const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },

    list: {
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing.unit * 3,
    },

    form: {
        padding: theme.spacing.unit * 3,
    }
});


const SubmissionDetail = ({classes, user}) => {

    let [selectedQuiz, setSelectedQuiz] = useState(null);
    let [submissionID, setSubmissionID] = useState(0);

    function handleQuizSelected(quiz, submissionID) {
        if (selectedQuiz && quiz.id == selectedQuiz.id) {
            setSelectedQuiz(null);
            setSubmissionID(0);
        } else {
            setSelectedQuiz(quiz);
            setSubmissionID(submissionID);
        }
    }

    return (
        <main className={classes.content}>
            <Typography variant="h4" gutterBottom component="h2">
                Quizzes
            </Typography>

            <Grid container spacing={16}>
                {!isLoaded(user) ? <CircularProgress/> : (
                    <>
                        <Grid item md={selectedQuiz ? 3 : 12} xs={12}>
                            <Paper className={classes.list}>
                                <QuizList user={user} onQuizSelected={handleQuizSelected}/>
                            </Paper>
                        </Grid>

                        {selectedQuiz && (
                            <Grid item md={9} xs={12}>
                                <Paper className={classes.form}>
                                    <QuestionsForm quiz={selectedQuiz} submissionID={submissionID}/>
                                </Paper>
                            </Grid>
                        )}
                    </>
                )}

            </Grid>
        </main>
    );
};


export default compose(
    connect(
        (state) => {
            const uid = state.firebase.auth.uid;
            const user = getVal(state.firebase.data, `users/${uid}`);
            return ({
                uid: uid,
                user: user ? {uid: uid, ...user} : null,
            });
        }
    ),

    firebaseConnect(({uid}) => {
        return [
            {
                path: `users/${uid}`,
            }
        ];
    }),


    withStyles(styles)
)(SubmissionDetail);