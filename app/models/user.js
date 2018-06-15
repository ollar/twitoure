import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    fingerprint: DS.attr('string'),

    username: DS.attr('string'),
    firstname: DS.attr('string'),
    lastname: DS.attr('string'),
    email: DS.attr('string'),

    avatar: DS.hasMany('image'),
    created: DS.attr('number'),

    points: DS.hasMany('point'),

    validations: computed(() => ({
        username: {
            presence: true,
        },
    })),
});
