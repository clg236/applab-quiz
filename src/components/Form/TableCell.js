import React from "react";
import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

export default withStyles(theme => ({
    head: {
        backgroundColor: "#7D4CDB",
        color: "white",
    },
    body: {
        fontSize: 24,
    },
}))(TableCell);