import Base from 'ember-simple-auth/authenticators/base';
import firebase from 'firebase'
export default Base.extend({
  restore(data) {
    return data;
  },

  authenticate({ email, password }) {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => res.providerData[0])

  },

  invalidate() {
    return firebase
        .auth()
        .signOut();
  }
});
