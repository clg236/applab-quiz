import React, {useState} from 'react';
import {compose} from 'redux';
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EditQuizInfoForm from "./EditQuizInfoForm";
import {EditQuestionsForm as EditQuestionsForm} from "../Questions";
import {SubmissionList} from "../Submissions";

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


const QuizDetail = (props) => {
    const {classes, quiz, showSubmissions} = props;

    const [selectedTab, setSelectedTab] = useState(0);
    const numQuestions = quiz.questions ? quiz.questions.length : 0;
    const numSubmissions = quiz.submissions ? Object.keys(quiz.submissions).length : 0;

    return (
        <Paper className={classes.root}>
            <Tabs
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, value) => setSelectedTab(value)}
            >
                <Tab label="Basic" />
                <Tab label={`Questions (${numQuestions})`} disabled={!quiz || !quiz.id}/>
                {showSubmissions && <Tab label={`Submissions (${numSubmissions})`} />}
            </Tabs>

            <div className={classes.tabContainer}>
                {selectedTab === 0 && (<EditQuizInfoForm quiz={quiz} />)}
                {selectedTab === 1 && (<EditQuestionsForm quiz={quiz} />)}
                {showSubmissions && selectedTab === 2 && (<SubmissionList quiz={quiz} />)}
            </div>
        </Paper>
    );
};

export default compose(
    withStyles(styles)
)(QuizDetail);