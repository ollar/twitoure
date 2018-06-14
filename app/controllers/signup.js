import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';

export default Controller.extend({
    i18n: service(),

    actions: {
        signup() {
            this.model
                .signUp()
                .then(() => {
                    this.send('notify', {
                        type: 'success',
                        text: this.get('i18n').t('signup.success_message'),
                    });
                })
                .then(() => {
                    schedule('routerTransitions', () =>
                        this.transitionToRoute('index')
                    );
                })
                .catch(err =>
                    this.send('notify', {
                        type: 'error',
                        text: err.message,
                    })
                );
        },
    },
});
