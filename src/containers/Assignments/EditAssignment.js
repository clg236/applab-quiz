import React from 'react';
import Typography from '@material-ui/core/Typography';
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import {EditQuiz} from "../../components/Quizzes"

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    }
});

const EditAssignment = props => {
    const {classes, match: {params: {id}}} = props;

    return (
        <main className={classes.root}>
            <Typography variant="h4" gutterBottom component="h2">Edit Assignment</Typography>

            <EditQuiz quizID={id} type="assignment" />
        </main>
    );
};


export default compose(
    withStyles(styles)
)(EditAssignment);