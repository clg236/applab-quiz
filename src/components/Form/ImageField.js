import React from "react";
import FormControl from "@material-ui/core/FormControl";

const ImageField = props => (
    <FormControl {...props}>
            <InputLabel htmlFor={id} ref={this.labelRef} {...InputLabelProps}>
                {label}
            </InputLabel>
    </FormControl>
);

export default ImageField;
