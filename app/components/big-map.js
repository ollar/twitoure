import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { schedule } from '@ember/runloop';

export default Component.extend({
    elementId: 'main-map',

    map: service(),
    points: computed(() => []),

    init() {
        this._super(...arguments);

        this.addObserver('map.mapCenter', this, 'mapCenterChanged');
    },

    mapCenterChanged() {
        this.set(
            'points',
            this.get('_points').filter(p => {
                return (
                    this.get('map.leaflet').distance(this.map.mapCenter, [
                        p.latitude,
                        p.longitude,
                    ]) < 100
                );
            })
        );

        schedule('afterRender', () =>
            this.points.forEach(point => {
                this.get('map').setPoint([point.latitude, point.longitude]);
            })
        );
    },

    didInsertElement() {
        schedule('afterRender', () => {
            this.map.initMap();
        });
    },

    willDestroyElement() {
        schedule('routerTransitions', () => {
            this.get('map.leaflet').stopLocate();
            this.get('map.leaflet').remove();
        });
    },

    // this.get('map.leaflet').on('locationfound', e => {
    //     // const point = this.store.createRecord('point', {
    //     //     latitude: e.latitude,
    //     //     longitude: e.longitude,
    //     //     created: Date.now(),
    //     //     user: this.get('me.model'),
    //     // });
    //     // point.save();
    // });

    // afterModel() {
    //     const controller = this.controllerFor(this.routeName);

    //     schedule('afterRender', () => {
    //         schedule('afterRender', () => {
    //             // controller.points.forEach(point => {
    //             //     run(() =>
    //             //         this.get('map').setPoint([
    //             //             point.latitude,
    //             //             point.longitude,
    //             //         ])
    //             //     );
    //             // });
    //         });
    //     });
    // },

    actions: {
        locateMe() {
            return this.map.locateMe();
        },
    },
});
