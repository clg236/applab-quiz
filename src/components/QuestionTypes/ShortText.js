import React from 'react';
import {TextField} from '../Form';
import {Field} from 'formik';
import {Grid} from "@material-ui/core";
import {EditDeadlineControl, EditTitleControl} from "../Questions";


function validate(value) {
    return !value ? 'Required' : '';
}

function isCorrect(question, value) {
    return true;
}

function EditControl({questionIndex, question}) {
    return (
        <Grid item xs={12}>
            <EditTitleControl name={`questions.${questionIndex}.title`}/>
        </Grid>
    );
}

function ViewControl(props) {
    const {index, quiz, question, submission, deadlinePassed} = props;

    return (
        <Field
            name={`answers.${question.id}`}
            render={({field, form: {handleChange, handleBlur, touched, values, errors}}) => (
                <TextField
                    label={`${index + 1}. ${question.title}`}
                    required
                    multiline={false}
                    error={Boolean(touched[field.name] && errors[field.name])}
                    disabled={!!submission || deadlinePassed}
                    value={field.value || ''}
                    name={field.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            )}
            validate={validate}
        />
    );
}

export default {
    name: "Short Text",
    code: "short-text",
    EditControl: EditControl,
    ViewControl: ViewControl,
    isCorrect: isCorrect,
    defaultValue: ""
};