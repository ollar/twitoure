import { inject as service } from '@ember/service';

import Component from 'site-drawer-component/components/site-drawer-aside';

export default Component.extend({
    session: service(),
    me: service(),
    router: service(),

    didInsertElement() {
        this._super(...arguments);
        this.me.fetch();
    },

    actions: {
        signOut() {
            this.get('session')
                .invalidate()
                .then(() => this.get('router').transitionTo('signin'));
        },
    },
});
