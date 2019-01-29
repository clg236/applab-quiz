import React, {useState} from 'react';
import {compose} from 'redux';
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import QuizInfo from "./QuizInfo";
import {default as QuizResponses} from "./Responses";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});


const Quiz = (props) => {
    const {classes, quiz} = props;

    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <Paper className={classes.root}>
            <Tabs
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, value) => setSelectedTab(value)}
            >
                <Tab label="Quiz information" />
                <Tab label="Questions" />
                <Tab label="Responses" />
            </Tabs>

            <div>
                {selectedTab === 0 && (<QuizInfo quiz={quiz} />)}
                {selectedTab === 2 && (<QuizResponses quiz={quiz} />)}
            </div>
        </Paper>
    );
};

export default compose(
    withStyles(styles)
)(Quiz);