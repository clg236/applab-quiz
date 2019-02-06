import React from "react";
import {withStyles} from "@material-ui/core";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const styles = {
    default: {
        zIndex: 99
    },

    withMargin: {
        marginTop: 25,
        zIndex: 99
    }
};

const QuillConfig = {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            ['link', 'image'],
            ['clean']
        ],
    },

    formats: ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link', 'image']
};


class Editor extends React.PureComponent {

    handleDescriptionChanged = content => {
        const {field, form} = this.props;
        form.setFieldValue(field.name, content);
    }


    render = () => {
        const {classes, form, field, withMargin, disabled, ...others} = this.props;

        const css = withMargin ? classes.withMargin : classes.default;

        return (
            <ReactQuill theme="snow" className={css} modules={QuillConfig.modules}
                        formats={QuillConfig.formats}
                        onChange={this.handleDescriptionChanged}
                        name={field.name}
                        value={field.value || ''}
                        readOnly={!!disabled}
                        {...others}
            />
        );
    }
}


export default withStyles(styles)(Editor);