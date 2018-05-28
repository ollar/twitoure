import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  amplify: service(),
  session: service(),
  actions: {
    signup() {
      if (this.get('model').validate()) {
        const user = this.get('model');

        console.log(this.get('session'));
        this.get('amplify.sdk.Auth')
          .signUp({
            username: user.get('username'),
            password: user.get('password'),
            attributes: {
              email: user.get('email'),
            },
          })
          .then()
          .catch(err =>
            this.send('notify', {
              type: 'error',
              text: err.message,
            })
          );
      }
    },
  },
});
