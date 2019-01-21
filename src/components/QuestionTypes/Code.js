import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {connect, Field} from 'formik';
import MonacoEditor from 'react-monaco-editor';
import {compose} from "redux";
import {Typography} from "@material-ui/core";


function Code({question, formik}) {
    function handleCodeChange(value) {
        formik.setFieldValue(question.title, value);
    }

    return (
        <Field
            name={question.title}
            render={({field, form: {handleBlur, touched, values, errors}}) => {
                return (
                    <FormControl required fullWidth error={Boolean(touched[field.name] && errors[field.name])}>
                        <FormLabel component="h3">{question.title}</FormLabel>
                        <MonacoEditor
                            height="300"
                            language="javascript"
                            theme="vs-dark"
                            value={values[field.name]}
                            onBlur={handleBlur}
                            onChange={handleCodeChange}
                        />
                    </FormControl>
                );
            }}
        />
    );
}

export default compose(
    connect,
)(Code);