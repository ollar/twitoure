import DS from 'ember-data';
import { computed } from '@ember/object';
import Validator from '../../mixins/model-validator';
import { inject as service } from '@ember/service';
import Fingerprint2 from 'npm:fingerprintjs2';

export default DS.Model.extend(Validator, {
  username: DS.attr('string'),
  password: DS.attr('string'),
  email: DS.attr('string'),
  code: DS.attr('number'),

  amplify: service(),
  session: service(),

  validations: computed(() => ({
    username: {
      presence: true
    },
    password: {
      presence: true,
      length: {
        minimum: 6
      }
    },
    email: {
      presence: true,
      email: true
    },
    code: {
      presence: true
    }
  })),

  signUp() {
    const promise = new Promise(res =>
      new Fingerprint2().get(fingerprint => {
        res(
          this.get('amplify.sdk.Auth').signUp({
            username: this.get('username'),
            password: this.get('password'),
            attributes: {
              email: this.get('email'),
              'custom:fingerprint': fingerprint
            }
          })
        );
      })
    );

    return promise;
  },

  confirmSignUp() {
    return this.get('amplify.sdk.Auth').confirmSignUp(
      this.get('username'),
      this.get('code')
    );
  }
});
