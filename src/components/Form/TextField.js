import {TextField as MuiTextField, withStyles} from "@material-ui/core";
import React from "react";

const styles = {
    label: {
        fontSize: 21
    },
};

const TextField = ({classes, ...others}) => (
    <MuiTextField
        fullWidth
        InputLabelProps={{shrink: true, classes: {shrink: classes.label}}}
        {...others} />
);

export default withStyles(styles)(TextField);