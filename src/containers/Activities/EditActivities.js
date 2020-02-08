import React from 'react';
import Typography from '@material-ui/core/Typography';
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import {EditQuiz} from "../../components/Quizzes"
import {UserIsAdmin} from "../../components/Auth";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100vh',
        overflow: 'auto',
    }
});

const EditActivities = props => {
    const {classes, match: {params: {id}}} = props;

    return (
        <main className={classes.root}>
            <Typography variant="h4" gutterBottom component="h2">Edit Activity</Typography>
            <EditQuiz quizID={id} type="activity"/>
        </main>
    );
};


export default compose(
    UserIsAdmin,

    withStyles(styles)
)(EditActivities);