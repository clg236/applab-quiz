import React from "react";
import {withStyles} from "@material-ui/core";
import {default as MuiRating} from "material-ui-rating";

const styles = {};


class Rating extends React.PureComponent {

    handleRatingChange = value => {
        const {field, form} = this.props;
        form.setFieldValue(field.name, value);
    }


    render = () => {
        const {classes, form, field, disabled, ...others} = this.props;

        return (
            <MuiRating max={5} name={field.name} value={field.value} readOnly={!!disabled}
                       onChange={this.handleRatingChange} {...others} />
        );
    }
}


export default withStyles(styles)(Rating);