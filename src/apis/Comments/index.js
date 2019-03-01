import {firebase} from "../../store";
import {getCurrentUser} from "../Users";

export function addComment(submission, comment, user) {
    const promise = new Promise((resolve, reject) => {
        if (!user) {
            user = getCurrentUser(['uid', 'displayName', 'photoURL']);
        }

        if (!submission || !submission.id || !submission.subject || !comment || !user || !user.uid) {
            reject();
            return ;
        } else {
            firebase.pushWithMeta("comments", {
                user,
                comment,
                submissionID: submission.id,
                subject: submission.subject
            }).then(ref => {
                Promise.all([
                    firebase.set(`users/${user.uid}/comments/${ref.key}`, true),
                    firebase.set(`submissions/${submission.id}/comments/${ref.key}`, true)
                ]).then(_ => {
                    resolve(ref);
                });
            });
        }

    });

    return promise;
};
