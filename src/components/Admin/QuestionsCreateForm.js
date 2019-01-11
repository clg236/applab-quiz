import React from 'react';
import { Formik, Field, FieldArray } from 'formik';
import { TextField, Grid, Button, RadioGroup, Radio, FormControl, FormControlLabel, FormLabel, FormGroup } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import * as Yup from 'yup';
import { isValid } from 'ipaddr.js';

const ValidationSchema = Yup.object().shape({
    question: Yup.string()
        .min(2, 'Too Short!')
        .required('Required'),
    type: Yup.mixed()
        .oneOf(['text', 'single', 'multiple', 'code'])
        .required('Required'),
});

const QuestionListItem = ({ field, helper, index }) => {

    function handleDelete() {
        helper.remove(index);
    }

    function handleAdd() {
        helper.insert(index, '');
    }

    return (
        <ListItem>
            <TextField fullWidth { ...field } />
            <ListItemSecondaryAction>
                <IconButton aria-label="Add" onClick={handleAdd}>
                    <AddIcon />
                </IconButton>
                <IconButton aria-label="Remove" onClick={handleDelete}>
                    <RemoveIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};


const QuestionsCreateForm = ({ firebase: { pushWithMeta }, afterCreated }) => {

    const handleSubmit = (values, actions) => {
        const promise = pushWithMeta("questions", {
            question: values.question,
            type: values.type || 'text',
            options: (values.options || []).filter(Boolean)
        });

        if (afterCreated) {
            afterCreated(promise);
        }
    };
    
    return (
        <Formik
            initialValues={{ question: "" }}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
        >
            {({ handleSubmit, values, errors, isValid }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Field
                                name="question"
                                render={({ field }) => (
                                    <TextField label="Question" required fullWidth={true} { ...field } />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Field
                                name="type"
                                render={({ field }) => (
                                    <FormControl required>
                                        <FormLabel>Question Type</FormLabel>
                                        <RadioGroup aria-label="Question Type" row={true} { ...field }>
                                            <FormControlLabel value="text" control={<Radio />} label="Text" />
                                            <FormControlLabel value="single" control={<Radio />} label="Single" />
                                            <FormControlLabel value="multiple" control={<Radio />} label="Multiple" />
                                            <FormControlLabel value="code" control={<Radio />} label="Code" />
                                        </RadioGroup>
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        {(values.type == 'single' || values.type == 'multiple') && (
                            <Grid item xs={12}>
                                <FieldArray
                                    name="options"
                                    render={arrayHelpers => (
                                        <FormGroup>
                                            {values.options && values.options.length > 0 ? (
                                                <List>
                                                    {values.options.map((option, index) => (
                                                        <Field name={`options.${index}`} key={index}
                                                            render={({ field }) => (
                                                                <QuestionListItem key={index} helper={arrayHelpers} index={index} field={field} />
                                                            )}
                                                        />
                                                    ))}
                                                </List>
                                            ) : (
                                              <Button fullWidth={false} onClick={() => arrayHelpers.push('')}>
                                                Add an option
                                              </Button>
                                            )}
                                        </FormGroup>
                                    )}
                                />
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" disabled={!isValid}>Create</Button>
                        </Grid>
                    </Grid>
                    {JSON.stringify(values, null, 2)}
                    {JSON.stringify(errors, null, 2)}
                </form>
            )}
        </Formik>
    );
};

export default QuestionsCreateForm;
