import {default as MuiLink} from "@material-ui/core/Link";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {firebaseConnect, getVal, isEmpty, isLoaded} from "react-redux-firebase";
import {connect} from "react-redux";
import {compose} from "redux";
import CircularProgress from "@material-ui/core/CircularProgress";


const UserListItem = (props) => {

    const {uid, user, quizzes} = props;

    let publishedQuizIDs = [];

    if (isLoaded(quizzes) && !isEmpty(quizzes)) {
        publishedQuizIDs = Object.keys(quizzes).filter(quizID => quizzes[quizID].published);
    }

    return (
        <TableRow>
            <TableCell component="th">
                <MuiLink component={Link} to={`/users/${uid}`}>
                    {user.photoURL
                        ? <Avatar alt={user.displayName} src={user.photoURL}/>
                        : <Avatar alt={user.displayName}><AccountCircleIcon/></Avatar>}
                    <Typography variant="body1">
                        {user.displayName}
                    </Typography>
                </MuiLink>
            </TableCell>

            <TableCell>
                {!isLoaded(quizzes)
                    ? <CircularProgress/>
                    : isEmpty(quizzes)
                        ? <Typography variant="body1">There is no quizzes.</Typography>
                        : (
                            <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
                                {publishedQuizIDs.map(quizID => {
                                    return (
                                        <li key={quizID}>
                                            {user.quizzes && quizID in user.quizzes ? '✔ ' : '✘ '}
                                            {quizzes[quizID].name}
                                        </li>
                                    );
                                })}
                            </ul>
                        )
                }
            </TableCell>
        </TableRow>
    );
};

export default UserListItem;
