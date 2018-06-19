import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { run, schedule } from '@ember/runloop';
import { computed } from '@ember/object';

export default Component.extend({
    classNameBindings: ['opened'],
    opened: false,

    me: service(),
    router: service(),
    session: service(),

    avatarImage: computed('me.model.avatar.[]', function() {
        return this.getWithDefault('me.model.avatar', []).objectAt(1);
    }),

    init() {
        this._super(arguments);

        const router = this.get('router');
        router.addObserver('currentRouteName', this, 'closeDrawer');
        this.me.fetch();
    },

    closeDrawer() {
        run(() => schedule('afterRender', () => this.set('opened', false)));
    },

    actions: {
        toggleDrawer() {
            run(() => this.toggleProperty('opened'));
        },
        signOut() {
            this.get('session')
                .invalidate()
                .then(() => this.get('router').transitionTo('signin'));
        },
    },
});
