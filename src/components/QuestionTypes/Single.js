import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Field } from 'formik';

function Single({question}) {
    return (
        <Field
            name={question.name}
            render={({field, form: {handleChange, handleBlur, touched, values, errors}}) => (
                <FormControl component="fieldset" error={Boolean(touched[field.name] && errors[field.name])}>
                    <FormLabel component="legend">{question.question}</FormLabel>
                    <RadioGroup
                        aria-label={question.question}
                        name={field.name}
                    >
                        {question.options.map((option, i) => {
                            const radio = (
                                <Radio 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={option}
                                    checked={Boolean(values[field.name] == option)}
                                />
                            );
                            return (
                                <FormControlLabel value={option} control={radio} label={option} key={i} />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            )}
        />
    );
}

export default Single;