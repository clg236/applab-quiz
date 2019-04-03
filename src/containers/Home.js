import React from 'react';
import {compose} from 'redux';
import {Typography, withStyles} from "@material-ui/core";
import {QuizList} from "../components/Quizzes";
import {connect} from "react-redux";
import {firebaseConnect, getVal, withFirebase} from "react-redux-firebase";


const styles = theme => ({});


const Home = props => {
    const {classes, user} = props;

    return (
        <main>
            <Typography component="h2" variant="h4" gutterBottom>Current Quizzes</Typography>
            <QuizList user={user} type="quiz" view="grid"/>

            <Typography component="h2" variant="h4" gutterBottom style={{marginTop: 30}}>Current Assignments</Typography>
            <QuizList user={user} type="assignment" view="grid"/>
        </main>
    );
};


export default compose(
    withFirebase,

    firebaseConnect(props => {
        const uid = props.firebase.auth().currentUser.uid;

        return [{
            path: `users/${uid}`
        }]
    }),

    connect(
        ({firebase}) => ({
            uid: firebase.auth.uid,
            user: getVal(firebase.data, `users/${firebase.auth.uid}`)
        })
    ),

    withStyles(styles)
)(Home);
