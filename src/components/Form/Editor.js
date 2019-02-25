import React from "react";
import {withStyles} from "@material-ui/core";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const styles = {
    default: {
        zIndex: 99
    },
};

const QuillConfig = {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean'],
          ],
        },
      
        formats: [
          'header',
          'bold', 'italic', 'underline', 'strike', 'blockquote',
          'list', 'bullet', 'indent',
          'link', 'image'
        ],
};


class Editor extends React.PureComponent {

    handleDescriptionChanged = content => {
        const {field, form} = this.props;
        form.setFieldValue(field.name, content);
    }


    render = () => {
        const {classes, form, field, disabled, ...others} = this.props;

        const css = classes.default;

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