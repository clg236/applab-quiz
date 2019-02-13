import {default as MuiLink} from "@material-ui/core/Link";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {Link} from "react-router-dom";


const UserListItem = (props) => {

    const {uid, user} = props;

    const numSubmissions = user.submissions ? Object.keys(user.submissions).length : 0;

    return (
        <TableRow>
            <TableCell component="th">
                <MuiLink component={Link} to={`/users/${uid}`}>
                    {user.displayName}
                </MuiLink>
            </TableCell>

            <TableCell>
                {numSubmissions}
            </TableCell>
        </TableRow>
    );
};

export default UserListItem;