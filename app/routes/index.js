import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
    me: service(),
    authenticationRoute: 'signin',

    model() {
        return hash({
            me: this.get('me').fetch(),
            // users: this.get('store').findAll('user'),
            images: this.get('store').findAll('image'),
            points: this.get('store').query('point', {
                orderBy: 'created',
                // limitToLast: 100,
            }),
        });
    },
});
