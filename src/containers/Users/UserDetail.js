import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isLoaded} from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Avatar, Paper, withStyles} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {SubmissionList} from "../../components/Submissions";
import {ProfileForm} from "../../components/Users";


const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    },

});


const UserDetail = props => {

    const {classes, uid, user} = props;

    return (
        <main className={classes.content}>
            {!isLoaded(user)
                ? <CircularProgress/> : (
                    <>
                        <Typography variant="h4" gutterBottom component="h2">
                            {user.photoURL
                                ? <Avatar alt={user.displayName} src={user.photoURL}/>
                                : <Avatar alt={user.displayName}><AccountCircleIcon/></Avatar>}
                            {user.displayName}
                        </Typography>

                        <Paper className={classes.paper}>
                            <Typography variant="h5" gutterBottom component="h3">Profile</Typography>
                            <ProfileForm uid={user.uid}/>
                        </Paper>

                        <Paper className={classes.paper}>
                            <Typography variant="h5" gutterBottom component="h3">Submissions</Typography>
                            <SubmissionList uid={user.uid}/>
                        </Paper>
                    </>
                )
            }
        </main>
    );
};


export default compose(
    firebaseConnect(props => {
        const {match: {params: {id}}} = props;

        return [
            {
                path: `users/${id}`
            }
        ];
    }),

    connect(
        (state, props) => {
            const {match: {params: {id}}} = props;

            return ({
                uid: id,
                user: getVal(state.firebase.data, `users/${id}`),
            });
        }
    ),

    withStyles(styles)
)(UserDetail);