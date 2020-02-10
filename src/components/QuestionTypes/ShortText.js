import React from 'react';
import {Editor, TextField, InputLabel} from '../Form';
import {Field, getIn} from 'formik';
import {FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@material-ui/core";
import {EditTitleControl} from "../Questions";
import _ from "lodash";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components';

//material ui for new homepage prototype
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/EditOutlined'
import StartIcon from '@material-ui/icons/Check';
import CommentsIcon from '@material-ui/icons/CommentOutlined';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

// For url patterns, see https://stackoverflow.com/a/5717133
const Formats = {
    'text': {
        'label': 'Plain text',
        'pattern': '',
    },
    'url': {
        'label': 'URL',
        'pattern': new RegExp('^https?:\\/\\/' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'),
    },
    'github': {
        'label': 'Github URL',
        'pattern': new RegExp('^https?:\\/\\/' + // protocol
            '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)*github.com' + // domain name
            '(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'),
    },
    'heroku': {
        'label': 'Heroku URL',
        'pattern': new RegExp('^https?:\\/\\/' + // protocol
            '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)*heroku.com' + // domain name
            '(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'),
    },
};

const CardWrapper = styled.div`

    margin-top: 16px;
`

const CardHeaderWrapper = styled.div`
    background-color: #7D4CDB;
    color: white;
`

const styles = theme => ({
    viewDescription: {
        marginBottom: theme.spacing(2),
    },
    field: {
        height: "100%"
    },
    card: {
        marginTop: theme.spacing(2),
    },
    header: {
        backgroundColor: '#7D4CDB',
        color: 'white',
    }
});


function validate(value, question) {
    if ('format' in question && question.format in Formats && Formats[question.format].pattern) {
        return !!Formats[question.format].pattern.test(value) ? '' : 'Not well formatted';
    }
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
                    <InputLabel fullWidth>Question Content</InputLabel>
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
                    name={`questions.${questionIndex}.format`}
                    render={({field, form: {handleChange, handleBlur, touched, values, errors}}) => (
                        <FormControl>
                            <FormLabel>Format</FormLabel>
                            <RadioGroup aria-label="Format" name={field.name}>
                                {Object.keys(Formats).map(key => {
                                    const checked = getIn(values, field.name) === key;
                                    const radio = (
                                        <Radio
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={key}
                                            checked={checked}
                                        />
                                    );
                                    return (
                                        <FormControlLabel key={key} value={key}
                                                          control={radio} label={Formats[key].label}/>
                                    );
                                })}
                            </RadioGroup>
                        </FormControl>
                    )}
                />
            </Grid>
        </>
    );
}

function ViewControl(props) {
    const {classes, index, quiz, questionID, question, submission, deadlinePassed} = props;

    // only show this for viewing it
    if (submission && 'format' in question && _.indexOf(['url', 'github', 'heroku'], question.format) >= 0) {
        const url = submission.answers[questionID];
        return (
            <div>
                <InputLabel disabled required>
                    {question.title}
                </InputLabel>
                {url &&
                <Typography style={{padding: '8px 0'}}><Link href={url} target="_blank">{url}</Link></Typography>}

            </div>


        );
    }


    return (
        <Field
            name={`answers.${questionID}`}
            render={({field, form: {handleChange, handleBlur, touched, values, errors}}) => {
                return (
                    <CardWrapper>
                        <Card variant="outlined">
                            <CardHeaderWrapper>
                                <CardHeader titleTypographyProps={{variant: 'h5'}} title="Question Title"
                                            subheader={question.title}>
                                </CardHeader>
                            </CardHeaderWrapper>
                            <CardContent>
                                <TextField
                                    required
                                    error={Boolean(getIn(touched, field.name) && getIn(errors, field.name))}
                                    disabled={!!submission}
                                    value={field.value || ''}
                                    name={field.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    description={question.description || ""}
                                    helperText={getIn(errors, field.name)}
                                />
                            </CardContent>
                        </Card>
                    </CardWrapper>


                )
            }}
            validate={value => validate(value, question)}
        />
    );
}

export default {
    name: "Short Text",
    code: "short-text",
    EditControl: EditControl,
    ViewControl: ViewControl,
    isCorrect: isCorrect,
    sanitizeValue: sanitizeValue,
    defaultValue: ""

};