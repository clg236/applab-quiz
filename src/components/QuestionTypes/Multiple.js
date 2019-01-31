import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {Field, FieldArray} from 'formik';
import {Typography} from "@material-ui/core";


function OptionsFieldArray(props) {
    const {question, name, index, form: {touched, errors, handleChange, handleBlur, values}} = props;

    return (
        <FormControl required fullWidth error={Boolean(touched[name] && errors[name])}>
            <FormLabel>{`${index + 1}. ${question.title}`}</FormLabel>
            <FormGroup>
                {question.options.map((option, i) => {
                    const checkbox = (
                        <Checkbox
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={option.option}
                            checked={values[name] && typeof values[name][i] != 'undefined' ? values[name][i] : false}
                        />
                    );

                    return (
                        <Field name={`${name}.${i}`} key={i}>
                            {({field: {name}}) => (
                                <FormControlLabel name={name} control={checkbox} label={option.option}/>
                            )}
                        </Field>
                    );
                })}
            </FormGroup>
        </FormControl>
    );
}


function Multiple(props) {
    const {index, question} = props;

    return (
        <FieldArray name={question.title}>
            {props => (
                <OptionsFieldArray index={index} question={question} {...props} />
            )}
        </FieldArray>
    );
}

export default Multiple;