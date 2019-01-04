import Quiz from './Quiz';
import Question from './Question';
import ApiContext from './Context';

class Api
{
    constructor(firebase) {
        this.firebase = firebase;

        this.quiz = new Quiz(firebase);
        this.question = new Question(firebase);
    }

}

export default Api;
export { ApiContext };