import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {push} from 'connected-react-router';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';


const QuizListItem = ({id, quiz}) => {

    let text = `${quiz.name} (${quiz.questions.length} questions)`;

    return (
        <ListItem button component={Link} to={`/quizzes/${id}`}>
            <ListItemText primary={text}/>
        </ListItem>
    );
};

const ListPage = ({firebase, quizzes}) => {
    let content = "";

    if (!isLoaded(quizzes)) {
        content = <CircularProgress/>;
    } else if (isEmpty(quizzes)) {
        content = "There is no quizzes yet.";
    } else {
        content = (
            <List>
                {Object.keys(quizzes).map(key => (
                    <QuizListItem key={key} id={key} quiz={quizzes[key]} firebase={firebase}/>
                ))}
            </List>
        );
    }

    return (
        <Grid container spacing={16} direction="column">
            <Typography variant="h2">Quizzes</Typography>
            <Grid item>{content}</Grid>
        </Grid>
    );
};


export default compose(
    firebaseConnect(() => [
        {
            path: 'quizzes',
            queryParams: ['orderByKey']
        }
    ]),

    connect(
        (state) => (
            {quizzes: state.firebase.data.quizzes}
        ),
        {
            pushToHistory: push
        }
    ),
)(ListPage);