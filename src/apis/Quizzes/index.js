import {firebase} from "../../store";
import QuestionTypes from '../../components/QuestionTypes';
import _ from "lodash";
import moment from "moment";


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

export function gradeQuestion(quizID, quiz, submissionID, submission, questionID, question, correct) {
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
        _.forEach(questions, (q, localQuestionID) => {
            const type = q.type;

            if (localQuestionID == questionID) {
                if (correct) {
                    score++;
                }
            } else {
                if (type in QuestionTypes && localQuestionID in answers) {
                    if (QuestionTypes[type].isCorrect(q, answers[localQuestionID])) {
                        score++;
                    }
                }
            }
        });

        let calculatedScore = score;
        if (quiz.deadline) {
            const diffInDays = moment(submission.createdAt).add(1, "days").diff(moment(quiz.deadline), 'days');
            if (diffInDays > 0) {
                calculatedScore = Math.max(0, calculatedScore * (1 - 0.1 * diffInDays).toFixed(2));
            }
        }

        Promise.all([
            firebase.set(`submissions/${submissionID}/score`, score),
            firebase.set(`submissions/${submissionID}/calculatedScore`, calculatedScore),
            firebase.set(`submissions/${submissionID}/grades/${questionID}`, correct)
        ]).then(_ => resolve());
    });
}
