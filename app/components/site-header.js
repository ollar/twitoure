import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    tagName: 'header',
    session: service(),

    isAuthenticated: computed.readOnly('session.isAuthenticated'),

    actions: {
        toggleDrawer() {
            this.get('drawerData.toggleDrawer')();
        },
        invalidateSession() {
            this.get('session')
                .invalidate()
                .then(() => this.get('router').transitionTo('login'));
        },
    },
});
