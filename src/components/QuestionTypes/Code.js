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
    const {classes, index, quiz, questionID, question, submission, deadlinePassed} = props;

    const options = {readOnly: !!submission};


    const answer = submission && submission.answers && submission.answers[questionID] ? submission.answers[questionID] : "";
    let correct = answer && isCorrect(question, answer);
    if (submission && submission.grades && questionID in submission.grades) {
        correct = submission.grades[questionID];
    }

    return (
        <Field
            name={`answers.${questionID}`}
            render={({field, form}) => (
                <FormControl required fullWidth>
                    <InputLabel>
                        {submission && <Typography variant="subtitle1" inline>{correct ? "✔" : "✘"} </Typography>}
                        {question.title}
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