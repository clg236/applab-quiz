import {FormControl, TextField as MuiTextField, withStyles} from "@material-ui/core";
import React from "react";
import {getIn} from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = {
    label: {
        fontSize: 21,
        position: "relative"
    },

    inputFormControl: {
        marginTop: "0 !important"
    }
};

const TextField = ({classes, description, label, helperText, ...others}) => (
    <FormControl fullWidth {...others}>
        <InputLabel shrink={true} className={classes.label}>{label}</InputLabel>
        {description && <div dangerouslySetInnerHTML={{__html: description}}/>}
        <Input className={classes.inputFormControl} {...others} fullWidth />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
);

export default withStyles(styles)(TextField);