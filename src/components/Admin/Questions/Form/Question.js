import React from 'react';
import {connect, Field, FieldArray} from "formik";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    withStyles
} from "@material-ui/core";
import isEmpty from "lodash/isEmpty";
import {compose} from "redux";
import Options from './Options';
import {Editor, TextField, InputLabel} from '../../../Form';


let Question = (props) => {
    let {fieldNamePrefix, formik: {values, errors}, classes} = props;

    if (!fieldNamePrefix) {
        fieldNamePrefix = "";
    } else if (!fieldNamePrefix.endsWith(".")) {
        fieldNamePrefix = `${fieldNamePrefix}.`;
    }

    const type = values[`${fieldNamePrefix}type`];

    return (
        <>
            <Grid item xs={12}>
                <Field
                    name={`${fieldNamePrefix}title`}
                    validate={value => {
                        if (isEmpty(value)) {
                            return "Required";
                        }
                    }}
                    render={({field}) => (
                        <TextField label="Title" required
                                   error={Boolean(errors[`${fieldNamePrefix}title`])} {...field} />
                    )}
                />
            </Grid>

            <Grid item xs={12}>
                <Field
                    name={`${fieldNamePrefix}description`}
                    render={({field, form}) => (
                        <FormControl fullWidth>
                            <InputLabel>Description</InputLabel>
                            <Editor field={field} form={form} withMargin />
                        </FormControl>
                    )}
                />
            </Grid>


            <Grid item xs={12}>
                <Field
                    name={`${fieldNamePrefix}type`}
                    validate={value => {
                        if (isEmpty(value)) {
                            return "Required";
                        }
                    }}

                    render={({field}) => (
                        <FormControl required error={Boolean(errors[`${fieldNamePrefix}type`])}>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup aria-label="Type" row {...field}>
                                <FormControlLabel value="text" control={<Radio/>} label="Text"/>
                                <FormControlLabel value="single" control={<Radio/>} label="Single"/>
                                <FormControlLabel value="multiple" control={<Radio/>} label="Multiple"/>
                                <FormControlLabel value="code" control={<Radio/>} label="Code"/>
                            </RadioGroup>
                        </FormControl>
                    )}
                />
            </Grid>

            {(type == 'text' || type == 'code') && (
                <Grid item xs={12}>
                    <Field
                        name={`${fieldNamePrefix}corrects.0`}
                        render={({field}) => (
                            <TextField label="Correct Answer" {...field} />
                        )}
                    />
                </Grid>
            )}

            {type == 'single' && (
                <Grid item xs={12}>
                    <Options questionFieldNamePrefix={fieldNamePrefix}/>
                </Grid>
            )}

            {type == 'multiple' && (
                <Grid item xs={12}>
                    <Options questionFieldNamePrefix={fieldNamePrefix} multiple/>
                </Grid>
            )}

        </>
    );
};

export default compose(
    connect,
)(Question);