import store, {firebase} from "../../store";
import _ from "lodash";


export function saveQuizInfo(info, quizID) {

    const promise = new Promise((resolve, reject) => {

        if (!info || !info.name) {
            reject();
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
