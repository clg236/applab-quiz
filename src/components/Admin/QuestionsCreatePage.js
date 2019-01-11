import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import * as ROUTES from '../../constants/routes';
import { push } from 'connected-react-router';

import QuestionsCreateForm from './QuestionsCreateForm';

let QuestionsCreatePage = ({ firebase, pushToHistory }) => {

    const afterCreated = () => {
        pushToHistory(ROUTES.ADMIN_QUESTIONS);
    };

    return (
        <div>
            <h2>Create a question</h2>
            <QuestionsCreateForm firebase={firebase} afterCreated={afterCreated} />
        </div>
    );
};



export default compose(
    withFirebase,

    connect(null, {
        pushToHistory: push
    }),

)(QuestionsCreatePage);
