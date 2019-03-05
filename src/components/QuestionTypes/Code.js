import React from 'react';
import {Editor, InputLabel} from '../Form';
import {Field} from 'formik';
import {FormControl, Grid, withStyles} from "@material-ui/core";
import {EditDeadlineControl, EditTitleControl} from "../Questions";
import MonacoEditor from "react-monaco-editor";
import {compose} from "redux";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
    viewDescription: {
        marginBottom: theme.spacing.unit * 2,
    }
});


function validate(value) {
    return !value ? 'Required' : '';
}

function isCorrect(question, value) {
    return true;
}

function sanitizeValue(value) {
    return value.trim();
}

function EditControl({questionIndex, question}) {
    return (
        <>
            <Grid item xs={12}>
                <EditTitleControl name={`questions.${questionIndex}.title`}/>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Description</InputLabel>
                    <Field
                        name={`questions.${questionIndex}.description`}
                        render={({field, form}) => (
                            <Editor field={field} form={form}/>
                        )}
                    />
                </FormControl>
            </Grid>
        </>
    );
}

function ViewControl(props) {
    const {classes, index, quiz, question, submission, deadlinePassed} = props;

    const options = {readOnly: !!submission || deadlinePassed};

    const answer = submission && submission.answers && submission.answers[question.id] ? submission.answers[question.id] : "";
    let correct = answer && isCorrect(question, answer);
    if (submission && submission.grades && question.id in submission.grades) {
        correct = submission.grades[question.id];
    }

    return (
        <Field
            name={`answers.${question.id}`}
            render={({field, form}) => (
                <FormControl required fullWidth>
                    <InputLabel>
                        {submission && <Typography variant="subtitle1" inline>{correct ? "✔" : "✘"} </Typography>}
                        {`${index + 1}. ${question.title}`}
                    </InputLabel>

                    {question.description && (
                        <div className={classes.viewDescription}
                             dangerouslySetInnerHTML={{__html: question.description}}/>
                    )}

                    <MonacoEditor
                        height="300"
                        language="javascript"
                        theme="vs-dark"
                        value={field.value}
                        onBlur={form.handleBlur}
                        onChange={value => form.setFieldValue(field.name, value)}
                        options={options}
                    />
                </FormControl>
            )}
            validate={validate}
        />
    );
}

ViewControl = compose(withStyles(styles))(ViewControl);


export default {
    name: "Code",
    code: "code",
    EditControl: EditControl,
    ViewControl: ViewControl,
    isCorrect: isCorrect,
    sanitizeValue: sanitizeValue,
    defaultValue: ""
};