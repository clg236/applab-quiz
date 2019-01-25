import React from "react";
import Form from './Form';
import {Typography} from "@material-ui/core";

const CreatePage = () => {

    return (
        <div>
            <Typography variant="h4" component="h2" gutterBottom>Create a question</Typography>
            <Form />
        </div>
    );
};

export default CreatePage;