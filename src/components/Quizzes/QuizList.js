import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {firebaseConnect, getVal, isEmpty, isLoaded} from "react-redux-firebase";
import {Typography, withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import CircularProgress from "@material-ui/core/CircularProgress";
import QuizListItem from './QuizListItem';

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


const QuizList = function (props) {
    const {classes, user, quizzes, submissions} = props;

    let content = "";

    if (!isLoaded(quizzes) || (user && !isLoaded(submissions))) {
        content = <CircularProgress/>;
    } else {

        const publishedQuizzes = {};

        if (!isEmpty(quizzes)) {
            Object.keys(quizzes).map(key => {
                const quiz = quizzes[key];
                if (!user || !("published" in quiz) || quiz.published) {
                    publishedQuizzes[key] = quiz;
                }
            });
        }

        if (isEmpty(publishedQuizzes)) {
            content = <Typography variant="body1">There is no quiz yet.</Typography>;
        } else {
            content = (
                <Table className={classes.table}>
                    <TableBody>
                        {Object.keys(publishedQuizzes).map(key => (
                            <QuizListItem key={key} quizID={key} quiz={publishedQuizzes[key]} {...props}/>
                        ))}
                    </TableBody>
                </Table>
            );
        }
    }

    return content;
};

export default compose(
    connect(
        (state, {user}) => {
            const data = {
                quizzes: getVal(state.firebase.data, "quizzes")
            };

            if (user) {
                data['submissions'] = getVal(state.firebase.data, `userQuizzes/${user.uid}`)
            }

            return data;
        }
    ),

    firebaseConnect(({user}) => {
        let queries = [{
            path: 'quizzes',
            queryParams: ['orderByKey']
        }];

        if (user) {
            queries.push({
                path: `userQuizzes/${user.uid}`
            })
        }

        return queries;
    }),


    withStyles(styles)
)(QuizList);