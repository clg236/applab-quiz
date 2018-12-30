import React from 'react';
import QuestionListItem from './QuestionListItem';

function QuestionList(props) {
    return (
        <ol>
            {props.quiz.questions.map((question, i) => (
                <QuestionListItem question={question} position={i} />
            ))}
        </ol>
    );
}

export default QuestionList;