import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Field, getIn} from 'formik';
import {Grid} from "@material-ui/core";
import {EditOptionsControl, EditTitleControl} from "../Questions";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import {Editor, InputLabel} from "../Form";


const styles = theme => ({
    viewDescription: {
        marginBottom: theme.spacing.unit * 2,
    },
    field: {
        height: "100%"
    }
});

function validate(value) {
    return !value ? 'Required' : '';
}

function isCorrect(question, value) {
    if (!question.answers || question.answers.length === 0) {
        return true;
    }

    const correct = question.answers.reduce((out, bool, index) => bool ? out.concat(index) : out, []);
    const provided = value.reduce((out, bool, index) => bool ? out.concat(index) : out, []);

    // all the answers should match
    if (correct.length == provided.length
        && correct.every(i => provided.includes(i))
        && provided.every(i => correct.includes(i))) {

        return true;
    }

    return false;
}

function sanitizeValue(value) {
    if (typeof value == 'object' && value.length > 0) {
        value.forEach((v, index, arr) => arr[index] = !!v);
    }

    return value;
}

function EditControl(props) {
    const {questionIndex, question} = props;

    return (
        <>
            <Grid item xs={12}>
                <EditTitleControl name={`questions.${questionIndex}.title`}/>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
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
                <div>
                    <EditOptionsControl questionIndex={questionIndex} multiple/>
                </div>
            </Grid>
        </>
    );
}

function ViewControl(props) {
    const {classes, index, quiz, questionID, question, submission, deadlinePassed} = props;

    const answer = submission && submission.answers && submission.answers[questionID] ? submission.answers[questionID] : "";

    let correct = answer && isCorrect(question, answer);
    if (submission && submission.grades && questionID in submission.grades) {
        correct = submission.grades[questionID];
    }

    return (
        <FormControl required fullWidth disabled={!!submission}>
            <FormLabel>
                {submission && <Typography variant="subtitle1" inline>{correct ? "✔" : "✘"} </Typography>}
                {question.title}
            </FormLabel>

            {question.description && (
                <div className={classes.viewDescription}
                     dangerouslySetInnerHTML={{__html: question.description}}/>
            )}

            <FormGroup>
                {question.options && question.options.map((option, i) => (
                    <Field
                        key={i}
                        name={`answers.${questionID}.${i}`}
                        render={({field, form: {values}}) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={Boolean(getIn(values, field.name))}
                                        {...field}
                                        value={option.id}
                                    />
                                } label={option.option}
                            />
                        )}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
}

export default {
    name: "Multiple Options",
    code: "multiple-options",
    EditControl: EditControl,
    ViewControl: ViewControl,
    isCorrect: isCorrect,
    sanitizeValue: sanitizeValue,
    defaultValue: []
};