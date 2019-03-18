import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Field, getIn} from 'formik';
import {Grid, Typography} from "@material-ui/core";
import {EditOptionsControl, EditTitleControl} from "../Questions";


function validate(value) {
    return !value ? 'Required' : '';
}

function isCorrect(question, value) {
    if (!question.answer || question.answer == value) {
        return true;
    }

    return false;
}

function sanitizeValue(value) {
    return value.trim();
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
                    <EditOptionsControl questionIndex={questionIndex} multiple={false}/>
                </div>
            </Grid>
        </>
    );
}

function ViewControl(props) {
    const {index, quiz, questionID, question, submission, deadlinePassed} = props;

    const answer = submission && submission.answers && submission.answers[questionID] ? submission.answers[questionID] : "";

    let correct = answer && isCorrect(question, answer);
    if (submission && submission.grades && questionID in submission.grades) {
        correct = submission.grades[questionID];
    }

    return (
        <Field
            name={`answers.${questionID}`}
            render={({field, form: {handleChange, handleBlur, touched, values, errors}}) => (
                <FormControl required fullWidth disabled={!!submission || deadlinePassed}>
                    <FormLabel>
                        {submission && <Typography variant="subtitle1" inline>{correct ? "✔" : "✘"} </Typography>}
                        {question.title}
                    </FormLabel>

                    <RadioGroup aria-label={question.title} name={field.name}>
                        {question.options && question.options.map((option, i) => {
                            const checked = getIn(values, field.name) == option.id;
                            const radio = (
                                <Radio
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={option.id}
                                    checked={checked}
                                />
                            );
                            return (
                                <FormControlLabel control={radio} label={option.option} key={i}/>
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            )}
        />
    );
}

export default {
    name: "Single Option",
    code: "single-option",
    EditControl: EditControl,
    ViewControl: ViewControl,
    isCorrect: isCorrect,
    sanitizeValue: sanitizeValue,
    defaultValue: ""
};