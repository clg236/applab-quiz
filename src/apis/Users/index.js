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
