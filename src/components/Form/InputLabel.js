import {InputLabel as MuiInputLabel, withStyles} from "@material-ui/core";
import React from "react";

const styles = {
    label: {
        fontSize: 21
    },
};

const InputLabel = ({classes, ...others}) => (
    <MuiInputLabel shrink className={classes.label}  {...others} />
);

export default withStyles(styles)(InputLabel);