import React from 'react';
import {Typography, withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Moment from "react-moment";

const styles = theme => ({
    quizListGridViewItem: {
        width: 200,
        height: 240
    }
});

const QuizListGridViewItem = props => {
    const {classes, quizID, quiz, hasSubmission, onQuizSelected} = props;

    function handleClicked() {
        onQuizSelected && onQuizSelected(quizID);
    }

    return (
        <Grid item>
            <Card className={classes.quizListGridViewItem}>
                <CardContent>
                    <Typography variant="h5" component="h3">
                        {quiz.name}
                    </Typography>

                    <Typography variant="body1">
                        {quiz.deadline ? <Moment>{quiz.deadline}</Moment> : "No due date"}
                    </Typography>

                    <Typography variant="caption">{hasSubmission ? "completed" : "begin"}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleClicked}>Learn more</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default withStyles(styles)(QuizListGridViewItem);