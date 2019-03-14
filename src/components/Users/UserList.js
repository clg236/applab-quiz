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
import * as ROLES from '../../constants/roles';

const styles = theme => ({});


const UserList = function (props) {
    const {classes, profile, users, quizzes} = props;

    let content = "";

    if (!isLoaded(users) || !isLoaded(quizzes) || !isLoaded(profile)) {
        content = <CircularProgress/>;
    } else if (isEmpty(users)) {
        content = <Typography variant="body1">There is no users yet.</Typography>
    } else {

        const showNotes = profile && profile.role == ROLES.ROLE_ADMIN;

        content = (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Submissions</TableCell>
                        {showNotes && <TableCell>Notes</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(users).map(key => (
                        <UserListItem key={key} user={users[key]} uid={key} quizzes={quizzes} showNotes={showNotes}/>
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
            queryParams: ['orderByChild=role', 'equalTo=user']
        },
        {
            path: "quizzes",
            queryParams: ['orderByKey']
        }
    ])),

    connect(
        state => ({
            profile: state.firebase.profile,
            users: getVal(state.firebase.data, "users"),
            quizzes: getVal(state.firebase.data, "quizzes")
        })
    ),

    withStyles(styles)
)(UserList);