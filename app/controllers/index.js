import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { schedule } from '@ember/runloop';

export default Controller.extend({
    map: service(),
    points: computed(() => []),

    init() {
        this._super(...arguments);

        this.addObserver('map.mapCenter', this, 'mapCenterChanged');
    },

    mapCenterChanged() {
        this.set(
            'points',
            this.get('model.points').filter(p => {
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

    actions: {
        locateMe() {
            return this.map.locateMe();
        },
    },
});
