import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, withFirebase} from 'react-redux-firebase';
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {QuizList} from "../../components/Quizzes";


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


const ListQuizzes = ({classes, user}) => {
    return (
        <main className={classes.content}>
            <h1>quizzes</h1>
            <p>The table below lists all current and past quizzes assigned to you</p>

            <Grid container direction={'row'} justify={'center'} alignItems={'stretch'}>
                <Grid item>
                    <QuizList user={user}/>
                </Grid>
            </Grid>
        </main>
    );
};


export default compose(
    withFirebase,

    connect(
        ({firebase}) => ({
            uid: firebase.auth.uid,
            user: getVal(firebase.data, `users/${firebase.auth.uid}`)
        })
    ),

    firebaseConnect(props => {
        const {uid} = props;

        return [{
            path: `users/${uid}`
        }]
    }),

    withStyles(styles)
)(ListQuizzes);