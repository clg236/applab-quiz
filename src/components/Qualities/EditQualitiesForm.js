import {Button, CircularProgress, Grid, withStyles} from "@material-ui/core";
import {Field, FieldArray, withFormik} from "formik";
import React from "react";
import {compose} from "redux";
import {firebaseConnect, getVal, isEmpty, isLoaded, withFirebase} from "react-redux-firebase";
import {withSnackbar} from "notistack";
import uuid from "uuid";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {TextField} from "../Form";


const EmptyQuality = {
    id: '',
    name: '',
};

const styles = theme => ({});


let QualityFieldsArray = props => {
    const {form: {values: {qualities}}, push, remove} = props;

    function handleAddQuality() {
        push({...EmptyQuality, id: uuid.v4()});
    }

    return (
        <>
            <List>
                {qualities.map((quality, index) => (
                    <ListItem key={index}>
                        <Field
                            name={`qualities.${index}.name`}
                            render={({field}) => (
                                <TextField label={`Quality ${index + 1}`} required fullWidth
                                           placeholder="e.g. How well do you think...?" {...field} />
                            )}
                        />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Delete" onClick={remove}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <div>
                <Button color="primary" fullWidth={false} onClick={handleAddQuality}>
                    Add a quality
                </Button>
            </div>
        </>
    )
};


const EditQualitiesForm = (props) => {
    const {handleSubmit, quiz} = props;

    if (!isLoaded(quiz)) {
        return <CircularProgress/>;
    } else if (isEmpty(quiz)) {
        return "There is no such quiz.";
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
                <Grid item md={12}>
                    <FieldArray name="qualities" component={QualityFieldsArray}/>
                </Grid>

                <Grid item md={12}>
                    <Button color="primary" variant="contained" type="submit">Save</Button>
                </Grid>
            </Grid>
        </form>
    );
};


export default compose(
    firebaseConnect(({quizID}) => {
        return [
            {
                path: `quizzes/${quizID}`
            }
        ];
    }),

    withFirebase,

    withSnackbar,

    connect(
        (state, {quizID}) => {
            return {
                quiz: getVal(state.firebase.data, `quizzes/${quizID}`)
            }
        }
    ),

    withFormik({
        enableReinitialize: true,

        mapPropsToValues: props => {
            const {quiz} = props

            // TODO check if the question type exists
            let qualities = [];

            if (isLoaded(quiz) && !isEmpty(quiz) && quiz.qualities) {
                qualities = quiz.qualities;
            }

            return {
                qualities
            };
        },

        handleSubmit: (values, actions) => {
            const {props: {quizID, quiz, firebase: {updateWithMeta}, enqueueSnackbar}} = actions;
            updateWithMeta(`quizzes/${quizID}`, values).then(() => enqueueSnackbar("Saved!"));
        }
    }),

    withStyles(styles)
)(EditQualitiesForm);