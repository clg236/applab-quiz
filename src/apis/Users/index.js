import store, {firebase} from "../../store";
import _ from "lodash";

export function getCurrentUserID() {
    const user = getCurrentUser(['uid']);
    return user && user.uid ? user.uid : "";
}

export function getCurrentUser(fields) {
    const {firebase: {profile}} = store.getState();

    if (profile && profile.uid) {
        if (fields) {
            return _.pick(profile, fields);
        }

        return profile;
    }

    return null;
};

export function hasRole(role) {
    const user = getCurrentUser(['role']);

    if (!user) {
        return false;
    }

    return user.role === role;
}

export function saveProfile(uid, profile) {
    const promise = new Promise((resolve, reject) => {
        if (!uid) {
            reject();
            return;
        } else {
            if (_.isEmpty(profile)) {
                resolve();
                return;
            }

            firebase.update(`users/${uid}`, profile).then(ref => {
                resolve(ref);
            });
        }
    });

    return promise;
};
