import {Field, FieldArray, getIn} from "formik";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid, Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";
import React from "react";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import QuestionTypes from "../QuestionTypes";

const EmptyQuestionOption = {option: ''};



const QuestionOptionControl = (props) => {

    const {questionIndex, optionIndex, remove} = props;

    function handleDelete() {
        remove(optionIndex);
    }

    return (
        <ListItem>
            <Field
                name={`questions.${questionIndex}.options.${optionIndex}.answer`}
                render={({field}) => (
                    <Checkbox checked={field.value} value="1"
                              inputProps={{title: 'Is this the correct answer?'}}{...field} />
                )}
            />

            <ListItemText>
                <Field
                    name={`questions.${questionIndex}.options.${optionIndex}.option`}
                    render={({field}) => (
                        <TextField label="Option" required fullWidth={true} {...field} />
                    )}
                />
            </ListItemText>

            <ListItemSecondaryAction>
                <IconButton aria-label="Remove" onClick={handleDelete}>
                    <RemoveIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

let QuestionOptionsFieldArray = (props) => {
    const {name, push, insert, remove, form: {values}, questionIndex} = props;

    let options = getIn(values, name);

    return (
        <FormGroup>
            <FormLabel>Options</FormLabel>
            <List>
                {options && options.length > 0 && (
                    <>
                        {options.map((option, index) => (
                            <QuestionOptionControl
                                key={index}
                                questionIndex={questionIndex}
                                optionIndex={index}
                                optionFieldName={`${name}.${index}`}
                                option={option}
                                insert={insert}
                                remove={remove}
                            />
                        ))}
                    </>
                )}
            </List>

            <div>
                <Button fullWidth={false} onClick={() => push({...EmptyQuestionOption})}>
                    Add an option
                </Button>
            </div>
        </FormGroup>
    )
};


const EditQuestionControl = ({question, questionIndex, expanded, remove}) => {

    function deleteQuestion() {
        remove(questionIndex);
    }

    const QuestionTypeControl = question.type && question.type in QuestionTypes ? QuestionTypes[question.type].EditControl : null;

    return (
        <ExpansionPanel expanded={expanded}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>{questionIndex + 1}. {question.title} {question.type ? `(${question.type.toUpperCase()})` : ''}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Field
                            name={`questions.${questionIndex}.type`}
                            render={({field}) => (
                                <FormControl required>
                                    <FormLabel>Question Type</FormLabel>
                                    <RadioGroup aria-label="Question Type" row {...field}>
                                        {Object.keys(QuestionTypes).map((key) => (
                                            <FormControlLabel key={key} value={QuestionTypes[key].code} control={<Radio/>} label={QuestionTypes[key].name}/>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    {QuestionTypeControl && <QuestionTypeControl question={question} questionIndex={questionIndex} />}

                    {/*{(question.type == 'single' || question.type == 'multiple') && (*/}
                        {/*<Grid item xs={12}>*/}
                            {/*<FieldArray name={`questions.${questionIndex}.options`}>*/}
                                {/*{(props) => (*/}
                                    {/*<QuestionOptionsFieldArray questionIndex={questionIndex} {...props} />*/}
                                {/*)}*/}
                            {/*</FieldArray>*/}
                        {/*</Grid>*/}
                    {/*)}*/}

                    {/*{(question.type == 'text' || question.type == 'code') && (*/}
                        {/*<Grid item xs={12}>*/}
                            {/*<Field*/}
                                {/*name={`questions.${questionIndex}.answer`}*/}
                                {/*render={({field}) => (*/}
                                    {/*<TextField label="Correct Answer" multiline={true} fullWidth={true} {...field} />*/}
                                {/*)}*/}
                            {/*/>*/}
                        {/*</Grid>*/}
                    {/*)}*/}

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