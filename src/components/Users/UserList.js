import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {firebaseConnect, getVal, isEmpty, isLoaded} from "react-redux-firebase";
import {Typography, withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserListItem from "./UserListItem";

const styles = theme => ({});


const UserList = function (props) {
    const {classes, users} = props;

    let content = "";

    if (!isLoaded(users)) {
        content = <CircularProgress/>;
    } else if (isEmpty(users)) {
        content = <Typography variant="body1">There is no users yet.</Typography>
    } else {

        content = (
            <Table className={classes.table}>
                <TableBody>
                    {Object.keys(users).map(key => (
                        <UserListItem key={key} user={users[key]} uid={key}/>
                    ))}
                </TableBody>
            </Table>
        );

    }

    return content;
};

export default compose(
    connect(
        state => ({
            users: getVal(state.firebase.data, "users")
        })
    ),

    firebaseConnect(() => ([
        {
            path: "users",
            queryParams: ['orderByKey']
        }
    ])),


    withStyles(styles)
)(UserList);