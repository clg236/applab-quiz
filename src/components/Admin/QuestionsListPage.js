import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import * as ROUTES from '../../constants/routes';
import { push } from 'connected-react-router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';


const QuestionListItem = ({ firebase, id, question }) => {

    function handleDelete() {
        firebase.remove(`questions/${id}`);
    }

    let text = question.question;
    let icon = '';

    switch (question.type) {
        case 'single':
            icon = '🔘';
        break;

        case 'multiple':
            icon = '☐';
        break;

        case 'code':
            icon = '👨‍💻';
        break;
        
        case 'text':
        default:
            icon = '📖';
    }

    text = icon + text;

    return (
        <ListItem>
            <ListItemText
                primary={text}
            />
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

const QuestionsListPage = ({ firebase, questions, pushToHistory }) => {
    let content = "";

    if (!isLoaded(questions)) {
        content = <CircularProgress />;
    } else if (isEmpty(questions)) {
        content = "There is no questions yet.";
    } else {
        content = (
            <List>
                {Object.keys(questions).map(key => (
                    <QuestionListItem key={key} id={key} question={questions[key]} firebase={firebase} />
                ))}
            </List>
        );
    }

    return (
        <div>
            <h2>Questions</h2>
            {content}
            <p><Link to={ROUTES.ADMIN_CREATE_QUESTION}>Create a question</Link></p>
        </div>
    );
};


export default compose(
    firebaseConnect(() => [
        {
            path: 'questions',
            queryParams: ['orderByKey']
        }
    ]),

    connect((state) => ({questions: state.firebase.data.questions}), {pushToHistory: push}),
)(QuestionsListPage);