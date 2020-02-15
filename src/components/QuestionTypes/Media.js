import React from 'react';
import {Editor, InputLabel} from '../Form';
import {Field} from 'formik';
import {FormControl, Grid, withStyles} from "@material-ui/core";
import {EditTitleControl} from "../Questions";
import {compose} from "redux";
import TextField from "../Form/TextField";
import _ from "lodash";
import VideoRecorder from 'react-video-recorder';
import styled from 'styled-components';


const styles = theme => ({
    viewDescription: {
        marginBottom: theme.spacing(2),
    },
    field: {
        height: "100%"
    },

});

const VideoWrapper = styled.div`
    min-height: "1280",
    min-width: "720",
`;

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
                    <InputLabel>Record yourself!</InputLabel>
                    <VideoWrapper>
                        <VideoRecorder 
                            onRecordingComplete={(videoBlob) => {
                            // Do something with the video...
                            console.log('videoBlob', videoBlob)
                            }} 
                        />
                    </VideoWrapper>

  <Grid item xs={12}>
            <InputLabel>Response Type</InputLabel>
            </Grid>
                </FormControl>
            </Grid>
            <Grid item xs={12}>

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
                <FormControl required fullWidth
                             error={form.errors && Boolean(_.get(form.errors, `answers.${questionID}`))}>
                    <InputLabel>{question.title}</InputLabel>

                    {question.description && (
                        <div className={classes.viewDescription}
                             dangerouslySetInnerHTML={{__html: question.description}}/>
                    )}

                    <Editor field={field} form={form} withMargin
                            maxWords={question.maxWords}
                            disabled={!!submission}/>

                </FormControl>
            )}
            validate={value => validate(value, question)}
        />
    );
}

ViewControl = compose(withStyles(styles))(ViewControl);

export default {
    name: "Video Question",
    code: "video-question",
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