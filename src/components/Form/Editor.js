import React from "react";
import {FormHelperText, withStyles} from "@material-ui/core";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import styled from 'styled-components';

const EditorWrapper = styled.div`
    box-shadow: 0 0 3px #ddd;
    margin-top: 10px;
`

const styles = {
    default: {
        zIndex: 99
    },
};

const QuillConfig = {
    modules: {
        toolbar: [
            [{'header': [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['code-block'],
            ['clean'],
        ],
    },

    formats: [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'code-block'
    ],
};


class Editor extends React.PureComponent {

    countWords = text => {
        if (!text) {
            return 0;
        }
        return text.trim().split(/\s+/).length;
    }

    handleDescriptionChanged = (content, delta, source, editor) => {
        const {field, form} = this.props;
        form.setFieldValue(field.name, content);
    }


    render = () => {
        const {classes, form, field, disabled, maxWords, ...others} = this.props;
        const css = classes.default;

        return (
            <EditorWrapper>
                <ReactQuill theme="snow" className={css} modules={QuillConfig.modules}
                            formats={QuillConfig.formats}
                            onChange={this.handleDescriptionChanged}
                            name={field.name}
                            value={field.value || ''}
                            readOnly={!!disabled}
                            {...others}
                />
                {maxWords > 0 && (
                    <FormHelperText>
                        {`${this.countWords(field.value)}/${maxWords} word(s)`}
                    </FormHelperText>
                )}
            </EditorWrapper>
        );
    }
}


export default withStyles(styles)(Editor);