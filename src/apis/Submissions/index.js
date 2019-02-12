import {firebase} from "../../store";

export function removeSubmission(submission) {
    return new Promise((resolve, reject) => {
        const {id, user: {uid}, subject} = submission;

        if (!id || !uid || !subject || !subject.id) {
            reject();
        }

        Promise.all([
            firebase.remove(`submissions/${id}`),
            firebase.remove(`users/${uid}/quizzes/${subject.id}`),
            firebase.remove(`users/${uid}/submissions/${id}`),
            firebase.remove(`quizzes/${subject.id}/submissions/${id}`)
        ]).then(_ => resolve());
    });
};
