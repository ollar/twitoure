import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  url: () => faker.image.cats(),
  type: () => faker.system.fileType(),
  name: () => faker.system.fileName(),
  size: () => faker.random.number(),
  lastModified: () => '',
  width: () => faker.random.number(),
  height: () => faker.random.number(),
  timestampCreated: () => +faker.date.past(),
});
