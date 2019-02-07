import {default as MuiLink} from "@material-ui/core/Link";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {Link} from "react-router-dom";


const UserListItem = (props) => {

    const {uid, user} = props;

    return (
        <TableRow>
            <TableCell component="th">
                <MuiLink component={Link} to={`/users/${uid}`}>{user.displayName}</MuiLink>
            </TableCell>
        </TableRow>
    );
};

export default UserListItem;