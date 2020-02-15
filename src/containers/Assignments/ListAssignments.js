import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {QuizList} from "../../components/Quizzes";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    list: {
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(3),
    },

    paperPadding: {
        padding: theme.spacing(3),
    },

    comments: {
        marginTop: theme.spacing(2)
    },

    commentForm: {
        marginTop: theme.spacing(2)
    }
});


const ListAssignments = ({classes, user}) => {

    return (
        <main className={classes.content}>
            <Typography variant="h5" component="h6">Your Assignments</Typography>
            <Typography variant="body1" gutterBottom>
                The table below lists all of your current assignments, the score assigned and any comments.
            </Typography>
            <QuizList type="assignment" user={user} quizURL="/assignments/:id"/>

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