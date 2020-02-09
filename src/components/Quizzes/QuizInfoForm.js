import React from 'react';
import {compose} from 'redux';
import {CircularProgress, FormControl, Grid, withStyles} from "@material-ui/core";
import {Field, withFormik} from "formik";
import Button from "@material-ui/core/Button";
import {firebaseConnect, getVal, isEmpty, isLoaded, withFirebase} from "react-redux-firebase";
import {withSnackbar} from 'notistack';
import TextField from "../Form/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import API from "../../apis";
import {Editor, InputLabel} from "../Form";

//material ui for new homepage prototype
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {makeStyles} from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/EditOutlined'
import StartIcon from '@material-ui/icons/Check';
import CommentsIcon from '@material-ui/icons/CommentOutlined';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    header: {
        backgroundColor: '#7D4CDB',
        color: 'white',
    },
    fields: {
        marginTop: '25px',
        backgroundColor: 'black'
    },
});

const INITIAL_VALUES = {
    name: "",
    description: "",
    deadline: "",
    published: true,
    type: "quiz"
};

const QuizInfoForm = (props) => {
    const {classes, quizID, quiz, handleSubmit, values, errors, isSubmitting, isValid} = props;

    if (quizID && !isLoaded(quiz)) {
        return <CircularProgress/>;
    }

    return (
        <Card variant="outlined">
            <CardHeader className={classes.header} title="Create an Activity" subheaderTypographyProps={{color:"secondary"}} subheader="Please complete the * fields below"></CardHeader>
            <CardContent>

            
        <form onSubmit={handleSubmit} >


                    <Field name="Activity Title"  >
                        {({field, form}) => (<TextField margin="normal" label="Activity Title" required fullWidth={true} {...field}
                                                        error={Boolean(errors[field.name])}/>)}
                    </Field>
                    <Field name="Activity SubTitle" >
                        {({field, form}) => (<TextField margin="normal" label="Activity Subtitle" required fullWidth={true} {...field}
                                                        error={Boolean(errors[field.name])}/>)}
                    </Field>
                    <FormControl fullWidth margin="dense">
                        
                        <InputLabel>Activity Description</InputLabel>
                        <Field 
                            
                            name="description">
                            {({field, form}) => (<Editor field={field} className={classes.editor} placeholder="type something..." form={form} />)}
                        </Field>
                    </FormControl>


  
                    <Field name="deadline">
                        {({field, form, meta}) => (
                            <TextField label="Deadline" margin="normal" type="datetime-local" fullWidth {...field}
                                       error={Boolean(errors[field.name])}/>)}
                    </Field>
  

               
                    <Field name="published">{({field, form, meta}) => (
                        <FormControlLabel control={
                            <Switch
                                checked={Boolean(field.value)}
                                onChange={field.onChange}
                                name={field.name}
                            />
                        } label="Publish immediately?"/>
                    )}</Field>
             




            
        </form>
        </CardContent>
        <CardActions>
                <Button fullWidth color="primary" variant="contained" type="submit" disabled={isSubmitting || !isValid}>
                        {quizID && quiz ? "Save" : "Continue"}
                    </Button>
                </CardActions>
        </Card>
    );
};

export default compose(
    withSnackbar,

    firebaseConnect(({quizID}) => {
        const queries = [];

        if (quizID) {
            queries.push({
                path: `quizzes/${quizID}`
            })
        }

        return queries;
    }),

    connect(
        (state, {quizID}) => {
            return {
                quiz: quizID ? getVal(state.firebase.data, `quizzes/${quizID}`) : null
            };
        },
        {
            pushToHistory: push
        }
    ),


    withFormik({
        enableReinitialize: true,

        mapPropsToValues: props => {
            const {quizID, quiz} = props;

            const type = props.type ? props.type : 'quiz';

            if (quizID) {
                if (!isLoaded(quiz) || isEmpty(quiz)) {
                    return {...INITIAL_VALUES, type};
                } else {
                    return {
                        name: quiz.name,
                        description: "description" in quiz ? quiz.description : "",
                        deadline: "deadline" in quiz ? quiz.deadline : "",
                        published: "published" in quiz ? quiz.published : true,
                        type
                    }
                }
            } else {
                return {...INITIAL_VALUES, type};
            }
        },

        validate: values => {
            const errors = {};

            if (!values.name) {
                errors.name = 'Required';
            }

            return errors;
        },

        handleSubmit: (values, actions) => {
            const {props: {quizID, enqueueSnackbar, pushToHistory}} = actions;

            API.Quizzes.saveQuizInfo(values, quizID)
                .then(ref => {
                    actions.setSubmitting(false);

                    if (quizID) {
                        enqueueSnackbar("Saved!");
                    } else {
                        let redirectURL = actions.props.redirectURL;
                        if (!redirectURL) {
                            if (values.type == 'quiz') {
                                redirectURL = `quizzes/:id`;
                            } else if (values.type == 'assignment') {
                                redirectURL = `assignments/:id`;
                            } else if (values.type == 'activity') {
                                redirectURL = `activities/:id`;
                            }
                        }

                        if (redirectURL && ref) {
                            pushToHistory(redirectURL.replace(/:id/, ref.key));
                        }
                    }
                });
        }
    }),

    withStyles(styles)
)(QuizInfoForm);