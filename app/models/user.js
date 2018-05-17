import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  fingerprint: DS.attr('string'),

  username: DS.attr('string'),
  avatar: DS.hasMany('image'),
  created: DS.attr('date'),
  timestampCreated: DS.attr('number'),

  validations: computed(() => ({
    username: {
      presence: true,
    },
  })),
});
