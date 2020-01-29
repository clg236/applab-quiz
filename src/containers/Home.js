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
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit'
import StartIcon from '@material-ui/icons/Check'



const styles = theme => ({});

const useStyles = makeStyles({
    card: {
      minWidth: 150,
      maxWidth: 400,
    },
    header: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    }
  });


const Home = props => {
    const {user} = props;
    const classes = useStyles();
    let isStarted = "false";

    return (
        <main>
            <Typography component="h2" variant="h4" gutterBottom>Activities</Typography>
            <Card className={classes.card} variant="outlined">
                <CardContent>
                    <div className={classes.header}>
                    <Typography className={classes.title} color="textSecondary" >
                        Assignment Title
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        due: 02/27/2019
                    </Typography>
                    </div>
                    <div>
                    <Typography className={classes.status} color="textSecondary">
                        not started
                    </Typography> 
                    </div>
              
 
        <Typography variant="body2" >
          description of the assignment goes here...
        </Typography>
      </CardContent>
      <CardActions>
        {isStarted ? <Button startIcon={<StartIcon />} size="small" variant="contained" color="primary">START</Button> : <Button startIcon={<EditIcon />} size="small">Edit</Button>}
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
