import Component from '@ember/component';

export default Component.extend({
    tagName: 'header',

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
