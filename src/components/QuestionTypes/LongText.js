import React from 'react';
import {TextField, Editor, InputLabel} from '../Form';
import {Field} from 'formik';
import {FormControl, Grid, Typography, withStyles} from "@material-ui/core";
import {EditDeadlineControl, EditTitleControl} from "../Questions";
import {compose} from "redux";


const styles = theme => ({
    viewDescription: {
        marginTop: theme.spacing.unit * 2,
        marginbottom: theme.spacing.unit * 2,
    }
});


function validate(value) {
    return !value ? 'Required' : '';
}

function isCorrect(question, value) {
    return true;
}

function EditControl({questionIndex, question}) {
    return (
        <>
            <Grid item xs={12}>
                <EditTitleControl name={`questions.${questionIndex}.title`}/>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth required>
                    <InputLabel>Description</InputLabel>
                    <Field
                        name={`questions.${questionIndex}.description`}
                        render={({field, form}) => (
                            <Editor field={field} form={form} withMargin/>
                        )}
                    />
                </FormControl>
            </Grid>
        </>
    );
}

function ViewControl(props) {
    const {classes, index, quiz, question, submission, deadlinePassed} = props;

    return (
        <Field
            name={`answers.${question.id}`}
            render={({field, form}) => (
                <FormControl required fullWidth>
                    <InputLabel>{`${index + 1}. ${question.title}`}</InputLabel>

                    {question.description && (
                        <div className={classes.viewDescription}
                             dangerouslySetInnerHTML={{__html: question.description}}/>
                     )}

                    <Editor field={field} form={form} disabled={!!submission || deadlinePassed} />
                </FormControl>
            )}
            validate={validate}
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
    defaultValue: ""
};