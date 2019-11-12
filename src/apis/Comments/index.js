import {firebase} from "../../store";
import {getCurrentUser} from "../Users";
import _ from "lodash";


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

export function uploadComments(comments, user) {
    const promise = new Promise((resolve, reject) => {
        if (!user) {
            user = getCurrentUser(['uid', 'displayName', 'photoURL']);
        }

        if (!user || !user.uid) {
            reject();
            return;
        }

        _.each(comments, item => {
            const comment = item.comment;
            const submission = item.submission;

            addComment(submission, comment, user);

            // console.log("Adding comment to:", submission, comment, user);
        });

        resolve();
    });

    return promise;
};
