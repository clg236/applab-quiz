import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isEmpty, isLoaded} from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Typography, withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import UserQuizListItem from "./UserQuizListItem";

const styles = theme => ({});

const UserQuizList = (props) => {
    const {classes, quizzes} = props;

    let content = "";

    if (!isLoaded(quizzes)) {
        content = <CircularProgress/>;
    } else if (isEmpty(quizzes)) {
        content = <Typography variant="body1">There is no quiz yet.</Typography>;
    } else {
        content = (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Quiz</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Submission Date</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Object.keys(quizzes).map(key => (
                        <UserQuizListItem key={key} quiz={quizzes[key]} quizID={key} />
                    ))}
                </TableBody>
            </Table>
        );
    }

    return content;
};


export default compose(
    connect(
        (state, {uid}) => ({
            quizzes: getVal(state.firebase.data, `userQuizzes/${uid}`)
        })
    ),


    firebaseConnect(({uid}) => ([
        {
            path: `userQuizzes/${uid}`,
            queryParams: ['orderByKey']
        }
    ])),


    withStyles(styles)
)(UserQuizList);