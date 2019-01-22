import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isEmpty, isLoaded} from 'react-redux-firebase';
import {push} from 'connected-react-router';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";


const UserListItem = ({id, user}) => {

    return (
        <ListItem button component={Link} to={`/admin/users/${id}`}>
            <Avatar src={user.avatarUrl} alt={user.displayName}/>
            <ListItemText primary={user.displayName} secondary={user.email}/>
        </ListItem>
    );
};

const ListPage = ({users}) => {
    let content = "";

    if (!isLoaded(users)) {
        content = <CircularProgress/>;
    } else if (isEmpty(users)) {
        content = "There is no users yet.";
    } else {
        content = (
            <List>
                {Object.keys(users).map(key => (
                    <UserListItem key={key} id={key} user={users[key]}/>
                ))}
            </List>
        );
    }

    return (
        <Grid container spacing={16} direction="column">
            <Typography variant="h2">Users</Typography>
            <Grid item>{content}</Grid>
        </Grid>
    );
};


export default compose(
    firebaseConnect(() => [
        {
            path: 'users',
            queryParams: ['orderByKey']
        }
    ]),

    connect(
        (state) => (
            {users: getVal(state.firebase.data, "users")}
        ),
        {
            pushToHistory: push
        }
    ),
)(ListPage);