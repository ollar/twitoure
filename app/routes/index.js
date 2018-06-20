import Route from '@ember/routing/route';
import { schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
    map: service(),
    session: service(),
    me: service(),
    authenticationRoute: 'signin',

    activate() {
        schedule('afterRender', () => {
            this.map.initMap();

            this.get('map.leaflet').on('locationfound', e => {
                const point = this.store.createRecord('point', {
                    latitude: e.latitude,
                    longitude: e.longitude,
                    created: Date.now(),
                    user: this.get('me.model'),
                });
                point.save();
            });
        });
    },

    deactivate() {
        schedule('routerTransitions', () => {
            this.get('map.leaflet').stopLocate();
            this.get('map.leaflet').remove();
        });
    },

    model() {
        return hash({
            me: this.get('me').fetch(),
            users: this.get('store').findAll('user'),
            images: this.get('store').findAll('image'),
            points: this.get('store').findAll('point'),
        });
    },
});
