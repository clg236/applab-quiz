import {firebase} from "../../store";
import {getCurrentUser} from "../Users";

export function saveQualities(submission, qualities, user) {
    const promise = new Promise((resolve, reject) => {
        if (!user) {
            user = getCurrentUser(['uid', 'displayName', 'photoURL']);
        }


        if (!submission || !submission.id || !submission.subject || !qualities || !user || !user.uid) {
            reject();
            return ;
        } else {
            firebase.updateWithMeta(`submissions/${submission.id}`, {
                qualities,
                qualitiesCreatedBy: user,
                qualitiesCreatedAt: +new Date()
            }).then(_ => resolve());
        }
    });

    return promise;
};
