import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
// import { schedule } from '@ember/runloop'

export default Controller.extend({
    session: service(),
    i18n: service(),

    actions: {
        signup() {

        },
    },
});
