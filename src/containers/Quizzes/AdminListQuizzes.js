import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import * as ROUTES from '../../constants/routes';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {QuizDetail, QuizList} from "../../components/Quizzes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UserIsAdmin} from "../../components/Auth";


const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },

    list: {
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing.unit * 3,
    },
    card: {
        minWidth: 275,
        marginBottom: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const AdminListQuizzes = ({classes}) => {
    let [selectedQuizID, setSelectedQuizID] = useState('');


    function handleQuizSelected(id) {
        if (selectedQuizID && id == selectedQuizID) {
            setSelectedQuizID('');
        } else {
            setSelectedQuizID(id);
        }
    }

    return (
        <main className={classes.content}>
            <Typography variant="h5" component="h6">Create and Manage Quizzes</Typography>
            <p>Instructions, etc...</p>
            <Grid container spacing={16}>
                <Grid item>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title}>
                                Create a quiz instructions...
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" component={Link} to={ROUTES.CREATE_QUIZ}><FontAwesomeIcon
                                icon="plus-square" size="lg" fixedWidth/>Create a Quiz</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title}>
                                View statistics and cool graphs...
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" component={Link} to={ROUTES.CREATE_QUIZ}><FontAwesomeIcon
                                icon="chart-line" size="lg" fixedWidth/>View Analytics</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <Typography variant="h5" component="h6">Current Quizzes</Typography>
            <Grid container spacing={16}>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.list}>
                        <QuizList type="quiz" showUnpublished quizURL="/quizzes/:id/edit"/>
                    </Paper>
                </Grid>
            </Grid>
        </main>
    );
};


export default compose(
    UserIsAdmin,
    withStyles(styles)
)(AdminListQuizzes);