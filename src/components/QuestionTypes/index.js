import ShortText from './ShortText';
import LongText from './LongText';
import SingleOption from './SingleOption';
import MultipleOptions from './MultipleOptions';
import Code from './Code';

const QuestionTypes = {
    [ShortText.code]: ShortText,
    [LongText.code]: LongText,
    [SingleOption.code]: SingleOption,
    [MultipleOptions.code]: MultipleOptions,
    [Code.code]: Code,
};

export default QuestionTypes;