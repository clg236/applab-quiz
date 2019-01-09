import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { replace } from 'connected-react-router';

export const UserHasRole = role => {

  return connectedReduxRedirect({
    // The url to redirect user to if they fail
    redirectPath: '/',

    // If selector is true, wrapper will not redirect
    // For example let's check that state contains user data
    authenticatedSelector: ({firebase: {profile}}) => {
      return !!profile.isLoaded && !profile.isEmpty && profile.role == role;
    },

    redirectAction: replace,

    // A nice display name for this check
    wrapperDisplayName: 'UserHasRole'
  });
};


export default UserHasRole;