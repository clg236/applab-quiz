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
                <div>
                    <EditOptionsControl questionIndex={questionIndex} multiple/>
                </div>
            </Grid>
        </>
    );
}

function ViewControl(props) {
    const {index, quiz, question, submission, deadlinePassed} = props;

    const answer = submission && submission.answers && submission.answers[question.id] ? submission.answers[question.id] : "";

    let correct = answer && isCorrect(question, answer);
    if (submission && submission.grades && question.id in submission.grades) {
        correct = submission.grades[question.id];
    }

    return (
        <FormControl required fullWidth disabled={!!submission || deadlinePassed}>
            <FormLabel>
                {submission && <Typography variant="subtitle1" inline>{correct ? "✔" : "✘"} </Typography>}
                {`${index + 1}. ${question.title}`}
            </FormLabel>
            <FormGroup>
                {question.options && question.options.map((option, i) => (
                    <Field
                        key={i}
                        name={`answers.${question.id}.${i}`}
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