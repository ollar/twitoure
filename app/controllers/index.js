import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { schedule } from '@ember/runloop';

export default Controller.extend({
    map: service(),

    // points: computed('map.{myLatLng,mapCenter}', function() {
    // points: computed('map.myLatLng', function() {
    points: computed('map.mapCenter.[]', function() {
        console.log('1111 asdasdasdasdasdasdasdasdasdasdas');
        return [];
        // if (!Object.keys(this.map.mapCenter).length) return [];
        // // if (!this.map.mapCenter) return [];
        // return this.get('model.points').filter(p => {
        //     console.log(
        //         this.get('map.leaflet').distance(this.map.mapCenter, [
        //             p.latitude,
        //             p.longitude,
        //         ])
        //     );
        // });
    }),

    actions: {
        locateMe() {
            return this.map.locateMe();
        },
    },
});
