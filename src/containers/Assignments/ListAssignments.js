import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
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


const ListAssignments = ({classes, user}) => {

    return (
        <main className={classes.content}>
            <h1>assignments</h1>
            <p>The table below lists all current and past assignments assigned to you</p>

            <Grid container direction={'row'} justify={'center'} alignItems={'stretch'}>
                <Grid item md={12}>
                    <Paper className={classes.list}>
                        <QuizList type="assignment" user={user} quizURL="/assignments/:id"/>
                    </Paper>
                </Grid>
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