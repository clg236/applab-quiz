import {TextField as MuiTextField, withStyles} from "@material-ui/core";
import React from "react";

const styles = {
    label: {
        fontSize: 21,
        position: "relative"
    },

    inputFormControl: {
        marginTop: "0 !important"
    }
};

const TextField = ({classes, ...others}) => (
    <MuiTextField
        fullWidth
        InputLabelProps={{shrink: true, classes: {shrink: classes.label}}}
        InputProps={{classes: {formControl: classes.inputFormControl}}}
        {...others} />
);

export default withStyles(styles)(TextField);