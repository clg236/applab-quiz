import React from 'react';
import {compose} from 'redux';
import {CircularProgress, Grid, Typography, withStyles} from "@material-ui/core";
import {Field, withFormik} from "formik";
import Button from "@material-ui/core/Button";
import {firebaseConnect, getVal, isEmpty, isLoaded, withFirebase} from "react-redux-firebase";
import {withSnackbar} from 'notistack';
import {connect} from "react-redux";
import API from "../../apis";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "../Form/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Editor from "../Form/Editor";

const styles = theme => ({});


const ProfileForm = props => {
    const {classes, uid, user, handleSubmit, isSubmitting, isValid} = props;

    if (!isLoaded(user)) {
        return <CircularProgress/>;
    } else if (isEmpty(user)) {
        return <Typography variant="body1">There is no user.</Typography>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Field
                        name="writingAbility"
                        render={({field}) => (
                            <FormControl required>
                                <InputLabel htmlFor="writingAbility">Writing Ability</InputLabel>
                                <Select {...field}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Excellent">Excellent</MenuItem>
                                    <MenuItem value="Good">Good</MenuItem>
                                    <MenuItem value="Average">Average</MenuItem>
                                    <MenuItem value="Poor">Poor</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid item md={12}>
                    <Field
                        name="computationalLiteracy"
                        render={({field}) => (
                            <FormControl required>
                                <InputLabel htmlFor="computationalLiteracy">Computational Literacy</InputLabel>
                                <Select {...field}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Excellent">Excellent</MenuItem>
                                    <MenuItem value="Good">Good</MenuItem>
                                    <MenuItem value="Average">Average</MenuItem>
                                    <MenuItem value="Poor">Poor</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid item md={12}>
                    <FormControl fullWidth required>
                        <InputLabel>Notes</InputLabel>
                        <Field
                           name="notes"
                           render={({field, form}) => (
                               <Editor field={field} form={form} withMargin/>
                           )}
                        />
                    </FormControl>
                </Grid>

                <Grid item md={12}>
                    <Button color="primary" variant="contained" type="submit" disabled={isSubmitting || !isValid}>Save</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default compose(
    withSnackbar,

    firebaseConnect(props => (
        [
            {
                path: `users/${props.uid}`
            }
        ]
    )),

    withFirebase,

    connect(
        ({firebase}, props) => ({
            auth: firebase.auth,
            user: getVal(firebase.data, `users/${props.uid}`)
        })
    ),

    withFormik({

        mapPropsToValues: props => {
            const {user} = props;

            const values = {
                writingAbility: "",
                computationalLiteracy: "",
                notes: ""
            };

            if (isLoaded(user) && !isEmpty(user)) {
                values.writingAbility = user.writingAbility ? user.writingAbility : "";
                values.computationalLiteracy = user.computationalLiteracy ? user.computationalLiteracy: "";
                values.notes = user.notes ? user.notes : "";
            }

            return values;
        },

        validate: values => {
            const errors = {};

            if (!values.writingAbility) {
                errors.writingAbility = 'Required';
            }

            if (!values.computationalLiteracy) {
                errors.computationalLiteracy = 'Required';
            }

            if (!values.notes) {
                errors.notes = 'Required';
            }

            return errors;
        },

        handleSubmit: (values, actions) => {
            const {
                props: {
                    uid,
                    user,
                    enqueueSnackbar
                }
            } = actions;

            API.Users.saveProfile(uid, values).then(_ => {
                actions.setSubmitting(false);
                enqueueSnackbar("Saved!");
            });
        }
    }),

    withStyles(styles)
)(ProfileForm);