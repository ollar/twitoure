import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';

export default Controller.extend({
    session: service(),
    i18n: service(),

    actions: {
        signin() {
            if (this.get('model').validate()) {
                this.get('session')
                    .authenticate('authenticator:firebase', {
                        email: this.get('model.email'),
                        password: this.get('model.password'),
                    })
                    .then(() => {
                        this.send('notify', {
                            type: 'success',
                            text: this.get('i18n').t('signin.success_message'),
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
        },
    },
});
