import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isLoaded} from 'react-redux-firebase';
import {push} from 'connected-react-router';

import {QuestionList} from '../Questions';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


const DetailPage = ({auth, quiz, submission, match: {params: {id}}}) => {

    return (
        <Grid container spacing={24}>
            <Grid item>
                {(!isLoaded(quiz) || !isLoaded(submission))
                    ? <CircularProgress/>
                    : <>
                        <div>
                            <Typography variant="h2" gutterBottom>{quiz.name}</Typography>

                            <QuestionList quizID={id} user={auth} quiz={quiz} submission={submission}/>
                        </div>

                    </>
                }
            </Grid>
        </Grid>
    );
};


export default compose(
    firebaseConnect((props) => {
        const {firebase: {auth}, match: {params: {id}}} = props;

        return [
            `quizzes/${id}`,
            `users/${auth.uid}/quizzes/${id}`
        ];
    }),

    connect(
        (state, props) => {
            const {firebase: {auth}, match: {params: {id}}} = props;
            return (
                {
                    auth: state.firebase.auth,
                    quiz: getVal(state.firebase.data, `quizzes/${id}`),
                    submission: getVal(state.firebase.data, `users/${auth.id}/quizzes/${id}`),
                }
            );
        },
        {
            pushToHistory: push
        }
    ),
)(DetailPage);