import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {firebaseConnect, getVal, isEmpty, isLoaded, populate} from "react-redux-firebase";
import {Typography, withStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import QuizListGridView from "./QuizListGridView";
import QuizListTableView from "./QuizListTableView";
import {push} from "connected-react-router";

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

    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

const QuizList = props => {
    const {classes, user, quizzes, view, isAssignment, onQuizSelected, pushToHistory} = props;

    function handleQuizSelected(quizID) {
        if (onQuizSelected) {
            onQuizSelected(quizID);
        } else {
            pushToHistory(`/quizzes/${quizID}`);
        }
    }

    let content = "";

    if (!isLoaded(quizzes) || !isLoaded(user)) {
        content = <CircularProgress size={20}/>
    } else if (isEmpty(quizzes)) {
        content = <Typography variant="body1">There is nothing here.</Typography>;
    } else {
        const View = view && view == 'grid' ? QuizListGridView : QuizListTableView;

        content = <View quizzes={quizzes} user={user} isAssignment={isAssignment}
                        submissions={isAssignment ? user.assignmentSubmissions : user.quizSubmissions}
                        onQuizSelected={handleQuizSelected}/>;
    }

    return content;
};

export default compose(
    connect(
        (state, {user, showUnpublished, isAssignment}) => {
            const quizPrefix = isAssignment ? "assignments" : "quizzes";
            const data = {};

            let quizzes = getVal(state.firebase.data, quizPrefix);

            // filter out unpublished quizzes
            if (isLoaded(quizzes) && !isEmpty(quizzes)) {
                if (typeof showUnpublished == 'undefined' || !showUnpublished) {
                    quizzes = Object.keys(quizzes)
                        .filter(key => quizzes[key].published)
                        .reduce((obj, key) => {
                            return {
                                ...obj,
                                [key]: quizzes[key]
                            }
                        }, {});
                }
            }

            data['quizzes'] = quizzes;

            // get all the quiz submissions
            if (user && isLoaded(user) && !isEmpty(user)) {
                const submissionsPrefix = isAssignment ? "assignmentSubmissions" : "quizSubmissions";

                data['user'] = populate(state.firebase, `users/${user.uid}`, [
                    `${submissionsPrefix}:${submissionsPrefix}`
                ]);
            }

            return data;
        }, {
            pushToHistory: push
        }
    ),

    firebaseConnect(({user, isAssignment}) => {
        let queries = [{
            path: isAssignment ? "assignments" : 'quizzes',
            queryParams: ['orderByKey']
        }];

        const submissionsPrefix = isAssignment ? "assignmentSubmissions" : "quizSubmissions";

        if (user && isLoaded(user) && !isEmpty(user)) {
            queries.push({
                path: `users/${user.uid}`
            }, {
                path: `${submissionsPrefix}`
            });
        }

        return queries;
    }),


    withStyles(styles)
)(QuizList);