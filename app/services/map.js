import Service from '@ember/service';
import Leaf from 'npm:leaflet';
import { computed, get } from '@ember/object';
import { getOwner } from '@ember/application';

export default Service.extend({
    MAPBOX_ACCESS_TOKEN: computed(function() {
        return get(getOwner(this), 'application.mapbox.accessToken');
    }),

    leaflet: null,

    init() {
        this._super(...arguments);

        this.setProperties(Leaf);
    },

    initMap() {
        const map = Leaf.map('main-map', {
            center: [59.915723799999995, 30.2763272],
            zoom: 16,
            minZoom: 16,
            maxZoom: 18,
            zoomControl: false,
        });
        this.set('leaflet', map);

        Leaf.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            // 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}{r}.jpg80?access_token={accessToken}',
            {
                maxZoom: 18,
                id: 'mapbox.light',
                detectRetina: true,
                accessToken: this.get('MAPBOX_ACCESS_TOKEN'),
            }
        ).addTo(map);

        return map;
    },
});
