import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    i18n: service(),

    actions: {
        submit() {
            if (this.get('model').validate()) {
                this.model.save().then(() =>
                    this.send('notify', {
                        type: 'success',
                        text: this.get('i18n').t('profile.success_message'),
                    })
                );
            }
        },

        cancel() {
            this.transitionToRoute('index');
        },

        uploadImage() {},
    },
});
