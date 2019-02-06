import ShortText from './ShortText';
import LongText from './LongText';
import SingleOption from './Single';
import Multiple from './Multiple';
import Code from './Code';

const QuestionTypes = {
    [ShortText.code]: ShortText,
    [LongText.code]: LongText,
    [SingleOption.code]: SingleOption,
    // LongText,
    // Single,
    // Multiple,
    // Code
};

export default QuestionTypes;