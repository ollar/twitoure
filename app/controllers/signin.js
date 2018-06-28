import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';

export default Controller.extend({
    session: service(),
    i18n: service(),

    init() {
        this._super(...arguments);

        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    },

    onSuccess() {
        return Promise.resolve()
            .then(() =>
                this.send('notify', {
                    type: 'success',
                    text: this.get('i18n').t('signin.success_message'),
                })
            )
            .then(() =>
                schedule('routerTransitions', () =>
                    this.transitionToRoute('index')
                )
            );
    },

    onError(err) {
        this.send('notify', {
            type: 'error',
            text: err.message,
        });
    },

    actions: {
        signin() {
            if (this.get('model').validate()) {
                this.get('session')
                    .authenticate('authenticator:firebase', {
                        email: this.get('model.email'),
                        password: this.get('model.password'),
                    })
                    .then(this.onSuccess, this.onError);
            }
        },

        twitterSignin() {
            this.get('session')
                .authenticate('authenticator:firebase_twitter')
                .then(this.onSuccess, this.onError);
        },
    },
});
