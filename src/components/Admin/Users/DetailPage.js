import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {compose} from "redux";
import {firebaseConnect, getVal, isLoaded} from "react-redux-firebase";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {List, Paper, withStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});


let DetailPage = (props) => {

    const {user, classes} = props;

    return (
        <Grid container spacing={16} direction="column">
            {isLoaded(user) ? (
                <>
                    <Grid item md={12}>

                        <Typography variant="h2" inline>
                            {user.displayName ? user.displayName : "Anonymous"}
                        </Typography>
                    </Grid>

                    <Grid item md={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" component="h3">Basic Information</Typography>
                        </Paper>
                    </Grid>

                    <Grid item md={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" component="h3">Quizzes</Typography>

                            {user.quizzes && Object.keys(user.quizzes).length > 0
                                ? (
                                    <List>
                                        {Object.keys(user.quizzes).map((k) => {
                                            const quiz = user.quizzes[k];

                                            if (!quiz || !quiz.name) {
                                                return <></>;
                                            }

                                            const text = `${quiz.name} (${quiz.correct_answers}/${quiz.total_questions})`;

                                            return (
                                                <ListItem key={k} disableGutters>
                                                    <ListItemText primary={text}/>
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                )
                                : <Typography>No quiz yet.</Typography>
                            }
                        </Paper>
                    </Grid>
                </>
            ) : <CircularProgress/>
            }
        </Grid>
    );
};


export default compose(
    firebaseConnect((props) => {
        const {match: {params: {id}}} = props;

        return [
            `users/${id}`
        ];
    }),

    connect(
        (state, props) => {
            const {match: {params: {id}}} = props;
            return (
                {
                    user: getVal(state.firebase.data, `users/${id}`),
                }
            );
        },
        {
            pushToHistory: push
        }
    ),

    withStyles(styles),
)(DetailPage);