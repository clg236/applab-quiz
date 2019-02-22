import {default as MuiLink} from "@material-ui/core/Link";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const UserListItem = (props) => {

    const {uid, user} = props;

    const numSubmissions = user.submissions ? Object.keys(user.submissions).length : 0;

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
                {numSubmissions}
            </TableCell>
        </TableRow>
    );
};

export default UserListItem;