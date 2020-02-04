import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isEmpty, isLoaded, populate} from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {QuestionsForm} from "../../components/Questions";
import {CommentForm, CommentList} from "../../components/Comments";
import classnames from "classnames";
import {QualitiesForm} from "../../components/Qualities";
import API from "../../apis";
import * as ROLES from "../../constants/roles";

//material ui for new homepage prototype
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/EditOutlined'
import StartIcon from '@material-ui/icons/Check';
import CommentsIcon from '@material-ui/icons/CommentOutlined';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100vh',
        overflow: 'auto',
    },

    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

    form: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2)
    },

    comments: {
        marginTop: theme.spacing(2)
    },

    commentForm: {
        marginTop: theme.spacing(2)
    },
    header: {
        backgroundColor: '#7D4CDB',
        color: 'white',
    }
});


const ViewQuiz = props => {
    const {classes, user, quizID, quiz, submission} = props;

    let content = '';
    let submissionID = props.submissionID;
    let type = props.type ? props.type : 'quiz';

    if (!isLoaded(quiz) || (submissionID && !isLoaded(submission)) || (!submissionID && !isLoaded(user))) {
        content = <CircularProgress/>;
    } else if (isEmpty(quiz)) {
        content = <Typography variant="body1" gutterBottom>There are no current quizzes.</Typography>;
    } else {

        if (!submissionID) {
            if (user.submissions) {
                Object.keys(user.submissions).forEach(key => {
                    if (user.submissions[key].subject && user.submissions[key].subject.id == quizID) {
                        submissionID = key;
                    }
                });
            }
        }

        content = (
            <>
            <Card className={classes.card} variant="outlined">
                <CardHeader titleTypographyProps={{variant:'h2' }} className={classes.header} title={quiz.name} >
                </CardHeader>
                <CardContent> 
                    <Typography variant="body1" >
                        description of the assignment goes here...
                    </Typography>
                </CardContent>
            </Card>
                {/* <Typography variant="h4" gutterBottom component="h2">
                    {quiz.name} 
                </Typography> */}

                {submissionID && submission && submission.user && (
                    <Typography variant="subheading">by {submission.user.displayName}</Typography>
                )}

                
                    <QuestionsForm quizID={quizID} submissionID={submissionID} type={type}/>
                

                {submissionID && (
                    <Paper className={classnames(classes.paper, classes.comments)}>
                        <Typography variant="h5" gutterBottom component="h3">Comments</Typography>
                        <CommentList submissionID={submissionID} type={type}/>

                        <div className={classes.commentForm}>
                            <Typography variant="h6" gutterBottom component="h4">Leave a comment</Typography>
                            <CommentForm submissionID={submissionID} type={type}/>
                        </div>
                    </Paper>
                )}

                {submissionID && API.Users.hasRole(ROLES.ROLE_ADMIN) && (
                    <Paper className={classnames(classes.paper, classes.comments)}>
                        <Typography variant="h5" gutterBottom component="h3">Qualities</Typography>
                        <div className={classes.commentForm}>
                            <QualitiesForm quizID={quizID} submissionID={submissionID} type={type}/>
                        </div>
                    </Paper>
                )}
            </>
        )
    }

    return <main className={classes.content}>{content}</main>;
};


export default compose(
    firebaseConnect(props => {
        const {match: {params: {id, submissionID}}} = props;
        const queries = [{
            path: `quizzes/${id}`
        }];

        if (submissionID) {
            queries.push({
                path: `submissions/${submissionID}`
            });
        } else {
            const uid = props.firebase.auth().currentUser.uid;

            queries.push({
                path: `users/${uid}`,
                populates: ["submissions:submissions"]
            });
        }

        return queries;
    }),

    connect(
        (state, props) => {
            const {firebase: {auth}} = state;
            const {match: {params: {id, submissionID}}} = props;

            const data = {
                uid: auth.uid,
                quizID: id,
                submissionID,
                quiz: getVal(state.firebase.data, `quizzes/${id}`),
            };

            if (submissionID) {
                data['submission'] = getVal(state.firebase.data, `submissions/${submissionID}`);
            } else {
                data['user'] = populate(state.firebase, `users/${auth.uid}`, [
                    "submissions:submissions"
                ]);
            }

            return data;
        }
    ),

    withStyles(styles)
)(ViewQuiz);
