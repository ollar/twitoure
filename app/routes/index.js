import Route from '@ember/routing/route';
import { schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
    map: service(),
    authenticationRoute: 'signin',

    activate() {
        schedule('afterRender', () => {
            this.get('map.leaflet');
            navigator.geolocation.getCurrentPosition(position => {
                this.get('map.leaflet').setView([
                    position.coords.latitude,
                    position.coords.longitude,
                ]);
            });
        });
    },

    model() {
        return hash({
            users: this.get('store').findAll('user'),
            images: this.get('store').findAll('image'),
            points: this.get('store').findAll('point'),
        });
    },
});
