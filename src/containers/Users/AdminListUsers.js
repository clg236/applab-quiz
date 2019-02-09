import React from 'react';
import {compose} from 'redux';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {UserList} from "../../components/Users";
import {UserIsAdmin} from "../../components/Auth";


const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },

    list: {
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing.unit * 3,
    }
});

const AdminListUsers = ({classes}) => {

    return (
        <main className={classes.content}>
            <Typography variant="h4" gutterBottom component="h2">
                Users
            </Typography>

            <Grid container spacing={16}>
                <Grid item md={12}>
                    <Paper className={classes.list}>
                        <UserList />
                    </Paper>
                </Grid>
            </Grid>
        </main>
    );
};


export default compose(
    UserIsAdmin,

    withStyles(styles)
)(AdminListUsers);