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
            // this.map.initMap();
            // navigator.geolocation.getCurrentPosition(position => {
            //     this.get('map.leaflet').setView([
            //         position.coords.latitude,
            //         position.coords.longitude,
            //     ]);
            //     var marker = this.get('map')
            //         .circleMarker([
            //             position.coords.latitude,
            //             position.coords.longitude,
            //         ])
            //         .addTo(this.get('map.leaflet'));
            // });
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
