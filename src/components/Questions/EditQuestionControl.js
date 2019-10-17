import {Field} from "formik";
import {Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@material-ui/core";
import React from "react";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import QuestionTypes from "../QuestionTypes";


const EditQuestionControl = props => {
    const {question, questionIndex, expanded, remove} = props;

    function deleteQuestion() {
        remove(questionIndex);
    }

    const QuestionTypeControl = question.type && question.type in QuestionTypes ? QuestionTypes[question.type].EditControl : null;

    return (
        <ExpansionPanel expanded={expanded}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>
                    {questionIndex + 1 }.
                    {question.title ? question.title : "QUESTION TITLE "} 
                    {question.type ? `(${question.type.toUpperCase()})` : ''}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container spacing={3}>
                    <Field type="hidden" name={`questions.${questionIndex}.id`}/>

                    <Grid item xs={12}>
                        <Field
                            name={`questions.${questionIndex}.type`}
                            render={({field}) => (
                                <FormControl required>
                                    <FormLabel>Question Type</FormLabel>
                                    <RadioGroup aria-label="Question Type" row {...field}>
                                        {Object.keys(QuestionTypes).map((key) => (
                                            <FormControlLabel key={key} value={QuestionTypes[key].code}
                                                              control={<Radio/>} label={QuestionTypes[key].name}/>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    {QuestionTypeControl && <QuestionTypeControl question={question} questionIndex={questionIndex}/>}
                </Grid>
            </ExpansionPanelDetails>
            <Divider/>
            <ExpansionPanelActions>
                <Button size="small" color="secondary" onClick={deleteQuestion}>Delete</Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
};

export default EditQuestionControl;