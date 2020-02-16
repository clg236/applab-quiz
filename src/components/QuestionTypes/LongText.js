import React from "react";
import { Editor, InputLabel } from "../Form";
import { Field } from "formik";
import { FormControl, Grid, withStyles } from "@material-ui/core";
import { EditTitleControl } from "../Questions";
import { compose } from "redux";
import TextField from "../Form/TextField";
import _ from "lodash";

import styled from "styled-components";

//material ui for new homepage prototype
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/EditOutlined";
import StartIcon from "@material-ui/icons/Check";
import CommentsIcon from "@material-ui/icons/CommentOutlined";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import VideoRecorder from 'react-video-recorder';

const styles = theme => ({
  viewDescription: {
    marginBottom: theme.spacing(2)
  },
  field: {
    height: "100%"
  }
});

const CardWrapper = styled.div`
  margin-bottom: 16px;
`;

const CardHeaderWrapper = styled.div`
  background-color: #7d4cdb;
  color: white;
`;

const VideoWrapper = styled.div`
  display: flex;
  
`;



function validate(value, question) {
  if (!value) {
    return "Required";
  }

  if (
    question &&
    question.maxWords &&
    value.trim().split(/\s+/).length > question.maxWords
  ) {
    return "It's too long";
  }

  return "";
}

function isCorrect(question, value) {
  return true;
}

function sanitizeValue(value) {
  return value.trim();
}

function EditControl({ questionIndex, question }) {
  return (
    <>
      <Grid item xs={12}>
        <EditTitleControl name={`questions.${questionIndex}.title`} />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Question Content</InputLabel>
          <Field
            className={styles.theme}
            name={`questions.${questionIndex}.description`}
            render={({ field, form }) => (
              <Editor field={field} form={form} withMargin />
            )}
          />
          
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Video Content</InputLabel>
          <VideoWrapper>

            <VideoRecorder 
                            onRecordingComplete={(videoBlob) => {
                            // Do something with the video...
                            console.log('videoBlob', videoBlob)
                            }} 
                />


          </VideoWrapper>

          
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Field
          name={`questions.${questionIndex}.maxWords`}
          render={({ field }) => (
            <TextField label="Max words" fullWidth type="number" {...field} />
          )}
        />
      </Grid>
    </>
  );
}

function ViewControl(props) {
  const {
    classes,
    index,
    quiz,
    questionID,
    question,
    submission,
    deadlinePassed
  } = props;

  return (
    <CardWrapper>
      <Card variant="oulined">
        <CardHeaderWrapper>
          <CardHeader
            titleTypographyProps={{ variant: "h5" }}
            title="Question Title"
            subheader={question.title}
          ></CardHeader>
        </CardHeaderWrapper>
        <CardContent>
          <Field
            name={`answers.${questionID}`}
            render={({ field, form }) => (
              <FormControl
                required
                fullWidth
                error={
                  form.errors &&
                  Boolean(_.get(form.errors, `answers.${questionID}`))
                }
              >
                <InputLabel>{question.title}</InputLabel>

                {question.description && (
                  <div
                    className={classes.viewDescription}
                    dangerouslySetInnerHTML={{ __html: question.description }}
                  />
                )}

                <Editor
                  field={field}
                  form={form}
                  withMargin
                  maxWords={question.maxWords}
                  disabled={!!submission}
                />
              </FormControl>
            )}
            validate={value => validate(value, question)}
          />
        </CardContent>
      </Card>
    </CardWrapper>
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
