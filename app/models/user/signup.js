import DS from 'ember-data';
import { computed } from '@ember/object';
import Validator from '../../mixins/model-validator';

export default DS.Model.extend(Validator, {
  username: DS.attr('string'),
  password: DS.attr('string'),
  email: DS.attr('string'),

  validations: computed(() => ({
    username: {
      presence: true,
    },
    password: {
      presence: true,
      length: {
        minimum: 6,
      },
    },
    email: {
      presence: true,
      email: true,
    },
  })),
});
