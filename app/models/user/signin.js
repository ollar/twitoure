import DS from 'ember-data';
import Validator from '../../mixins/model-validator';
import { computed } from '@ember/object';

export default DS.Model.extend(Validator, {
    username: DS.attr('string'),
    password: DS.attr('string'),

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
    })),
});
