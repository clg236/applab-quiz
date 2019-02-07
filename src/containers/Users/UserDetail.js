import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isLoaded} from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Avatar, withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserQuizList from "../../components/Users/UserQuizList";


const styles = theme => ({});


const UserDetail = props => {

    const {classes, uid, user, quizSubmissions} = props;

    return (
        <main className={classes.content}>
            {!isLoaded(user) || !isLoaded(quizSubmissions)
                ? <CircularProgress/> : (
                    <>
                        <Typography variant="h4" gutterBottom component="h2">
                            {user.photoURL
                                ? <Avatar alt={user.displayName} src={user.photoURL}/>
                                : <Avatar alt={user.displayName}><AccountCircleIcon/></Avatar>}
                            {user.displayName}
                        </Typography>

                        <Paper>
                            <Typography variant="h5" component="h3">Quizzes</Typography>
                            <UserQuizList uid={uid}/>
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
            const {match: {params: {id}}} = props;

            return ({
                uid: id,
                user: getVal(state.firebase.data, `users/${id}`),
                quizSubmissions: getVal(state.firebase.data, `userQuizzes/${id}`)
            });
        }
    ),

    firebaseConnect(props => {
        const {match: {params: {id}}} = props;

        return [
            {
                path: `users/${id}`
            },
            {
                path: `userQuizzes/${id}`
            },
        ];
    }),

    withStyles(styles)
)(UserDetail);