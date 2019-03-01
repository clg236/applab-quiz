import {firebase} from "../../store";
import QuestionTypes from '../../components/QuestionTypes';


export function saveQuizInfo(info, quizID) {

    const promise = new Promise((resolve, reject) => {

        if (!info || !info.name) {
            reject();
            return ;
        }

        let save = null;

        if (quizID) {
            save = firebase.updateWithMeta(`quizzes/${quizID}`, info);
        } else {
            save = firebase.pushWithMeta("quizzes", info);
        }

        save.then(ref => {
            resolve(ref);
        });
    });

    return promise;
};

export function gradeQuestion(quizID, quiz, submissionID, submission, question, correct) {
    return new Promise((resolve, reject) => {
        const questions = quiz.questions;
        if (!questions) {
            reject();
            return ;
        }

        const {subject, answers} = submission;
        if (!subject || !subject.id || subject.id != quizID || !answers) {
            reject();
            return ;
        }

        // re-calculate the score
        let score = 0;
        questions.forEach(q => {
            const type = q.type;

            if (q.id == question.id) {
                if (correct) {
                    score++;
                }
            } else {
                if (type in QuestionTypes && q.id in answers) {
                    if (QuestionTypes[type].isCorrect(q, answers[q.id])) {
                        score++;
                    }
                }
            }
        });

        Promise.all([
            firebase.set(`submissions/${submissionID}/score`, score),
            firebase.set(`submissions/${submissionID}/grades/${question.id}`, correct)
        ]).then(_ => resolve());
    });
}
