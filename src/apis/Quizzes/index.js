import {firebase} from "../../store";
import QuestionTypes from '../../components/QuestionTypes';
import _ from "lodash";
import moment from "moment";
import {getIn} from "formik";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export function saveQuizInfo(info, quizID) {

    const promise = new Promise((resolve, reject) => {

        if (!info || !info.name) {
            reject();
            return;
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
            return;
        }

        const {subject, answers} = submission;
        if (!subject || !subject.id || subject.id != quizID || !answers) {
            reject();
            return;
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

function getSubmissions(quiz) {
    return new Promise((resolve, reject) => {
        let submissionRequests = [];

        if (!quiz.submissions) {
            resolve([]);
            return ;
        }

        _.each(Object.keys(quiz.submissions), id => {
            submissionRequests.push(firebase.database().ref(`/submissions/${id}`).once('value'));
        });

        Promise.all(submissionRequests).then(snapshots => {
            let submissions = {};
            _.each(Object.keys(quiz.submissions), (id, index) => {
                submissions[id] = snapshots[index].val();
            })

            resolve(submissions);
        });
    });
}

function getQuestions(quiz) {
    return new Promise((resolve, reject) => {
        let questionRequests = [];

        if (!quiz.questions) {
            resolve([]);
            return ;
        }

        _.each(Object.keys(quiz.questions), id => {
            questionRequests.push(firebase.database().ref(`/questions/${id}`).once('value'));
        });

        Promise.all(questionRequests).then(snapshots => {
            let questions = {};
            _.each(Object.keys(quiz.questions), (id, index) => {
                questions[id] = snapshots[index].val();
            })

            resolve(questions);
        });
    });
}

export function downloadSubmissions(quiz) {
    Promise.all([getQuestions(quiz), getSubmissions(quiz)]).then(result => {
        const questions = result[0];
        const submissions = result[1];

        let headers = ["Name"];
        _.each(questions, question => {
            headers.push(question.title);
        });

        let rows = [headers];
        _.each(submissions, submission => {
            let row = [];
            row.push(getIn(submission, "user.displayName"));

            _.each(questions, (question, id) => {
                row.push(getIn(submission, `answers.${id}`));
            });

            rows.push(row);
        });

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const ws = XLSX.utils.aoa_to_sheet(rows);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, "submissions.xlsx");
    });


}