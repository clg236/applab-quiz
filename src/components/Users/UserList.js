import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {firebaseConnect, getVal, isEmpty, isLoaded} from "react-redux-firebase";
import {TableHead, Typography, withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserListItem from "./UserListItem";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "../Form/TableCell";

const styles = theme => ({});


const UserList = function (props) {
    const {classes, users, quizzes} = props;

    let content = "";

    if (!isLoaded(users) || !isLoaded(quizzes)) {
        content = <CircularProgress/>;
    } else if (isEmpty(users)) {
        content = <Typography variant="body1">There is no users yet.</Typography>
    } else {

        content = (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Submissions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(users).map(key => (
                        <UserListItem key={key} user={users[key]} uid={key} quizzes={quizzes}/>
                    ))}
                </TableBody>
            </Table>
        );

    }

    return content;
};

export default compose(
    firebaseConnect(() => ([
        {
            path: "users",
            queryParams: ['orderByKey']
        },
        {
            path: "quizzes",
            queryParams: ['orderByKey']
        }
    ])),

    connect(
        state => ({
            users: getVal(state.firebase.data, "users"),
            quizzes: getVal(state.firebase.data, "quizzes")
        })
    ),

    withStyles(styles)
)(UserList);