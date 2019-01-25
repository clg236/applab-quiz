import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, isLoaded, isEmpty, getVal} from 'react-redux-firebase';
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


const QuestionListItem = ({firebase, id, question}) => {

    function handleDelete() {
        firebase.remove(`questions/${id}`);
    }

    return (
        <ListItem disableGutters>
            <ListItemText primary={`${question.title}`}/>
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={handleDelete}>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

const ListPage = ({firebase, questions}) => {
    let content = "";

    if (!isLoaded(questions)) {
        content = <CircularProgress/>;
    } else if (isEmpty(questions)) {
        content = "There is no questions yet.";
    } else {
        content = (
            <List>
                {Object.keys(questions).map(key => (
                    <QuestionListItem key={key} id={key} question={questions[key]} firebase={firebase}/>
                ))}
            </List>
        );
    }

    return (
        <Grid container spacing={16} direction="column">
            <Typography variant="h2" gutterBottom>Questions</Typography>

            <Grid item md={12}>{content}</Grid>

            <Grid item md={12}>
                <Button variant="contained" color="primary" component={Link} to={ROUTES.ADMIN_CREATE_QUESTION}>
                    Create a question
                    <AddCircleOutlinedIcon/>
                </Button>
            </Grid>
        </Grid>
    );
};


export default compose(
    firebaseConnect(() => [
        {
            path: 'questions',
            queryParams: ['orderByKey']
        }
    ]),

    connect(
        (state) => (
            {questions: getVal(state.firebase.data, "questions")}
        ),
        {
            pushToHistory: push
        }
    ),
)(ListPage);