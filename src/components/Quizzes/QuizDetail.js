import React, {useState} from 'react';
import {compose} from 'redux';
import Paper from "@material-ui/core/Paper";
import {CircularProgress, Typography, withStyles} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EditQuizInfoForm from "./QuizInfoForm";
import {EditQuestionsForm as EditQuestionsForm} from "../Questions";
import {SubmissionList} from "../Submissions";
import {connect} from "react-redux";
import {firebaseConnect, getVal, isEmpty, isLoaded} from "react-redux-firebase";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },

    tabContainer: {
        marginTop: theme.spacing.unit * 4,
    }
});


const QuizDetail = props => {
    const {classes, quizID, quiz, isAssignment} = props;

    if (!isLoaded(quiz)) {
        return <CircularProgress/>;
    } else if (isEmpty(quiz)) {
        return <Typography variant="body1">Item not found.</Typography>;
    }

    const [selectedTab, setSelectedTab] = useState(0);
    const numQuestions = quiz && quiz.questions ? quiz.questions.length : 0;
    const numSubmissions = quiz && quiz.submissions ? Object.keys(quiz.submissions).length : 0;

    return (
        <Paper className={classes.root}>
            <Tabs
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, value) => setSelectedTab(value)}
            >
                <Tab label="Basic"/>
                <Tab label={`Questions (${numQuestions})`}/>
                <Tab label={`Submissions (${numSubmissions})`}/>
            </Tabs>

            <div className={classes.tabContainer}>
                {selectedTab === 0 && (<EditQuizInfoForm quizID={quizID} isAssignment={isAssignment}/>)}
                {selectedTab === 1 && (<EditQuestionsForm quizID={quizID} isAssignment={isAssignment}/>)}
                {selectedTab === 2 && (<SubmissionList quiz={quiz} isAssignment={isAssignment}/>)}
            </div>
        </Paper>
    );
};

export default compose(
    connect(
        (state, {quizID, isAssignment}) => {
            const prefix = isAssignment ? "assignments" : "quizzes";

            return {
                quiz: getVal(state.firebase.data, `${prefix}/${quizID}`)
            };
        }
    ),

    firebaseConnect(({quizID, isAssignment}) => {
        const prefix = isAssignment ? "assignments" : "quizzes";

        return [
            {
                path: `${prefix}/${quizID}`
            }
        ];
    }),

    withStyles(styles)
)(QuizDetail);