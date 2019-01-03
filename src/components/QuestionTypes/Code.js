import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Field } from 'formik';
import MonacoEditor from 'react-monaco-editor';



function Code({ question, formik }) {
    function handleCodeChange(value) {
        formik.setFieldValue(question.name, value);
    }

    return (
        <Field
            name={question.name}
            render={({ field, form: { handleBlur, touched, values, errors } }) => {
                return (
                    <FormControl fullWidth={true} error={Boolean(touched[field.name] && errors[field.name])}>
                        <FormLabel>{question.question}</FormLabel>
                        <MonacoEditor
                            height="300"
                            language="javascript"
                            theme="vs-dark"
                            value={values[field.name]}
                            onBlur={handleBlur}
                            onChange={handleCodeChange}
                            defaultValue={question.placeholder}
                        />
                    </FormControl>
                );
            }}
        />
    );
}

export default Code;