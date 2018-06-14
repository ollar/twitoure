import DS from 'ember-data';
import { computed } from '@ember/object';
import Validator from '../../mixins/model-validator';
import { inject as service } from '@ember/service';
// import Fingerprint2 from 'npm:fingerprintjs2';
import firebase from 'firebase';

export default DS.Model.extend(Validator, {
    username: DS.attr('string'),
    password: DS.attr('string'),
    email: DS.attr('string'),

    session: service(),

    validations: computed(() => ({
        username: {
            presence: true,
        },
        password: {
            presence: true,
            length: {
                minimum: 6,
            },
        },
        email: {
            presence: true,
            email: true,
        },
    })),

    signUp() {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(
                this.get('email'),
                this.get('password')
            )
            .then(() =>
                this.session.authenticate('authenticator:firebase', {
                    email: this.get('email'),
                    password: this.get('password'),
                })
            );

        // const promise = new Promise(res =>
        //   new Fingerprint2().get(fingerprint => {
        //     res(
        //       this.get('amplify.sdk.Auth').signUp({
        //         username: this.get('username'),
        //         password: this.get('password'),
        //         attributes: {
        //           email: this.get('email'),
        //           'custom:fingerprint': fingerprint
        //         }
        //       })
        //     );
        //   })
        // );

        // return promise;
    },
});
