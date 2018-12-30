import React, {useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';


function Multiple(props) {
    const {question} = props;

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{question.title}</FormLabel>
            <FormGroup>
                {question.options.map(option => (
                    <FormControlLabel
                        control={
                            <Checkbox value={option}  />
                        }
                        label={option}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
}

export default Multiple;