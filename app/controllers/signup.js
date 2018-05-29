import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  amplify: service(),
  session: service(),
  codeRequired: false,

  actions: {
    signup() {
      if (!this.get('codeRequired')) {
        if (this.get('model').validate({ except: ['code'] })) {
          this.get('model')
            .signUp()
            .then(() => this.set('codeRequired', true))
            .catch(err =>
              this.send('notify', {
                type: 'error',
                text: err.message,
              })
            );
        }
      } else {
        if (this.get('model').validate()) {
          this.get('model')
            .confirmSignUp()
            .then(user =>
              this.get('session').authenticate('authenticator:aws', {
                username: this.get('model.username'),
                password: this.get('model.password'),
                user,
              })
            );
        }
      }
    },
  },
});
