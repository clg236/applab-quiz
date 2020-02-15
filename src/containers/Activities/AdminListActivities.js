import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import * as ROUTES from '../../constants/routes';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {QuizList} from "../../components/Quizzes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UserIsAdmin} from "../../components/Auth";


const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100vh',
        overflow: 'auto',
    },

    list: {
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(3),
    },
    card: {
        minWidth: 275,
        marginBottom: 10,
        marginTop: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 28,
    },
    pos: {
        marginBottom: 12,
    },
});

const AdminListActivities = ({classes}) => {
    let [selectedQuizID, setSelectedQuizID] = useState('');


    function handleQuizSelected(id) {
        if (selectedQuizID && id == selectedQuizID) {
            setSelectedQuizID('');
        } else {
            setSelectedQuizID(id);
        }
    }

    return (
        <QuizList type="activity" showUnpublished showScoreColumn={false} showActionsColumn
                                  quizURL="/activities/:id/edit"/>


    );
};


export default compose(
    UserIsAdmin,

    withStyles(styles)
)(AdminListActivities);