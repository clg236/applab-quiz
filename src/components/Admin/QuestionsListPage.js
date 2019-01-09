import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import * as ROUTES from '../../constants/routes';
import { push } from 'connected-react-router';

import CircularProgress from '@material-ui/core/CircularProgress';


const QuestionsListPage = ({ firebase, questions, pushToHistory }) => {
    let content = "";

    if (!isLoaded(questions)) {
        content = <CircularProgress />;
    } else if (isEmpty(questions)) {
        content = "There is no questions.";
    } else {
        content = (
            <ol>
                {Object.keys(questions).map(key => (
                    <li key={key}>{questions[key].question}</li>
                ))}
            </ol>
        );
    }

    const handleClicked = () => {
        pushToHistory(ROUTES.ADMIN_CREATE_QUESTION);
    }

    return (
        <div>
            <h2>Questions</h2>
            {content}
            <p><Link to={ROUTES.ADMIN_CREATE_QUESTION}>Create a question</Link></p>
            <p><button onClick={handleClicked}>Create a question</button></p>
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

    connect((state) => ({
        questions: state.firebase.data.questions,
    }), {
        pushToHistory: push
    })


)(QuestionsListPage);