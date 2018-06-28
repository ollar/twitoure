import Service from '@ember/service';
import Leaf from 'leaflet';
import { computed, get } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';

export default Service.extend({
    me: service(),
    MAPBOX_ACCESS_TOKEN: computed(function() {
        return get(getOwner(this), 'application.mapbox.accessToken');
    }),

    leaflet: null,
    myLatLng: computed(() => ({})),
    mapCenter: computed(() => []),

    myIcon: computed('me.model.avatar', function() {
        return this.icon({
            iconUrl: this.getWithDefault('me.model.avatar.64.url', 'image.jpg'),
            iconSize: [48, 48],
        });
    }),

    init() {
        this._super(...arguments);

        this.setProperties(Leaf);
        this.pointMe = this.pointMe.bind(this);
        this.onLocationFound = this.onLocationFound.bind(this);
        this.onLocationError = this.onLocationError.bind(this);
        this.onMoveEnd = this.onMoveEnd.bind(this);
    },

    initMap() {
        this.set('initialize', true);
        this.myMarker = null;
        const map = Leaf.map('main-map', {
            center: [0, 0],
            zoom: 1,
            minZoom: 16,
            maxZoom: 18,
            zoomControl: false,
        });
        this.set('leaflet', map);
        map.on('locationfound', this.onLocationFound);
        map.on('locationfound', this.pointMe);
        map.on('locationerror', this.onLocationError);
        map.on('moveend', this.onMoveEnd);

        Leaf.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            // 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}{r}.jpg80?access_token={accessToken}',
            {
                maxZoom: 18,
                id: 'mapbox.streets',
                detectRetina: true,
                accessToken: this.get('MAPBOX_ACCESS_TOKEN'),
            }
        ).addTo(map);

        run(() => {
            map.locate({
                watch: true,
            });
        });

        return map;
    },

    locateMe() {
        if (Object.keys(this.myLatLng).length) {
            this.get('leaflet').flyTo(this.myLatLng);
        }
    },

    pointMe(e) {
        if (this.initialize) {
            this.get('leaflet').setView(e.latlng);
            this.set('initialize', false);
        }
        if (this.myMarker) {
            return this.myMarker.setLatLng(e.latlng);
        }
        this.myMarker = this.marker(e.latlng, {
            icon: this.myIcon,
        }).addTo(this.get('leaflet'));
    },

    setPoint(latlng) {
        return this.circle(latlng, {}).addTo(this.get('leaflet'));
    },

    onLocationFound(e) {
        return this.set('myLatLng', e.latlng);
    },

    onLocationError(err) {
        return getOwner(this).router.send('notify', {
            type: 'error',
            text: err.message,
        });
    },

    onMoveEnd() {
        return this.set('mapCenter', this.get('leaflet').getCenter());
    },
});
