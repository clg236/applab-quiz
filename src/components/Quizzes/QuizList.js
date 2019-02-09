import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {firebaseConnect, getVal, isEmpty, isLoaded, populate} from "react-redux-firebase";
import {Typography, withStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import QuizListGridView from "./QuizListGridView";
import QuizListTableView from "./QuizListTableView";

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
    const {classes, user, quizzes, view, type} = props;

    let quizURL = props.quizURL;
    if (!quizURL) {
        if (type == 'quiz') {
            quizURL = "/quizzes/:id";
        } else if (type == 'assignment') {
            quizURL = "/assignments/:id";
        }
    }

    let content = "";

    if (!isLoaded(quizzes) || (user && !isLoaded(user))) {
        content = <CircularProgress size={20}/>
    } else if (isEmpty(quizzes)) {
        content = <Typography variant="body1">There are no current quizzes.</Typography>;
    } else {
        const View = view && view == 'grid' ? QuizListGridView : QuizListTableView;
        content = <View quizzes={quizzes} user={user} quizURL={quizURL}/>;
    }

    return content;
};

export default compose(
    connect(
        (state, props) => {
            const {user, showUnpublished, type} = props;
            const data = {};

            let quizzes = getVal(state.firebase.data, "quizzes");

            if (isLoaded(quizzes) && !isEmpty(quizzes)) {
                let keys = Object.keys(quizzes);

                // filter out unpublished quizzes
                if (typeof showUnpublished == 'undefined' || !showUnpublished) {
                    keys = keys.filter(key => quizzes[key].published);
                }

                // filter by type
                if (type) {
                    keys = keys.filter(key => quizzes[key].type == type);
                }

                // fill
                quizzes = keys.reduce((obj, key) => {
                    return {
                        ...obj,
                        [key]: quizzes[key]
                    }
                }, {});
            }

            data['quizzes'] = quizzes;

            // get all the quiz submissions
            if (user) {
                data['user'] = populate(state.firebase, `users/${user.uid}`, [
                    'submissions:submissions'
                ]);
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
                path: `users/${user.uid}`,
                populates: ['submissions:submissions']
            });
        }

        return queries;
    }),


    withStyles(styles)
)(QuizList);