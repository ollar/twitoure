import Service from '@ember/service';

import _Amplify from 'npm:aws-amplify';
import awsmobile from '../aws-exports';
const Amplify = _Amplify.default;

export default Service.extend({
  init() {
    this._super(...arguments);
    Amplify.configure(awsmobile);
    this.set('sdk', Amplify);
  },
});
