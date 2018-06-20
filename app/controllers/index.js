import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    map: service(),
    actions: {
        locateMe() {
            return this.map.locateMe();
        },
    },
});
