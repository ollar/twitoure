import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';

export default Base.extend({
    amplify: service(),

    restore() {
        return this.get('amplify.sdk.Auth').currentSession();
    },

    authenticate({ username, password }) {
        return this.get('amplify.sdk.Auth').signIn(username, password);
    },

    invalidate() {
        return this.get('amplify.sdk.Auth').signOut();
    },
});
