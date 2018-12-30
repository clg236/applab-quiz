import React from 'react';
import * as Types from '../QuestionTypes';

function QuestionListItem(props) {
    let content = '';

    switch (props.question.type) {
        case 'text':
            content = <Types.Text question={props.question} />
        break;
        case 'single':
            content = <Types.Single question={props.question} />
        break;
        case 'multiple':
            content = <Types.Multiple question={props.question} />
        break;
        case 'code':
            content = <Types.Code question={props.question} />
        break;
    }

    return (<li>{content}</li>);
}

export default QuestionListItem;