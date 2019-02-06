import React from "react";
import TextField from "../Form/TextField";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from '@material-ui/icons/Remove';
import {Field, getIn} from "formik";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import ListItemText from "@material-ui/core/ListItemText";

const EditOptionControl = props => {

    const {questionIndex, optionIndex, multiple, helper} = props;
    const option = getIn(helper.form.values, `questions.${questionIndex}.options.${optionIndex}`);
    const SelectionControl = multiple ? Checkbox : Radio;

    const answerFieldName = !multiple ? `questions.${questionIndex}.answer` : `questions.${questionIndex}.answers.${optionIndex}`;

    let answerFieldChecked = false;
    if (multiple) {
        answerFieldChecked = Boolean(getIn(helper.form.values, answerFieldName));
    } else {
        answerFieldChecked = getIn(helper.form.values, answerFieldName) == option.id;
    }

    function handleDelete() {
        helper.remove(optionIndex);

        if (multiple) {
            helper.form.setFieldValue(`questions.${questionIndex}.answers`, []);
        } else {
            helper.form.setFieldValue(answerFieldName, '');
        }
    }

    return (
        <ListItem>
            <Field type="hidden" name={`questions.${questionIndex}.options.${optionIndex}.id`}/>

            <Field
                name={answerFieldName}
                render={({field}) => (
                    <SelectionControl name={field.name} checked={answerFieldChecked} value={option.id} onChange={field.onChange} />
                )}
            />

            <ListItemText>
                <Field
                    name={`questions.${questionIndex}.options.${optionIndex}.option`}
                    render={({field}) => (
                        <TextField label="Option" required fullWidth {...field} />
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
export default EditOptionControl;