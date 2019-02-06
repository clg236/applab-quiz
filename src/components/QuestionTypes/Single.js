import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Field, FieldArray} from 'formik';
import {FormGroup, Grid} from "@material-ui/core";
import {EditTitleControl} from "../Questions";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";


function validate(value) {
    return !value ? 'Required' : '';
}

function isCorrect(question, value) {
    return true;
}

function EditControl(props) {
    const {questionIndex, question} = props;

    return (
        <>
            <Grid item xs={12}>
                <EditTitleControl name={`questions.${questionIndex}.title`}/>
            </Grid>

            <Grid item xs={12}>
                <FieldArray
                    name={`questions.${questionIndex}.options`}
                    render={({push}) => (
                        <>
                            <div>
                                <FormLabel required>Question options</FormLabel>
                            </div>
                            <div>
                                {question && question.options && question.options.length > 0 && (
                                    <List>
                                        {question.options.map((option, index) => (
                                            <Field name={`questions.${questionIndex}.options.${index}`} key={index}
                                                   render={({field}) => (
                                                       <div>Hello </div>
                                                   )}
                                            />
                                        ))}
                                    </List>
                                )}
                            </div>
                            <div>
                                <Button fullWidth={false} onClick={() => push('')}>
                                    Add an option
                                </Button>
                            </div>
                        </>
                    )}
                />
            </Grid>
        </>
    );
}

function ViewControl(props) {
    const {index, quiz, question, submission, deadlinePassed} = props;

    return (
        <Field
            name={`answers.${question.id}`}
            render={({field, form: {handleChange, handleBlur, touched, values, errors}}) => (
                <FormControl required fullWidth error={Boolean(touched[field.name] && errors[field.name])}>
                    <FormLabel>{`${index + 1}. ${question.title}`}</FormLabel>
                    <RadioGroup
                        aria-label={question.title}
                        name={field.name}
                    >
                        {question.options && question.options.map((option, i) => {
                            const radio = (
                                <Radio
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={option.option}
                                    checked={Boolean(values[field.name] == option.option)}
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
    code: "single",
    EditControl: EditControl,
    ViewControl: ViewControl,
    isCorrect: isCorrect,
    defaultValue: ""
};