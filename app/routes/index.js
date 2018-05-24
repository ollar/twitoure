import Route from '@ember/routing/route';
import { schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  map: service(),
  amplify: service(),

  activate() {
    schedule('afterRender', () => {
      this.get('map.leaflet');
      this.get('amplify.sdk.API').get('pointsCRUD', `/points`);
      navigator.geolocation.getCurrentPosition(position => {
        this.get('map.leaflet').setView([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    });
  },

  _model() {
    return hash({
      users: this.get('store').findAll('user'),
      images: this.get('store').findAll('image'),
      points: this.get('store').findAll('point'),
    });
  },
});
