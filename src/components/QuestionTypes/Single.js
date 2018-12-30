import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


function Single(props) {
    const {question} = props;
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{question.title}</FormLabel>
            <RadioGroup
                aria-label={question.title}
                name={question.name}
            >
                {question.options.map(option => (
                    <FormControlLabel value={option} control={<Radio />} label={option} />
                ))}
            </RadioGroup>
        </FormControl>
    );
}

export default Single;