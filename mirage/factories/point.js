import { Factory, faker, association } from 'ember-cli-mirage';

export default Factory.extend({
  latitude: () => faker.address.latitude(),
  longitude: () => faker.address.longitude(),
  timestampCreated: () => +faker.date.past(),

  user: association(),
});
