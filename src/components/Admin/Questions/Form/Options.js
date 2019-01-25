import ListItem from "@material-ui/core/ListItem";
import {connect, Field, FieldArray, getIn} from "formik";
import {Checkbox, Divider, FormGroup, FormLabel, withStyles} from "@material-ui/core";
import React from "react";
import List from "@material-ui/core/List";
import {compose} from "redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {TextField} from '../../../Form';
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Dropzone from 'react-dropzone';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});


const EmptyOption = {option: ''};

let OptionControl = (props) => {

    const {questionFieldNamePrefix, multiple, optionIndex, remove, form, classes} = props;

    function handleDelete() {
        remove(optionIndex);
    }


    function handleImageUpload(files) {
        if (!files || files.length === 0) {
            return ;
        }

        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
            const fieldName = `${questionFieldNamePrefix}options.${optionIndex}.image`;
            form.setFieldValue(fieldName, reader.result, false);
        };
    }

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>General settings</Typography>
                <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item md={12}>
                        {multiple
                            ? (
                                <Field
                                    name={`${questionFieldNamePrefix}corrects.${optionIndex}`}
                                    render={({field, form: {values}}) => (

                                        <FormControlLabel
                                            control={<Checkbox name={field.name} value={`option_${optionIndex}`}
                                                               checked={!!getIn(values, field.name)}
                                                               onChange={field.onChange}/>}
                                            label="Correct Answer"/>
                                    )}
                                />
                            ) : (
                                <Field
                                    name={`${questionFieldNamePrefix}corrects.0`}
                                    render={({field, form: {values}}) => (
                                        <FormControlLabel
                                            control={<Radio name={field.name} value={optionIndex}
                                                            checked={parseInt(getIn(values, field.name)) === optionIndex}
                                                            onChange={field.onChange}/>}
                                            label="Correct Answer"/>
                                    )}
                                />
                            )
                        }

                    </Grid>

                    <Grid item md={12}>
                        <Field
                            name={`${questionFieldNamePrefix}options.${optionIndex}.option`}
                            render={({field, form}) => {
                                return (
                                    <TextField label="Option" {...field} />
                                );
                            }}
                        />
                    </Grid>

                    <Grid item md={12}>
                        <Field
                            name={`${questionFieldNamePrefix}options.${optionIndex}.image`}
                            render={({field, form}) => {
                                return (
                                    <FormControl>
                                        <Dropzone accept="image/*" onDrop={handleImageUpload}>
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <Typography>Use an image? (Drop it here)</Typography>
                                                </div>
                                            )}
                                        </Dropzone>
                                        <aside>
                                            {field.value && (<img src={field.value} />)}
                                        </aside>
                                    </FormControl>
                                );
                            }}
                        />
                    </Grid>

                    <Divider/>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

OptionControl = withStyles(styles)(OptionControl);

let Options = (props) => {
    const {questionFieldNamePrefix, multiple, formik: {values}} = props;
    const name = `${questionFieldNamePrefix}options`;

    let options = getIn(values, name);

    return (
        <FieldArray name={name}>
            {({push, insert, remove, form}) => (
                <FormGroup>
                    <FormLabel required>Options</FormLabel>
                    <div>
                        {options && options.length > 0 && (
                            <>
                                {options.map((option, index) => (
                                    <OptionControl
                                        key={index}
                                        questionFieldNamePrefix={questionFieldNamePrefix}
                                        optionIndex={index}
                                        insert={insert}
                                        remove={remove}
                                        form={form}
                                        multiple={multiple}
                                    />
                                ))}
                            </>
                        )}
                    </div>

                    <Fab color="primary" size="small" aria-label="Add"
                         onClick={() => push({...EmptyOption})}>
                        <AddIcon/>
                    </Fab>
                </FormGroup>
            )}
        </FieldArray>
    )
};


export default compose(
    connect,

)(Options);