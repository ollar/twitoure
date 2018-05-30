import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    fingerprint: DS.attr('string'),

    username: DS.attr('string'),

    firstName: DS.attr('string'),
    lastName: DS.attr('string'),

    avatar: DS.hasMany('image'),
    timestampCreated: DS.attr('number'),

    points: DS.hasMany('point'),

    validations: computed(() => ({
        username: {
            presence: true,
        },
    })),
});
