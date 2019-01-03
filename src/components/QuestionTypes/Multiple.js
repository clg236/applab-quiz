import React, {useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { Field } from 'formik';

function Multiple({question}) {
    return (
        <Field
            name={question.name}
            render={({field, form: {handleChange, handleBlur, touched, values, errors}}) => (
                <FormControl component="fieldset" error={Boolean(touched[field.name] && errors[field.name])}>
                    <FormLabel component="legend">{question.question}</FormLabel>
                    <FormGroup>
                        {question.options.map((option, i) => {
                            const checkbox = (
                                <Checkbox 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={option}
                                    checked={values[field.name] && typeof values[field.name][option] != 'undefined' ? values[field.name][option] : false}
                                />
                            );

                            return (
                                <FormControlLabel name={`${question.name}.${option}`} value={option} control={checkbox} label={option} key={i} />
                            );
                        })}
                    </FormGroup>
                </FormControl>
            )}
        />
    );
}

export default Multiple;