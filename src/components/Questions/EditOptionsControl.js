import React from "react";
import {FieldArray, getIn} from "formik";
import {Button, FormGroup, FormLabel, Grid} from "@material-ui/core";
import EditOptionControl from "./EditOptionControl";
import List from "@material-ui/core/List";
import uuid from "uuid";


const EmptyQuestionOption = {id: '', option: ''};

const EditOptionsControl = props => {
    const {questionIndex, multiple} = props;

    return (
        <FieldArray name={`questions.${questionIndex}.options`}>
            {helper => {
                const options = getIn(helper.form.values, helper.name);

                return (
                    <FormGroup>
                        <FormLabel>Question Options</FormLabel>
                        <List>
                            {options && options.length > 0 && (
                                <>
                                    {options.map((option, index) => (
                                        <EditOptionControl
                                            key={index}
                                            questionIndex={questionIndex}
                                            optionIndex={index}
                                            multiple={multiple}
                                            helper={helper}
                                        />
                                    ))}
                                </>
                            )}
                        </List>

                        <div>
                            <Button fullWidth={false} onClick={() => helper.push({...EmptyQuestionOption, id: uuid.v4()})}>
                                Add an option
                            </Button>
                        </div>
                    </FormGroup>
                );
            }}
        </FieldArray>

    )
};

export default EditOptionsControl;