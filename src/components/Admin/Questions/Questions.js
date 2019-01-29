import React from 'react';
import {compose} from 'redux';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import {List, Table, withStyles} from "@material-ui/core";
import {default as MuiLink} from "@material-ui/core/Link";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({});


const Questions = (props) => {
    const {classes, quiz} = props;

    return (
        <List>
            {Object.keys(quiz.questions).map((key, i) => (
                <ListItem disableGutters divider>
                    <ListItemText
                        primary={`${i + 1}. ${quiz.questions[key].title}`}
                        secondary={
                            <>
                            </>
                        }
                    />
                </ListItem>
            ))}

        </List>
    );
};

export default compose(
    withStyles(styles)
)(Questions);