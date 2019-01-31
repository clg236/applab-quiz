import React, {useState} from 'react';
import {compose} from 'redux';
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EditQuizInfo from "./EditQuizInfo";
import {EditQuestions as EditQuizQuestions} from "../Questions";
import Responses from "./Responses";

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


const QuizForm = (props) => {
    const {classes, quiz, showResponses} = props;

    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <Paper className={classes.root}>
            <Tabs
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, value) => setSelectedTab(value)}
            >
                <Tab label="Basic" />
                <Tab label="Questions" disabled={!quiz || !quiz.id}/>
                {showResponses && <Tab label="Responses" />}
            </Tabs>

            <div className={classes.tabContainer}>
                {selectedTab === 0 && (<EditQuizInfo quiz={quiz} />)}
                {selectedTab === 1 && (<EditQuizQuestions quiz={quiz} />)}
                {showResponses && selectedTab === 2 && (<Responses quiz={quiz} />)}
            </div>
        </Paper>
    );
};

export default compose(
    withStyles(styles)
)(QuizForm);