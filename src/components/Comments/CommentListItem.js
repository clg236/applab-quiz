import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";


const CommentListItem = (props) => {

    const {comment} = props;

    const submissionDate = (new Date(comment.createdAt)).toISOString();

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={comment.user.displayName} src={comment.user.photoURL} />
            </ListItemAvatar>
            <ListItemText
                disableTypography
                primary={`${comment.user.displayName} at ${submissionDate}`}
                secondary={(
                    <React.Fragment >
                        <div dangerouslySetInnerHTML={{__html: comment.comment}}></div>
                    </React.Fragment>
                )}
            />
        </ListItem>
    );
};

export default CommentListItem;