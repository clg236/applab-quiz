import React, {useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isEmpty, isLoaded} from 'react-redux-firebase';
import {push} from 'connected-react-router';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {default as MuiLink} from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import DoneIcon from "@material-ui/icons/Done";
import {QuestionsForm} from "../../components/Questions";

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

    form: {
        padding: theme.spacing.unit  *3,
    }
});


const QuizListItem = ({quiz, user, onQuizSelected}) => {

    let responseId = '';

    if (user.responses && quiz.id in user.responses) {
        const responses = Object.keys(user.responses[quiz.id]);

        if (responses.length > 0) {
            responseId = responses[0];
        }
    }

    function handleQuizSelected() {
        onQuizSelected(quiz, responseId);
    }

    return (
        <TableRow>
            <TableCell scope="row">
                <Typography variant="body1">
                    <MuiLink href={'javascript:;'} onClick={handleQuizSelected}>
                        {quiz.name} {responseId && <DoneIcon/>}
                    </MuiLink>
                </Typography>
            </TableCell>
        </TableRow>
    );
};

const ListQuizzes = ({classes, firebase, quizzes, user}) => {
    let content = "";

    let [selectedQuiz, setSelectedQuiz] = useState(null);
    let [responseId, setResponseId] = useState(null);

    function handleQuizSelected(quiz, responseId) {
        if (quiz == selectedQuiz) {
            return ;
        }

        setSelectedQuiz(quiz);
        setResponseId(responseId);
    }

    if (!isLoaded(quizzes) || !isLoaded(user)) {
        content = <CircularProgress/>;
    } else if (isEmpty(quizzes)) {
        content = "There is no quizzes yet.";
    } else {
        content = (
            <Table className={classes.table}>
                <TableBody>
                    {Object.keys(quizzes).map(key => (
                        <React.Fragment key={key}>
                            {
                                quizzes[key].questions && quizzes[key].questions.length > 0 && (
                                    <QuizListItem
                                        quiz={{id: key, ...quizzes[key]}}
                                        user={user}
                                        onQuizSelected={handleQuizSelected}
                                    />
                                )
                            }
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        );
    }

    return (
        <main className={classes.content}>
            <Typography variant="h4" gutterBottom component="h2">
                Quizzes
            </Typography>


            <Grid container spacing={16}>
                <Grid item md={selectedQuiz ? 3 : 12} xs={12}>
                    <Paper className={classes.list}>
                        {content}
                    </Paper>
                </Grid>

                {selectedQuiz && (
                    <Grid item md={9} xs={12}>
                        <Paper className={classes.form}>
                            <QuestionsForm quiz={selectedQuiz} responseId={responseId}/>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </main>
    );
};


export default compose(
    connect(
        (state) => {
            return ({
                quizzes: getVal(state.firebase.data, "quizzes"),
                user: getVal(state.firebase.data, `users/${state.firebase.auth.uid}`),
                uid: state.firebase.auth.uid,
            });
        },
        {
            pushToHistory: push
        }
    ),

    firebaseConnect((props) => {
        return [
            {
                path: 'quizzes',
                queryParams: ['orderByKey']
            },
            {
                path: `users/${props.uid}`
            }
        ];
    }),


    withStyles(styles)
)(ListQuizzes);