import Route from '@ember/routing/route';
import { run, schedule } from '@ember/runloop';
import Leaf from 'npm:leaflet';

export default Route.extend({
  activate() {
    schedule('afterRender', () => {
      var mymap = Leaf.map('main-map', {
        center: [51.505, -0.09],
        zoom: 13,
        preferCanvas: true,
      });

      Leaf.tileLayer(
        'https://api.tiles.mapbox.com/v4/MapID/997/256/{z}/{x}/{y}.png?access_token={accessToken}',
        {
          maxZoom: 18,
        }
      ).addTo(mymap);
    });
  },
});
