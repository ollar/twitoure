import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  fingerprint() {
    return faker.hacker.ingverb();
  },

  username() {
    return faker.internet.userName();
  },
  firstName() {
    return faker.name.firstName();
  },
  lastName() {
    return faker.name.lastName();
  },
  created() {
    return faker.date.past();
  },
  timestampCreated() {
    return +faker.date.past();
  },

  afterCreate(user, server) {
    server.createList('point', 100, { user });
    const avatar = server.create('image');

    user.avatar.add(avatar);
    user.save();
  },
});
