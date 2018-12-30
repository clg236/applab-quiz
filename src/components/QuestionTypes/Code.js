import React from 'react';
import TextField from '@material-ui/core/TextField';


function QuestionTypeText(props) {
    return (
        <TextField multiline={true} label={props.question.title} required />
    );
}

export default QuestionTypeText;