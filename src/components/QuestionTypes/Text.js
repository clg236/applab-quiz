import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Field } from 'formik';

function Text({question}) {
    return (
        <Field
            name={question.name}
            render={({field, form: {handleChange, handleBlur, touched, values, errors}}) => (
                <TextField
                    name={field.name}
                    label={question.question}
                    value={values[field.name]}
                    required
                    multiline={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched[field.name] && errors[field.name])}
                />
            )}
        />
    );
}

export default Text;