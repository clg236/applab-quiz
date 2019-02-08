import React from "react";
import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

export default withStyles(theme => ({
    head: {
        backgroundColor: "#ff4081",
        color: "white",
    },
    body: {
        fontSize: 11,
    },
}))(TableCell);