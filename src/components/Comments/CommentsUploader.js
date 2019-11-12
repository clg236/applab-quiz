import React, {useState} from 'react';
import {compose} from 'redux';
import {FormControl, Grid, TableHead, TextareaAutosize, withStyles} from "@material-ui/core";
import {useFormik} from "formik";
import Button from "@material-ui/core/Button";
import {firebaseConnect, getVal, populate, withFirebase} from "react-redux-firebase";
import {withSnackbar} from 'notistack';
import {connect} from "react-redux";
import {InputLabel} from "../Form";
import * as Papa from "papaparse";
import _ from "lodash";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "../Form/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import API from "../../apis";


const styles = theme => ({
    'textarea': {
        "width": "100%"
    },
    submit: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(2)
    },
});

const CommentsUploader = props => {
    const {classes, users, quiz: {submissions}, enqueueSnackbar} = props;

    const [diffs, setDiffs] = useState({});

    const formik = useFormik({
        initialValues: {
            comments: "",
        },
        validate: values => {
            const errors = {};

            if (!values.comments) {
                errors.comments = 'Required';
            } else {
                const parsed = Papa.parse(values.comments, {header: false});
                if (parsed.errors.length > 0) {
                    errors.comments = 'Wrong CSV format detected.';
                }
            }
            return errors;
        },
        onSubmit: values => {
            setDiffs(findDiffs(users, submissions, Papa.parse(values.comments, {header: false}).data));
        },
    });

    const findDiffs = (users, submissions, comments) => {
        let diffs = {};

        // loop comments
        comments.forEach(row => {
            const [email, comment] = row;

            diffs[email] = {submission: "", comment: comment, error: ''};

            // find the user from users using email
            const user = _.head(_.filter(users, u => u.email === email));

            if (!user) {
                diffs[email]['error'] = "We couldn't find this user in our database.";
            } else {
                const submissionID = _.head(_.filter(Object.keys(submissions), id => submissions[id].user && submissions[id].user.uid === user.uid));
                if (!submissionID) {
                    diffs[email]['error'] = "We couldn't find the submission of this user in our database.";
                } else {
                    diffs[email]['submission'] = {id: submissionID, ...submissions[submissionID]};
                }
            }
        });

        return diffs;
    };

    const cancelUpload = () => setDiffs({});
    const confirmUpload = () => {
        const comments = _.filter(_.map(diffs, diff => {
            if (diff.error || !diff.submission || !diff.comment) {
                return '';
            }

            return {comment: diff.comment, submission: diff.submission};
        }));

        API.Comments.uploadComments(comments).then(_ => {
            enqueueSnackbar("Submitted!");
            setDiffs({});
        });

    };

    if (Object.keys(diffs).length > 0) {
        return <UploadConfirmation diffs={diffs} classes={classes} onCancel={cancelUpload} onConfirm={confirmUpload}/>
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item md={12}>
                        <FormControl fullWidth>
                            <InputLabel>Paste the comments in csv format below (EMAIL, COMMENT):</InputLabel>
                            <TextareaAutosize rows="10"
                                              name="comments"
                                              className={classes.textarea}
                                              onChange={formik.handleChange}
                                              value={formik.values.comments}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" type="submit"
                                disabled={formik.isSubmitting || !formik.isValid}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

const UploadConfirmation = ({classes, diffs, onConfirm, onCancel}) => {
    const disabled = _.filter(diffs, diff => !!diff.error).length > 0;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Note</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {_.map(diffs, (diff, email) => (
                        <TableRow key={email}>
                            <TableCell>{email}</TableCell>
                            <TableCell>{diff.comment}</TableCell>
                            <TableCell>{diff.error}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </Grid>
            <Grid item xs={12}>
                <Button color="secondary" variant="contained" onClick={onCancel} className={classes.submit}>Cancel</Button>
                <Button color="primary" variant="contained" onClick={onConfirm} className={classes.submit} disabled={disabled}>Confirm Upload</Button>
            </Grid>
        </Grid>
    );
};

export default compose(
    withSnackbar,
    withFirebase,

    firebaseConnect(props => {
        const {quizID} = props;

        return [
            {
                path: `quizzes/${quizID}`,
                populates: ["submissions:submissions"]
            },
            {
                path: `users`,
            }
        ];
    }),

    connect(
        (state, props) => {
            const {quizID} = props;

            return {
                quiz: populate(state.firebase, `quizzes/${quizID}`, [
                    "submissions:submissions"
                ]),
                users: getVal(state.firebase.data, 'users'),
            };
        }
    ),

    withStyles(styles)
)(CommentsUploader);