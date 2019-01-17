import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";
import {connect, Field, FieldArray, getIn} from "formik";
import React, {useState} from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

const EmptyQuestion = {title: ''};
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


const QuestionControl = ({question, questionIndex, expanded, remove}) => {

    function deleteQuestion() {
        remove(questionIndex);
    }

    return (
        <ExpansionPanel expanded={expanded}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>{questionIndex + 1}. {question.title} ({question.type ? question.type.toUpperCase() : 'TEXT'})</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Field
                            name={`questions.${questionIndex}.title`}
                            render={({field}) => (
                                <TextField label="Question Title" required fullWidth={true} {...field} />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Field
                            name={`questions.${questionIndex}.type`}
                            render={({field}) => (
                                <FormControl required>
                                    <FormLabel>Question Type</FormLabel>
                                    <RadioGroup aria-label="Question Type" row={true} {...field}>
                                        <FormControlLabel value="text" control={<Radio/>} label="Text"/>
                                        <FormControlLabel value="single" control={<Radio/>} label="Single"/>
                                        <FormControlLabel value="multiple" control={<Radio/>} label="Multiple"/>
                                        <FormControlLabel value="code" control={<Radio/>} label="Code"/>
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    {(question.type == 'single' || question.type == 'multiple') && (
                        <Grid item xs={12}>
                            <FieldArray name={`questions.${questionIndex}.options`}>
                                {(props) => (
                                    <QuestionOptionsFieldArray questionIndex={questionIndex} {...props} />
                                )}
                            </FieldArray>
                        </Grid>
                    )}

                    {(question.type == 'text' || question.type == 'code') && (
                        <Grid item xs={12}>
                            <Field
                                name={`questions.${questionIndex}.answer`}
                                render={({field}) => (
                                    <TextField label="Correct Answer" multiline={true} fullWidth={true} {...field} />
                                )}
                            />
                        </Grid>
                    )}

                </Grid>
            </ExpansionPanelDetails>
            <Divider/>
            <ExpansionPanelActions>
                <Button size="small" color="secondary" onClick={deleteQuestion}>Delete</Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
};

let QuestionsFieldArray = ({form: {values: {questions}}, push, remove}) => {
    let {expanded} = useState([]);

    return (
        <>
            {questions.map((question, index) => (
                <QuestionControl key={index} question={question} questionIndex={index}
                                 expanded={expanded && expanded[index]} remove={remove} />
            ))}

            <div>
                <Button color="primary" fullWidth={false} onClick={() => push({...EmptyQuestion})}>
                    Add a question
                </Button>
            </div>
        </>
    )
};


const Questions = () => {

    return (
        <Grid item xs={12}>
            <fieldset>
                <legend>Questions</legend>
                <FieldArray name="questions" component={QuestionsFieldArray}/>
            </fieldset>
        </Grid>
    );
};

export default Questions;