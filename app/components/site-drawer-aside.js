import { inject as service } from '@ember/service';

import Component from 'site-drawer-component/components/site-drawer-aside';

export default Component.extend({
    session: service(),
    me: service(),

    actions: {
        signOut() {
            this.get('session')
                .invalidate()
                .then(() => this.get('router').transitionTo('signin'));
        },
    },
});
