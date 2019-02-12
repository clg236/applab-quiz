import store, {firebase} from "../../store";
import _ from "lodash";


export function addComment(submission, comment, user) {
    const promise = new Promise((resolve, reject) => {
        if (!user) {
            const {firebase: {profile}} = store.getState();

            if (profile && profile.uid) {
                user = _.pick(profile, ['uid', 'displayName', 'photoURL']);
            }
        }

        if (!submission || !submission.id || !submission.subject || !comment || !user || !user.uid) {
            reject();
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
                    resolve();
                });
            });
        }

    });

    return promise;
};
