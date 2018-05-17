import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  fingerprint() {
    return faker.hacker.ingverb();
  },

  username() {
    return faker.internet.userName();
  },
  created() {
    return faker.date.past();
  },
  timestampCreated() {
    return +faker.date.past();
  },

  afterCreate(user, server) {
    const avatar = server.create('image');
    user.avatar.add(avatar);
    server.createList('point', 100, { user });
  },
});
