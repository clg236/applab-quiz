import React from 'react';
import * as Types from '../QuestionTypes';

function QuestionListItem(props) {

    const question = props.question;

    switch (question.type) {
        case 'text':
            return (<Types.Text {...props} />);
        break;
        case 'single':
            return (<Types.Single {...props} />);
        break;
        case 'multiple':
            return (<Types.Multiple {...props} />);
        break;
        case 'code':
            return (<Types.Code {...props} />);
        break;
    }

    return (<div></div>);
}

export default QuestionListItem;