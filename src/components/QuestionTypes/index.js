import ShortText from './ShortText';
import LongText from './LongText';
import SingleOption from './SingleOption';
import MultipleOptions from './MultipleOptions';
import Code from './Code';
import Media from './Media';

const QuestionTypes = {
    [ShortText.code]: ShortText,
    [LongText.code]: LongText,
    [SingleOption.code]: SingleOption,
    [MultipleOptions.code]: MultipleOptions,
    [Media.code]: Media,
    [Code.code]: Code,
};

export default QuestionTypes;