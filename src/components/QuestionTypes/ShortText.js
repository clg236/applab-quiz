import React from 'react';
import {TextField} from '../Form';
import {Field} from 'formik';
import {Grid} from "@material-ui/core";
import {EditDeadlineControl, EditTitleControl} from "../Questions";


function validate(value) {
    return !value ? 'Required' : '';
}

function ShortTextEditControl({questionIndex, question}) {
    return (
        <>
            <Grid item xs={12}>
                <EditTitleControl name={`questions.${questionIndex}.title`} />
            </Grid>
        </>
    );
}

function ShortTextViewControl({index, quiz, question, submission}) {
    return (
        <Field
            name={question.title}
            render={({field, form: {handleChange, handleBlur, touched, values, errors}}) => (
                <TextField
                    name={field.name}
                    label={`${index + 1}. ${question.title}`}
                    value={values[field.name]}
                    required
                    multiline={false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched[field.name] && errors[field.name])}
                    disabled={!!submission}
                />
            )}
            validate={validate}
        />
    );
}

function isCorrect(question, value) {
    return true;
}

export default {
    name: "Short Text",
    code: "short-text",
    EditControl: ShortTextEditControl,
    ViewControl: ShortTextViewControl,
    isCorrect: isCorrect,
    defaultValue: ""
};