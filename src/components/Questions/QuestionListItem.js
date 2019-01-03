import React from 'react';
import * as Types from '../QuestionTypes';

function QuestionListItem({question, formik}) {
    let content = '';

    switch (question.type) {
        case 'text':
            content = <Types.Text question={question} formik={formik} />
        break;
        case 'single':
            content = <Types.Single question={question} formik={formik} />
        break;
        case 'multiple':
            content = <Types.Multiple question={question} formik={formik} />
        break;
        case 'code':
            content = <Types.Code question={question} formik={formik} />
        break;
    }

    return (<li>{content}</li>);
}

export default QuestionListItem;