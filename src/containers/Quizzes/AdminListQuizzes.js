import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isEmpty, isLoaded} from 'react-redux-firebase';
import * as ROUTES from '../../constants/routes';
import {push} from 'connected-react-router';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {default as MuiLink} from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import {QuizForm} from "../../components/Quizzes";


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


const QuizListItem = ({firebase, id, quiz, setSelectedQuiz}) => {
    let text = `${quiz.name} (${quiz.questions ? quiz.questions.length : 0} questions)`;

    function handleQuizClicked() {
        setSelectedQuiz(quiz);
    }

    return (
        <TableRow>
            <TableCell scope="row">
                <Typography variant="body1">
                    <MuiLink href={'javascript:;'} onClick={handleQuizClicked}>{text}</MuiLink>
                </Typography>
            </TableCell>
        </TableRow>
    );
};

const AdminListQuizzes = ({classes, firebase, quizzes}) => {
    let content = "";

    let [selectedQuiz, setSelectedQuiz] = useState(null);

    if (!isLoaded(quizzes)) {
        content = <CircularProgress/>;
    } else if (isEmpty(quizzes)) {
        content = "There is no quizzes yet.";
    } else {
        content = (
            <Table className={classes.table}>
                <TableBody>
                    {Object.keys(quizzes).map(key => (
                        <QuizListItem key={key} id={key} quiz={{id: key, ...quizzes[key]}} firebase={firebase} setSelectedQuiz={setSelectedQuiz}/>
                    ))}
                </TableBody>
            </Table>
        );
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
                <Grid item md={selectedQuiz ? 3 : 12} xs={12}>
                    <Paper className={classes.list}>
                        {content}
                    </Paper>
                </Grid>

                {selectedQuiz && (
                    <Grid item md={9} xs={12}>
                        <QuizForm quiz={selectedQuiz}/>
                    </Grid>
                )}
            </Grid>
        </main>
    );
};


export default compose(
    firebaseConnect(() => [
        {
            path: 'quizzes',
            queryParams: ['orderByKey']
        }
    ]),

    connect(
        (state) => ({
            quizzes: getVal(state.firebase.data, "quizzes")
        }),
        {
            pushToHistory: push
        }
    ),

    withStyles(styles)
)(AdminListQuizzes);