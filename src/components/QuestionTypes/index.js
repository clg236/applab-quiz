import ShortText from './ShortText';
import LongText from './LongText';
import Single from './Single';
import Multiple from './Multiple';
import Code from './Code';

const QuestionTypes = {
    [ShortText.code]: ShortText,
    // LongText,
    // Single,
    // Multiple,
    // Code
};

export {ShortText, LongText, Single, Multiple, Code};
export default QuestionTypes;