import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import * as ROUTES from '../../../constants/routes';
import {push} from 'connected-react-router';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const QuizListItem = ({firebase, id, quiz}) => {

    function handleDelete() {
        firebase.remove(`quizzes/${id}`);
    }

    let text = `${quiz.name} (${quiz.questions.length} questions)`;

    return (
        <ListItem>
            <ListItemText primary={text}/>
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={handleDelete}>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
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

            <Grid>
                <Button variant="contained" color="primary" component={Link} to={ROUTES.ADMIN_CREATE_QUIZ}>
                    <AddCircleOutlinedIcon/>
                    Create a quiz
                </Button>
            </Grid>
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