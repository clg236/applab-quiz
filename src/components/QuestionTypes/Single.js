import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Field } from 'formik';

function Single({index, quiz, question}) {
    return (
        <Field
            name={question.title}
            render={({field, form: {handleChange, handleBlur, touched, values, errors}}) => (
                <FormControl required fullWidth error={Boolean(touched[field.name] && errors[field.name])}>
                    <FormLabel>{`${index + 1}. ${question.title}`}</FormLabel>
                    <RadioGroup
                        aria-label={question.title}
                        name={field.name}
                    >
                        {question.options.map((option, i) => {
                            const radio = (
                                <Radio
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={option.option}
                                    checked={Boolean(values[field.name] == option.option)}
                                />
                            );
                            return (
                                <FormControlLabel control={radio} label={option.option} key={i} />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            )}
        />
    );
}

export default Single;