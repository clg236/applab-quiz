import React from 'react';
import {Typography, withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Moment from "react-moment";
import {compose} from "redux";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import CardHeader from "@material-ui/core/CardHeader";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import CommentsIcon from "@material-ui/icons/CommentOutlined";
import Avatar from "@material-ui/core/Avatar";
import StartIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/EditOutlined";
import {makeStyles, createStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => createStyles({
    card: {
        margin: theme.spacing(2),
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-between",
    },
    avatar: {
        backgroundColor: '#7D4CDB',
    },
    actions: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
    }
}));

const QuizListGridViewItem = props => {
    const {index, quizID, quiz, hasSubmission, quizURL, pushToHistory} = props;

    const classes = useStyles();

    // TODO
    const unreadComments = 2;

    function handleClicked() {
        quizURL && pushToHistory(quizURL.replace(/:id/, quizID));
    }

    return (
        <Grid variant="outlined" item md={3} xs={12} component={Card} className={classes.card}>
            <div>
                <CardHeader titleTypographyProps={{variant: 'h5'}} className={classes.header} title={quiz.name}
                            subheader={quiz.deadline ?
                                <span>Due: <Moment>{quiz.deadline}</Moment></span> : "Due: No due date"}
                            action={
                                <Badge badgeContent={unreadComments} overlap="circle" color="primary">
                                    <IconButton color="primary" aria-label="comments">
                                        <CommentsIcon/>
                                    </IconButton>
                                </Badge>
                            }
                            avatar={<Avatar aria-label="index" className={classes.avatar}>{index + 1}</Avatar>}>
                </CardHeader>

                <CardContent>
                    <Typography variant="body2"
                                dangerouslySetInnerHTML={{__html: quiz.description.replace(/<p><br\/?><\/p>/mg, "")}}/>
                </CardContent>
            </div>

            <CardActions >
              
                {!hasSubmission ? <Button fullWidth startIcon={<StartIcon/>} size="small" variant="contained"
                                         color="primary" onClick={handleClicked}>START</Button> :
                    <Button variant="outlined" fullWidth startIcon={<EditIcon/>} size="small"
                            onClick={handleClicked}>Edit</Button>}


            </CardActions>
        </Grid>
    )
}


export default compose(
    connect(null, {
        pushToHistory: push
    }),
)(QuizListGridViewItem);