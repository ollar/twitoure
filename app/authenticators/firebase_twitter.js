import Base from './firebase';
import firebase from 'firebase';

export default Base.extend({
    authenticate() {
        var provider = new firebase.auth.TwitterAuthProvider();

        return firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                return {
                    uid: result.user.uid,
                    accessToken: result.credential.accessToken,
                    secret: result.credential.secret,
                };
            });
    },
});
