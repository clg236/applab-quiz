import React from 'react';

function QuizListItem(props) {

    function handleClicked() {
        props.handleQuizListItemClicked(props.quiz);
    }

    return (
        <li>
            <a href="javascript:;" onClick={handleClicked}>{props.quiz.title}</a>
        </li>
    );
}

export default QuizListItem;