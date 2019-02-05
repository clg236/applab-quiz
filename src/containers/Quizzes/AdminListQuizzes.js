import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import * as ROUTES from '../../constants/routes';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {QuizDetail, QuizList} from "../../components/Quizzes";


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
    }
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
            <Typography variant="h4" gutterBottom component="h2">
                Quizzes
                <Typography variant="subheading" gutterBottom component={Link} to={ROUTES.ADMIN_CREATE_QUIZ} inline style={{marginLeft: 5}}>
                    <AddCircleOutlinedIcon/>
                </Typography>
            </Typography>


            <Grid container spacing={16}>
                <Grid item md={selectedQuizID ? 3 : 12} xs={12}>
                    <Paper className={classes.list}>
                        <QuizList onQuizSelected={handleQuizSelected} hideStats={selectedQuizID ? true: false}/>
                    </Paper>
                </Grid>

                {selectedQuizID != '' && (
                    <Grid item md={9} xs={12}>
                        <QuizDetail quizID={selectedQuizID}/>
                    </Grid>
                )}
            </Grid>
        </main>
    );
};


export default compose(
    withStyles(styles)
)(AdminListQuizzes);