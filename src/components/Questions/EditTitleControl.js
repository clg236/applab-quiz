import {Field} from "formik";
import React from "react";
import TextField from "../Form/TextField";

function EditTitleControl({name}) {
    return (
        <Field
            name={name}
            render={({field}) => (
                <TextField label="Question Title" required fullWidth {...field} />
            )}
        />
    )
}

export default EditTitleControl;