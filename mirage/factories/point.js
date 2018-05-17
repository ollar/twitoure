import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  latitude: () => faker.address.latitude(),
  longitude: () => faker.address.longitude(),
  timestampCreated: () => +faker.date.past(),
});
