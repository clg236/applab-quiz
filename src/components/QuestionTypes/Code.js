import React from 'react';
import {Editor, InputLabel} from '../Form';
import {Field, getIn} from 'formik';
import {FormControl, Grid, withStyles} from "@material-ui/core";
import {EditDeadlineControl, EditTitleControl} from "../Questions";
import MonacoEditor from "react-monaco-editor";
import {compose} from "redux";
import Typography from "@material-ui/core/Typography";

//material ui for new homepage prototype
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/EditOutlined'
import StartIcon from '@material-ui/icons/Check';
import CommentsIcon from '@material-ui/icons/CommentOutlined';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
    viewDescription: {
        marginBottom: theme.spacing(2),
    },
    header: {
        backgroundColor: '#6FFFB0'
    },
    avatar: {
        backgroundColor: '#FD6FFF',
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
        <div>
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
        </div>
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
                <Card variant="outlined">
                <CardHeader titleTypographyProps={{variant:'h5' }} className={classes.header} title={question.title}></CardHeader>
                <CardContent>
                <FormControl required fullWidth error={Boolean(getIn(form.errors, field.name))}>
                    <InputLabel>
                        {submission && <Typography variant="h2" color="primary" display={"inline"}>{correct ? "✔" : "✘"} </Typography>}
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
                </CardContent>
                </Card>
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