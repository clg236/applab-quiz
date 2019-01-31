import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, getVal, isEmpty, isLoaded, withFirebase} from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {default as MuiLink} from '@material-ui/core/Link';
import {withSnackbar} from "notistack";


const styles = theme => ({
});


const Response = ({firebase, id, quiz, setSelectedQuiz}) => {
    let text = `${quiz.name} (${quiz.questions.length} questions)`;

    function handleQuizClicked() {
        setSelectedQuiz(quiz);
    }

    return (
        <TableRow>
            <TableCell scope="row">
                <Typography variant="body1">
                    <MuiLink href={'javascript:;'} onClick={handleQuizClicked}>{text}</MuiLink>
                </Typography>
            </TableCell>
        </TableRow>
    );
};

const Responses = ({classes, firebase, responses}) => {
    let content = "";

    if (!isLoaded(responses)) {
        content = <CircularProgress/>;
    } else if (isEmpty(responses)) {
        content = "There is no responses yet.";
    } else {
        content = (
            <Table className={classes.table}>
                <TableBody>
                    {Object.keys(responses).map(key => (
                        <></>
                    ))}
                </TableBody>
            </Table>
        );
    }

    return content;
};


export default compose(
    withFirebase,

    withSnackbar,

    firebaseConnect((props) => [
        {
            path: `responses/${props.quiz.id}`,
            queryParams: ['orderByKey']
        }
    ]),

    connect(
        (state, props) => (
            {
                responses: getVal(state.firebase.data, `responses/${props.quiz.id}`),
            }
        )
    ),

    withStyles(styles)
)(Responses);