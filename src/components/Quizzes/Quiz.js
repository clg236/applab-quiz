import React from 'react';
import {compose} from 'redux';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";
import {QuestionList} from "../Questions";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});


const Quiz = (props) => {
    const {classes, quiz} = props;

    return (
        <Paper className={classes.root} >
            <Typography variant="h5" component="h3">{quiz.name}</Typography>
            <Typography>
                {quiz.description}
            </Typography>

            <QuestionList quiz={quiz}/>
        </Paper>
    );
};


export default compose(
    withStyles(styles)
)(Quiz);