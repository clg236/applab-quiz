import React from 'react';
import {TextField} from '../Form';
import { Field } from 'formik';

function LongText({index, quiz, question}) {
    return (
        <Field
            name={question.title}
            render={({field, form: {handleChange, handleBlur, touched, values, errors}}) => (
                <TextField
                    name={field.name}
                    label={`${index + 1}. ${question.title}`}
                    value={values[field.name]}
                    required
                    multiline
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched[field.name] && errors[field.name])}
                />
            )}
        />
    );
}

export default LongText;