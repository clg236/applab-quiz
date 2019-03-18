import React from 'react';
import {Editor, InputLabel} from '../Form';
import {Field} from 'formik';
import {FormControl, Grid, Typography, withStyles} from "@material-ui/core";
import {EditDeadlineControl, EditTitleControl} from "../Questions";
import {compose} from "redux";
import TextField from "../Form/TextField";
import _ from "lodash";


const styles = theme => ({
    viewDescription: {
        marginBottom: theme.spacing.unit * 2,
    },
    field: {
        height: "100%"
    }
});


function validate(value, question) {
    if (!value) {
        return 'Required';
    }

    if (question && question.maxWords && value.trim().split(/\s+/).length > question.maxWords) {
        return "It's too long";
    }

    return '';
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
                <FormControl fullWidth required>
                    <InputLabel>Question Content</InputLabel>
                    <Field className={styles.theme}
                           name={`questions.${questionIndex}.description`}
                           render={({field, form}) => (
                               <Editor field={field} form={form} withMargin/>
                           )}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Field
                    name={`questions.${questionIndex}.maxWords`}
                    render={({field}) => (
                        <TextField label="Max words" fullWidth type="number" {...field} />
                    )}
                />
            </Grid>
        </>
    );
}

function ViewControl(props) {
    const {classes, index, quiz, questionID, question, submission, deadlinePassed} = props;

    return (
        <Field
            name={`answers.${questionID}`}
            render={({field, form}) => (
                <FormControl required fullWidth error={form.errors && Boolean(_.get(form.errors, `answers.${questionID}`))}>
                    <InputLabel>{question.title}</InputLabel>

                    {question.description && (
                        <div className={classes.viewDescription}
                             dangerouslySetInnerHTML={{__html: question.description}}/>
                    )}

                    <Editor field={field} form={form} withMargin
                            maxWords={question.maxWords}
                            disabled={!!submission || deadlinePassed}/>

                </FormControl>
            )}
            validate={value => validate(value, question)}
        />
    );
}

ViewControl = compose(withStyles(styles))(ViewControl);

export default {
    name: "Long Text",
    code: "long-text",
    EditControl: EditControl,
    ViewControl: ViewControl,
    isCorrect: isCorrect,
    sanitizeValue: sanitizeValue,
    defaultValue: "",
    prepareForEditControl: question => {
        question.maxWords = question.maxWords || 0;
        return question;
    }
};