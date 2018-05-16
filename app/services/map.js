import Service from '@ember/service';
import Leaf from 'npm:leaflet';
import { computed, get } from '@ember/object';
import { getOwner } from '@ember/application';

export default Service.extend({
    MAPBOX_ACCESS_TOKEN: computed(function() {
        return get(getOwner(this), 'application.mapbox.accessToken');
    }),

    init() {
        this._super(...arguments);

        const map = Leaf.map('main-map', {
            center: [59.915723799999995, 30.2763272],
            zoom: 13,
            preferCanvas: true,
        });
        this.set('leaflet', map);

        Leaf.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: this.get('MAPBOX_ACCESS_TOKEN')
        }).addTo(map);
    }
});
