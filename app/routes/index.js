import Route from '@ember/routing/route';
import { schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Route.extend({
  map: service(),

  activate() {
    schedule('afterRender', () => {
      navigator.geolocation.getCurrentPosition((position) => {
        this.get('map.leaflet')


      });
    });
  },
});
