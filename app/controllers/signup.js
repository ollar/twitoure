import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';

export default Controller.extend({
    amplify: service(),
    session: service(),
    i18n: service(),

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
                        .then(() =>
                            this.get('session').authenticate(
                                'authenticator:aws',
                                {
                                    username: this.get('model.username'),
                                    password: this.get('model.password'),
                                }
                            )
                        )
                        .then(() => {
                            this.send('notify', {
                                type: 'success',
                                text: this.get('i18n').t(
                                    'signup.success_message'
                                ),
                            });
                            schedule('afterRender', () =>
                                this.transitionToRoute('index')
                            );
                        })
                        .catch(err =>
                            this.send('notify', {
                                type: 'error',
                                text: err.message,
                            })
                        );
                }
            }
        },
    },
});
