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
import {EditQualitiesForm} from "../Qualities";

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


const EditQuiz = props => {
    const {classes, quizID, quiz, type, redirectURL} = props;

    const [selectedTab, setSelectedTab] = useState(0);

    function handleTabChange(event, value) {
         setSelectedTab(value);
    }

    if (!isLoaded(quiz)) {
        return <CircularProgress/>;
    } else if (isEmpty(quiz)) {
        return <Typography variant="body1">Item could not be found.</Typography>;
    }

    const numQuestions = quiz && quiz.questions ? quiz.questions.length : 0;
    const numSubmissions = quiz && quiz.submissions ? Object.keys(quiz.submissions).length : 0;
    const numQualities = quiz && quiz.qualities ? Object.keys(quiz.qualities).length : 0;

    return (
        <Paper className={classes.root}>
            <Tabs
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabChange}
            >
                <Tab label="Basic"/>
                <Tab label={`Questions (${numQuestions})`}/>
                <Tab label={`Qualities (${numQualities})`}/>
                <Tab label={`Submissions (${numSubmissions})`}/>
            </Tabs>

            <div className={classes.tabContainer}>
                {selectedTab === 0 && (<EditQuizInfoForm quizID={quizID} type={type} redirectURL={redirectURL}/>)}
                {selectedTab === 1 && (<EditQuestionsForm quizID={quizID} type={type} redirectURL={redirectURL}/>)}
                {selectedTab === 2 && (<EditQualitiesForm quizID={quizID} type={type} redirectURL={redirectURL}/>)}
                {selectedTab === 3 && (<SubmissionList quizID={quizID}/>)}
            </div>
        </Paper>
    );
};

export default compose(

    firebaseConnect(({quizID}) => {
        return [
            {
                path: `quizzes/${quizID}`
            }
        ];
    }),

    connect(
        (state, {quizID}) => {
            return {
                quiz: getVal(state.firebase.data, `quizzes/${quizID}`)
            };
        }
    ),

    withStyles(styles)
)(EditQuiz);