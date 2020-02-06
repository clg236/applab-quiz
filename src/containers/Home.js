import React from 'react';
import {compose} from 'redux';
import {Typography, withStyles} from "@material-ui/core";
import {QuizList} from "../components/Quizzes";
import {connect} from "react-redux";
import {firebaseConnect, getVal, withFirebase} from "react-redux-firebase";

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

const styles = theme => ({});

const useStyles = makeStyles({
    card: {
      minWidth: 150,
      maxWidth: 400,
    },
    header: {
        
    },
    title: {
        color: 'black',
        fontSize: 18,
    },
    pos: {
        fontSize: 12,
        color: `black`,
      display: 'flex',
      flexDirection: 'row',
    },
    status: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        fontSize: 10,
        color: '#FD6FFF'
    },
    avatar: {
        backgroundColor: '#7D4CDB',
      },
  });


const Home = props => {
    const {user} = props;
    const classes = useStyles();
    let isStarted = 0;
    let unreadCommentCount = 2;

    return (
        <main>
            <Typography component="h2" variant="h4" gutterBottom>Activities</Typography>
            <Card className={classes.card} variant="outlined">
                <CardHeader titleTypographyProps={{variant:'h5' }} className={classes.header} title="Introduce Youself!" subheader="Due February 25th" 
                action={
                    <Badge badgeContent={unreadCommentCount} overlap="circle" color="primary">
                    <IconButton color="primary" aria-label="comments">
                        <CommentsIcon />
                    </IconButton>
                    </Badge>
                    }
                avatar={<Avatar aria-label="recipe" className={classes.avatar}>
            1
          </Avatar>}>
                </CardHeader>
                <CardContent> 
                    <Typography variant="body1" >
                        description of the assignment goes here...
                </Typography>
                    </CardContent>
                    <CardActions>
                        {!isStarted ? <Button startIcon={<StartIcon />} size="small" variant="contained" color="primary">START</Button> : <Button variant="outlined" startIcon={<EditIcon />} size="small">Edit</Button>}
                    </CardActions>
            </Card>
            

            <Typography component="h2" variant="h4" gutterBottom>Current Quizzes</Typography>
            <QuizList user={user} type="quiz" view="grid"/>

            <Typography component="h2" variant="h4" gutterBottom style={{marginTop: 30}}>Current Assignments</Typography>
            <QuizList user={user} type="assignment" view="grid"/>
        </main>
    );
};


export default compose(

    firebaseConnect(props => {
        const uid = props.firebase.auth().currentUser.uid;

        return [{
            path: `users/${uid}`
        }]
    }),

    connect(
        ({firebase}) => ({
            uid: firebase.auth.uid,
            user: getVal(firebase.data, `users/${firebase.auth.uid}`)
        })
    ),

    withStyles(styles)
)(Home);
